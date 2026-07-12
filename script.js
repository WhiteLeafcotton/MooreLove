document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navigation Logic
    const hero = document.getElementById("hero");
    const nav = document.getElementById("mainNav");
    const placeholder = document.querySelector(".nav-placeholder");

    function updateNav() {
        if (!hero || !nav) return;
        if (window.scrollY >= hero.offsetHeight) {
            nav.classList.add("sticky");
            if (placeholder) placeholder.style.display = "block";
        } else {
            nav.classList.remove("sticky");
            if (placeholder) placeholder.style.display = "none";
        }
    }
    window.addEventListener("scroll", updateNav, { passive: true });

    // 2. Hero Content Logic
    const iconItems = document.querySelectorAll('.icon-item');
    const heroSection = document.querySelector('.hero');
    const heroVideo = document.getElementById('heroVideo');
    const heroTitle = document.querySelector('.hero-content h1');
    const heroBtn = document.querySelector('.hero-button');
    const activeLine = document.getElementById("activeLine");

    function moveLine(item) {
        if (!activeLine) return;
        activeLine.style.width = item.offsetWidth + "px";
        activeLine.style.left = item.offsetLeft + "px";
    }

    iconItems.forEach((item) => {
        const updateHero = () => {
            if (heroVideo) {
                heroVideo.style.display = 'none';
                heroVideo.pause();
            }
            heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.4)), url('${item.dataset.image}')`;
            if (heroTitle) heroTitle.innerHTML = item.dataset.title;
            if (heroBtn) heroBtn.innerText = item.dataset.cta;
            moveLine(item);
        };
        item.addEventListener('mouseenter', updateHero);
        item.addEventListener('touchstart', (e) => {
            e.preventDefault();
            updateHero();
        }, { passive: false });
    });

    // 3. Featured Card Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const title = entry.target.querySelector('.h3-mask h3');
                if (title) title.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const featuredCard = document.querySelector('.featured-card');
    if (featuredCard) observer.observe(featuredCard);

    // 4. Locations Gallery (Accordion Expansion)
    const locCards = document.querySelectorAll('.loc-card');
    locCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            locCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });
});
