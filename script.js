gsap.registerPlugin(ScrollTrigger);
        const canvas = document.getElementById('particles-canvas');
        const ctx = canvas.getContext('2d');
        let particlesArray = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height + canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedY = Math.random() * 0.4 + 0.1;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.isHeart = Math.random() > 0.85;
            }
            update(scrollVelocity) {
                this.y -= this.speedY + (scrollVelocity * 0.05);
                this.x += this.speedX;
                
                if (this.y < -10) {
                    this.y = canvas.height + 10;
                    this.x = Math.random() * canvas.width;
                }
            }
            draw() {
                ctx.fillStyle = `rgba(235, 94, 118, ${this.opacity})`;
                if (this.isHeart) {
                    ctx.font = `${this.size * 3}px Arial`;
                    ctx.fillText('♥', this.x, this.y);
                } else {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }

        function initParticles() {
            particlesArray = [];
            const count = window.innerWidth < 768 ? 40 : 100;
            for(let i=0; i<count; i++) {
                particlesArray.push(new Particle());
            }
        }
        initParticles();

        let lastScrollY = window.scrollY;
        let scrollVelocity = 0;

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            let currentScrollY = window.scrollY;
            scrollVelocity = Math.min(Math.abs(currentScrollY - lastScrollY), 20);
            lastScrollY = currentScrollY;

            particlesArray.forEach(p => {
                p.update(scrollVelocity);
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();

        window.addEventListener('DOMContentLoaded', () => {
            let tl = gsap.timeline();
            tl.to("#hero-title", { opacity: 1, y: 0, duration: 1.5, ease: "power4.out", delay: 0.3 })
              .to("#hero-subtitle", { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, "-=1.0")
              .to("#scroll-text", { opacity: 0.6, duration: 1 }, "-=0.5");
        });

        const rows = document.querySelectorAll('.gallery-row');
        rows.forEach((row) => {
            const revealBox = row.querySelector('.photo-reveal-box');
            const img = row.querySelector('.parallax-img');
            const text = row.querySelector('.text-block');
            const heartCanvas = row.querySelector('.local-heart-canvas');

            gsap.fromTo(revealBox, 
                { clipPath: "inset(12% 12% 12% 12% round 40px)", opacity: 0, scale: 0.95 },
                { 
                    clipPath: "inset(0% 0% 0% 0% round 28px)", 
                    opacity: 1, 
                    scale: 1,
                    duration: 1.6,
                    ease: "power4.inOut",
                    scrollTrigger: {
                        trigger: row,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );

            gsap.fromTo(img, 
                { yPercent: -15 },
                { 
                    yPercent: 15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: row,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true 
                    }
                }
            );

            gsap.fromTo(text,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.4,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: row,
                        start: "top 75%"
                    }
                }
            );

            ScrollTrigger.create({
                trigger: row,
                start: "top 55%",
                onEnter: () => startBurstHearts(heartCanvas)
            });
        });

        let footerTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#footer-trigger",
                start: "top 70%"
            }
        });
        footerTl.to("#footer-title", { opacity: 1, y: 0, duration: 1.6, ease: "power4.out" })
                .to("#footer-subtitle", { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, "-=1.0");

        function startBurstHearts(container) {
            let count = 0;
            const max = 7; 

            const interval = setInterval(() => {
                if (count >= max) {
                    clearInterval(interval);
                    return;
                }

                const heart = document.createElement('div');
                heart.classList.add('floating-heart');
                heart.innerHTML = '♥';
                const randomLeft = Math.random() * 60 + 20; 
                const randomXOffset = (Math.random() - 0.5) * 120;
                const randomDeg = (Math.random() - 0.5) * 45;
                const size = Math.random() * 18 + 14;

                heart.style.left = `${randomLeft}%`;
                heart.style.bottom = `15%`;
                heart.style.fontSize = `${size}px`;
                heart.style.setProperty('--random-x', `${randomXOffset}px`);
                heart.style.setProperty('--random-deg', `${randomDeg}deg`);

                container.appendChild(heart);
                count++;

                setTimeout(() => heart.remove(), 4500);
            }, 350);
        }