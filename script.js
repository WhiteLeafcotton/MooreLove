document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navigation Lgggogic
// 1. Sticky Navigation Logic
const hero = document.getElementById("hero");
const nav = document.getElementById("mainNav");

function updateNav() {
    if (!hero || !nav) return;
    
    // Trigger sticky once the user scrolls past the height of the hero section
    if (window.scrollY >= hero.offsetHeight) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }
}
window.addEventListener("scroll", updateNav, { passive: true });
window.addEventListener("scroll", updateNav, { passive: true });
    // 2. Hero Content & Image Swapping Logic
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

    setTimeout(() => { if (iconItems.length > 0) moveLine(iconItems[0]); }, 100);

    // 3. Slide-Up Masked Reveal Animation for Featured Card
    const observerOptions = { threshold: 0.3 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const title = entry.target.querySelector('.h3-mask h3');
                if (title) title.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const featuredCard = document.querySelector('.featured-card');
    if (featuredCard) observer.observe(featuredCard);

    // 4. Professional High-Density Mosaic Reveal (100 Tiles)
    function initProfessionalMosaic() {
        const grid = document.getElementById('mosaicGrid');
        if (!grid) return;
        
        const CONFIG = { mainImage: 'man.jpg', cols: 10, rows: 10 };
        const totalTiles = CONFIG.cols * CONFIG.rows;
        
        for (let i = 0; i < totalTiles; i++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.style.backgroundImage = `url('${CONFIG.mainImage}')`;
            const col = i % CONFIG.cols;
            const row = Math.floor(i / CONFIG.cols);
            tile.style.backgroundPosition = `${(col / (CONFIG.cols - 1)) * 100}% ${(row / (CONFIG.rows - 1)) * 100}%`;
            grid.appendChild(tile);
        }

        const tiles = document.querySelectorAll('.tile');
        tiles.forEach((tile, index) => {
            const col = index % CONFIG.cols;
            const row = Math.floor(index / CONFIG.cols);
            const delay = (col + row) * 30; 
            setTimeout(() => { tile.classList.add('is-active'); }, delay);
        });
    }

    const mosaicObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            initProfessionalMosaic();
            mosaicObserver.disconnect();
        }
    }, { threshold: 0.2 });

    const section = document.getElementById('mosaicSection');
    if (section) mosaicObserver.observe(section);

  
    // 5. Locations Gallery Logic
   // 5. Locations Gallery Swipe Logic
// 5. Locations Gallery Logic
// 5. Locations Gallery Logic
const gallery = document.getElementById('locationsGallery');
const locCards = document.querySelectorAll('.loc-card');

// Set initial background if a card is active
const activeCard = document.querySelector('.loc-card.active');
if (activeCard) {
    const initialBg = activeCard.getAttribute('data-bg');
    gallery.style.background = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${initialBg}') center/cover no-repeat`;
}

locCards.forEach(card => {
    card.addEventListener('click', () => {
        // 1. Remove active class from all
        locCards.forEach(c => c.classList.remove('active'));
        
        // 2. Add active class to clicked
        card.classList.add('active');
        
        // 3. Update the gallery background
        const bg = card.getAttribute('data-bg');
        if (bg) {
            gallery.style.background = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${bg}') center/cover no-repeat`;
        }
    });
});
