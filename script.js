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
        
        // Debug için console log
        console.log('Menu toggled:', isOpen ? 'opened' : 'closed');
    };

    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });
    
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
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
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

// News slide click functionality
const newsSlide = document.querySelector('.news-slide');
if (newsSlide) {
    newsSlide.addEventListener('click', (e) => {
        // Prevent click if clicking on buttons
        if (e.target.closest('.hero-buttons')) {
            return;
        }
        openNewsModal();
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
function openNewsModal() {
    const modal = document.getElementById('newsModal');
    const content = document.getElementById('newsContent');
    
    const newsContent = `
        <!-- Başlık + Meta Satırı -->
        <div class="news-header">
            <h1 class="news-title">Doğal afetlere "Tuna-1" desteği</h1>
            <div class="news-meta">
                <span class="news-date"><i class="fas fa-calendar"></i> 30 Haziran 2025</span>
                <span class="news-source"><i class="fas fa-newspaper"></i> CNN Türk</span>
                <span class="news-badge">HABER</span>
            </div>
        </div>
        
        <!-- Kısa Özet -->
        <div class="news-summary">
            <p class="news-lead">Recep Tayyip Erdoğan Üniversitesi öğrencileri, danışman hocalarıyla birlikte doğal afetlerde kriz yönetimine destek olacak yeni bir insansız hava aracı geliştirdi. TUNA-1 İHA, arama-kurtarma çalışmalarını havadan desteklemeyi amaçlayan özgün tasarımı ve yerli yazılımı ile dikkat çekiyor.</p>
        </div>
        
        <!-- Ana Medya -->
        <div class="news-hero-media">
            <div class="hero-video-container">
                <iframe 
                    src="https://geo.dailymotion.com/player/x9ooc.html?video=x9m2z16&customConfig%5Bdynamiciu%5D=%2F9927946%2C22420855682%2Fcnnturk%2Fsitegeneli&customConfig%5Bkeyvalues%5D=cnnturk_kategori%3Dturkiye%2Cpre%26contentID%3D6861a7103129374d52b1e1ef%2Ccnn_contentid%3D6861a7103129374d52b1e1ef%26vid%3D6861a7103129374d52b1e1ef&customConfig%5Botherparams%5D=pmnd%3D0%26pmxd%3D600000%26pmad%3D1&customConfig%5BcustomParams%5D=pmnd%3D0%26pmxd%3D600000%26pmad%3D1&customConfig%5Bpremium%5D=false&customConfig%5Bplcmt%5D=2&customConfig%5Bvpmute%5D=undefined&mute=true&loop=false" 
                    frameborder="0" 
                    allowfullscreen
                    class="hero-video">
                </iframe>
            </div>
        </div>
        
        <!-- Öne Çıkan 4 Özellik -->
        <div class="news-features">
            <h2>TUNA-1'in Öne Çıkan Özellikleri</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-plane"></i>
                    </div>
                    <h3>Dikey Kalkış</h3>
                    <p>Pist veya rampa gerektirmeden dikey kalkış yapabilen özgün tasarım</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-code"></i>
                    </div>
                    <h3>Yerli Yazılım</h3>
                    <p>Tamamen yerli yazılım ile geliştirildi, güvenli ve özelleştirilebilir</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-eye"></i>
                    </div>
                    <h3>Gelişmiş Sensörler</h3>
                    <p>Yüksek çözünürlüklü kameralar ve gelişmiş sensör sistemleri</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <i class="fas fa-map"></i>
                    </div>
                    <h3>Akıllı Haritalandırma</h3>
                    <p>Yıkılan binaların tespiti ve anında haritalandırma verileri</p>
                </div>
            </div>
        </div>
        
        <!-- Haber İçeriği -->
        <div class="news-content">
            <h2>Haber Detayları</h2>
            <p>Üniversiteli gençlerin hocalarıyla beraber geliştirdiği yerli İHA, kriz anlarında hayat kurtarmaya aday. Recep Tayyip Erdoğan Üniversitesi öğrencileri, doğal afetlerde arama kurtarma ekiplerine yön verecek bir insansız hava aracı geliştirdi. Tuna-1 isimli İHA, sensörleri ve kameralarıyla ekiplerin yönünü belirliyor. Depremde yıkılan yapıları haritalayabiliyor. Afet bölgesinde zamanla yarışan kurtarma ekipleri için hava desteği sağlıyor.</p>
            
            <p>Depremlerde yıkılan binaları sınıflandıran İHA, aynı zamanda sahadaki resmi kurumları ve müdahale araçlarını da tespit edebiliyor. Veri analizleriyle ekipleri yönlendirmek için anlık bilgi sağlıyor. Üç farklı sınıflandırma sistemi ile akıllı tespit yaparak, afet yönetimindeki koordinasyon noktasında birçok koordinasyonun bir arada sağlanmasını amaçlıyor.</p>
        </div>
        
        <!-- Alıntı -->
        <div class="news-quote">
            <blockquote>
                <p>"Öncelikle dikey iniş kalkış yapan, özgün tasarımlı ve özgün yazılıma sahip bir ürün olarak üretildi. Bu ürünle biz afet yönetimindeki koordinasyon noktasında birçok koordinasyonun bir arada sağlanmasını amaçlayan bir hedefe ulaşmaya çalışıyoruz."</p>
                <cite>— Doç. Dr. Murat Tören, Proje Danışmanı</cite>
            </blockquote>
        </div>
        
        <!-- Görsel Galeri -->
        <div class="news-gallery">
            <h2>Haber Görselleri</h2>
            <div class="gallery-grid">
                <div class="gallery-item" onclick="openGalleryImage(this)">
                    <img src="images/cnn-turk-haber/rize-iha-2.png.webp" alt="Proje Çalışmaları" class="gallery-image">
                    <div class="gallery-caption">Proje Çalışmaları</div>
                </div>
                <div class="gallery-item" onclick="openGalleryImage(this)">
                    <img src="images/cnn-turk-haber/rize-iha-3.png.webp" alt="Atölye Ortamı" class="gallery-image">
                    <div class="gallery-caption">Atölye Ortamı</div>
                </div>
                <div class="gallery-item" onclick="openGalleryImage(this)">
                    <img src="images/cnn-turk-haber/rize-iha-7.png.webp" alt="Ekip ve İşbirliği" class="gallery-image">
                    <div class="gallery-caption">Ekip ve İşbirliği</div>
                </div>
                <div class="gallery-item" onclick="openGalleryImage(this)">
                    <img src="images/cnn-turk-haber/rize-iha-8.png.webp" alt="Teknik Geliştirme" class="gallery-image">
                    <div class="gallery-caption">Teknik Geliştirme</div>
                </div>
                <div class="gallery-item" onclick="openGalleryImage(this)">
                    <img src="images/cnn-turk-haber/rize-iha-9.png.webp" alt="Araç ve Ekipmanlar" class="gallery-image">
                    <div class="gallery-caption">Araç ve Ekipmanlar</div>
                </div>
            </div>
        </div>
        
        <!-- Başarılar / Kanıtlar -->
        <div class="news-achievements">
            <h2>Başarılarımız ve Kanıtlar</h2>
            <div class="achievements-grid">
                <div class="achievement-card">
                    <div class="achievement-icon">
                        <i class="fas fa-trophy"></i>
                    </div>
                    <div class="achievement-content">
                        <h3>TEKNOFEST Finalisti</h3>
                        <p>Dünyanın en büyük havacılık ve teknoloji festivali TEKNOFEST'te "İnsanlık yararına teknoloji" kategorisinde finale yükseldik.</p>
                    </div>
                </div>
                <div class="achievement-card">
                    <div class="achievement-icon">
                        <i class="fas fa-award"></i>
                    </div>
                    <div class="achievement-content">
                        <h3>TÜBİTAK Desteği</h3>
                        <p>Projemiz TÜBİTAK tarafından desteklenmeye değer bulundu ve geliştirme sürecimiz hızlandı.</p>
                    </div>
                </div>
                <div class="achievement-card">
                    <div class="achievement-icon">
                        <i class="fas fa-medal"></i>
                    </div>
                    <div class="achievement-content">
                        <h3>Ulusal Tanınırlık</h3>
                        <p>CNN Türk ve Taka Gazete gibi ulusal medya organlarında projemiz detaylı olarak ele alındı.</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Kaynak Bağlantıları -->
        <div class="news-sources">
            <h2>Kaynak Bağlantıları</h2>
            <div class="sources-grid">
                <a href="https://www.cnnturk.com/teknoloji/dogal-afetlere-tuna-1-destegi" target="_blank" class="source-link">
                    <i class="fas fa-external-link-alt"></i>
                    <span>CNN Türk Haberi</span>
                </a>
                <a href="https://takagazetecomtr.tevideo.org/takagazete-com-tr/uploads/2025/06/rize-iha-1-1.mp4" target="_blank" class="source-link">
                    <i class="fas fa-video"></i>
                    <span>Taka Gazete Videosu</span>
                </a>
            </div>
        </div>
        
        <!-- Önceki / Sonraki Haber Navigasyonu -->
        <div class="news-navigation">
            <div class="nav-buttons">
                <button class="nav-btn prev-btn" onclick="showPreviousNews()">
                    <i class="fas fa-chevron-left"></i>
                    <span>Önceki Haber</span>
                </button>
                <button class="nav-btn next-btn" onclick="showNextNews()">
                    <span>Sonraki Haber</span>
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    `;
    
    content.innerHTML = newsContent;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
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

// Gallery image functions
function openGalleryImage(element) {
    const img = element.querySelector('.gallery-image');
    const caption = element.querySelector('.gallery-caption');
    
    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'gallery-lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${img.src}" alt="${img.alt}" class="lightbox-image">
            <div class="lightbox-caption">${caption.textContent}</div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Close lightbox
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.className === 'lightbox-close') {
            document.body.removeChild(lightbox);
            document.body.style.overflow = 'auto';
        }
    });
}

// Navigation functions
function showPreviousNews() {
    // TODO: Implement previous news navigation
    console.log('Previous news');
}

function showNextNews() {
    // TODO: Implement next news navigation
    console.log('Next news');
}
