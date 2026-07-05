const items = document.querySelectorAll('.nav-item');
const hero = document.getElementById('hero');
const bar = document.getElementById('activeBar');
const title = document.getElementById('heroTitle');
const btn = document.getElementById('ctaBtn');
const navWrapper = document.getElementById('navWrapper');
const heroContent = document.getElementById('heroContent');
const container = document.getElementById('navContainer');

window.addEventListener('scroll', () => {
    // If scrolled past 100px, trigger sticky mode
    if (window.scrollY > 100) {
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
    
    const itemRect = item.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const offset = (itemRect.left + itemRect.width / 2) - (containerRect.left + containerRect.width / 2);
    
    bar.style.left = `calc(50% + ${offset}px - 40px)`;
}

items.forEach(item => {
    item.addEventListener('mouseenter', () => updateContent(item));
});

updateContent(items[0]);
