const navWrapper = document.getElementById('navWrapper');

window.addEventListener('scroll', () => {
    // Pins the navigation once the user scrolls past the full height of the hero
    if (window.scrollY > window.innerHeight) {
        navWrapper.classList.add('pinned');
    } else {
        navWrapper.classList.remove('pinned');
    }
});
