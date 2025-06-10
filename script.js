// --- Seletores principais ---
const body = document.body;
const toggleThemeBtn = document.getElementById('toggleTheme');
const backToTopBtn = document.getElementById('backToTop');
const navLinks = document.querySelectorAll('.nav-main a');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contactForm');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-main ul');

// --- Tema (com localStorage) ---
function setTheme(theme) {
  body.className = theme;
  localStorage.setItem("theme", theme);
}

function toggleTheme() {
  const currentTheme = body.classList.contains("dark") ? "dark" : "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
}

if (toggleThemeBtn) {
  toggleThemeBtn.addEventListener("click", toggleTheme);
}

// Aplica o tema salvo (se houver)
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
});

// --- Scroll suave para links internos ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    if (anchor.getAttribute('href') === '#' || anchor.getAttribute('href') === '') return;
    e.preventDefault();
    const targetID = anchor.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetID);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// --- Botão voltar ao topo (fade + slide) ---
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = 'block';
      setTimeout(() => {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.transform = 'translateY(0)';
      }, 10);
    } else {
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.transform = 'translateY(40px)';
      setTimeout(() => {
        backToTopBtn.style.display = 'none';
      }, 300);
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// --- Menu ativo ao rolar ---
function updateActiveMenu() {
  let scrollPos = window.scrollY + window.innerHeight / 3;
  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      const id = section.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href').includes(id));
      });
    }
  });
}
window.addEventListener('scroll', updateActiveMenu);
window.addEventListener('load', updateActiveMenu);

// --- Animação fade-in ao entrar na viewport ---
const fadeElems = document.querySelectorAll('.about-container, .imagem, .projects-container, .contato-container');
const fadeObserverOptions = { threshold: 0.2 };

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      fadeObserver.unobserve(entry.target);
    }
  });
}, fadeObserverOptions);

fadeElems.forEach(el => {
  el.classList.add('fade-init'); // inicial invisível
  fadeObserver.observe(el);
});

// --- Animação inputs do formulário ---
if (contactForm) {
  const inputs = contactForm.querySelectorAll('input, textarea');

  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.classList.add('focused');
    });
    input.addEventListener('blur', () => {
      if (!input.value) input.classList.remove('focused');
    });

    // Mantém foco se já tem valor (ex. após reload)
    if (input.value) input.classList.add('focused');
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    setTimeout(() => {
      alert('Mensagem enviada com sucesso! Obrigado pelo contato.');
      contactForm.reset();

      inputs.forEach(i => i.classList.remove('focused'));

      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar';
    }, 1500);
  });
}

// --- Animação suave para links do menu ---
navLinks.forEach(link => {
  link.style.transition = 'color 0.3s ease, background-color 0.3s ease';
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('clicked'));
    link.classList.add('clicked');
    setTimeout(() => link.classList.remove('clicked'), 500);
  });
});

// --- Intersection Observer para fade-in em outros elementos ---
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = { threshold: 0.1 };
  const fadeElements = document.querySelectorAll('section, .social-icons li, .imagem img, .about-container p strong');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));
});

// --- Estiliza botões desabilitados ---
document.querySelectorAll(".btn.disabled").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

// --- Menu hamburguer responsivo ---
if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}