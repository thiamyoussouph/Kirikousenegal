document.addEventListener('DOMContentLoaded', function() {
    // Configuration des animations
    const animationConfig = [
      {
        selector: '#accueil .hero-content',
        animation: 'animate-swirlIn'
      },
      {
        selector: '.stats-container .stat-item',
        animation: 'animate-bounceIn',
        delay: (el, i) => i * 0.15
      },
      {
        selector: '#apropos .about-content',
        animation: 'animate-flyIn'
      },
      {
        selector: '#mot-president .president-photo-wrapper',
        animation: 'animate-slideInLeft',
        delay: 0.2
      },
      {
        selector: '#mot-president .president-message',
        animation: 'animate-slideInRight',
        delay: 0.4
      },
      {
        selector: '#galerie .gallery-item',
        animation: 'animate-flyIn',
        delay: (el, i) => i * 0.1
      },
      {
        selector: '#partenaires .partner-item',
        animation: 'animate-bounceIn',
        delay: (el, i) => i * 0.1
      },
      {
        selector: '#don',
        animation: 'animate-swirlIn'
      },
      {
        selector: '#contact .footer-col',
        animation: 'animate-slideInLeft',
        delay: (el, i) => i * 0.2
      }
    ];
  
    // Initialisation des éléments animés
    function initAnimations() {
      animationConfig.forEach(config => {
        const elements = document.querySelectorAll(config.selector);
        
        elements.forEach((element, index) => {
          element.setAttribute('data-animate', '');
          
          if (typeof config.delay === 'function') {
            element.style.animationDelay = `${config.delay(element, index)}s`;
          } else if (config.delay) {
            element.style.animationDelay = `${config.delay}s`;
          }
        });
      });
    }
  
    // Observer pour déclencher les animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          // Trouve la configuration correspondante
          const config = animationConfig.find(c => 
            element.matches(c.selector) || 
            element.closest(c.selector)
          );
          
          if (config) {
            element.classList.add(config.animation);
            element.style.opacity = '1';
          }
          
          observer.unobserve(element);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
  
    // Observe tous les éléments animés
    function observeElements() {
      document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
      });
    }
  
    // Compteur des stats
    const statItems = document.querySelectorAll('.stat-item');
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumber = entry.target.querySelector('.stat-number');
          if (statNumber.textContent.includes('+')) {
            animateNumber(statNumber, parseInt(statNumber.textContent), true);
          } else {
            animateNumber(statNumber, parseInt(statNumber.textContent));
          }
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
  
    function animateNumber(element, target, hasPlus = false) {
      let current = 0;
      const increment = target / 20;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          clearInterval(timer);
          element.textContent = hasPlus ? target + '+' : target;
        } else {
          element.textContent = Math.floor(current);
        }
      }, 50);
    }
  
    // Initialisation
    initAnimations();
    observeElements();
    statItems.forEach(item => statsObserver.observe(item));
  
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
          
          if (history.pushState) {
            history.pushState(null, null, targetId);
          } else {
            location.hash = targetId;
          }
        }
      });
    });
  
    // Header scroll effect
    const header = document.querySelector('header');
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll <= 10) {
        header.style.transform = 'translateY(0)';
        header.style.boxShadow = 'none';
      } else if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
      }
      
      lastScroll = currentScroll;
    });
  
    // Parallax effect
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
      });
    }
  });
  // Toggle menu on mobile

  document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');
    
    menuToggle.addEventListener('click', function() {
        // Basculer les classes active
        this.classList.toggle('active');
        navbar.classList.toggle('active');
        
        // Empêcher le scroll quand le menu est ouvert
        document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : '';
    });
    
    // Fermer le menu quand on clique sur un lien
    document.querySelectorAll('#navbar a').forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navbar.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Fermer le menu si la fenêtre est redimensionnée
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            menuToggle.classList.remove('active');
            navbar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});