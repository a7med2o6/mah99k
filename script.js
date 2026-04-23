// Navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Toggle icon
    const icon = menuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Simple Scroll Animation (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1) translateX(0) rotateX(0)';
            observer.unobserve(entry.target); // Run once
        }
    });
}, observerOptions);

// Initialize elements with initial state and observe
document.querySelectorAll('[data-aos]').forEach(el => {
    // Set initial states based on data-aos attribute
    const type = el.getAttribute('data-aos');
    const delay = el.getAttribute('data-aos-delay') || 0;
    
    el.style.opacity = '0';
    el.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`;
    
    if (type === 'fade-up') {
        el.style.transform = 'translateY(50px)';
    } else if (type === 'fade-left') {
        el.style.transform = 'translateX(-50px)';
    } else if (type === 'fade-right') {
        el.style.transform = 'translateX(50px)';
    } else if (type === 'zoom-in') {
        el.style.transform = 'scale(0.8)';
    } else if (type === 'flip-up') {
        el.style.transform = 'perspective(400px) rotateX(90deg)';
    }
    
    observer.observe(el);
});

// Active link on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Form Submission prevention (for demo)
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = 'تم الإرسال بنجاح <i class="fas fa-check"></i>';
    btn.style.background = '#10b981';
    btn.style.color = '#fff';
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.color = '';
        e.target.reset();
    }, 3000);
});
