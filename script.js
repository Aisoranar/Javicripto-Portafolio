document.addEventListener('DOMContentLoaded', function() {
  /* PRELOADER */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', function() {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
      console.log("Preloader finalizado");
    }, 500);
  });

  /* SCROLL PROGRESS BAR */
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
  });

  /* MODO OSCURO/CLARO */
  const modeToggle = document.getElementById('mode-toggle');
  modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    modeToggle.innerHTML = document.body.classList.contains('light-mode')
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  });

  /* MENÚ HAMBURGUESA */
  const menuIcon = document.getElementById('menu-icon');
  const navLinks = document.getElementById('nav-links');
  menuIcon.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    menuIcon.classList.toggle('open');
  });
  const navItems = navLinks.querySelectorAll('a');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuIcon.classList.remove('open');
      }
    });
  });

  /* TICKER DE CRIPTOMONEDAS */
  const coinIcons = {
    bitcoin: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    ethereum: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    solana: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    raydium: "https://assets.coingecko.com/coins/images/11847/large/raydium.png",
    "pump-fun": "https://via.placeholder.com/20",
    binancecoin: "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png",
    cardano: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    polkadot: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
    "avalanche-2": "https://assets.coingecko.com/coins/images/12559/large/avalanche.png",
    dogecoin: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png"
  };
  let lastPrices = {};
  function fetchCryptoPrices() {
    const cryptoIds = 'bitcoin,ethereum,solana,raydium,pump-fun,binancecoin,cardano,polkadot,avalanche-2,dogecoin';
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=usd`)
      .then(response => response.json())
      .then(data => {
        const ticker = document.getElementById('crypto-ticker');
        let html = '';
        for (let coin in data) {
          const newPrice = data[coin].usd;
          let indicatorArrow = '';
          let indicatorText = '';
          let priceColor = 'var(--white)';
          if (lastPrices[coin] !== undefined) {
            const changePercent = ((newPrice - lastPrices[coin]) / lastPrices[coin] * 100).toFixed(1);
            if (newPrice > lastPrices[coin]) {
              indicatorArrow = `<span class="arrow arrow-up">↑</span>`;
              indicatorText = `<span class="change"> ${changePercent}%</span>`;
              priceColor = 'var(--green)';
            } else if (newPrice < lastPrices[coin]) {
              indicatorArrow = `<span class="arrow arrow-down">↓</span>`;
              indicatorText = `<span class="change"> ${changePercent}%</span>`;
              priceColor = 'var(--red)';
            } else {
              indicatorArrow = `<span class="arrow no-change">─</span>`;
              indicatorText = `<span class="change"> 0.0%</span>`;
              priceColor = 'var(--white)';
            }
          }
          lastPrices[coin] = newPrice;
          const icon = coinIcons[coin] ? `<img src="${coinIcons[coin]}" alt="${coin}" class="coin-icon">` : "";
          html += `<div class="crypto-item">
                    ${icon}
                    <span class="coin-name">${coin.charAt(0).toUpperCase() + coin.slice(1)}:</span>
                    <span class="coin-price" style="color: ${priceColor};">$${newPrice.toLocaleString()}</span>
                    ${indicatorArrow}${indicatorText}
                   </div>`;
        }
        ticker.innerHTML = html;
      })
      .catch(error => console.error('Error al obtener precios:', error));
  }
  fetchCryptoPrices();
  setInterval(fetchCryptoPrices, 5000);

  /* ANIMACIONES DE ENTRADA CON INTERSECTION OBSERVER */
  const sections = document.querySelectorAll('.section');
  const observerOptions = { threshold: 0.2 };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);
  sections.forEach(section => observer.observe(section));

  /* BOTÓN VOLVER ARRIBA */
  const backToTopBtn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* SLIDER DE TESTIMONIOS CON PAUSA AL PASAR EL MOUSE */
  const slider = document.querySelector('.testimonial-slider');
  const testimonials = document.querySelectorAll('.testimonial');
  let currentTestimonial = 0;
  let testimonialInterval = setInterval(showNextTestimonial, 5000);
  function showNextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    slider.style.transform = `translateX(-${currentTestimonial * 100}%)`;
  }
  slider.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
  });
  slider.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(showNextTestimonial, 5000);
  });

  /* TYPEWRITER EFFECT en el Hero */
  const typewriterText = "EXPERTO EN BITCOIN, TRADING Y MEMECOINS";
  const typewriterElement = document.getElementById('typewriter');
  let i = 0;
  function typeWriter() {
    if (i < typewriterText.length) {
      typewriterElement.innerHTML += typewriterText.charAt(i);
      i++;
      setTimeout(typeWriter, 80);
    }
  }
  typeWriter();

  /* MODAL DE PROYECTOS */
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalClose = document.querySelector('.modal-close');
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-title');
      const desc = card.getAttribute('data-desc');
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modal.style.display = "block";
    });
  });
  modalClose.addEventListener('click', () => {
    modal.style.display = "none";
  });
  window.addEventListener('click', (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  });

  /* FAQ - Acordeón */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });

  /* COOKIE CONSENT */
  const cookieConsent = document.getElementById('cookie-consent');
  const acceptCookies = document.getElementById('accept-cookies');
  if (!localStorage.getItem('cookiesAccepted')) {
    cookieConsent.style.display = 'flex';
  }
  acceptCookies.addEventListener('click', () => {
    cookieConsent.style.display = 'none';
    localStorage.setItem('cookiesAccepted', 'true');
  });

  /* EFECTO DE HUMO NEON (PARTÍCULAS) */
  const canvas = document.getElementById('smoke-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  function createParticle(x, y) {
    particles.push({
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: Math.random() * 3 + 2,
      alpha: 1.0,
      life: 100
    });
  }
  function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.01;
      p.radius *= 0.99;
      p.life--;
      ctx.beginPath();
      ctx.fillStyle = `rgba(0,229,255,${p.alpha})`;
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      if (p.alpha <= 0 || p.life <= 0) {
        particles.splice(i, 1);
      }
    }
    requestAnimationFrame(updateParticles);
  }
  updateParticles();
  window.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 3; i++) {
      createParticle(e.clientX, e.clientY);
    }
  });

  /* EFECTO RIPPLE en botones (.btn) */
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;
      btn.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  /* OPCIONAL: Captura del envío del formulario (para mostrar mensaje en consola) */
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (e) => {
    console.log("Formulario enviado. Se abrirá el cliente de correo.");
  });
});
