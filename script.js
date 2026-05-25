
gsap.registerPlugin(ScrollTrigger);

window.addEventListener('DOMContentLoaded', () => {
  gsap.to('#hero-title', {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'power4.out',
    delay: 0.2,
  });
  gsap.to('#hero-subtitle', {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'power4.out',
    delay: 0.5,
  });
});

const rows = document.querySelectorAll('.gallery-row');

rows.forEach((row) => {
  const container = row.querySelector('.photo-container');
  const text = row.querySelector('.text-block');
  const canvas = row.querySelector('.heart-canvas');

  gsap.to(container, {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 1.4,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: row,
      start: 'top 75%',
      toggleActions: 'play none none none',
    },
  });
  gsap.to(text, {
    opacity: 1,
    y: 0,
    duration: 1.4,
    ease: 'power3.out',
    delay: 0.2,
    scrollTrigger: {
      trigger: row,
      start: 'top 75%',
    },
  });

  ScrollTrigger.create({
    trigger: row,
    start: 'top 60%',
    onEnter: () => {
      startHeartEffect(canvas);
    },
  });
});

function startHeartEffect(container) {
  
  let heartCount = 0;
  const maxHearts = 6;

  const interval = setInterval(() => {
    if (heartCount >= maxHearts) {
      clearInterval(interval);
      return;
    }

    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = '♥';

    const randomLeft = Math.random() * 80 + 10; 
    const randomXOffset = (Math.random() - 0.5) * 60; 

    heart.style.left = `${randomLeft}%`;
    heart.style.bottom = `10%`;
    heart.style.setProperty('--random-x', `${randomXOffset}px`);

    const size = Math.random() * 15 + 15; 
    heart.style.fontSize = `${size}px`;

    container.appendChild(heart);
    heartCount++;

    setTimeout(() => {
      heart.remove();
    }, 4000);
  }, 400);
}
