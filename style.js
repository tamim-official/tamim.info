/*==================== toggle icon navbar ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/*==================== About, Education & Talent Read More ====================*/
const aboutBtn = document.getElementById("read-more-btn");
const aboutMore = document.getElementById("more-text");
const eduBtns = document.querySelectorAll('.education .read-more-btn');
const talentBtns = document.querySelectorAll('.talent .read-more-btn');

// Combine all buttons
const allReadMoreBtns = [aboutBtn, ...eduBtns, ...talentBtns];

allReadMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent document click

        allReadMoreBtns.forEach(otherBtn => {
            let more;
            if(otherBtn === aboutBtn) more = aboutMore;
            else if(otherBtn.closest('.education-box')) more = otherBtn.closest('.education-box').querySelector('.more-text');
            else if(otherBtn.closest('.talent-box')) more = otherBtn.closest('.talent-box').querySelector('.more-text');

            if(otherBtn !== btn && more.style.display === "block"){
                more.style.display = "none";
                otherBtn.innerText = "Read More";
            }
        });

        let currentMore;
        if(btn === aboutBtn) currentMore = aboutMore;
        else if(btn.closest('.education-box')) currentMore = btn.closest('.education-box').querySelector('.more-text');
        else if(btn.closest('.talent-box')) currentMore = btn.closest('.talent-box').querySelector('.more-text');

        if(currentMore.style.display === "none" || currentMore.style.display === ""){
            currentMore.style.display = "block";
            btn.innerText = "Read Less";

            // Open Lightbox for Education or Talent
            if(btn.closest('.education-box') || btn.closest('.talent-box')){
                const box = btn.closest('.education-box') || btn.closest('.talent-box');
                const img = box.dataset.img;
                const title = box.dataset.title;
                const desc = box.dataset.desc;

                lbImg.src = img;
                lbTitle.innerText = title;
                lbDesc.innerText = desc;
                lightbox.style.display = "flex";
            }

        } else {
            currentMore.style.display = "none";
            btn.innerText = "Read More";
        }
    });
});

// Click anywhere to close all Read More sections
document.addEventListener('click', () => {
    allReadMoreBtns.forEach(btn => {
        let more;
        if(btn === aboutBtn) more = aboutMore;
        else if(btn.closest('.education-box')) more = btn.closest('.education-box').querySelector('.more-text');
        else if(btn.closest('.talent-box')) more = btn.closest('.talent-box').querySelector('.more-text');

        if(more.style.display === "block"){
            more.style.display = "none";
            btn.innerText = "Read More";
        }
    });
});

/*==================== Lightbox ====================*/
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbTitle = document.getElementById('lb-title');
const lbDesc = document.getElementById('lb-desc');
const closeBtn = document.querySelector('.lightbox .close');

document.querySelectorAll('.open-lightbox').forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.dataset.img;
        const title = btn.dataset.title;
        const desc = btn.dataset.desc;

        lbImg.src = img;
        lbTitle.innerText = title;
        lbDesc.innerText = desc;
        lightbox.style.display = "flex";
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = "none";
});

window.addEventListener('click', (e) => {
    if(e.target == lightbox) lightbox.style.display = "none";
});

/*==================== Scroll sections link ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => links.classList.remove('active'));
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
        }
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/*==================== Scroll Reveal ====================*/
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200
});
ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .talent-container, .education-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.photo-box', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/*==================== Typed JS ====================*/
const typed = new Typed('.multiple-text', {
    strings: ['Student', 'Web Developer', 'Programmer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

/*==================== Contact Form ====================*/
const contactForm = document.getElementById('contact-form');
if(contactForm){
    contactForm.addEventListener('submit', function(e){
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if(response.ok){
                document.getElementById('form-success').style.display = 'block';
                form.reset();
            } else {
                alert('Oops! There was a problem submitting your form.');
            }
        }).catch(error => {
            alert('Oops! There was a problem submitting your form.');
        });
    });
}




