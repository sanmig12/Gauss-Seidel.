/* Menú de navegación */
const navMenu = document.getElementById('nav-menu');      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

// Abrir el menú
if(navToggle) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.add('show-menu');
    });
}

// Cerrar el menú
if(navClose) {
    navClose.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.remove('show-menu');
    });
}

// Cerrar al hacer clic fuera del menú
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('show-menu');
    }
});

// Cerrar el menú al hacer clic en cualquier enlace
document.querySelectorAll('.navM a').forEach(link => 
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    })
);

/* Scroll: encabezado, sección activa, scroll up */
function scrollHeader() {
    const header = document.getElementById('header');
    if (window.scrollY >= 50) header.classList.add('scroll-header');
    else header.classList.remove('scroll-header');
}

function scrollActive() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');

        const link = document.querySelector('.navM a[href*=' + sectionId + ']');
        if(link) {
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        }
    });
}

function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if (window.scrollY >= 460) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll');
}

// Unificado en un solo listener
function onScrollEvents() {
    scrollHeader();
    scrollActive();
    scrollUp();
}
window.addEventListener('scroll', onScrollEvents);

/* Botón "scroll up" suave */
document.getElementById('scroll-up').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ScrollReveal (corregido) */
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 300
});

sr.reveal('.home-swipper, .new-swiper, .newslc');
sr.reveal('.categorydata, .footercontent', { interval: 100 });
sr.reveal('.absolutedata, .discounting', { origin: 'bottom' });
sr.reveal('.abouting, .discountdata', { origin: 'left' });

document.addEventListener('DOMContentLoaded', function() {
    // Forzar el repintado para activar las animaciones
    const tarjetas = document.querySelectorAll('.tarjeta');
    
    // Pequeño retraso para asegurar que el DOM está listo
    setTimeout(() => {
        tarjetas.forEach(tarjeta => {
            // Reiniciamos las animaciones
            tarjeta.style.animation = 'none';
            tarjeta.offsetHeight; // Trigger reflow
            tarjeta.style.animation = null;
            
            // Añadir clase de animación
            tarjeta.classList.add('animar-entrada');
        });
    }, 100);
    
    document.addEventListener('DOMContentLoaded', () => {
        // Agrega la clase 'js-enabled' al body
        document.body.classList.add('js-enabled');
    
        // Selecciona los elementos con la clase 'hidden'
        const elements = document.querySelectorAll('.hidden');
    
        // Agrega la clase 'show' cuando el elemento esté en el viewport
        elements.forEach((el) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        el.classList.add('show');
                    }
                });
            });
            observer.observe(el);
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".section.discount").style.opacity = "1";
});

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar EmailJS con tu Public Key
    emailjs.init('ACzfn-t1fr278ILd_');
  
    const form = document.getElementById('newsletter-form');
    const resp = document.getElementById('response-message');
  
    if (!form) {
      console.error('No encontré #newsletter-form');
      return;
    }
  
    // Ocultar mensaje por defecto
    resp.classList.add('hidden-message');
  
    form.addEventListener('submit', e => {
      e.preventDefault();
  
      // Obtener el correo del formulario
      const formData = new FormData(form);
      const userEmail = formData.get('email');
  
      // Parámetros para el template
      const templateParams = {
        to_email: userEmail,
        from_name: 'TechGuard',
        message: 'Un nuevo usuario se ha suscrito con el correo: ' + userEmail
      };
  
      // Enviar con EmailJS
      emailjs.send('service_bs9y55t', 'template_16hl0ce', templateParams)
        .then(() => {
          console.log('✅ Correo enviado correctamente');
  
          // Mostrar mensaje de éxito
          resp.classList.remove('hidden-message');
  
          // Opcional: ocultar después de 5 segundos
          setTimeout(() => {
            resp.classList.add('hidden-message');
          }, 5000);
  
          // Opcional: limpiar formulario
          form.reset();
        })
        .catch(err => {
          console.error('❌ Error al enviar el correo:', err);
        });
    });
  });

  window.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('teamSlider');
    const slides = slider.innerHTML;
    slider.innerHTML += slides; // Duplicar para que el scroll sea infinito visualmente
  });

  document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.commercial-player');
    const overlay = document.querySelector('.video-overlay');
    const playButton = overlay.querySelector('.play-button');
    
    // Inicialmente ocultar controles nativos
    video.removeAttribute('controls');
    
    // Función para reproducir/pausar
    function togglePlay() {
        if (video.paused) {
            video.play();
            overlay.style.opacity = '0';
            video.setAttribute('controls', 'true');
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 300); // Espera a que termine la transición
        } else {
            video.pause();
            overlay.style.display = 'flex';
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 10);
            video.removeAttribute('controls');
        }
    }
    
    // Event listeners
    overlay.addEventListener('click', togglePlay);
    playButton.addEventListener('click', function(e) {
        e.stopPropagation(); // Evitar que el evento se propague al overlay
        togglePlay();
    });
    
    video.addEventListener('click', function(e) {
        e.stopPropagation(); // Evitar que el evento se propague al overlay
    });
    
    video.addEventListener('ended', function() {
        overlay.style.display = 'flex';
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);
        video.removeAttribute('controls');
    });
    
    video.addEventListener('pause', function() {
        if (!video.ended) {
            overlay.style.display = 'flex';
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 10);
            video.removeAttribute('controls');
        }
    });
});
