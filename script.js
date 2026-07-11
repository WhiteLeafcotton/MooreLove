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

    // 2. Hero Content & Image Swappggging Logic
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
        
        // Configuration for high density
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

        // Trigger animation
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach((tile, index) => {
            const col = index % CONFIG.cols;
            const row = Math.floor(index / CONFIG.cols);
            // Faster stagger for 100 tiles (30ms per tile)
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
});


// 4. High-Density Mosaic Animation
const initMosaic = () => {
    const grid = document.getElementById('mosaicGrid');
    if (!grid || grid.children.length > 0) return;

    const cols = 10;
    const rows = 10;
    
    for (let i = 0; i < cols * rows; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        const col = i % cols;
        const row = Math.floor(i / cols);
        tile.style.backgroundPosition = `${(col / (cols - 1)) * 100}% ${(row / (rows - 1)) * 100}%`;
        grid.appendChild(tile);
    }

    const tiles = grid.querySelectorAll('.tile');
    tiles.forEach((tile, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        setTimeout(() => {
            tile.classList.add('is-active');
        }, (col + row) * 15); // Stagger effect
    });
};

// Intersection Observer to trigger when scrolled into view
const mosaicObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        initMosaic();
        mosaicObserver.disconnect();
    }
}, { threshold: 0.2 });

const mosaicSection = document.getElementById('mosaicSection');
if (mosaicSection) mosaicObserver.observe(mosaicSection);
