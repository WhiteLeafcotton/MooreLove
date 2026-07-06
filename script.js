const navWrapper = document.getElementById('navWrapper');
const hero = document.getElementById('hero');
const heroContent = document.getElementById('heroContent');
const items = document.querySelectorAll('.nav-item');
const bar = document.getElementById('activeBar');

let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Using scrollY directly to trigger pinning
            if (window.scrollY >= hero.offsetHeight) {
                navWrapper.classList.add('fixed-top');
                heroContent.classList.add('faded');
            } else {
                navWrapper.classList.remove('fixed-top');
                heroContent.classList.remove('faded');
            }
            ticking = false;
        });
        ticking = true;
    }
});

function updateContent(item) {
    hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${item.getAttribute('data-img')}')`;
    const offset = item.offsetLeft + (item.offsetWidth / 2) - (bar.offsetWidth / 2);
    bar.style.left = `${offset}px`;
    window.lastActiveItem = item;
}

items.forEach(item => item.addEventListener('mouseenter', () => updateContent(item)));
window.addEventListener('resize', () => { if (window.lastActiveItem) updateContent(window.lastActiveItem); });

// Initialize
updateContent(items[0]);
