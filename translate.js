// Translation System
class Translator {
    constructor() {
        this.currentLang = 'tr';
        this.translations = {};
        this.init();
    }

    async init() {
        // Load saved language preference
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang) {
            this.currentLang = savedLang;
        }

        // Load translations
        await this.loadTranslations();
        
        // Apply translations
        this.applyTranslations();
        
        // Initialize language switcher
        this.initLanguageSwitcher();
        
        // Update HTML lang attribute
        this.updateHtmlLang();
    }

    async loadTranslations() {
        try {
            const trResponse = await fetch('lang/tr.json');
            const enResponse = await fetch('lang/en.json');
            
            this.translations.tr = await trResponse.json();
            this.translations.en = await enResponse.json();
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    getTranslation(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                // Fallback to Turkish if translation not found
                value = this.translations.tr;
                for (const fallbackKey of keys) {
                    if (value && value[fallbackKey]) {
                        value = value[fallbackKey];
                    } else {
                        console.warn(`Translation key not found: ${key}`);
                        return key;
                    }
                }
            }
        }
        
        return value || key;
    }

    applyTranslations() {
        const elements = document.querySelectorAll('[data-translate]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.getTranslation(key);
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });
    }

    changeLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);
        
        // Apply translations
        this.applyTranslations();
        
        // Update language switcher UI
        this.updateLanguageSwitcherUI();
        
        // Update HTML lang attribute
        this.updateHtmlLang();
        
        // Show notification
        this.showLanguageNotification(lang);
    }

    updateLanguageSwitcherUI() {
        const languageBtn = document.getElementById('languageBtn');
        const languageText = languageBtn.querySelector('.language-text');
        const languageFlag = languageBtn.querySelector('.flag-icon');
        
        if (languageText) {
            languageText.textContent = this.currentLang.toUpperCase();
        }
        
        if (languageFlag) {
            languageFlag.src = `assets/icons/${this.currentLang === 'tr' ? 'tr' : 'en'}.svg`;
            languageFlag.alt = this.currentLang === 'tr' ? 'Turkish' : 'English';
        }
        
        // Update active state in dropdown
        const options = document.querySelectorAll('.language-option');
        options.forEach(option => {
            const lang = option.getAttribute('data-lang');
            if (lang === this.currentLang) {
                option.classList.add('active');
                option.setAttribute('aria-current', 'true');
            } else {
                option.classList.remove('active');
                option.removeAttribute('aria-current');
            }
        });
    }

    updateHtmlLang() {
        document.documentElement.lang = this.currentLang;
    }

    initLanguageSwitcher() {
        const languageBtn = document.getElementById('languageBtn');
        const languageDropdown = document.getElementById('languageDropdown');
        
        if (languageBtn && languageDropdown) {
            // Toggle dropdown
            languageBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isExpanded = languageBtn.getAttribute('aria-expanded') === 'true';
                languageBtn.setAttribute('aria-expanded', !isExpanded);
                languageDropdown.classList.toggle('show');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', () => {
                languageBtn.setAttribute('aria-expanded', 'false');
                languageDropdown.classList.remove('show');
            });
            
            // Language option clicks
            const languageOptions = document.querySelectorAll('.language-option');
            languageOptions.forEach(option => {
                option.addEventListener('click', () => {
                    const lang = option.getAttribute('data-lang');
                    this.changeLanguage(lang);
                    
                    // Close dropdown
                    languageBtn.setAttribute('aria-expanded', 'false');
                    languageDropdown.classList.remove('show');
                });
            });
        }
        
        // Update initial UI
        this.updateLanguageSwitcherUI();
    }

    showLanguageNotification(lang) {
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

// Initialize translator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.translator = new Translator();
});

// Add CSS animation for notification
const style = document.createElement('style');
style.textContent = `
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
document.head.appendChild(style);
