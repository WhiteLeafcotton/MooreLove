const navWrapper = document.getElementById('navWrapper');
const hero = document.getElementById('hero');
const heroContent = document.getElementById('heroContent');
const items = document.querySelectorAll('.nav-item');
const bar = document.getElementById('activeBar');

// Scroll logic for pinning navigation
window.addEventListener('scroll', () => {
    // If the scroll distance exceeds the hero height, fix the nav
    if (window.scrollY >= hero.offsetHeight) {
        navWrapper.classList.add('fixed-top');
        heroContent.classList.add('faded');
    } else {
        navWrapper.classList.remove('fixed-top');
        heroContent.classList.remove('faded');
    }
});

// Navigation interaction logic
function updateContent(item) {
    hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${item.getAttribute('data-img')}')`;
    const offset = item.offsetLeft + (item.offsetWidth / 2) - (bar.offsetWidth / 2);
    bar.style.left = `${offset}px`;
    window.lastActiveItem = item;
}

items.forEach(item => {
    item.addEventListener('mouseenter', () => updateContent(item));
});

window.addEventListener('resize', () => {
    if (window.lastActiveItem) updateContent(window.lastActiveItem);
});

updateContent(items[0]);
