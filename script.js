(() => {
    'use strict';

    /* ==================================================================
       CURSOR
       ================================================================== */
    const cur = document.getElementById('cur');
    const ring = document.getElementById('curRing');
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    if (!isTouch && cur && ring) {
        let mx = 0, my = 0, rx = 0, ry = 0;

        document.addEventListener('mousemove', e => {
            mx = e.clientX;
            my = e.clientY;
            cur.style.left = mx + 'px';
            cur.style.top = my + 'px';
        });

        (function tick() {
            rx += (mx - rx) * 0.13;
            ry += (my - ry) * 0.13;
            ring.style.left = rx + 'px';
            ring.style.top = ry + 'px';
            requestAnimationFrame(tick);
        })();

        // hover-expand on interactive elements
        document.querySelectorAll('a, button, .exp, .craft-card, .rec').forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cur-on'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cur-on'));
        });
    }

    /* ==================================================================
       NAV SCROLL
       ================================================================== */
    const nav = document.getElementById('nav');
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                nav.classList.toggle('scrolled', window.scrollY > 60);
                ticking = false;
            });
            ticking = true;
        }
    });

    /* ==================================================================
       MOBILE MENU
       ================================================================== */
    const burger = document.getElementById('burger');
    const mob = document.getElementById('mobMenu');
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
       SCROLL REVEAL (IntersectionObserver)
       ================================================================== */
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('vis');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.anim-in').forEach(el => observer.observe(el));

    /* ==================================================================
       COUNTER ANIMATION
       ================================================================== */
    const counterObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const end = +el.dataset.count;
            const dur = 1400;
            const step = end / (dur / 16);
            let val = 0;
            (function tick() {
                val += step;
                if (val >= end) { el.textContent = end; }
                else { el.textContent = Math.floor(val); requestAnimationFrame(tick); }
            })();
            counterObs.unobserve(el);
        });
    }, { threshold: 0.4 });

    document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

    /* ==================================================================
       SMOOTH ANCHOR SCROLL
       ================================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const t = document.querySelector(a.getAttribute('href'));
            if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        });
    });

    /* ==================================================================
       BACK TO TOP
       ================================================================== */
    const toTop = document.getElementById('toTop');
    if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

})();
