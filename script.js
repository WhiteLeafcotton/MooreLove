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

    // 2. Hero Chjhjontent & Image Swappggging Logic
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
// --- Mosaic Initialization ---






// 5. Locations Gallery Logic (The Four Seasons Effect)
    const gallery = document.getElementById('locationsGallery');
    const locCards = document.querySelectorAll('.loc-card');

    locCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Remove active class from all cards
            locCards.forEach(c => c.classList.remove('active'));
            // Add active class to the hovered card
            card.classList.add('active');
            
            // Update the section background based on the hovered card's data-bg attribute
            const bg = card.getAttribute('data-bg');
            if (gallery && bg) {
                gallery.style.background = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${bg}') center/cover no-repeat`;
            }
        });
    });
