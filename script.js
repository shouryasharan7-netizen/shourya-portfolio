(() => {
    'use strict';

    /* ==================================================================
       SCROLL-DRIVEN HERO (like yashvibe.codes)
       500vh scroll space controls:
       - Phase 1 (0-20%): intro visible
       - Phase 2 (20-100%): intro fades, words scroll horizontally
         and reveal with liquid blur-to-sharp transition
       ================================================================== */
    const hero = document.querySelector('.hero');
    const heroIntro = document.getElementById('heroIntro');
    const heroWords = document.getElementById('heroWords');
    const slides = document.querySelectorAll('.hero-slide-word');
    const liquidFilter = document.querySelector('#liquid feDisplacementMap');
    const blurFilter = document.querySelector('#liquid feGaussianBlur');
    const totalSlides = slides.length;

    function handleHeroScroll() {
        if (!hero) return;
        const rect = hero.getBoundingClientRect();
        const heroH = hero.offsetHeight;
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / (heroH - window.innerHeight)));

        // Phase 1: intro visible (0-15%)
        const introEnd = 0.15;
        if (progress <= introEnd) {
            heroIntro.style.opacity = 1;
            heroWords.style.opacity = 0;
            slides.forEach(s => s.classList.remove('revealed'));
        }
        // Transition zone (15-25%)
        else if (progress <= 0.25) {
            const t = (progress - introEnd) / 0.1;
            heroIntro.style.opacity = 1 - t;
            heroWords.style.opacity = t;
        }
        // Phase 2: horizontal word scroll (25-95%)
        else {
            heroIntro.style.opacity = 0;
            heroWords.style.opacity = 1;

            const wordProgress = (progress - 0.25) / 0.7; // 0 to 1 across word zone
            const translateX = wordProgress * totalSlides * 100; // % of one slide width
            heroWords.style.transform = `translateX(-${Math.min(translateX, (totalSlides - 1) * 100)}vw)`;

            // Determine which slide is active and reveal it
            const activeIndex = Math.min(Math.floor(wordProgress * totalSlides), totalSlides - 1);
            slides.forEach((s, i) => {
                if (i <= activeIndex) {
                    s.classList.add('revealed');
                } else {
                    s.classList.remove('revealed');
                }
            });

            // Animate SVG liquid filter based on scroll speed
            const displacement = Math.sin(wordProgress * Math.PI * 4) * 8;
            const blur = Math.max(0, (1 - Math.abs(wordProgress * totalSlides - activeIndex - 0.5) * 3)) * 2;
            if (liquidFilter) liquidFilter.setAttribute('scale', displacement);
            if (blurFilter) blurFilter.setAttribute('stdDeviation', blur);
        }
    }

    // Use passive scroll for performance
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                handleHeroScroll();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });
    handleHeroScroll(); // init

    /* ==================================================================
       NAV SCROLL EFFECT
       ================================================================== */
    const nav = document.getElementById('nav');
    // Nav becomes slightly more compact on scroll (already handled by backdrop)

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
       SCROLL REVEAL
       ================================================================== */
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('vis');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.anim').forEach(el => observer.observe(el));

    /* ==================================================================
       COUNTER ANIMATION
       ================================================================== */
    const counterObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const end = +el.dataset.count;
            const dur = 1200;
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
       SMOOTH SCROLL
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
