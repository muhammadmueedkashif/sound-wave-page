/* Mobile menu toggle */
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        menuToggle.innerHTML = navLinks.classList.contains('open')
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });
    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            navLinks.classList.remove('open');
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });

    /* Color picker for headphone */
    const dots = document.querySelectorAll('.dot');
    const cupLeft = document.getElementById('cupLeft');
    const cupRight = document.getElementById('cupRight');
    const span = document.getElementById('typedColor');

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            dots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            const color = dot.dataset.color;
            cupLeft.setAttribute('fill', color);
            cupRight.setAttribute('fill', color);
            span.style.color = color;
        });
    });

    /* Explore button scrolls to features */
    document.getElementById('exploreBtn').addEventListener('click', () => {
        document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
    });

    /* Reveal feature cards on scroll */
    const cards = document.querySelectorAll('.card');
    const cardObserver = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 120);
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    cards.forEach(c => cardObserver.observe(c));

    /* Animated stat counters */
    const statNums = document.querySelectorAll('.stat-box h2');
    let statsAnimated = false;
    const statsSection = document.getElementById('stats');

    function animateCounters() {
        statNums.forEach(num => {
            const target = +num.dataset.target;
            let current = 0;
            const step = Math.max(1, Math.ceil(target / 80));
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                num.textContent = current.toLocaleString() + (target >= 1000 ? '+' : (num === statNums[2] ? 'H' : ''));
            }, 25);
        });
    }

    const statsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.4 });
    statsObserver.observe(statsSection);

    /* Newsletter form */
    const form = document.getElementById('subscribeForm');
    const emailInput = document.getElementById('emailInput');
    const subMsg = document.getElementById('subMsg');

    form.addEventListener('submit', e => {
        e.preventDefault();
        const email = emailInput.value.trim();
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (valid) {
            subMsg.style.color = '#7CFFB2';
            subMsg.textContent = 'Thanks! You are subscribed.';
            emailInput.value = '';
        } else {
            subMsg.style.color = '#ff6b6b';
            subMsg.textContent = 'Please enter a valid email.';
        }
        setTimeout(() => subMsg.textContent = '', 3000);
    });

    /* Back to top button */
    const backTop = document.getElementById('backTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) backTop.classList.add('show');
        else backTop.classList.remove('show');
    });
    backTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });