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

    function moveLine(percent) {
        if (activeLine) activeLine.style.left = percent + "%";
    }

    iconItems.forEach((item, index) => {
        // Shared update function for both hover and touch
        const updateHero = () => {
            // Update background image
            heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.4)), url('${item.dataset.image}')`;
            
            // Update Title and Button
            if (heroTitle) heroTitle.innerHTML = item.dataset.title;
            if (heroBtn) heroBtn.innerText = item.dataset.cta;
            
            // Move the indicator line (25% per item for 4 icons)
            moveLine(index * 25);
        };

        // Desktop interaction
        item.addEventListener('mouseenter', updateHero);
        
        // Mobile interaction
        item.addEventListener('touchstart', (e) => {
            e.preventDefault(); 
            updateHero();
        }, { passive: false });
    });
});
