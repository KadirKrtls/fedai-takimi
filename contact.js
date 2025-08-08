// Contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Lütfen tüm zorunlu alanları doldurun.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Lütfen geçerli bir e-posta adresi girin.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Mesajınız gönderiliyor...', 'info');
            
            setTimeout(() => {
                showNotification('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
                contactForm.reset();
            }, 2000);
        });
    }
    
    // Show notification function
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add notification styles
        const notificationStyles = document.createElement('style');
        notificationStyles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                animation: slideInRight 0.3s ease;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 15px 20px;
                color: white;
            }
            
            .notification-success {
                background: linear-gradient(135deg, #10b981, #059669);
            }
            
            .notification-error {
                background: linear-gradient(135deg, #ef4444, #dc2626);
            }
            
            .notification-info {
                background: linear-gradient(135deg, #3b82f6, #2563eb);
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                margin-left: auto;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(notificationStyles);
        
        // Add to page
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
    
    function getNotificationIcon(type) {
        switch(type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'info': return 'fa-info-circle';
            default: return 'fa-info-circle';
        }
    }
    
    // Social media card hover effects
    const socialCards = document.querySelectorAll('.social-media-card');
    
    socialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Contact info card hover effects
    const contactCards = document.querySelectorAll('.contact-info-card');
    
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Form input focus effects
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Map info item hover effects
    const mapInfoItems = document.querySelectorAll('.map-info-item');
    
    mapInfoItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });
    
    // Smooth scroll for map link
    const mapLink = document.querySelector('a[href="#map"]');
    if (mapLink) {
        mapLink.addEventListener('click', (e) => {
            e.preventDefault();
            const mapSection = document.getElementById('map');
            mapSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Add animation to contact info cards
    const contactInfoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.3 });
    
    contactCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        contactInfoObserver.observe(card);
    });
    
    // Add animation to social media cards
    const socialMediaObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
            }
        });
    }, { threshold: 0.3 });
    
    socialCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        socialMediaObserver.observe(card);
    });
    
    // Add animation to form section
    const formObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });
    
    const formSection = document.querySelector('.contact-form-section');
    if (formSection) {
        formSection.style.opacity = '0';
        formSection.style.transform = 'translateY(30px)';
        formSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        formObserver.observe(formSection);
    }
    
    // Add animation to map section
    const mapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });
    
    const mapSection = document.querySelector('.map-section');
    if (mapSection) {
        mapSection.style.opacity = '0';
        mapSection.style.transform = 'translateY(30px)';
        mapSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        mapObserver.observe(mapSection);
    }
});

// Add CSS for form focus effects
const contactStyles = document.createElement('style');
contactStyles.textContent = `
    .form-group.focused label {
        color: #2563eb;
        transform: translateY(-5px);
    }
    
    .form-group.focused input,
    .form-group.focused textarea,
    .form-group.focused select {
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
    
    .contact-form input,
    .contact-form textarea,
    .contact-form select {
        transition: all 0.3s ease;
    }
    
    .contact-form label {
        transition: all 0.3s ease;
    }
    
    .submit-btn {
        transition: all 0.3s ease;
    }
    
    .submit-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
    }
    
    .map-info-item {
        transition: all 0.3s ease;
    }
    
    .social-media-card {
        transition: all 0.3s ease;
    }
    
    .contact-info-card {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(contactStyles);
