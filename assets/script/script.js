/* ===================================
   NextGen Learning Hub - Main JavaScript
   Author: Whizzkun
   Version: 2.0.0
   Last Updated: 2025-06-09 19:10:01
   =================================== */

   class NextGenApp {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.isLoading = true;
        this.init();
    }

    // ===================================
    // INITIALIZATION
    // ===================================
    
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        console.log('🚀 NextGen Learning Hub - Initializing...');
        
        // Initialize core features
        this.initTheme();
        this.initLoadingScreen();
        this.initNavigation();
        this.initScrollEffects();
        this.initAnimations();
        
        // Initialize page-specific features
        this.initCoursesPage();
        this.initPricingPage();
        this.initContactPage();
        this.initAuthPages();
        
        // Initialize interactive elements
        this.initFAQ();
        this.initModals();
        this.initTooltips();
        
        console.log('✅ NextGen Learning Hub - Initialized successfully!');
    }

    // ===================================
    // THEME MANAGEMENT
    // ===================================
    
    initTheme() {
        // Apply saved theme
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        // Theme toggle button
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
            
            // Update icon based on current theme
            this.updateThemeIcon();
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        
        this.updateThemeIcon();
        
        // Smooth transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);

        console.log(`🎨 Theme switched to: ${this.currentTheme}`);
    }

    updateThemeIcon() {
        const sunIcon = document.querySelector('.sun-icon');
        const moonIcon = document.querySelector('.moon-icon');
        
        if (sunIcon && moonIcon) {
            if (this.currentTheme === 'dark') {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            } else {
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            }
        }
    }

    // ===================================
    // LOADING SCREEN
    // ===================================
    
    initLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        
        if (loadingScreen) {
            // Simulate loading time
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                
                // Remove from DOM after animation
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
                
                this.isLoading = false;
                this.triggerEntranceAnimations();
            }, 1500);
        } else {
            this.isLoading = false;
            this.triggerEntranceAnimations();
        }
    }

    triggerEntranceAnimations() {
        // Animate elements that should appear after loading
        const animatedElements = document.querySelectorAll('.fade-in');
        animatedElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 100);
        });
    }

    // ===================================
    // NAVIGATION
    // ===================================
    
    initNavigation() {
        // Mobile menu toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
                
                // Prevent body scroll when menu is open
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });
        }

        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu) {
                    navMenu.classList.remove('active');
                    navToggle?.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu && navMenu.classList.contains('active')) {
                if (!navMenu.contains(e.target) && !navToggle?.contains(e.target)) {
                    navMenu.classList.remove('active');
                    navToggle?.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });

        // Header scroll effect
        this.initHeaderScroll();
        
        // Active link highlighting
        this.initActiveLinks();
    }

    initHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateHeader = () => {
            const scrollY = window.scrollY;
            
            if (scrollY > 100) {
                header.style.background = this.currentTheme === 'dark' 
                    ? 'rgba(15, 23, 42, 0.98)' 
                    : 'rgba(255, 255, 255, 0.98)';
                header.style.backdropFilter = 'blur(20px)';
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = this.currentTheme === 'dark' 
                    ? 'rgba(15, 23, 42, 0.95)' 
                    : 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }

            // Hide/show header on scroll
            if (scrollY > lastScrollY && scrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScrollY = scrollY;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });
    }

    initActiveLinks() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && (currentPath.includes(href) || 
                (currentPath === '/' && href === '../index.html') ||
                (currentPath.includes('index.html') && href === '../index.html'))) {
                link.classList.add('active');
            }
        });
    }

    // ===================================
    // SCROLL EFFECTS
    // ===================================
    
    initScrollEffects() {
        // Smooth scrolling for anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Intersection Observer for animations
        this.initIntersectionObserver();
    }

    initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements with fade-in class
        const animatedElements = document.querySelectorAll('.fade-in, .feature-card, .course-card, .value-card, .team-member');
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // ===================================
    // ANIMATIONS
    // ===================================
    
    initAnimations() {
        // Progress bar animations
        this.initProgressBars();
        
        // Counter animations
        this.initCounters();
        
        // Parallax effects
        this.initParallax();
    }

    initProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        const animateProgress = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const targetWidth = progressBar.style.width || progressBar.getAttribute('data-width') || '0%';
                    
                    progressBar.style.width = '0%';
                    setTimeout(() => {
                        progressBar.style.width = targetWidth;
                    }, 200);
                    
                    observer.unobserve(progressBar);
                }
            });
        };

        const progressObserver = new IntersectionObserver(animateProgress, {
            threshold: 0.5
        });

        progressBars.forEach(bar => progressObserver.observe(bar));
    }

    initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                    // Add back any suffix (like %, +, k)
                    const originalText = counter.getAttribute('data-original') || counter.textContent;
                    const suffix = originalText.replace(/[\d,]/g, '');
                    if (suffix) {
                        counter.textContent += suffix;
                    }
                }
            };
            
            updateCounter();
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    if (!counter.hasAttribute('data-animated')) {
                        counter.setAttribute('data-animated', 'true');
                        counter.setAttribute('data-original', counter.textContent);
                        animateCounter(counter);
                    }
                }
            });
        }, { threshold: 0.7 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    initParallax() {
        const parallaxElements = document.querySelectorAll('.hero-background, .floating-elements');
        
        if (parallaxElements.length === 0) return;

        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.5;
                element.style.transform = `translateY(${rate}px)`;
            });
            
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }

    // ===================================
    // COURSES PAGE
    // ===================================
    
    initCoursesPage() {
        // Course filtering
        this.initCourseFilters();
        
        // Course search
        this.initCourseSearch();
        
        // Load more functionality
        this.initLoadMore();
    }

    initCourseFilters() {
        const filterTabs = document.querySelectorAll('.filter-tab');
        const courseCards = document.querySelectorAll('.course-card');
        
        if (filterTabs.length === 0) return;

        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active tab
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const filter = tab.getAttribute('data-filter');
                
                // Filter courses with animation
                courseCards.forEach((card, index) => {
                    const category = card.getAttribute('data-category');
                    const shouldShow = filter === 'all' || category === filter;
                    
                    setTimeout(() => {
                        if (shouldShow) {
                            card.style.display = 'block';
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 50);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    }, index * 50);
                });
                
                console.log(`📚 Filtering courses by: ${filter}`);
            });
        });
    }

    initCourseSearch() {
        const searchInput = document.getElementById('course-search');
        const courseCards = document.querySelectorAll('.course-card');
        
        if (!searchInput) return;

        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            
            searchTimeout = setTimeout(() => {
                const searchTerm = e.target.value.toLowerCase().trim();
                
                courseCards.forEach(card => {
                    const title = card.querySelector('.course-title')?.textContent.toLowerCase() || '';
                    const description = card.querySelector('.course-description')?.textContent.toLowerCase() || '';
                    const shouldShow = title.includes(searchTerm) || description.includes(searchTerm);
                    
                    card.style.display = shouldShow ? 'block' : 'none';
                });
                
                console.log(`🔍 Searching courses for: "${searchTerm}"`);
            }, 300);
        });
    }

    initLoadMore() {
        const loadMoreBtn = document.getElementById('load-more');
        
        if (!loadMoreBtn) return;

        loadMoreBtn.addEventListener('click', () => {
            // Simulate loading more courses
            loadMoreBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12a9 9 0 11-6.219-8.56"/>
                </svg>
                Carregando...
            `;
            
            setTimeout(() => {
                // Reset button
                loadMoreBtn.innerHTML = `
                    Carregar Mais Cursos
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 5v14M5 12h14"/>
                    </svg>
                `;
                
                // Here you would normally load more courses from an API
                console.log('📚 Loading more courses...');
            }, 1000);
        });
    }

    // ===================================
    // PRICING PAGE
    // ===================================
    
    initPricingPage() {
        // Billing toggle (monthly/yearly)
        this.initBillingToggle();
    }

    initBillingToggle() {
        const billingToggle = document.getElementById('billing-toggle');
        const monthlyPrices = document.querySelectorAll('.price-monthly');
        const yearlyPrices = document.querySelectorAll('.price-yearly');
        const yearlyNotes = document.querySelectorAll('.yearly-note');
        
        if (!billingToggle) return;

        billingToggle.addEventListener('click', () => {
            const isYearly = billingToggle.classList.toggle('active');
            
            monthlyPrices.forEach(price => {
                price.classList.toggle('hidden', isYearly);
            });
            
            yearlyPrices.forEach(price => {
                price.classList.toggle('hidden', !isYearly);
            });
            
            yearlyNotes.forEach(note => {
                note.classList.toggle('hidden', !isYearly);
            });
            
            console.log(`💰 Switched to ${isYearly ? 'yearly' : 'monthly'} billing`);
        });
    }

    // ===================================
    // CONTACT PAGE
    // ===================================
    
    initContactPage() {
        // Contact form handling
        this.initContactForm();
    }

    initContactForm() {
        const contactForm = document.getElementById('contact-form');
        
        if (!contactForm) return;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            const successMsg = document.getElementById('form-success');
            const errorMsg = document.getElementById('form-error');
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'flex';
            submitBtn.disabled = true;
            
            // Hide previous messages
            successMsg.classList.add('hidden');
            errorMsg.classList.add('hidden');
            
            try {
                // Simulate form submission
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success message
                successMsg.classList.remove('hidden');
                contactForm.reset();
                
                console.log('📧 Contact form submitted successfully');
                
            } catch (error) {
                // Show error message
                errorMsg.classList.remove('hidden');
                console.error('❌ Contact form submission failed:', error);
            } finally {
                // Reset button state
                btnText.style.display = 'block';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
            }
        });
    }

    // ===================================
    // AUTH PAGES
    // ===================================
    
    initAuthPages() {
        // Password visibility toggle
        this.initPasswordToggle();
        
        // Form validation
        this.initFormValidation();
    }

    initPasswordToggle() {
        const passwordToggles = document.querySelectorAll('.password-toggle');
        
        passwordToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const passwordInput = toggle.parentElement.querySelector('input[type="password"], input[type="text"]');
                const eyeOpen = toggle.querySelector('.eye-open');
                const eyeClosed = toggle.querySelector('.eye-closed');
                
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    eyeOpen.style.display = 'none';
                    eyeClosed.style.display = 'block';
                } else {
                    passwordInput.type = 'password';
                    eyeOpen.style.display = 'block';
                    eyeClosed.style.display = 'none';
                }
            });
        });
    }

    initFormValidation() {
        const forms = document.querySelectorAll('.auth-form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input[required]');
            
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
            
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error
        this.clearFieldError(field);
        
        // Required field validation
        if (!value) {
            isValid = false;
            errorMessage = 'Este campo é obrigatório';
        }
        // Email validation
        else if (type === 'email' && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Email inválido';
        }
        // Password validation
        else if (type === 'password' && value.length < 6) {
            isValid = false;
            errorMessage = 'Senha deve ter pelo menos 6 caracteres';
        }
        
        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }
        
        return isValid;
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentElement.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.color = '#ef4444';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        
        field.parentElement.appendChild(errorElement);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async handleFormSubmit(form) {
        const inputs = form.querySelectorAll('input[required]');
        let isFormValid = true;
        
        // Validate all fields
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            console.log('❌ Form validation failed');
            return;
        }
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const formData = new FormData(form);
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 11-6.219-8.56"/>
            </svg>
            Processando...
        `;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            console.log('✅ Form submitted successfully');
            
            // Redirect or show success message
            if (form.id === 'login-form') {
                window.location.href = '../index.html';
            } else if (form.id === 'register-form') {
                window.location.href = 'login.html';
            }
            
        } catch (error) {
            console.error('❌ Form submission failed:', error);
            
            // Show error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            errorDiv.textContent = 'Erro ao processar solicitação. Tente novamente.';
            form.appendChild(errorDiv);
            
        } finally {
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = form.id === 'login-form' ? 'Entrar' : 'Criar Conta';
        }
    }

    // ===================================
    // FAQ FUNCTIONALITY
    // ===================================
    
    initFAQ() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqId = question.getAttribute('data-faq');
                const answer = document.getElementById(`faq-${faqId}`);
                const isActive = question.classList.contains('active');
                
                // Close all other FAQs
                faqQuestions.forEach(q => {
                    q.classList.remove('active');
                    const answerId = q.getAttribute('data-faq');
                    const answerEl = document.getElementById(`faq-${answerId}`);
                    if (answerEl) {
                        answerEl.classList.remove('active');
                    }
                });
                
                // Toggle current FAQ
                if (!isActive) {
                    question.classList.add('active');
                    if (answer) {
                        answer.classList.add('active');
                    }
                }
                
                console.log(`❓ FAQ ${faqId} ${isActive ? 'closed' : 'opened'}`);
            });
        });
    }

    // ===================================
    // MODALS & TOOLTIPS
    // ===================================
    
    initModals() {
        // Course detail modals
        const courseCards = document.querySelectorAll('.course-card');
        
        courseCards.forEach(card => {
            const detailBtn = card.querySelector('.course-overlay .btn');
            if (detailBtn) {
                detailBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const courseTitle = card.querySelector('.course-title')?.textContent;
                    this.showCourseModal(courseTitle);
                });
            }
        });
    }

    showCourseModal(courseTitle) {
        // Create modal dynamically
        const modal = document.createElement('div');
        modal.className = 'course-modal';
        modal.innerHTML = `
            <div class="modal-backdrop">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>${courseTitle}</h2>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>Detalhes completos do curso ${courseTitle} serão exibidos aqui.</p>
                        <p>Conteúdo programático, instrutor, duração, e mais informações...</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-outline">Fechar</button>
                        <button class="btn btn-primary">Inscrever-se</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add close functionality
        const closeModal = () => {
            modal.remove();
            document.body.style.overflow = '';
        };
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.btn-outline').addEventListener('click', closeModal);
        modal.querySelector('.modal-backdrop').addEventListener('click', (e) => {
            if (e.target === modal.querySelector('.modal-backdrop')) {
                closeModal();
            }
        });
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        console.log(`📋 Opened course modal for: ${courseTitle}`);
    }

    initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => this.showTooltip(e));
            element.addEventListener('mouseleave', () => this.hideTooltip());
        });
    }

    showTooltip(e) {
        const element = e.target;
        const text = element.getAttribute('data-tooltip');
        
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: #1e293b;
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 14px;
            z-index: 1000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s ease;
        `;
        
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const rect = element.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px`;
        
        // Show tooltip
        requestAnimationFrame(() => {
            tooltip.style.opacity = '1';
        });
        
        this.currentTooltip = tooltip;
    }

    hideTooltip() {
        if (this.currentTooltip) {
            this.currentTooltip.style.opacity = '0';
            setTimeout(() => {
                this.currentTooltip?.remove();
                this.currentTooltip = null;
            }, 200);
        }
    }

    // ===================================
    // UTILITY METHODS
    // ===================================
    
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Get current page name
    getCurrentPage() {
        const path = window.location.pathname;
        return path.split('/').pop().replace('.html', '') || 'index';
    }

    // Log user interaction for analytics
    logInteraction(action, details = {}) {
        console.log(`📊 User Interaction: ${action}`, details);
        
        // Here you would send data to your analytics service
        // Example: Google Analytics, Mixpanel, etc.
    }
}

// ===================================
// INITIALIZE APPLICATION
// ===================================

// Initialize the application when script loads
const nextGenApp = new NextGenApp();

// Global error handling
window.addEventListener('error', (e) => {
    console.error('🚨 JavaScript Error:', e.error);
});

// Performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Page loaded in ${loadTime.toFixed(2)}ms`);
});

// Export for external use if needed
window.NextGenApp = NextGenApp;