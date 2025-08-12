// Mobile Navigation Toggle (erişilebilir)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-controls', 'primary-navigation');
    navMenu.id = 'primary-navigation';

    const toggleMenu = () => {
        const isOpen = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
    };

    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });

    // Close on link click
    document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }));
}

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize active navigation
document.addEventListener('DOMContentLoaded', setActiveNavLink);

// Slider Functionality
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Auto slide every 5 seconds
let slideInterval = setInterval(nextSlide, 5000);

// Event listeners for slider controls
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });

    nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(index);
        slideInterval = setInterval(nextSlide, 5000);
    });
});

// Pause auto-slide on hover
const heroSlider = document.querySelector('.hero-slider');
if (heroSlider) {
    heroSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    heroSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    // Show button when scrolling down
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Smooth scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Loading Spinner
const loadingSpinner = document.getElementById('loadingSpinner');

if (loadingSpinner) {
    // Hide spinner when page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingSpinner.classList.add('hidden');
            setTimeout(() => {
                loadingSpinner.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

// Cookie Consent
const cookieConsent = document.getElementById('cookieConsent');
const acceptCookies = document.getElementById('acceptCookies');
const declineCookies = document.getElementById('declineCookies');

if (cookieConsent && acceptCookies && declineCookies) {
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieConsent');
    
    if (!cookieChoice) {
        // Show cookie consent after 2 seconds
        setTimeout(() => {
            cookieConsent.classList.add('show');
        }, 2000);
    }
    
    // Accept cookies
    acceptCookies.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.classList.remove('show');
        setTimeout(() => {
            cookieConsent.style.display = 'none';
        }, 300);
    });
    
    // Decline cookies
    declineCookies.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        cookieConsent.classList.remove('show');
        setTimeout(() => {
            cookieConsent.style.display = 'none';
        }, 300);
    });
}

// Search Functionality
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');

// Search data
const searchData = [
    {
        title: 'Ana Sayfa',
        description: 'Fedai Takımı ana sayfası',
        url: 'index.html'
    },
    {
        title: 'Hakkımızda',
        description: 'Fedai Takımı hakkında detaylı bilgi',
        url: 'about.html'
    },
    {
        title: 'Projelerimiz',
        description: 'Geliştirdiğimiz İHA projeleri',
        url: 'projects.html'
    },
    {
        title: 'Yarışmalar',
        description: 'Katıldığımız yarışmalar ve başarılar',
        url: 'competitions.html'
    },
    {
        title: 'Takımımız',
        description: 'Fedai Takımı üyeleri',
        url: 'team.html'
    },
    {
        title: 'İletişim',
        description: 'Bizimle iletişime geçin',
        url: 'contact.html'
    },
    {
        title: 'Fedai İHA Görev Sistemi',
        description: 'JetWing keşif İHA\'sı ve Buzzard saldırı İHA\'sı',
        url: 'projects.html#fedai-iha'
    },
    {
        title: 'Kamuflajlı Hedef Tespiti',
        description: 'YOLOv10 ve DenseNet ile gelişmiş görüntü işleme',
        url: 'projects.html#kamuflaj-tespit'
    },
    {
        title: 'Otonom Uçuş Sistemi',
        description: 'GPS ve sensör füzyonu ile otonom uçuş',
        url: 'projects.html#otonom-ucus'
    },
    {
        title: 'TEKNOFEST',
        description: 'TEKNOFEST İHA yarışması katılımlarımız',
        url: 'competitions.html'
    }
];

if (searchInput && searchBtn && searchResults) {
    // Search functionality
    function performSearch(query) {
        if (query.length < 2) {
            searchResults.classList.remove('show');
            return;
        }

        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
        );

        if (results.length > 0) {
            searchResults.innerHTML = results.map(item => `
                <div class="search-result-item" onclick="window.location.href='${item.url}'">
                    <div class="search-result-title">${item.title}</div>
                    <div class="search-result-description">${item.description}</div>
                </div>
            `).join('');
            searchResults.classList.add('show');
        } else {
            searchResults.innerHTML = '<div class="search-result-item"><div class="search-result-description">Sonuç bulunamadı</div></div>';
            searchResults.classList.add('show');
        }
    }

    // Search input event
    searchInput.addEventListener('input', (e) => {
        performSearch(e.target.value);
    });

    // Search button click
    searchBtn.addEventListener('click', () => {
        performSearch(searchInput.value);
    });

    // Hide search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchBtn.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('show');
        }
    });
}

// Newsletter Functionality
const newsletterForm = document.getElementById('newsletterForm');
const newsletterEmail = document.getElementById('newsletterEmail');
const newsletterSuccess = document.getElementById('newsletterSuccess');
const newsletterError = document.getElementById('newsletterError');

if (newsletterForm && newsletterEmail && newsletterSuccess && newsletterError) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = newsletterEmail.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            showNewsletterMessage('Lütfen geçerli bir e-posta adresi girin.', 'error');
            return;
        }
        
        // Simulate newsletter subscription
        showNewsletterMessage('Aboneliğiniz işleniyor...', 'info');
        
        setTimeout(() => {
            // Store email in localStorage (in real app, this would be sent to server)
            const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
            if (!subscribers.includes(email)) {
                subscribers.push(email);
                localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
            }
            
            showNewsletterMessage('Başarıyla abone oldunuz! Teşekkürler.', 'success');
            newsletterForm.reset();
        }, 1500);
    });
    
    function showNewsletterMessage(message, type) {
        newsletterSuccess.classList.remove('show');
        newsletterError.classList.remove('show');
        
        if (type === 'success') {
            newsletterSuccess.textContent = message;
            newsletterSuccess.classList.add('show');
        } else if (type === 'error') {
            newsletterError.textContent = message;
            newsletterError.classList.add('show');
        }
        
        setTimeout(() => {
            newsletterSuccess.classList.remove('show');
            newsletterError.classList.remove('show');
        }, 5000);
    }
}

