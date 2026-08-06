(() => {
    'use strict';

    /* ==================================================================
       REVEAL SYSTEM
       Emil Kowalski principles:
       - ease-out (starts fast, slows down)
       - stagger 60ms per item
       - duration < 700ms
       - never animate from scale(0) — we use translateY(20px)
       ================================================================== */
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('vis');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

    // Observe all revealable elements
    document.querySelectorAll('[data-reveal], .mask-inner, .hero-line, .sect-h, .proj, .num-card, .exp, .about-left, .about-right, .contact-h, .contact-grid').forEach(el => {
        observer.observe(el);
    });

    /* ==================================================================
       COUNTER ANIMATION
       Numbers count up when scrolled into view.
       After counting, the card gets .counted class to fill the stroke text.
       ================================================================== */
    const counterObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const end = +el.dataset.count;
            const dur = 1000; // ms
            const start = performance.now();

            function tick(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / dur, 1);
                // ease-out quad
                const eased = 1 - (1 - progress) * (1 - progress);
                const val = Math.round(eased * end);
                el.textContent = val;
                if (progress < 1) {
                    requestAnimationFrame(tick);
                } else {
                    el.textContent = end;
                    // Add counted class to parent card for stroke fill
                    el.closest('.num-card')?.classList.add('counted');
                }
            }
            requestAnimationFrame(tick);
            counterObs.unobserve(el);
        });
    }, { threshold: 0.4 });

    document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

    /* ==================================================================
       MOBILE MENU
       ================================================================== */
    const burger = document.getElementById('burger');
    const mob = document.getElementById('mob');
    if (burger && mob) {
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
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // close mobile menu if open
                if (mob?.classList.contains('show')) {
                    burger.classList.remove('open');
                    mob.classList.remove('show');
                }
            }
        });
    });

    /* ==================================================================
       BACK TO TOP
       ================================================================== */
    const toTop = document.getElementById('toTop');
    if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

})();
