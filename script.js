const hero = document.getElementById("hero");
const nav = document.getElementById("mainNav");
const placeholder = document.querySelector(".nav-placeholder");

function updateNav() {
    // Safety check: ensure elements exist to prevent errors
    if (!hero || !nav || !placeholder) return;

    // Calculate height accurately
    const trigger = hero.offsetHeight;

    if (window.scrollY >= trigger) {
        nav.classList.add("sticky");
        placeholder.classList.add("active");
    } else {
        nav.classList.remove("sticky");
        placeholder.classList.remove("active");
    }
}

// Add event listeners with debounce for performance
window.addEventListener("scroll", updateNav, { passive: true });
window.addEventListener("resize", updateNav);

// Use DOMContentLoaded to ensure elements are ready
document.addEventListener("DOMContentLoaded", updateNav);
