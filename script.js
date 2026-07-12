document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navigation
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

    // 2. Hero Image Swapping Logic
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
    });

    // 3. Featured Card Animation
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

    // 4. Mosaic Initialization
    function initProfessionalMosaic() {
        const grid = document.getElementById('mosaicGrid');
        if (!grid) return;
        const CONFIG = { mainImage: 'man.jpg', cols: 10, rows: 10 };
        for (let i = 0; i < (CONFIG.cols * CONFIG.rows); i++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.style.backgroundImage = `url('${CONFIG.mainImage}')`;
            const col = i % CONFIG.cols;
            const row = Math.floor(i / CONFIG.cols);
            tile.style.backgroundPosition = `${(col / (CONFIG.cols - 1)) * 100}% ${(row / (CONFIG.rows - 1)) * 100}%`;
            grid.appendChild(tile);
        }
        document.querySelectorAll('.tile').forEach((tile, index) => {
            const col = index % CONFIG.cols;
            const row = Math.floor(index / CONFIG.cols);
            setTimeout(() => { tile.classList.add('is-active'); }, (col + row) * 30);
        });
    }
    const mosaicSection = document.getElementById('mosaicSection');
    if (mosaicSection) new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) { initProfessionalMosaic(); }
    }, { threshold: 0.2 }).observe(mosaicSection);

    // 5. Locations Gallery Logic (The Four Seasons Effect)
    const gallery = document.getElementById('locationsGallery');
    const locCards = document.querySelectorAll('.loc-card');

    locCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            locCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            const bg = card.getAttribute('data-bg');
            if (gallery) gallery.style.background = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${bg}') center/cover no-repeat`;
        });
    });
});
