/*==================================================
HBCR Senior Living - JS Functionbbalityd
==================================================*/

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
            // STOP VIDEO: Hide the video element and pause it when interaction happens
            if (heroVideo) {
                heroVideo.style.display = 'none';
                heroVideo.pause();
            }

            // SWITCH IMAGE: Set the background image based on the data-image attribute
            heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.4)), url('${item.dataset.image}')`;
            
            // Update Text
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

    // Initialize line position
    setTimeout(() => { if (iconItems.length > 0) moveLine(iconItems[0]); }, 100);




// 3. Slide-Up Masked Reveal Animation for Featured Card
    const observerOptions = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const title = entry.target.querySelector('.h3-mask h3');
                if (title) {
                    title.classList.add('is-visible');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const featuredCard = document.querySelector('.featured-card');
    if (featuredCard) {
        observer.observe(featuredCard);
    }








document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('mosaicGrid');
    if (!grid) return;

    // Configuration
    const CONFIG = {
        mainImage: 'path/to/your-full-image.jpg',
        flickerImages: ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg'],
        totalTiles: 20
    };

    function initProfessionalMosaic() {
        // Build Tiles
        for (let i = 0; i < CONFIG.totalTiles; i++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            const col = i % 4;
            const row = Math.floor(i / 4);
            
            tile.style.backgroundPosition = `${(col / 3) * 100}% ${(row / 4) * 100}%`;
            grid.appendChild(tile);
        }

        // Elegant Reveal Animation
        const tiles = Array.from(document.querySelectorAll('.tile'));
        
        // Randomize the order of reveal
        const shuffledTiles = [...tiles].sort(() => Math.random() - 0.5);

        shuffledTiles.forEach((tile, index) => {
            setTimeout(() => {
                tile.style.backgroundImage = `url(${CONFIG.mainImage})`;
                tile.classList.add('is-active');
            }, index * 80); // Staggered reveal
        });
    }

    // Intersection Observer for professional scroll-trigger
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            initProfessionalMosaic();
            observer.disconnect();
        }
    }, { threshold: 0.2 });

    const section = document.getElementById('mosaicSection');
    if (section) observer.observe(section);
});

