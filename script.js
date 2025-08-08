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
        newsletterSuccess.style.display = 'none';
        newsletterError.style.display = 'none';
        
        if (type === 'success') {
            newsletterSuccess.textContent = message;
            newsletterSuccess.style.display = 'block';
        } else if (type === 'error') {
            newsletterError.textContent = message;
            newsletterError.style.display = 'block';
        }
        
        setTimeout(() => {
            newsletterSuccess.style.display = 'none';
            newsletterError.style.display = 'none';
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

// Language Switcher
const languageBtn = document.getElementById('languageBtn');
const languageDropdown = document.getElementById('languageDropdown');
const languageOptions = document.querySelectorAll('.language-option');

if (languageBtn && languageDropdown) {
    // Toggle dropdown
    languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        languageDropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        languageDropdown.classList.remove('show');
    });

    // Language selection
    languageOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.getAttribute('data-lang');
            
            // Update active state
            languageOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Update button text
            const flag = option.querySelector('.flag-icon').cloneNode(true);
            const span = option.querySelector('.language-text').textContent;
            
            languageBtn.innerHTML = '';
            languageBtn.appendChild(flag);
            const spanElement = document.createElement('span');
            spanElement.className = 'language-text';
            spanElement.textContent = lang.toUpperCase();
            languageBtn.appendChild(spanElement);
            const iconElement = document.createElement('i');
            iconElement.className = 'fas fa-chevron-down';
            languageBtn.appendChild(iconElement);
            
            // Store language preference
            localStorage.setItem('preferredLanguage', lang);
            
            // Change page language
            changePageLanguage(lang);
            
            // Show language change notification
            showLanguageNotification(lang);
        });
    });
    
    function showLanguageNotification(lang) {
        const message = lang === 'tr' ? 'Dil Türkçe olarak ayarlandı' : 'Language set to English';
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'language-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-globe"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Language content translations
const translations = {
    tr: {
        // Navigation
        'nav.home': 'Ana Sayfa',
        'nav.about': 'Hakkımızda',
        'nav.projects': 'Projelerimiz',
        'nav.competitions': 'Yarışmalar',
        'nav.team': 'Takımımız',
        'nav.contact': 'İletişim',
        
        // Overview Section
        'overview.projects': '8 farklı İHA projesi ile yenilikçi çözümler geliştiriyoruz.',
        'overview.projects.link': 'Detayları Gör',
        'overview.team': '4 farklı birimde 15+ uzman takım üyesi ile çalışıyoruz.',
        'overview.team.link': 'Takımı Tanı',
        'overview.competitions': '5 farklı yarışmada başarılar elde ettik, 3 ödül kazandık.',
        'overview.competitions.link': 'Başarılarımız',
        'overview.contact': 'Bizimle iletişime geçin, projelerimiz hakkında bilgi alın.',
        'overview.contact.link': 'İletişime Geç',
        
        // Hero Section
        'hero.title': 'Fedai',
        'hero.subtitle': 'İHA Teknolojilerinde Öncü',
        'hero.description': 'Recep Tayyip Erdoğan Üniversitesi öğrencileri olarak İHA teknolojileri alanında çalışmalar yapıyoruz.',
        'hero.cta': 'Daha Fazla Bilgi',
        
        // About Section
        'about.title': 'Hakkımızda',
        'about.subtitle': 'Fedai Kimdir?',
        'about.description': 'Fedai, Recep Tayyip Erdoğan Üniversitesi öğrencilerinden oluşan bir İHA takımıdır. TEKNOFEST yarışmalarında başarılar elde etmiş ve sürekli kendini geliştiren bir ekibiz.',
        
        // About Vision, Mission, Values
        'about.vision.title': 'Vizyonumuz',
        'about.vision.description': 'Türkiye\'nin önde gelen İHA teknolojilerini geliştiren, ulusal ve uluslararası yarışmalarda başarılar elde eden, geleceğin havacılık mühendislerini yetiştiren bir ekibiz. Teknoloji alanında sınırları zorlayan, yenilikçi çözümler üreten ve ülkemizin teknolojik gücüne katkıda bulunan bir topluluk olmayı hedefliyoruz.',
        'about.mission.title': 'Misyonumuz',
        'about.mission.description': 'İnsansız hava araçları alanında yenilikçi çözümler üretmek, takım çalışması ve liderlik becerilerini geliştirmek, ülkemizin teknoloji alanındaki gücüne katkıda bulunmak. Öğrencilerin teorik bilgilerini pratiğe dökebilecekleri bir platform oluşturmak ve endüstri ile akademi arasında köprü kurmak.',
        'about.values.title': 'Değerlerimiz',
        'about.values.item1': 'Yenilikçilik ve sürekli gelişim',
        'about.values.item2': 'Takım çalışması ve dayanışma',
        'about.values.item3': 'Kalite ve mükemmellik arayışı',
        'about.values.item4': 'Ulusal teknoloji geliştirme sorumluluğu',
        'about.values.item5': 'Etik değerler ve şeffaflık',
        'about.values.item6': 'Sosyal sorumluluk bilinci',
        
        // Stats
        'stats.team.member': 'Takım Üyesi',
        'stats.project': 'Proje',
        'stats.competition': 'Yarışma',
        'stats.award': 'Ödül',
        
        // Projects Section
        'projects.title': 'Projelerimiz',
        'projects.subtitle': 'Geliştirdiğimiz yenilikçi İHA sistemleri',
        
        // Blog Section
        'blog.title': 'Son Gelişmeler',
        'blog.subtitle': 'Fedai\'nin en son haberleri ve projeleri',
        
        // Sponsors Section
        'sponsors.title': 'Sponsorlarımız ve Partnerlerimiz',
        'sponsors.subtitle': 'Fedai\'yi destekleyen değerli kurumlar',
        
        // Newsletter Section
        'newsletter.title': 'Güncel Kalın',
        'newsletter.subtitle': 'En son haberlerimizi almak için abone olun',
        'newsletter.placeholder': 'E-posta adresiniz',
        'newsletter.button': 'Abone Ol',
        
        // Footer
        'footer.description': 'Fedai, İHA teknolojileri alanında çalışmalar yapan bir öğrenci topluluğudur.',
        'footer.quickLinks': 'Hızlı Bağlantılar',
        'footer.contact': 'İletişim',
        'footer.address': 'Recep Tayyip Erdoğan Üniversitesi, Rize',
        'footer.phone': '+90 464 212 30 00',
        'footer.email': 'info@fedaiteam.com',
        'footer.copyright': '© 2024 Fedai. Tüm hakları saklıdır.',
        
        // Search
        'search.placeholder': 'Ara...',
        
        // Language
        'lang.tr': 'Türkçe',
        'lang.en': 'English'
    },
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.projects': 'Our Projects',
        'nav.competitions': 'Competitions',
        'nav.team': 'Our Team',
        'nav.contact': 'Contact',
        
        // Overview Section
        'overview.projects': 'We develop innovative solutions with 8 different UAV projects.',
        'overview.projects.link': 'See Details',
        'overview.team': 'We work with 15+ expert team members in 4 different units.',
        'overview.team.link': 'Meet the Team',
        'overview.competitions': 'We achieved success in 5 different competitions, we won 3 awards.',
        'overview.competitions.link': 'Our Achievements',
        'overview.contact': 'Contact us, get information about our projects.',
        'overview.contact.link': 'Contact Us',
        
        // Hero Section
        'hero.title': 'Fedai',
        'hero.subtitle': 'Pioneer in UAV Technologies',
        'hero.description': 'As students of Recep Tayyip Erdoğan University, we work in the field of UAV technologies.',
        'hero.cta': 'Learn More',
        
        // About Section
        'about.title': 'About Us',
        'about.subtitle': 'Who is Fedai?',
        'about.description': 'Fedai is a UAV team consisting of students from Recep Tayyip Erdoğan University. We are a team that has achieved success in TEKNOFEST competitions and continuously improves itself.',
        
        // About Vision, Mission, Values
        'about.vision.title': 'Our Vision',
        'about.vision.description': 'We are a team that develops Turkey\'s leading UAV technologies, achieves success in national and international competitions, and trains the aviation engineers of the future. We aim to be an organization that pushes boundaries in technology, produces innovative solutions, and contributes to our country\'s technological power.',
        'about.mission.title': 'Our Mission',
        'about.mission.description': 'To produce innovative solutions in the field of unmanned aerial vehicles, to develop teamwork and leadership skills, to contribute to our country\'s power in the field of technology. To create a platform where students can put their theoretical knowledge into practice and build a bridge between industry and academia.',
        'about.values.title': 'Our Values',
        'about.values.item1': 'Innovation and continuous development',
        'about.values.item2': 'Teamwork and solidarity',
        'about.values.item3': 'Quest for quality and excellence',
        'about.values.item4': 'Responsibility for national technology development',
        'about.values.item5': 'Ethical values and transparency',
        'about.values.item6': 'Social responsibility awareness',
        
        // Stats
        'stats.team.member': 'Team Member',
        'stats.project': 'Project',
        'stats.competition': 'Competition',
        'stats.award': 'Award',
        
        // Projects Section
        'projects.title': 'Our Projects',
        'projects.subtitle': 'Innovative UAV systems we developed',
        
        // Blog Section
        'blog.title': 'Latest News',
        'blog.subtitle': 'Latest news and projects of Fedai',
        
        // Sponsors Section
        'sponsors.title': 'Our Sponsors and Partners',
        'sponsors.subtitle': 'Valuable institutions supporting Fedai',
        
        // Newsletter Section
        'newsletter.title': 'Stay Updated',
        'newsletter.subtitle': 'Subscribe to receive our latest news',
        'newsletter.placeholder': 'Your email address',
        'newsletter.button': 'Subscribe',
        
        // Footer
        'footer.description': 'Fedai is a student community working in the field of UAV technologies.',
        'footer.quickLinks': 'Quick Links',
        'footer.contact': 'Contact',
        'footer.address': 'Recep Tayyip Erdoğan University, Rize',
        'footer.phone': '+90 464 212 30 00',
        'footer.email': 'info@fedaiteam.com',
        'footer.copyright': '© 2024 Fedai. All rights reserved.',
        
        // Search
        'search.placeholder': 'Search...',
        
        // Language
        'lang.tr': 'Türkçe',
        'lang.en': 'English'
    }
};

