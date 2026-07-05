const items = document.querySelectorAll('.nav-item');
const hero = document.getElementById('hero');
const bar = document.getElementById('activeBar');
const title = document.getElementById('heroTitle');
const btn = document.getElementById('ctaBtn');
const container = document.getElementById('navContainer');

function updateContent(item) {
    // 1. Update background and text
    hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${item.getAttribute('data-img')}')`;
    title.innerHTML = item.getAttribute('data-title');
    btn.innerText = item.getAttribute('data-btn');
    
    // 2. Precise Bar Calculation
    // Get the horizontal center of the hovered item
    const itemRect = item.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // Calculate distance from the container center to the item center
    const itemCenter = itemRect.left + (itemRect.width / 2);
    const containerCenter = containerRect.left + (containerRect.width / 2);
    const offset = itemCenter - containerCenter;
    
    // 3. Move bar: 50% (center of container) + offset - half the bar's width
    const barWidth = 80; 
    bar.style.left = `calc(50% + ${offset}px - ${barWidth / 2}px)`;
}

items.forEach(item => {
    item.addEventListener('mouseenter', () => updateContent(item));
});

// Initialize on load
updateContent(items[0]);
