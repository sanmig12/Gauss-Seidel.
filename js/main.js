/*Menu*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

if(navToggle) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevenir propagación
        navMenu.classList.add('show-menu');
    });
}

if(navClose) {
    navClose.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevenir propagación
        navMenu.classList.remove('show-menu');
    });
}

/*Cerrar el menú si se hace clic fuera de él*/
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('show-menu');
    }
});

/*Remove Menu mobile*/
const navLink = document.querySelectorAll('.navLink');

function linkAction () {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*Scroll header*/
function scrollHeader () {
    const header = document.getElementById('header');
    if(this.scrollY >= 50) header.classList.add('scroll-header');
    else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*Scroll section*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;
    sections.forEach(current =>  {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionBottom = sectionTop + sectionHeight,
              sectionId = current.getAttribute('id');

        const link = document.querySelector('.navM a[href*=' + sectionId + ']');
        
        if(link) {
            // Evitar que se active el enlace de "Productos" cuando estamos en la sección de inicio
            if (sectionId !== 'home' && scrollY >= sectionTop && scrollY < sectionBottom) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

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

/*Animation*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 300
});

sr.reveal('.home-swipper, .new-swiper, .newslc');
sr.reveal('.categorydata, .footercontent', {interval: 100});
sr.reveal('.absolutedata, .discounting', {origin: 100});
sr.reveal('.abouting, .discountdata', {origin: 100});