// Function to change page language
function changePageLanguage(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update placeholders
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.placeholder = translations[lang]['search.placeholder'];
    }
    
    // Update newsletter form
    const newsletterInput = document.querySelector('.newsletter-input');
    const newsletterBtn = document.querySelector('.newsletter-btn');
    if (newsletterInput) {
        newsletterInput.placeholder = translations[lang]['newsletter.placeholder'];
    }
    if (newsletterBtn) {
        newsletterBtn.textContent = translations[lang]['newsletter.button'];
    }
}

// Load saved language preference
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== 'tr') {
        changePageLanguage(savedLang);
        
        // Update language switcher UI
        const languageBtn = document.getElementById('languageBtn');
        const languageOptions = document.querySelectorAll('.language-option');
        
        if (languageBtn) {
            languageOptions.forEach(opt => opt.classList.remove('active'));
            const activeOption = document.querySelector(`[data-lang="${savedLang}"]`);
            if (activeOption) {
                activeOption.classList.add('active');
                
                // Update button
                const flag = activeOption.querySelector('.flag-icon').cloneNode(true);
                languageBtn.innerHTML = '';
                languageBtn.appendChild(flag);
                const spanElement = document.createElement('span');
                spanElement.className = 'language-text';
                spanElement.textContent = savedLang.toUpperCase();
                languageBtn.appendChild(spanElement);
                const iconElement = document.createElement('i');
                iconElement.className = 'fas fa-chevron-down';
                languageBtn.appendChild(iconElement);
            }
        }
    }
});

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
