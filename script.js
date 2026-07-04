const activeBar = document.getElementById('activeBar');
const navItems = document.querySelectorAll('.nav-item');
const hero = document.getElementById('hero');
const BAR_WIDTH = 60;

function moveBar(element) {
    const leftPos = element.offsetLeft + (element.offsetWidth / 2) - (BAR_WIDTH / 2);
    activeBar.style.left = `${leftPos}px`;
}

// Initial Position
window.addEventListener('load', () => moveBar(navItems[0]));

navItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        moveBar(item);
        hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${item.getAttribute('data-img')}')`;
    });
});
