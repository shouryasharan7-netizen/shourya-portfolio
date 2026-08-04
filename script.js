(() => {
    'use strict';

    /* ==================================================================
       PRELOADER
       ================================================================== */
    const preloader = document.getElementById('preloader');
    const preloaderProgress = document.getElementById('preloaderProgress');
    const preloaderPct = document.getElementById('preloaderPct');
    let loadProgress = 0;

    const loadInterval = setInterval(() => {
        loadProgress += Math.random() * 12 + 3;
        if (loadProgress >= 100) {
            loadProgress = 100;
            clearInterval(loadInterval);
            setTimeout(() => {
                preloader.classList.add('done');
                document.body.style.overflow = '';
                initRevealAnimations(); // trigger hero reveals after preloader
            }, 400);
        }
        preloaderProgress.style.width = loadProgress + '%';
        preloaderPct.textContent = Math.floor(loadProgress);
    }, 80);

    // Lock scroll during preload
    document.body.style.overflow = 'hidden';

    /* ==================================================================
       CUSTOM CURSOR
       ================================================================== */
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');

    if (cursor && follower) {
        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

        if (!isTouchDevice) {
            let mx = 0, my = 0;
            let fx = 0, fy = 0;

            document.addEventListener('mousemove', (e) => {
                mx = e.clientX;
                my = e.clientY;
                cursor.style.left = mx + 'px';
                cursor.style.top = my + 'px';
            });

            (function animateFollower() {
                fx += (mx - fx) * 0.12;
                fy += (my - fy) * 0.12;
                follower.style.left = fx + 'px';
                follower.style.top = fy + 'px';
                requestAnimationFrame(animateFollower);
            })();

            // Hover state
            const hoverables = document.querySelectorAll('[data-cursor]');
            hoverables.forEach(el => {
                el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
                el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
            });
        }
    }

    /* ==================================================================
       INTERACTIVE GRID CANVAS
       ================================================================== */
    const canvas = document.getElementById('gridCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouseCanvas = { x: -1000, y: -1000 };
        const PARTICLE_COUNT = 80;
        const CONNECTION_DIST = 150;
        const MOUSE_RADIUS = 200;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        document.addEventListener('mousemove', (e) => {
            mouseCanvas.x = e.clientX;
            mouseCanvas.y = e.clientY;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.size = Math.random() * 1.5 + 0.5;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                // Mouse repulsion
                const dx = this.x - mouseCanvas.x;
                const dy = this.y - mouseCanvas.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MOUSE_RADIUS) {
                    const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
                    this.x += (dx / dist) * force * 2;
                    this.y += (dy / dist) * force * 2;
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(167,139,250,0.25)';
                ctx.fill();
            }
        }

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }

        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECTION_DIST) {
                        const opacity = (1 - dist / CONNECTION_DIST) * 0.12;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(167,139,250,${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            drawConnections();
            requestAnimationFrame(animateCanvas);
        }
        animateCanvas();
    }

    /* ==================================================================
       HEADER SCROLL
       ================================================================== */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==================================================================
       MOBILE MENU
       ================================================================== */
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });
        mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                mobileMenu.classList.remove('open');
            });
        });
    }

    /* ==================================================================
       SCROLL REVEAL (Intersection Observer)
       ================================================================== */
    function initRevealAnimations() {
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        reveals.forEach(el => observer.observe(el));
    }

    /* ==================================================================
       COUNTER ANIMATION
       ================================================================== */
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-count'), 10);
                    let current = 0;
                    const duration = 1500;
                    const step = target / (duration / 16);

                    const tick = () => {
                        current += step;
                        if (current >= target) {
                            el.textContent = target;
                        } else {
                            el.textContent = Math.floor(current);
                            requestAnimationFrame(tick);
                        }
                    };
                    tick();
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => counterObserver.observe(c));
    }
    animateCounters();

    /* ==================================================================
       TEXT SCRAMBLE EFFECT
       ================================================================== */
    const chars = '!<>-_\\/[]{}—=+*^?#________';

    function scrambleText(el) {
        const original = el.textContent;
        let iteration = 0;
        const interval = setInterval(() => {
            el.textContent = original
                .split('')
                .map((char, index) => {
                    if (index < iteration) return original[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');
            if (iteration >= original.length) clearInterval(interval);
            iteration += 1 / 2;
        }, 30);
    }

    // Apply scramble on hover for words
    const scrambleWords = document.querySelectorAll('[data-scramble]');
    scrambleWords.forEach(word => {
        word.addEventListener('mouseenter', () => scrambleText(word));
    });

    /* ==================================================================
       BENTO CARD GLOW FOLLOW MOUSE
       ================================================================== */
    const bentoCards = document.querySelectorAll('.bento-card');
    bentoCards.forEach(card => {
        const glow = card.querySelector('.bento-glow');
        if (!glow) return;
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            glow.style.left = x + 'px';
            glow.style.top = y + 'px';
        });
    });

    /* ==================================================================
       PROJECT CARD GLOW FOLLOW MOUSE
       ================================================================== */
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const glow = card.querySelector('.project-glow');
        if (!glow) return;
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            glow.style.left = (e.clientX - rect.left) + 'px';
            glow.style.top = (e.clientY - rect.top) + 'px';
        });
    });

    /* ==================================================================
       SMOOTH SCROLL FOR ANCHOR LINKS
       ================================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ==================================================================
       BACK TO TOP
       ================================================================== */
    const backTop = document.getElementById('backTop');
    if (backTop) {
        backTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

})();
