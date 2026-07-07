const hero = document.getElementById("hero");
const nav = document.getElementById("mainNav");
const placeholder = document.querySelector(".nav-placeholder");

function updateNav() {
    // The nav now sticks exactly when the hero scrolls out of view
    const trigger = hero.offsetHeight;

    if (window.scrollY >= trigger) {
        nav.classList.add("sticky");
        placeholder.classList.add("active");
    } else {
        nav.classList.remove("sticky");
        placeholder.classList.remove("active");
    }
}

window.addEventListener("scroll", updateNav);
window.addEventListener("resize", updateNav);
window.addEventListener("load", updateNav);
