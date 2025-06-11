// animaciones-index.js

function initIndexAnimations() {
    // Forzar el repintado del navegador
    document.body.style.opacity = '0.99';
    setTimeout(function() {
        document.body.style.opacity = '1';
    }, 10);
    
    // Activar clase loaded
    document.body.classList.add('loaded');
    
    // Verificar si es desktop
    const isDesktop = window.innerWidth > 768;
    
    // Inicializar Locomotive Scroll solo en desktop
    let scroll;
    if (isDesktop) {
        scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            multiplier: 0.7,
            inertia: 0.9,
            smartphone: { smooth: false },
            tablet: { smooth: false },
            getDirection: true,
            getSpeed: true
        });
    }

    // Función mejorada para activar animaciones
    function activateAnimations() {
        const elements = document.querySelectorAll('[class*="animate-"]');
        const windowHeight = window.innerHeight;
        
        elements.forEach(el => {
            const position = el.getBoundingClientRect().top;
            if (position < windowHeight * 1.2) { // Margen más amplio
                el.classList.add('animate-visible');
                
                // Forzar repintado para cada elemento
                el.style.opacity = '0.99';
                setTimeout(() => {
                    el.style.opacity = '1';
                }, 10);
            }
        });
        
        // Actualizar scroll si existe
        if (scroll) scroll.update();
    }
    
    // Activar inmediatamente y en eventos de scroll/resize
    activateAnimations();
    window.addEventListener('scroll', activateAnimations);
    window.addEventListener('resize', activateAnimations);
    
    // Solución definitiva para recargas
    if (performance.navigation.type === 1) { // Si es una recarga
        setTimeout(activateAnimations, 300);
        setTimeout(() => {
            document.body.classList.add('loaded');
            if (scroll) scroll.update();
        }, 500);
    }
}

// Usamos 'load' en lugar de 'DOMContentLoaded' para esperar todos los recursos
window.addEventListener('load', initIndexAnimations);