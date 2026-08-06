(() => {
    'use strict';

    /* ==================================================================
       REVEAL SYSTEM — IntersectionObserver
       All [data-reveal] elements fade up when scrolled into view.
       Stagger index auto-assigned per parent container.
       ================================================================== */
    function setupRevealObserver() {
        // Auto-assign stagger indices to siblings within containers
        document.querySelectorAll('.exp-list, .proj-grid, .ach-timeline').forEach(container => {
            const children = container.querySelectorAll('[data-reveal]');
            children.forEach((child, i) => {
                child.style.setProperty('--child-i', i);
            });
        });

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('vis');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });

        document.querySelectorAll('[data-reveal], .mask-inner, .hero-line, .sect-h, .edu-entry').forEach(el => {
            observer.observe(el);
        });
    }

    /* ==================================================================
       COUNTER ANIMATION — easeOutExpo, 2s duration
       ================================================================== */
    function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function animateCounter(el) {
        const end = +el.dataset.count;
        const suffix = el.dataset.suffix || '';
        const duration = 2000; // 2s
        const start = performance.now();

        function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutExpo(progress);
            const val = Math.round(eased * end);
            el.textContent = val + (progress >= 1 ? suffix : '');
            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                el.textContent = end + suffix;
                el.closest('.stat-card')?.classList.add('counted');
            }
        }
        requestAnimationFrame(tick);
    }

    function setupCounters() {
        const counterObs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                animateCounter(entry.target);
                counterObs.unobserve(entry.target);
            });
        }, { threshold: 0.4 });

        document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));
    }

    /* ==================================================================
       TIMELINE LINE DRAW — Education & Achievements
       ================================================================== */
    function setupTimelineDraws() {
        const eduLine = document.getElementById('eduLine');
        const achLine = document.getElementById('achLine');

        const lineObs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('drawn');
                    lineObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        if (eduLine) lineObs.observe(eduLine);
        if (achLine) lineObs.observe(achLine);
    }

    /* ==================================================================
       DARK MODE TOGGLE — localStorage persistence
       ================================================================== */
    function setupThemeToggle() {
        const toggle = document.getElementById('themeToggle');
        const html = document.documentElement;
        const stored = localStorage.getItem('theme');

        if (stored) {
            html.setAttribute('data-theme', stored);
        } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            html.setAttribute('data-theme', 'light');
        }

        if (toggle) {
            toggle.addEventListener('click', () => {
                const current = html.getAttribute('data-theme');
                const next = current === 'dark' ? 'light' : 'dark';
                html.setAttribute('data-theme', next);
                localStorage.setItem('theme', next);
            });
        }
    }

    /* ==================================================================
       MOBILE MENU
       ================================================================== */
    function setupMobileMenu() {
        const burger = document.getElementById('burger');
        const mob = document.getElementById('mob');
        if (!burger || !mob) return;

        burger.addEventListener('click', () => {
            burger.classList.toggle('open');
            mob.classList.toggle('show');
        });
        mob.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                burger.classList.remove('open');
                mob.classList.remove('show');
            });
        });
    }

    /* ==================================================================
       SMOOTH SCROLL for anchor links
       ================================================================== */
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                const target = document.querySelector(a.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Close mobile menu if open
                    const mob = document.getElementById('mob');
                    const burger = document.getElementById('burger');
                    if (mob?.classList.contains('show')) {
                        burger?.classList.remove('open');
                        mob.classList.remove('show');
                    }
                }
            });
        });
    }

    /* ==================================================================
       BACK TO TOP
       ================================================================== */
    function setupBackToTop() {
        const btn = document.getElementById('toTop');
        if (btn) btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    /* ==================================================================
       INIT
       ================================================================== */
    setupThemeToggle();
    setupRevealObserver();
    setupCounters();
    setupTimelineDraws();
    setupMobileMenu();
    setupSmoothScroll();
    setupBackToTop();

})();
