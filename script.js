document.addEventListener('DOMContentLoaded', () => {

    // 1. Stickyee Navigation Logic
    const hero = document.getElementById("hero");
    const nav = document.getElementById("mainNav");

    function updateNav() {
        if (!hero || !nav) return;
        // Use pageYOffset for better compatibility
        if (window.scrollY >= hero.offsetHeight) {
            nav.classList.add("sticky");
        } else {
            nav.classList.remove("sticky");
        }
    }
    window.addEventListener("scroll", updateNav, { passive: true });

    // 2. Hero Content & Image Swapping Logic
    const iconItems = document.querySelectorAll('.icon-item');
    const heroSection = document.querySelector('.hero');
    const heroVideo = document.getElementById('heroVideo');
    const heroTitle = document.querySelector('.hero-content h1');
    const heroBtn = document.querySelector('.hero-button');
    const activeLine = document.getElementById("activeLine");

    function moveLine(item) {
        if (!activeLine) return;
        activeLine.style.width = item.offsetWidth + "px";
        activeLine.style.left = item.offsetLeft + "px";
    }

    iconItems.forEach((item) => {
        item.addEventListener('mouseenter', () => {
            if (heroVideo) {
                heroVideo.style.display = 'none';
                heroVideo.pause();
            }
            heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.4)), url('${item.dataset.image}')`;
            if (heroTitle) heroTitle.innerHTML = item.dataset.title;
            if (heroBtn) heroBtn.innerText = item.dataset.cta;
            moveLine(item);
        });
    });

    setTimeout(() => { if (iconItems.length > 0) moveLine(iconItems[0]); }, 100);

    // 3. Slide-Up Masked Reveal Animation for Featured Card
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const title = entry.target.querySelector('.h3-mask h3');
                if (title) title.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const featuredCard = document.querySelector('.featured-card');
    if (featuredCard) observer.observe(featuredCard);

    // 4. Professional High-Density Mosaic Reveal
    const mosaicGrid = document.getElementById('mosaicGrid');
    const mosaicObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            const cards = mosaicGrid.querySelectorAll('.tile-card');
            cards.forEach((card, index) => {
                setTimeout(() => card.classList.add('is-active'), index * 150);
            });
            mosaicObserver.disconnect();
        }
    }, { threshold: 0.2 });

    const mosaicSection = document.getElementById('mosaicSection');
    if (mosaicSection) mosaicObserver.observe(mosaicSection);

    // 5. Locations Gallery Logic
   // 5. Locations Gallery & Swipe Logic
// 5. Locations Gallery Logic
const gallery = document.getElementById('locationsGallery');
const locCards = document.querySelectorAll('.loc-card');

// Efficiently activate card
const activateCard = (card) => {
    locCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    const bg = card.getAttribute('data-bg');
    if (gallery && bg) {
        gallery.style.background = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${bg}') center/cover no-repeat`;
    }
};

// Use pointerdown (faster than click for mobile)
locCards.forEach(card => {
    card.addEventListener('pointerdown', (e) => {
        activateCard(card);
        // Smoothly snap the clicked card to center
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
});

// Auto-detect which card is centered while scrolling (The "Native" Swipe)
const observerOptions = {
    root: gallery,
    threshold: 0.6 // Card must be 60% visible to be considered "active"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            activateCard(entry.target);
        }
    });
}, observerOptions);

locCards.forEach(card => observer.observe(card));
