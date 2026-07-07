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

    // 2. Hero Content & Line Swapping Logic
    const iconItems = document.querySelectorAll('.icon-item');
    const heroSection = document.querySelector('.hero');
    const heroTitle = document.querySelector('.hero-content h1');
    const heroBtn = document.querySelector('.hero-button');
    const activeLine = document.getElementById("activeLine");

    function moveLine(item) {
        if (!activeLine) return;
        // Use offsetLeft relative to the parent icon-wrapper
        const width = item.offsetWidth;
        const left = item.offsetLeft;
        
        activeLine.style.width = width + "px";
        activeLine.style.left = left + "px";
    }

    iconItems.forEach((item) => {
        const updateHero = () => {
            // Update background image
            heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.4)), url('${item.dataset.image}')`;
            
            // Update Title and Button
            if (heroTitle) heroTitle.innerHTML = item.dataset.title;
            if (heroBtn) heroBtn.innerText = item.dataset.cta;
            
            // Move the line based on the icon element
            moveLine(item);
        };

        item.addEventListener('mouseenter', updateHero);
        
        item.addEventListener('touchstart', (e) => {
            updateHero();
        }, { passive: true }); // Changed to true for better mobile scrolling performance
    });

    // Initialize line on load with a slight delay to ensure layout is calculated
    setTimeout(() => {
        if (iconItems.length > 0) {
            moveLine(iconItems[0]);
        }
    }, 100);
});
