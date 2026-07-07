/*==================================================
HBCR Senior Living - JS Functionality
==================================================*/

// 1. Sticky Navigation Logic
const hero = document.getElementById("hero");
const nav = document.getElementById("mainNav");
const placeholder = document.querySelector(".nav-placeholder");

function updateNav() {
    if (!hero || !nav) return;
    
    // Check if user has scrolled past the hero section
    if (window.scrollY >= hero.offsetHeight) {
        nav.classList.add("sticky");
        if (placeholder) placeholder.style.display = "block";
    } else {
        nav.classList.remove("sticky");
        if (placeholder) placeholder.style.display = "none";
    }
}

// 2. Icon Bar Animation Logic
function moveLine(percent) {
    const line = document.getElementById("activeLine");
    if (line) line.style.left = percent + "%";
}

// Attach scroll event for sticky nav
window.addEventListener("scroll", updateNav, { passive: true });

// Optional: Reset line position when mouse leaves the icon wrapper
const iconWrapper = document.querySelector(".icon-wrapper");
if (iconWrapper) {
    iconWrapper.addEventListener("mouseleave", () => {
        // You can choose to reset to 0 or leave it on the last item
        // moveLine(0); 
    });
}
// 3. Hero Content Swapping Logic
const iconItems = document.querySelectorAll('.icon-item');
const heroSection = document.querySelector('.hero');
const heroTitle = document.querySelector('.hero-content h1');
const heroBtn = document.querySelector('.hero-button');

iconItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
        // 1. Update background image
        heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,.25),rgba(0,0,0,.25)), url(${item.dataset.image})`;
        
        // 2. Update Title and Button
        heroTitle.innerHTML = item.dataset.title;
        heroBtn.innerText = item.dataset.cta;
        
        // 3. Move the indicator line (16.66% per item)
        moveLine(index * 16.66);
    });
});
