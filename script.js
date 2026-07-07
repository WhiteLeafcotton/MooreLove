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
