// animaciones.js

function initAnimaciones() {
  // Verificar si es desktop
  const isDesktop = window.innerWidth > 768;
  
  // Inicializa Locomotive Scroll solo en desktop
  let scroll;
  if (isDesktop) {
    scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
      multiplier: 0.7,
      inertia: 0.9,
      smartphone: {
        smooth: false // Desactivado en móviles
      },
      tablet: {
        smooth: false // Desactivado en tablets
      },
      getDirection: true,
      getSpeed: true
    });
  }

  // Controla el scroll durante la carga
  let scrollEnabled = false;
  
  // Activa animaciones iniciales
  document.body.classList.add('loaded');
  
  // Filtrado de proyectos
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('[data-category]');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
      
      // Actualiza el scroll después de filtrar (solo desktop)
      setTimeout(() => {
        if (isDesktop && scroll) {
          scroll.update();
        }
        checkCardVisibility();
      }, 300);
    });
  });
  
  // Función para animar cards cuando son visibles
  function checkCardVisibility() {
    const cards = document.querySelectorAll('.portfolio-card:not(.reveal)');
    const windowHeight = window.innerHeight;
    
    cards.forEach((card, index) => {
      const cardPosition = card.getBoundingClientRect().top;
      const animationPoint = windowHeight * 0.8;
      
      if(cardPosition < animationPoint) {
        setTimeout(() => {
          card.classList.add('reveal');
        }, index * 100);
      }
    });
  }
  
  // Configura el Intersection Observer para las cards
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if(entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target);
        }, index * 100);
      }
    });
  }, observerOptions);
  
  // Observa todas las cards inicialmente
  document.querySelectorAll('.portfolio-card').forEach(card => {
    observer.observe(card);
  });
  
  // Verifica visibilidad al hacer scroll
  window.addEventListener('scroll', checkCardVisibility);
  checkCardVisibility(); // Ejecuta una vez al cargar
  
  // Habilita el scroll después de un tiempo (solo desktop)
  setTimeout(() => {
    scrollEnabled = true;
    if (isDesktop && scroll) {
      scroll.update();
    }
  }, 1500);
  
  // Manejar cambios de tamaño de pantalla
  function handleResize() {
    const newIsDesktop = window.innerWidth > 768;
    
    if (newIsDesktop !== isDesktop) {
      window.location.reload(); // Recarga para cambiar el comportamiento
    }
  }
  
  window.addEventListener('resize', handleResize);
  
  // Actualiza el scroll al redimensionar (solo desktop)
  window.addEventListener('resize', () => {
    if (isDesktop && scroll) {
      scroll.update();
    }
  });
}

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', initAnimaciones);