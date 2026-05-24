/* ===== LANDING JAVASCRIPT CONSOLIDADO ===== */

// Función para inicializar todos los componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
  // Inicializar acordeón FAQ
  initFaqAccordion();

  // Aquí puedes agregar más inicializaciones de componentes si los necesitas
  console.log('Landing JavaScript cargado correctamente');
});

/* ===== FAQ ACCORDION FUNCTIONALITY ===== */
function initFaqAccordion() {
  // Toggle de acordeón
  document.querySelectorAll('.accordion-item').forEach(item => {
    item.querySelector('.accordion-header').addEventListener('click', () => {
      const isOpen = item.getAttribute('aria-expanded') === 'true';
      item.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}

/* ===== FUNCIONES ADICIONALES PARA FUTURAS EXPANSIONES ===== */

// Función para manejar animaciones de scroll
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observar elementos que necesiten animación
  document.querySelectorAll('.maximus-benefit-item, .maximus-detailed-item').forEach(el => {
    observer.observe(el);
  });
}

// Función para manejar formularios (si los hay)
function initFormHandlers() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      // Aquí puedes agregar validación personalizada
      console.log('Formulario enviado:', form);
    });
  });
}

// Función para manejar modales (si los hay)
function initModalHandlers() {
  const modalTriggers = document.querySelectorAll('[data-modal]');
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      const modalId = this.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
      }
    });
  });

  // Cerrar modales
  const modalCloses = document.querySelectorAll('.modal-close, .modal-overlay');
  modalCloses.forEach(close => {
    close.addEventListener('click', function () {
      const modal = this.closest('.modal');
      if (modal) {
        modal.classList.remove('active');
      }
    });
  });
}

// Función para manejar lazy loading de imágenes
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Función para manejar tooltips
function initTooltips() {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', function () {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = this.getAttribute('data-tooltip');
      document.body.appendChild(tooltip);

      const rect = this.getBoundingClientRect();
      tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
      tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
    });

    element.addEventListener('mouseleave', function () {
      const tooltip = document.querySelector('.tooltip');
      if (tooltip) {
        tooltip.remove();
      }
    });
  });
}

// Función para manejar scroll suave
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Función para manejar contadores animados
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-counter'));
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };

        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  });

  counters.forEach(counter => counterObserver.observe(counter));
}

// Función para manejar tabs
function initTabs() {
  const tabs = document.querySelectorAll('.tabs-header .tab');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = this.getAttribute('data-target');

      // Desactiva todo
      document.querySelector('.tabs-header .tab.active')?.classList.remove('active');
      document.querySelector('.tab-content.active')?.classList.remove('active');

      // Activa los seleccionados
      this.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });
}

// Función para manejar carruseles
function initCarousels() {
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(carousel => {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    let currentSlide = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      });
    }

    // Mostrar primera slide
    showSlide(0);
  });
}

// Función para manejar filtros
function initFilters() {
  const filterButtons = document.querySelectorAll('[data-filter]');
  const filterItems = document.querySelectorAll('[data-category]');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter');

      // Remover clase activa de todos los botones
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Filtrar elementos
      filterItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Función para manejar búsqueda en tiempo real
function initSearch() {
  const searchInput = document.querySelector('.search-input');
  const searchItems = document.querySelectorAll('[data-search]');

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const query = this.value.toLowerCase();

      searchItems.forEach(item => {
        const text = item.getAttribute('data-search').toLowerCase();
        if (text.includes(query)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}

// Función para manejar validación de formularios
function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate]');

  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });

      if (!isValid) {
        e.preventDefault();
        alert('Por favor completa todos los campos requeridos');
      }
    });
  });
}

// Función para manejar notificaciones
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Mostrar notificación
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);

  // Ocultar notificación después de 3 segundos
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Función para manejar cookies
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Función para manejar localStorage
function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error al guardar en localStorage:', e);
  }
}

function getLocalStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error('Error al leer de localStorage:', e);
    return null;
  }
}

// Función para manejar analytics
function trackEvent(category, action, label = null) {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      'event_category': category,
      'event_label': label
    });
  }

  if (typeof fbq !== 'undefined') {
    fbq('track', action, {
      content_category: category,
      content_name: label
    });
  }
}

// Función para manejar A/B testing
function initABTesting() {
  const testVariants = document.querySelectorAll('[data-ab-test]');
  testVariants.forEach(variant => {
    const testName = variant.getAttribute('data-ab-test');
    const variantName = variant.getAttribute('data-ab-variant');

    // Asignar variante basada en hash del usuario
    const userHash = getCookie('user_hash') || Math.random().toString(36).substr(2, 9);
    setCookie('user_hash', userHash, 365);

    const hashValue = parseInt(userHash, 36) % 100;
    const shouldShow = hashValue < 50; // 50/50 split

    if (shouldShow) {
      variant.style.display = 'block';
    } else {
      variant.style.display = 'none';
    }
  });
}

