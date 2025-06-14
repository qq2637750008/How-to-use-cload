// Language Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const langToggle = document.getElementById('lang-toggle');
    const langText = document.getElementById('lang-text');
    const contentEn = document.getElementById('content-en');
    const contentCn = document.getElementById('content-cn');
    
    let isEnglish = true;
    
    // Initialize with English content
    showContent('en');
    
    langToggle.addEventListener('click', function() {
        isEnglish = !isEnglish;
        
        if (isEnglish) {
            showContent('en');
            langText.textContent = '中文';
        } else {
            showContent('cn');
            langText.textContent = 'English';
        }
        
        // Add smooth transition effect
        langToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            langToggle.style.transform = 'scale(1)';
        }, 150);
    });
    
    function showContent(language) {
        if (language === 'en') {
            contentEn.classList.add('active');
            contentCn.classList.remove('active');
        } else {
            contentCn.classList.add('active');
            contentEn.classList.remove('active');
        }
    }
    
    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loading');
        });
    });
    
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add hover effect to images
    const imageContainers = document.querySelectorAll('.image-container');
    imageContainers.forEach(container => {
        container.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        container.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add parallax effect to background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('body::before');
        const speed = scrolled * 0.5;
        
        // Apply parallax effect to body background
        document.body.style.backgroundPosition = `center ${speed}px`;
    });
    
    // Add fade-in animation for content sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all major content elements
    const elementsToAnimate = document.querySelectorAll('h2, h3, p, .image-container, .table-container');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add click effect to buttons
    const buttons = document.querySelectorAll('.glass-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .glass-button {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        // Ensure focus is visible
        document.body.classList.add('keyboard-navigation');
    }
    
    // Language toggle with keyboard shortcut (Ctrl/Cmd + L)
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        document.getElementById('lang-toggle').click();
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add print styles
const printStyle = document.createElement('style');
printStyle.textContent = `
    @media print {
        body {
            background: white !important;
            color: black !important;
        }
        
        .language-toggle {
            display: none !important;
        }
        
        .content-section {
            background: white !important;
            border: none !important;
            box-shadow: none !important;
            color: black !important;
        }
        
        .image-container {
            background: white !important;
            border: 1px solid #ccc !important;
        }
        
        a {
            color: blue !important;
        }
    }
`;
document.head.appendChild(printStyle);

