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








  // --- Mosaic Grid Logic ---
const grid = document.getElementById('mosaicGrid');
const mainImage = 'exp.jpg'; 
const randomImages = ['exp.jpg', 'res.jpg', 'com.jpg', 'img4.jpg']; 

function initMosaic() {
    if (!grid) return;
    grid.innerHTML = ''; // Clear to prevent double-loading
    for (let i = 0; i < 20; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        
        // Correct Math for 4x5 Grid:
        // Columns: 4 (index % 4). Spans 0 to 100% in 3 steps: 0, 33.3, 66.6, 100
        // Rows: 5 (Math.floor(i / 4)). Spans 0 to 100% in 4 steps: 0, 25, 50, 75, 100
        const col = i % 4;
        const row = Math.floor(i / 4);
        
        tile.style.backgroundPosition = `${(col / 3) * 100}% ${(row / 4) * 100}%`;
        tile.style.backgroundSize = "400% 500%"; // 4 columns, 5 rows
        
        grid.appendChild(tile);
    }
}

function flicker() {
    const tiles = document.querySelectorAll('.tile');
    let interval = setInterval(() => {
        tiles.forEach(tile => {
            if (Math.random() > 0.7) {
                const randImg = randomImages[Math.floor(Math.random() * randomImages.length)];
                tile.style.backgroundImage = `url(${randImg})`;
            }
        });
    }, 200);

    setTimeout(() => {
        clearInterval(interval);
        tiles.forEach(tile => {
            tile.style.backgroundImage = `url(${mainImage})`;
            tile.style.transition = "background-image 0.5s ease"; // Smooth final transition
        });
    }, 3000);
}

// Separate Observer to avoid conflict with the other one
const mosaicObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        initMosaic();
        flicker();
        mosaicObserver.disconnect();
    }
}, { threshold: 0.3 });

const mosaicSection = document.getElementById('mosaicSection');
if (mosaicSection) mosaicObserver.observe(mosaicSection);

});


