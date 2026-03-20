// Hamburger menu — only runs if elements exist
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
  const lines = menuBtn.querySelectorAll('.hamburger-line');

  menuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    if (!isOpen) {
      lines[0].style.transform = 'translateY(8px) rotate(45deg)';
      lines[1].style.opacity = '0';
      lines[2].style.transform = 'translateY(-8px) rotate(-45deg)';
    } else {
      lines[0].style.transform = '';
      lines[1].style.opacity = '';
      lines[2].style.transform = '';
    }
  });

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      lines[0].style.transform = '';
      lines[1].style.opacity = '';
      lines[2].style.transform = '';
    });
  });
}

// Fade-up on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('visible');
      observer.unobserve(el.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Lightbox modal for screenshots
document.querySelectorAll('.screenshot-slot img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.id = 'lightbox';
    modal.style.cssText = `
      position: fixed; inset: 0; z-index: 1000;
      background: rgba(0,0,0,0.92);
      display: flex; align-items: center; justify-content: center;
      padding: 1.5rem;
      backdrop-filter: blur(8px);
      animation: fadeIn 0.2s ease;
    `;

    modal.innerHTML = `
      <button id="lightbox-close" style="
        position: absolute; top: 1.25rem; right: 1.25rem;
        width: 40px; height: 40px;
        background: rgba(255,255,255,0.1);
        border: 1px solid rgba(255,255,255,0.15);
        border-radius: 50%; color: white;
        font-size: 1.2rem; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        transition: background 0.2s;
      ">✕</button>
      <img src="${img.src}" style="
        max-width: 90vw; max-height: 85vh;
        border-radius: 12px;
        object-fit: contain;
        box-shadow: 0 25px 80px rgba(0,0,0,0.6);
      " />
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    const close = () => {
      modal.remove();
      document.body.style.overflow = '';
    };

    document.getElementById('lightbox-close').addEventListener('click', close);
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); }, { once: true });
  });
});

// Tailwind config
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
};