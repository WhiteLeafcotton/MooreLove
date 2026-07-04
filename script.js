const items = document.querySelectorAll('.nav-item');
const hero = document.getElementById('hero');
const bar = document.getElementById('activeBar');
const title = document.getElementById('heroTitle');
const btn = document.getElementById('ctaBtn');

function updateContent(item) {
    hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${item.getAttribute('data-img')}')`;
    title.innerHTML = item.getAttribute('data-title');
    btn.innerText = item.getAttribute('data-btn');
    
    const rect = item.getBoundingClientRect();
    const container = document.getElementById('navContainer').getBoundingClientRect();
    bar.style.left = `${rect.left - container.left + (rect.width/2) - 30}px`;
}

items.forEach(item => {
    item.addEventListener('mouseenter', () => updateContent(item));
});

// Init first state
updateContent(items[0]);
