const hero = document.getElementById("hero");
const nav = document.getElementById("mainNav");
const placeholder = document.querySelector(".nav-placeholder");

function updateNav() {
    if (!hero || !nav) return;
    if (window.scrollY >= hero.offsetHeight) {
        nav.classList.add("sticky");
        placeholder.style.display = "block";
    } else {
        nav.classList.remove("sticky");
        placeholder.style.display = "none";
    }
}

function moveLine(percent) {
    const line = document.getElementById("activeLine");
    if (line) line.style.left = percent + "%";
}

window.addEventListener("scroll", updateNav, { passive: true });
