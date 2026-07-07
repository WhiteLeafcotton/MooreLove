/*==================================================
HBCR Senior Living - JS Functionality
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

    // 2. Hero Video & Content Swapping Logic
    const iconItems = document.querySelectorAll('.icon-item');
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
            // Update Video Source
            if (heroVideo && item.dataset.video) {
                heroVideo.src = item.dataset.video;
                heroVideo.load();
                heroVideo.play();
            }
            
            // Update Content
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

    // Initialize line
    setTimeout(() => { if (iconItems.length > 0) moveLine(iconItems[0]); }, 100);
});
