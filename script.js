// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        
        // Reset hamburger animation
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Login Modal
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeBtn = document.querySelector('.close');

loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Login Form Submission
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;
    
    // Simulate login process
    console.log('Login attempted with:', { email, password });
    
    // Show success message
    alert('Login successful! Welcome to EduLearn.');
    
    // Close modal and reset form
    loginModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    loginForm.reset();
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    
    // Simulate form submission
    console.log('Contact form submitted');
    
    // Show success message
    alert(`Thank you ${name}! We've received your message and will get back to you soon.`);
    
    // Reset form
    contactForm.reset();
});

// Course Enrollment
const enrollButtons = document.querySelectorAll('.course-card .btn-primary');
enrollButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const courseCard = e.target.closest('.course-card');
        const courseName = courseCard.querySelector('h3').textContent;
        
        // Check if user is logged in (simplified)
        const isLoggedIn = false; // This would be checked from actual session
        
        if (!isLoggedIn) {
            alert(`Please login to enroll in "${courseName}"`);
            loginModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        } else {
            alert(`Successfully enrolled in "${courseName}"!`);
        }
    });
});

// Video Play Simulation
const videoCards = document.querySelectorAll('.video-card');
videoCards.forEach(card => {
    const thumbnail = card.querySelector('.video-thumbnail');
    
    thumbnail.addEventListener('click', () => {
        const videoTitle = card.querySelector('h3').textContent;
        alert(`Playing: ${videoTitle}`);
        
        // In a real application, this would open a video player
        console.log('Video playback initiated:', videoTitle);
    });
});

// Subject Card Click Handler
const subjectCards = document.querySelectorAll('.subject-card');
subjectCards.forEach(card => {
    card.addEventListener('click', () => {
        const subject = card.querySelector('h3').textContent;
        alert(`Browsing ${subject} courses...`);
        
        // In a real application, this would navigate to filtered course list
        console.log('Subject selected:', subject);
    });
});

// Scroll to Top on Page Load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// Add scroll animation to elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all course cards, subject cards, and video cards
document.querySelectorAll('.course-card, .subject-card, .video-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Search functionality (can be enhanced)
const searchCourses = (query) => {
    // This function would filter courses based on search query
    console.log('Searching for:', query);
};

// Newsletter subscription (if added)
const subscribeNewsletter = (email) => {
    console.log('Newsletter subscription:', email);
    alert('Thank you for subscribing to our newsletter!');
};

// Course rating system
const rateCourse = (courseId, rating) => {
    console.log(`Course ${courseId} rated:`, rating);
};

// Progress tracking
let courseProgress = {};

const updateProgress = (courseId, progress) => {
    courseProgress[courseId] = progress;
    console.log('Progress updated:', courseProgress);
};

// Initialize tooltips or additional features
document.addEventListener('DOMContentLoaded', () => {
    console.log('EduLearn platform loaded successfully!');
    
    // Add any initialization code here
    // For example: loading user preferences, checking login status, etc.
});
