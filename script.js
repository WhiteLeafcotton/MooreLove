const hero = document.getElementById("hero");
const nav = document.getElementById("navWrapper");

const stickyPoint = hero.offsetHeight - nav.offsetHeight;

window.addEventListener("scroll", () => {

    if (window.scrollY >= stickyPoint) {

        nav.classList.add("sticky");

    } else {

        nav.classList.remove("sticky");

    }

});
