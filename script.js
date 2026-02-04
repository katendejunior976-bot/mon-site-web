// script.js - Interactions légères et validation du formulaire
// Auteur: Junior Katende (provisoire)

document.addEventListener('DOMContentLoaded', function(){
  // Menu mobile
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav ul');
  if(toggle && nav){
    toggle.addEventListener('click', ()=> nav.classList.toggle('open'));
  }

  // Smooth scroll pour ancres
  document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
        if(nav) nav.classList.remove('open');
      }
    });
  });

  // Reveal on scroll
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {threshold:0.15,rootMargin:'0px 0px -60px 0px'};
  const appearOnScroll = new IntersectionObserver(function(entries,observer){
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(fader=>appearOnScroll.observe(fader));

  // Formulaire: validation basique et message de succès (sans envoi serveur)
  const form = document.querySelector('#contact-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const message = form.querySelector('[name="message"]').value.trim();
      if(!name || !email || !message){
        alert('Merci de remplir tous les champs.');
        return;
      }
      // Ici, tu pourras intégrer un endpoint (Netlify/Formspree/Back-end)
      form.reset();
      alert('Merci, ton message a été simulé comme envoyé. Je te contacterai bientôt.');
    });
  }

});
