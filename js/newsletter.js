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
  
