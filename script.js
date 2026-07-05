const items = document.querySelectorAll('.nav-item');
const hero = document.getElementById('hero');
const bar = document.getElementById('activeBar');
const title = document.getElementById('heroTitle');
const btn = document.getElementById('ctaBtn');
const nav = document.getElementById('footerNav');
const container = document.getElementById('navContainer');

// Bulletproof Sticky Logic
window.addEventListener('scroll', () => {
    // Get the distance from the top of the viewport to the bottom of the hero
    const heroRect = hero.getBoundingClientRect();
    const heroBottom = heroRect.bottom;

    // When the bottom of the hero section reaches the top of the viewport (<= 0)
    if (heroBottom <= 0) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
});

// Bar Position Logic
function updateContent(item) {
    hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${item.getAttribute('data-img')}')`;
    title.innerHTML = item.getAttribute('data-title');
    btn.innerText = item.getAttribute('data-btn');
    
    const itemRect = item.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const itemCenter = itemRect.left + (itemRect.width / 2);
    const containerCenter = containerRect.left + (containerRect.width / 2);
    const offset = itemCenter - containerCenter;
    
    // Bar logic
    const barWidth = 80;
    bar.style.left = `calc(50% + ${offset}px - ${barWidth / 2}px)`;
}

items.forEach(item => {
    item.addEventListener('mouseenter', () => updateContent(item));
});

updateContent(items[0]);
