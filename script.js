// Registrar o plugin ScrollTrigger no GSAP
gsap.registerPlugin(ScrollTrigger);

// 1. Animação de entrada do Hero (Entrada suave ao carregar a página)
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

// 2. Animação de Scroll para cada linha da galeria
const rows = document.querySelectorAll('.gallery-row');

rows.forEach((row) => {
  const container = row.querySelector('.photo-container');
  const text = row.querySelector('.text-block');
  const canvas = row.querySelector('.heart-canvas');

  // Fade in e movimento suave da imagem
  gsap.to(container, {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 1.4,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: row,
      start: 'top 75%', // Inicia a animação quando a linha atinge 75% da tela
      toggleActions: 'play none none none',
    },
  });

  // Fade in e subida suave do texto descritivo
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

  // Disparar efeito de corações quando o bloco entrar na tela
  ScrollTrigger.create({
    trigger: row,
    start: 'top 60%',
    onEnter: () => {
      startHeartEffect(canvas);
    },
  });
});

// 3. Sistema Dinâmico de Corações Elegantes
function startHeartEffect(container) {
  // Cria pequenos ciclos de corações flutuantes sutis
  let heartCount = 0;
  const maxHearts = 6; // Poucos corações para manter o visual premium e limpo

  const interval = setInterval(() => {
    if (heartCount >= maxHearts) {
      clearInterval(interval);
      return;
    }

    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = '♥';

    // Posições aleatórias calculadas atrás da imagem
    const randomLeft = Math.random() * 80 + 10; // Evita as bordinhas exatas
    const randomXOffset = (Math.random() - 0.5) * 60; // Desvio lateral ao subir

    heart.style.left = `${randomLeft}%`;
    heart.style.bottom = `10%`;
    heart.style.setProperty('--random-x', `${randomXOffset}px`);

    // Tamanhos variados para dar profundidade
    const size = Math.random() * 15 + 15; // Entre 15px e 30px
    heart.style.fontSize = `${size}px`;

    container.appendChild(heart);
    heartCount++;

    setTimeout(() => {
      heart.remove();
    }, 4000);
  }, 400);
}
