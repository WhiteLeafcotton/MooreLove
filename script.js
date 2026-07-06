const navWrapper = document.getElementById('navWrapper');

window.addEventListener('scroll', () => {
    // Once the user scrolls past the hero section, lock the nav
    if (window.scrollY > (window.innerHeight * 0.85)) {
        navWrapper.classList.add('pinned');
    } else {
        navWrapper.classList.remove('pinned');
    }
});
