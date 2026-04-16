    // FAQ interactivo - Versión corregida
    document.addEventListener('DOMContentLoaded', function() {
        // FAQ interactivo
        document.querySelectorAll('.faq-question').forEach(question => {
          question.addEventListener('click', () => {
            const item = question.parentNode;
            item.classList.toggle('active');
            
            // Cerrar otros items abiertos
            document.querySelectorAll('.faq-item').forEach(otherItem => {
              if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
              }
            });
          });
        });
        
        
        // Fecha y hora actual
        function updateDateTime() {
          const now = new Date();
          const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          };
          document.getElementById('fecha-hora').textContent = now.toLocaleDateString('es-ES', options);
        }
        
        setInterval(updateDateTime, 1000);
        updateDateTime();
  
      });

      document.addEventListener('DOMContentLoaded', () => {
        // Inicializar EmailJS con tu Public Key
        emailjs.init('ACzfn-t1fr278ILd_');
      
        const form = document.getElementById('contact-form');
        const resp = document.getElementById('respuesta');
      
        if (!form) {
          console.error('No encontré #contact-form');
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
          emailjs.sendForm('service_bs9y55t', 'template_ulrur3z', form)
          .then(function () {
            console.log("Mensaje enviado por EmailJS ✅");
    
            // --- Envío con Formspree (por fetch) ---
            fetch(form.action, {
              method: "POST",
              body: new FormData(form),
              headers: {
                'Accept': 'application/json'
              }
            }).then(response => {
              if (response.ok) {
                console.log("Mensaje enviado por Formspree ✅");
                document.getElementById("respuesta").style.display = "block";
                form.reset();
              } else {
                console.error("Error en Formspree ❌");
              }
            }).catch(error => {
              console.error("Error de red en Formspree ❌", error);
            });
    
          }, function (error) {
            console.error("Fallo en EmailJS ❌", error);
          });
      });
    });

    
/*Scroll up*/
function scrollUp() {
  const scrollUp = document.getElementById('scroll-up');
  if(this.scrollY >= 460) scrollUp.classList.add('show-scroll');
  else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*Ocultar menú en scroll*/
const menu = document.querySelector('.navM');
let prevScrollPos = window.pageYOffset;

window.onscroll = function() {
  const currentScrollPos = window.pageYOffset;
  if (currentScrollPos > prevScrollPos) {
      menu.classList.remove('show-menu');
  } else {
      if (currentScrollPos === 0) {
          menu.classList.add('show-menu');
      }
  }
  prevScrollPos = currentScrollPos;
};
