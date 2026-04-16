const horarios = [
    { dia: "Lunes", horario: "8:00 a.m. – 6:00 p.m." },
    { dia: "Martes", horario: "8:00 a.m. – 6:00 p.m." },
    { dia: "Miércoles", horario: "8:00 a.m. – 6:00 p.m." },
    { dia: "Jueves", horario: "8:00 a.m. – 6:00 p.m." },
    { dia: "Viernes", horario: "8:00 a.m. – 6:00 p.m." },
    { dia: "Sábado", horario: "9:00 a.m. – 1:00 p.m." },
    { dia: "Domingo", horario: "Cerrado" },
    { dia: "Emergencias", horario: "24/7" },
  ];
  
  const hoy = (new Date().getDay() + 6) % 7;
  const contenedor = document.getElementById("horario-tec");
  
  horarios.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "card" + (index === hoy ? " led" : "");
    div.innerHTML = `<strong>${item.dia}</strong><br>${item.horario}`;
    contenedor.appendChild(div);
  });

  document.addEventListener("DOMContentLoaded", () => {
    // Animar títulos
    document.querySelectorAll('.sectiontitle, .encabezado h6').forEach((el, i) => {
      el.classList.add('fade-in-up');
      el.style.animationDelay = `${i * 0.2}s`;
    });

    // Animar tarjetas
    document.querySelectorAll('.card').forEach((card, i) => {
      card.classList.add('fade-in-up');
      card.style.animationDelay = `${i * 0.1 + 0.5}s`;
    });

    // Otras secciones si lo deseas
    document.querySelectorAll('.section').forEach((section, i) => {
      section.classList.add('fade-in');
      section.style.animationDelay = `${i * 0.3}s`;
    });
  });
