// Theme Toggle
(function () {
    const STORAGE_KEY = 'portfolio-theme';

    function getPreferredTheme() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }

    // Apply saved theme immediately
    setTheme(getPreferredTheme());

    document.addEventListener('DOMContentLoaded', () => {
        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            toggle.addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-theme');
                setTheme(current === 'dark' ? 'light' : 'dark');
            });
        }

        // Image Carousels
        document.querySelectorAll('.project-carousel').forEach(carousel => {
            const imgs = carousel.querySelectorAll('.carousel-img');
            const dotsContainer = carousel.querySelector('.carousel-dots');
            if (imgs.length <= 1) return;

            // Create dots
            imgs.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', 'Image ' + (i + 1));
                dot.addEventListener('click', () => goTo(i));
                dotsContainer.appendChild(dot);
            });

            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            let current = 0;
            let timer;

            function goTo(index) {
                imgs[current].classList.remove('active');
                dots[current].classList.remove('active');
                current = index;
                imgs[current].classList.add('active');
                dots[current].classList.add('active');
                resetTimer();
            }

            function next() {
                goTo((current + 1) % imgs.length);
            }

            function resetTimer() {
                clearInterval(timer);
                timer = setInterval(next, 4000);
            }

            resetTimer();
        });
    });
})();