// Función para manejar performance
function initPerformanceTracking() {
  // Track page load time
  window.addEventListener('load', function () {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Tiempo de carga de la página: ${loadTime}ms`);

    // Enviar a analytics si está disponible
    if (typeof gtag !== 'undefined') {
      gtag('event', 'timing_complete', {
        name: 'load',
        value: loadTime
      });
    }
  });
}

// Función para manejar errores
function initErrorTracking() {
  window.addEventListener('error', function (e) {
    console.error('Error capturado:', e.error);

    // Enviar a servicio de tracking de errores si está disponible
    if (typeof Sentry !== 'undefined') {
      Sentry.captureException(e.error);
    }
  });
}

// Función para manejar accessibility
function initAccessibility() {
  // Mejorar navegación por teclado
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });

  document.addEventListener('mousedown', function () {
    document.body.classList.remove('keyboard-navigation');
  });

  // Mejorar contraste para usuarios con problemas de visión
  const highContrastToggle = document.querySelector('[data-high-contrast]');
  if (highContrastToggle) {
    highContrastToggle.addEventListener('click', function () {
      document.body.classList.toggle('high-contrast');
      const isEnabled = document.body.classList.contains('high-contrast');
      setLocalStorage('high-contrast', isEnabled);
    });

    // Restaurar preferencia del usuario
    const savedPreference = getLocalStorage('high-contrast');
    if (savedPreference) {
      document.body.classList.add('high-contrast');
    }
  }
}

// Función para manejar responsive
function initResponsive() {
  function handleResize() {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const isDesktop = window.innerWidth >= 1024;

    document.body.classList.toggle('mobile', isMobile);
    document.body.classList.toggle('tablet', isTablet);
    document.body.classList.toggle('desktop', isDesktop);
  }

  // Ejecutar al cargar
  handleResize();

  // Ejecutar al cambiar tamaño de ventana
  window.addEventListener('resize', handleResize);
}

// Función para manejar internacionalización
function initI18n() {
  const language = getCookie('language') || 'es';
  const elements = document.querySelectorAll('[data-i18n]');

  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translations = {
      'es': {
        'welcome': 'Bienvenido',
        'loading': 'Cargando...',
        'error': 'Error',
        'success': 'Éxito'
      },
      'en': {
        'welcome': 'Welcome',
        'loading': 'Loading...',
        'error': 'Error',
        'success': 'Success'
      }
    };

    if (translations[language] && translations[language][key]) {
      element.textContent = translations[language][key];
    }
  });
}

// Función para manejar SEO
function initSEO() {
  // Actualizar meta tags dinámicamente
  function updateMetaTags(title, description, keywords) {
    const titleElement = document.querySelector('title');
    const metaDescription = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');

    if (titleElement) titleElement.textContent = title;
    if (metaDescription) metaDescription.setAttribute('content', description);
    if (metaKeywords) metaKeywords.setAttribute('content', keywords);
  }

  // Exponer función globalmente
  window.updateMetaTags = updateMetaTags;
}

// Función para manejar seguridad
function initSecurity() {
  // Prevenir XSS en contenido dinámico
  function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Exponer función globalmente
  window.sanitizeHTML = sanitizeHTML;

  // Prevenir clickjacking
  if (window.self !== window.top) {
    window.top.location = window.self.location;
  }
}

// Función para manejar testing
function initTesting() {
  // Exponer funciones para testing
  window.testing = {
    showNotification,
    setCookie,
    getCookie,
    setLocalStorage,
    getLocalStorage,
    trackEvent
  };
}

// Inicializar todas las funciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
  // Funciones básicas
  initFaqAccordion();
  initScrollAnimations();
  initFormHandlers();
  initModalHandlers();
  initLazyLoading();
  initTooltips();
  initSmoothScroll();
  initCounters();
  initTabs();
  initCarousels();
  initFilters();
  initSearch();
  initFormValidation();
  initABTesting();
  initPerformanceTracking();
  initErrorTracking();
  initAccessibility();
  initResponsive();
  initI18n();
  initSEO();
  initSecurity();
  initTesting();

  console.log('✅ Landing JavaScript inicializado completamente');
});

// Manejar errores globales
window.addEventListener('error', function (e) {
  console.error('Error global capturado:', e.error);
});

// Manejar promesas rechazadas
window.addEventListener('unhandledrejection', function (e) {
  console.error('Promesa rechazada no manejada:', e.reason);
});
