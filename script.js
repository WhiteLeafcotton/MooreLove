const items = document.querySelectorAll('.nav-item');
const hero = document.getElementById('hero');
const bar = document.getElementById('activeBar');
const title = document.getElementById('heroTitle');
const btn = document.getElementById('ctaBtn');
const navWrapper = document.getElementById('navWrapper');
const heroContent = document.getElementById('heroContent');
const container = document.getElementById('navContainer');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navWrapper.classList.add('fixed-top');
        heroContent.classList.add('faded');
    } else {
        navWrapper.classList.remove('fixed-top');
        heroContent.classList.remove('faded');
    }
});

function updateContent(item) {
    hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${item.getAttribute('data-img')}')`;
    title.innerHTML = item.getAttribute('data-title');
    btn.innerText = item.getAttribute('data-btn');
    
    // Position active bar
    const itemRect = item.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const offset = item.offsetLeft + (item.offsetWidth / 2) - (bar.offsetWidth / 2);
    bar.style.left = `${offset}px`;
}

items.forEach(item => {
    item.addEventListener('mouseenter', () => updateContent(item));
});

updateContent(items[0]);
