const hero = document.getElementById("hero");
const nav = document.getElementById("mainNav");
const placeholder = document.querySelector(".nav-placeholder");
const body = document.body;

function updateNav() {

    const trigger = hero.offsetHeight - nav.offsetHeight;

    if (window.scrollY >= trigger) {

        nav.classList.add("sticky");
        placeholder.classList.add("active");
        body.classList.add("nav-active");

    } else {

        nav.classList.remove("sticky");
        placeholder.classList.remove("active");
        body.classList.remove("nav-active");

    }

}

window.addEventListener("scroll", updateNav);
window.addEventListener("resize", updateNav);
window.addEventListener("load", updateNav);
