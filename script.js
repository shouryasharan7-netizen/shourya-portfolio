(() => {
    'use strict';

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ==================================================================
       1. SMOOTH SCROLL (LENIS)
       ================================================================== */
    let lenis;
    if (!prefersReducedMotion) {
        lenis = new Lenis({
            lerp: 0.1,
            smoothWheel: true
        });

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
    }

    /* ==================================================================
       2. SCROLL VELOCITY SKEW
       ================================================================== */
    if (!prefersReducedMotion) {
        const velocityWrap = document.getElementById('velocityWrap');
        if (velocityWrap) {
            // Use quickTo for performant style updates
            const skewSetter = gsap.quickTo(velocityWrap, "skewY", { ease: "power3", duration: 0.5 });
            
            if (lenis) {
                lenis.on('scroll', (e) => {
                    // clamp(velocity * 0.001, -2, 2)
                    let skew = e.velocity * 0.001;
                    skew = Math.max(-2, Math.min(2, skew));
                    skewSetter(skew);
                });
            }
        }
    }

    /* ==================================================================
       3. CUSTOM CURSOR
       ================================================================== */
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    
    if (!prefersReducedMotion && cursorDot && cursorRing && window.matchMedia("(pointer: fine)").matches) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        
        let dotX = mouseX; let dotY = mouseY;
        let ringX = mouseX; let ringY = mouseY;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Use requestAnimationFrame for lerping
        function renderCursor() {
            // lerp 0.15 for slight lag
            dotX += (mouseX - dotX) * 0.8; 
            dotY += (mouseY - dotY) * 0.8;
            
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            
            cursorDot.style.transform = `translate(-50%, -50%) translate3d(${dotX}px, ${dotY}px, 0)`;
            cursorRing.style.transform = `translate(-50%, -50%) translate3d(${ringX}px, ${ringY}px, 0)`;
            
            requestAnimationFrame(renderCursor);
        }
        requestAnimationFrame(renderCursor);

        // Hover states
        const interactiveElements = document.querySelectorAll('a, button, [data-magnetic]');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
        });
    }

    /* ==================================================================
       4. PARTICLE NETWORK CANVAS
       ================================================================== */
    const canvas = document.getElementById('particleCanvas');
    if (canvas && !prefersReducedMotion) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let mouse = { x: -1000, y: -1000 };

        function initCanvas() {
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
        }
        
        window.addEventListener('resize', () => {
            initCanvas();
            createParticles();
        });

        // Track mouse in canvas space
        canvas.parentElement.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        canvas.parentElement.addEventListener('mouseleave', () => {
            mouse.x = -1000; mouse.y = -1000;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = 1.5;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Repel from cursor
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    const force = (100 - dist) / 100;
                    this.x -= (dx / dist) * force * 5; // strength 0.5 * multiplier
                    this.y -= (dy / dist) * force * 5;
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                const theme = document.documentElement.getAttribute('data-theme');
                ctx.fillStyle = theme === 'light' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.3)';
                ctx.fill();
            }
        }

        function createParticles() {
            particles = [];
            for (let i = 0; i < 60; i++) particles.push(new Particle());
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);
            
            // Draw lines
            const theme = document.documentElement.getAttribute('data-theme');
            ctx.strokeStyle = theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)';
            ctx.lineWidth = 1;
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = dx * dx + dy * dy;
                    if (dist < 14400) { // 120px squared
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateCanvas);
        }

        initCanvas();
        createParticles();
        animateCanvas();
    }

    /* ==================================================================
       5. TEXT DECODE EFFECT
       ================================================================== */
    const decodeEl = document.getElementById('heroDecodeText');
    if (decodeEl && !prefersReducedMotion) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        const originalText = decodeEl.textContent;
        decodeEl.textContent = '';
        decodeEl.style.opacity = 1; // Reveal element

        const letters = originalText.split('').map((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            // Preserve spaces but allow wrapping
            if (char === ' ') {
                span.style.whiteSpace = 'pre-wrap';
            }
            decodeEl.appendChild(span);
            return { el: span, char: char, isSpace: char === ' ' };
        });

        // Delay start slightly
        setTimeout(() => {
            letters.forEach((item, index) => {
                if (item.isSpace) return;
                
                // Random characters for 400ms staggered
                let cycles = 0;
                const staggerDelay = index * 15; // 15ms stagger per char
                
                setTimeout(() => {
                    const interval = setInterval(() => {
                        item.el.textContent = chars[Math.floor(Math.random() * chars.length)];
                        cycles++;
                        if (cycles > 10) { // ~400ms at roughly 30ms per cycle
                            clearInterval(interval);
                            item.el.textContent = item.char;
                            item.el.style.fontFamily = 'var(--body)'; // Switch back from mono
                        }
                    }, 30);
                }, staggerDelay);
            });
            
            // Fade in meta after decode finishes
            setTimeout(() => {
                document.querySelectorAll('.hero-meta, .hero-scroll').forEach(el => el.classList.add('vis'));
            }, letters.length * 15 + 400 + 200);
            
        }, 300);
    } else if (decodeEl) {
        // Fallback for reduced motion
        decodeEl.style.opacity = 1;
        document.querySelectorAll('.hero-meta, .hero-scroll').forEach(el => el.classList.add('vis'));
    }

    /* ==================================================================
       6. SECTION REVEALS (GSAP)
       ================================================================== */
    // For headings
    gsap.utils.toArray('.sect-h, .contact-h').forEach(heading => {
        gsap.to(heading, {
            scrollTrigger: {
                trigger: heading,
                start: "top 80%", // trigger when top hits 80% of viewport
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    // We keep the IntersectionObserver for the staggering of cards within containers
    // since the CSS variables --child-i handle stagger beautifully without complex JS logic.
    function setupRevealObserver() {
        // Auto-assign stagger indices
        document.querySelectorAll('.exp-list, .proj-grid, .ach-timeline, .contact-grid').forEach(container => {
            const children = Array.from(container.children).filter(c => c.hasAttribute('data-reveal'));
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
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        // Hero name and initial elements
        document.querySelectorAll('.mask-inner').forEach(el => el.classList.add('vis'));
        setTimeout(() => document.getElementById('heroLine')?.classList.add('vis'), 300);

        // Observe rest
        document.querySelectorAll('[data-reveal]:not(.hero-meta):not(.hero-scroll):not(.sect-h):not(.contact-h)').forEach(el => {
            observer.observe(el);
        });
    }

    /* ==================================================================
       7. STATS COUNTER
       ================================================================== */
    function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function setupCounters() {
        const counterObs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                
                const el = entry.target;
                const end = +el.dataset.count;
                const suffix = el.dataset.suffix || '';
                const duration = 2000;
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
                        el.closest('.stat-card')?.classList.add('counted');
                    }
                }
                requestAnimationFrame(tick);
                counterObs.unobserve(el);
            });
        }, { threshold: 0.4 });

        document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));
    }

    /* ==================================================================
       8. 3D TILT & SPOTLIGHT CARDS
       ================================================================== */
    if (!prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
        const cards = document.querySelectorAll('[data-tilt]');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Spotlight (CSS variables)
                if (card.hasAttribute('data-spotlight')) {
                    card.style.setProperty('--x', `${x}px`);
                    card.style.setProperty('--y', `${y}px`);
                }
                
                // Tilt (max 10deg)
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                
                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    duration: 0.1,
                    ease: "none"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
                
                if (card.hasAttribute('data-spotlight')) {
                    card.style.setProperty('--x', `-1000px`);
                    card.style.setProperty('--y', `-1000px`);
                }
            });
        });
    }

    /* ==================================================================
       9. MAGNETIC ELEMENTS (Spring Physics)
       ================================================================== */
    if (!prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
        const magnetics = document.querySelectorAll('[data-magnetic]');
        
        magnetics.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                // 60px radius check
                const dx = e.clientX - centerX;
                const dy = e.clientY - centerY;
                
                // Spring pull (stiffness 150 handled by GSAP duration/ease)
                gsap.to(el, {
                    x: dx * 0.4,
                    y: dy * 0.4,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            el.addEventListener('mouseleave', () => {
                gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.3)" // bouncy spring back
                });
            });
        });
    }

    /* ==================================================================
       10. ACHIEVEMENTS & EDU TIMELINE DRAW
       ================================================================== */
    // We'll use GSAP ScrollTrigger for precise line drawing tied to scroll
    gsap.utils.toArray('.ach-timeline').forEach(timeline => {
        const line = timeline.querySelector('.ach-line');
        if(line) {
            gsap.to(line, {
                height: "100%",
                ease: "none",
                scrollTrigger: {
                    trigger: timeline,
                    start: "top center",
                    end: "bottom center",
                    scrub: true
                }
            });
        }
    });

    gsap.utils.toArray('.edu-timeline').forEach(timeline => {
        const line = timeline.querySelector('.edu-line');
        if(line) {
            gsap.to(line, {
                height: "100%",
                ease: "none",
                scrollTrigger: {
                    trigger: timeline,
                    start: "top center",
                    end: "bottom center",
                    scrub: true
                }
            });
        }
    });

    // Pop the dots using GSAP when they scroll into view
    gsap.utils.toArray('.ach-dot, .edu-dot').forEach(dot => {
        gsap.to(dot, {
            scale: 1,
            ease: "elastic.out(1, 0.5)",
            duration: 0.8,
            scrollTrigger: {
                trigger: dot,
                start: "top 80%"
            }
        });
    });

    /* ==================================================================
       11. INFINITE MARQUEE
       ================================================================== */
    const marqueeTrack = document.getElementById('marqueeTrack');
    if (marqueeTrack && !prefersReducedMotion) {
        // Speed 30px/sec
        const distance = marqueeTrack.children[0].offsetWidth;
        const duration = distance / 30; 
        
        gsap.to(marqueeTrack, {
            x: -distance,
            duration: duration,
            ease: "none",
            repeat: -1
        });
        
        // Pause on hover
        marqueeTrack.parentElement.addEventListener('mouseenter', () => gsap.getTweensOf(marqueeTrack)[0].pause());
        marqueeTrack.parentElement.addEventListener('mouseleave', () => gsap.getTweensOf(marqueeTrack)[0].play());
    }

    /* ==================================================================
       MISC SETUP (Nav, Theme, Menu)
       ================================================================== */
    // Nav hide on scroll down
    let lastScrollY = window.scrollY;
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 100 && window.scrollY > lastScrollY) {
            nav.classList.add('hidden');
        } else {
            nav.classList.remove('hidden');
        }
        lastScrollY = window.scrollY;
    }, {passive: true});

    // Theme
    function setupThemeToggle() {
        const toggle = document.getElementById('themeToggle');
        const html = document.documentElement;
        
        // Check local storage, default to dark
        const stored = localStorage.getItem('theme');
        if (stored) {
            html.setAttribute('data-theme', stored);
        }
        
        if (toggle) {
            toggle.addEventListener('click', () => {
                const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                html.setAttribute('data-theme', next);
                localStorage.setItem('theme', next);
            });
        }
    }

    // Mobile menu
    function setupMobileMenu() {
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
    }

    setupRevealObserver();
    setupCounters();
    setupThemeToggle();
    setupMobileMenu();

})();
