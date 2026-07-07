const hero = document.getElementById("hero");
const nav = document.getElementById("mainNav");
const placeholder = document.querySelector(".nav-placeholder");

function updateNav() {
    // Calculate the point where the hero ends
    const trigger = hero.offsetHeight - nav.offsetHeight;

    if (window.scrollY >= trigger) {
        nav.classList.add("sticky");
        placeholder.classList.add("active");
        // REMOVE body.classList.add("nav-active"); // <--- DELETE THIS LINE
    } else {
        nav.classList.remove("sticky");
        placeholder.classList.remove("active");
        // REMOVE body.classList.remove("nav-active"); // <--- DELETE THIS LINE
    }
}

window.addEventListener("scroll", updateNav);
window.addEventListener("resize", updateNav);
window.addEventListener("load", updateNav);
