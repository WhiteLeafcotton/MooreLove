const hero = document.getElementById("hero");
const nav = document.getElementById("navWrapper");

window.addEventListener("scroll", () => {

    const heroBottom = hero.getBoundingClientRect().bottom;

    if (heroBottom <= nav.offsetHeight) {

        nav.classList.add("sticky");

    } else {

        nav.classList.remove("sticky");

    }

});
