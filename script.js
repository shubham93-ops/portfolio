/* =============================================
   RAM SEWAK SHARMA — PORTFOLIO SCRIPTS (v2)
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Typing Animation ----------
    const typedTextEl = document.getElementById('typedText');
    const phrases = [
        'Penetration Tester & Security Analyst',
        'Vulnerability Assessment & Penetration Testing (VAPT)',
        'Application & Network Security Tester',
        'Ethical Hacker & Security Tool Developer',
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const current = phrases[phraseIndex];
        if (isDeleting) {
            typedTextEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typedTextEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 90;
        }

        if (!isDeleting && charIndex === current.length) {
            typingSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400;
        }

        setTimeout(type, typingSpeed);
    }
    type();

    // ---------- Navbar Scroll Effect ----------
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    function handleScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        updateActiveNavLink();
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Back to top click
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---------- Mobile Navigation ----------
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ---------- Active Nav Link Highlight ----------
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (link) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }

    // ---------- Reveal on Scroll (Intersection Observer) ----------
    const revealElements = document.querySelectorAll('.reveal');
    let revealDelay = 0;

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Calculate stagger delay based on siblings
                    const parent = entry.target.parentElement;
                    const siblings = Array.from(parent.querySelectorAll(':scope > .reveal'));
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.08}s`;
                    
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px',
        }
    );

    revealElements.forEach(el => revealObserver.observe(el));

    // ---------- Counter Animation ----------
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    function animateCounter(el, target) {
        let current = 0;
        const totalDuration = 1200;
        const steps = 35;
        const increment = target / steps;
        const stepTime = totalDuration / steps;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current);
            }
        }, stepTime);
    }

    let countersStarted = false;
    function runCounters() {
        if (countersStarted) return;
        countersStarted = true;
        statNumbers.forEach(el => {
            const target = parseInt(el.getAttribute('data-count'), 10);
            if (!isNaN(target)) {
                animateCounter(el, target);
            }
        });
    }

    // Auto-trigger 300ms after load so the numbers visibly count up from 0 every time!
    setTimeout(runCounters, 300);

    // Also support intersection observer as fallback
    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runCounters();
                    counterObserver.disconnect();
                }
            });
        },
        { threshold: 0.05 }
    );
    statNumbers.forEach(el => counterObserver.observe(el));

    // ---------- Full-Page Ambient Cyber Particles ----------
    const particlesContainer = document.getElementById('globalParticles') || document.getElementById('heroParticles');
    if (particlesContainer) {
        particlesContainer.innerHTML = '';
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            if (i % 3 === 0) {
                particle.classList.add('cyan');
            }
            particle.style.left = `${Math.random() * 100}%`;
            const duration = 9 + Math.random() * 13;
            particle.style.animationDuration = `${duration}s`;
            // Negative delay distributes spots across entire screen instantly on load!
            particle.style.animationDelay = `-${Math.random() * duration}s`;
            const size = 2 + Math.random() * 3.5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.opacity = `${0.25 + Math.random() * 0.45}`;
            particlesContainer.appendChild(particle);
        }
    }

    // ---------- Smooth Scroll for all anchor links ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ---------- Profile Image Fallback ----------
    const profileImg = document.getElementById('profileImg');
    if (profileImg) {
        profileImg.addEventListener('error', () => {
            const parent = profileImg.parentElement;
            parent.style.background = 'linear-gradient(135deg, #2563eb, #06b6d4)';
            parent.style.display = 'flex';
            parent.style.alignItems = 'center';
            parent.style.justifyContent = 'center';

            const initials = document.createElement('span');
            initials.textContent = 'RS';
            initials.style.cssText = 'font-size: 5rem; font-weight: 800; color: white; font-family: Inter, sans-serif;';
            profileImg.replaceWith(initials);
        });
    }

    // ---------- Tilt effect on project cards ----------
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const tiltX = (y - centerY) / centerY * 2;
            const tiltY = (centerX - x) / centerX * 2;
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ---------- FAQ Accordion ----------
    window.toggleFaq = function(btn) {
        if (!btn) return;
        const item = btn.closest('.faq-item');
        if (!item) return;
        const isOpen = item.classList.contains('active');

        // Close all accordion items
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        // Open only if it wasn't open previously
        if (!isOpen) {
            item.classList.add('active');
            btn.setAttribute('aria-expanded', 'true');
        }
    };

    // ---------- Initial scroll handler call ----------
    handleScroll();
});
