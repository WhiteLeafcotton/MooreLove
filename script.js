

const navWrapper = document.getElementById('navWrapper');

window.addEventListener('scroll', () => {
    // Pin only after the hero height is surpassed
    if (window.scrollY > (window.innerHeight * 0.85)) {
        navWrapper.classList.add('pinned');
    } else {
        navWrapper.classList.remove('pinned');
    }
});