// Lazy Loading
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
            img.removeAttribute('data-src');
        });
    }
}

// Initialize lazy loading when DOM is loaded
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Language features are handled centrally by translate.js using lang/*.json

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.overview-card, .stat-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add loading animation for page
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add hover effects for overview cards
document.querySelectorAll('.overview-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effect for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
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
    .btn {
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
    
    .nav-link.active {
        color: #2563eb !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// News Modal Functions
function openNewsModal(newsId) {
    const modal = document.getElementById('newsModal');
    const content = document.getElementById('newsContent');
    
    const newsData = {
        news1: {
            title: "CNN Türk'te TUNA-1 İHA Projemiz!",
            date: "29 Haziran 2025",
            source: "CNN Türk",
            content: `
                <div class="news-header">
                    <h2>CNN Türk'te TUNA-1 İHA Projemiz!</h2>
                    <div class="news-meta">
                        <span class="news-date">29 Haziran 2025</span>
                        <span class="news-source">CNN Türk</span>
                    </div>
                </div>
                <div class="news-body">
                    <p>Doğal afetlerde hayat kurtaracak TUNA-1 İHA projemiz CNN Türk'te yayınlandı. Afet bölgelerinde arama-kurtarma koordinasyonunu hızlandıracak yerli teknolojimiz büyük ilgi gördü.</p>
                    
                    <h3>Projenin Öne Çıkan Özellikleri:</h3>
                    <ul>
                        <li>Dikey kalkış yapabilen özgün tasarım</li>
                        <li>Tamamen yerli yazılım ile geliştirildi</li>
                        <li>Afet bölgelerinde hızlı koordinasyon</li>
                        <li>Yıkılan binaların tespiti ve haritalandırma</li>
                        <li>Üç farklı sınıflandırma sistemi</li>
                    </ul>
                    
                    <p>Recep Tayyip Erdoğan Üniversitesi Elektrik-Elektronik Mühendisliği öğrencileri Kadir Kurtuluş, Beyzanur Yavuz ve Burak Alkan, danışmanları Doç. Dr. Murat Tören ile birlikte geliştirdikleri TUNA-1 İHA ile deprem başta olmak üzere doğal afetlerde arama-kurtarma ekiplerinin koordinasyonunu hızlandırmayı hedefliyor.</p>
                    
                    <div class="news-video">
                        <h4>CNN Türk Haberi:</h4>
                        <a href="https://www.cnnturk.com/video/turkiye/dogal-afetlere-tuna-1-destegi-2304034" target="_blank" class="btn btn-primary">
                            <i class="fas fa-play"></i> Haberi İzle
                        </a>
                    </div>
                </div>
            `
        },
        news2: {
            title: "Taka Gazete'de TUNA-1 İHA Projemiz!",
            date: "29 Haziran 2025",
            source: "Taka Gazete",
            content: `
                <div class="news-header">
                    <h2>Taka Gazete'de TUNA-1 İHA Projemiz!</h2>
                    <div class="news-meta">
                        <span class="news-date">29 Haziran 2025</span>
                        <span class="news-source">Taka Gazete</span>
                    </div>
                </div>
                <div class="news-body">
                    <p>Rize'den Türkiye'ye yerli teknoloji hamlesi! TUNA-1 İHA projemiz Taka Gazete'de geniş yer buldu. Afetlerde hayat kurtaracak projemiz büyük ilgi gördü.</p>
                    
                    <h3>TUNA-1'in Öne Çıkan Özellikleri:</h3>
                    <ul>
                        <li>Pist veya rampa gerektirmeden dikey kalkış</li>
                        <li>Hafifletilmiş 3D baskı malzemesi</li>
                        <li>Gelişmiş sensörler ve kameralar</li>
                        <li>Anında haritalandırma verileri</li>
                        <li>Yıkılan yapıların tespiti</li>
                    </ul>
                    
                    <p>Üniversitenin Milli Teknoloji Atölyesi'nde üretilen TUNA-1, pist veya rampa gerektirmeden dikey kalkış yapabiliyor. Hafifletilmiş 3D baskı malzemesi ile üretilen İHA, gelişmiş sensörleri ve kameraları sayesinde ekiplerin yönlendirilmesinde kritik rol üstlenecek.</p>
                    
                    <p>TUNA-1, dünyanın en büyük havacılık ve teknoloji festivali TEKNOFEST'te "İnsanlık yararına teknoloji" kategorisinde finale yükselerek TÜBİTAK desteği kazandı.</p>
                    
                    <div class="news-link">
                        <h4>Taka Gazete Haberi:</h4>
                        <a href="https://www.takagazete.com.tr/foto-galeri/afetlerde-hayat-kurtaracak-rizeden-turkiyeye-tuna-1-iha-surprizi" target="_blank" class="btn btn-primary">
                            <i class="fas fa-external-link-alt"></i> Haberi Oku
                        </a>
                    </div>
                </div>
            `
        }
    };
    
    if (newsData[newsId]) {
        content.innerHTML = newsData[newsId].content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeNewsModal() {
    const modal = document.getElementById('newsModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close news modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('newsModal');
    if (e.target === modal) {
        closeNewsModal();
    }
});
