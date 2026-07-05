const items = document.querySelectorAll('.nav-item');
const hero = document.getElementById('hero');
const bar = document.getElementById('activeBar');
const title = document.getElementById('heroTitle');
const btn = document.getElementById('ctaBtn');
const nav = document.getElementById('footerNav');
const container = document.getElementById('navContainer');

// Toggle sticky state based on hero height
window.addEventListener('scroll', () => {
    if (window.scrollY > hero.offsetHeight) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
});

function updateContent(item) {
    hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${item.getAttribute('data-img')}')`;
    title.innerHTML = item.getAttribute('data-title');
    btn.innerText = item.getAttribute('data-btn');
    
    const itemRect = item.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const itemCenter = itemRect.left + (itemRect.width / 2);
    const containerCenter = containerRect.left + (containerRect.width / 2);
    const offset = itemCenter - containerCenter;
    
    bar.style.left = `calc(50% + ${offset}px - 40px)`; // 40px is half of 80px bar
}

items.forEach(item => {
    item.addEventListener('mouseenter', () => updateContent(item));
});

updateContent(items[0]);
