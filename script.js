/* =============================================
   RAM SEWAK SHARMA — PORTFOLIO SCRIPTS (v2)
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Typing Animation ----------
    const typedTextEl = document.getElementById('typedText');
    const phrases = [
        'Penetration Tester & Ethical Hacker',
        'VAPT Specialist | Bug Hunter',
        'Offensive Security Analyst',
        'Application & Network Penetration Tester',
        'SOC Analyst & Security Researcher',
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
    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-count'));
                    animateCounter(el, target);
                    counterObserver.unobserve(el);
                }
            });
        },
        { threshold: 0.5 }
    );

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(el, target) {
        let current = 0;
        const increment = target / 50;
        const stepTime = 30;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current);
        }, stepTime);
    }

    // ---------- Hero Particles ----------
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${8 + Math.random() * 12}s`;
            particle.style.animationDelay = `${Math.random() * 10}s`;
            const size = 2 + Math.random() * 4;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.opacity = `${0.15 + Math.random() * 0.25}`;
            particlesContainer.appendChild(particle);
        }
    }

    // ---------- Subtle Cyber Matrix Rain Animation ----------
    const matrixCanvas = document.getElementById('heroMatrix');
    if (matrixCanvas) {
        const ctx = matrixCanvas.getContext('2d');
        let width = (matrixCanvas.width = matrixCanvas.offsetWidth || window.innerWidth);
        let height = (matrixCanvas.height = matrixCanvas.offsetHeight || 700);

        function resizeMatrix() {
            if (!matrixCanvas) return;
            width = matrixCanvas.width = matrixCanvas.offsetWidth || window.innerWidth;
            height = matrixCanvas.height = matrixCanvas.offsetHeight || 700;
        }

        window.addEventListener('resize', resizeMatrix);

        const chars = '011001010101010110010101ABCDEF0123456789<>/_[]{}!#*+=-';
        const fontSize = 13;
        let columns = Math.floor(width / fontSize);
        let drops = Array(columns).fill(1);

        function drawMatrix() {
            ctx.fillStyle = 'rgba(248, 250, 252, 0.08)';
            ctx.fillRect(0, 0, width, height);

            ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Subtle cyber colors (blue/cyan with rare bright highlight)
                const rand = Math.random();
                if (rand > 0.90) {
                    ctx.fillStyle = '#06b6d4'; // Cyan
                } else if (rand > 0.80) {
                    ctx.fillStyle = '#10b981'; // Emerald
                } else {
                    ctx.fillStyle = 'rgba(37, 99, 235, 0.7)'; // Primary blue
                }

                const char = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(char, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        let matrixInterval = setInterval(drawMatrix, 50);

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(matrixInterval);
            } else {
                matrixInterval = setInterval(drawMatrix, 50);
            }
        });
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

    // ---------- Initial scroll handler call ----------
    handleScroll();
});
