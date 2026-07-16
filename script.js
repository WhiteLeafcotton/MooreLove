document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Sticky Navigatidddon Logic
    // ==========================================
    const hero = document.getElementById("hero");
    const nav = document.getElementById("mainNav");

    function updateNav() {
        if (!hero || !nav) return;
        if (window.scrollY >= hero.offsetHeight) {
            nav.classList.add("sticky");
        } else {
            nav.classList.remove("sticky");
        }
    }
    window.addEventListener("scroll", updateNav, { passive: true });

    // ==========================================
    // 2. Hero Content & Image Swapping Logic
    // 2. Hero Content & Image Swapping Logic
const iconItems = document.querySelectorAll('.icon-item');
const heroSection = document.querySelector('.hero');
const heroVideo = document.getElementById('heroVideo');
const heroTitle = document.querySelector('.hero-content h1');
const heroBtn = document.querySelector('.hero-button');
const activeLine = document.getElementById("activeLine");

// Reusable function for the interaction
function updateHeroContent(item) {
    if (heroVideo) {
        heroVideo.style.display = 'none';
        heroVideo.pause();
    }
    
    // Update visuals
    heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.4)), url('${item.dataset.image}')`;
    if (heroTitle) heroTitle.innerHTML = item.dataset.title;
    if (heroBtn) heroBtn.innerText = item.dataset.cta;
    
    // Update line
    if (activeLine) {
        activeLine.style.width = item.offsetWidth + "px";
        activeLine.style.left = item.offsetLeft + "px";
    }
}

iconItems.forEach((item) => {
    // For Desktop (Mouse)
    item.addEventListener('mouseenter', () => updateHeroContent(item));
    
    // For Mobile (Touch/Click)
    item.addEventListener('click', (e) => {
        e.preventDefault();
        updateHeroContent(item);
    });
});

// Initialize line position slightly after load
setTimeout(() => { if (iconItems.length > 0) updateHeroContent(iconItems[0]); }, 100);

  

    // ==========================================
    // 3. Featured Card Intersection Observer
    // ==========================================
    const featuredObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const title = entry.target.querySelector('h3');
                if (title) title.classList.add('is-visible');
                featuredObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const featuredCard = document.querySelector('.featured-card');
    if (featuredCard) featuredObserver.observe(featuredCard);

    // ==========================================
    // 4. Mosaic Grid Reveal Animation
    // ==========================================
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
    if (mosaicSection && mosaicGrid) mosaicObserver.observe(mosaicSection);

    // ==========================================
    // 5. Locations Gallery & Swipe Logic
    // ==========================================
    const gallery = document.getElementById('locationsGallery');
    const locCards = document.querySelectorAll('.loc-card');

    function setActiveCard(card) {
        // Remove active class from all
        locCards.forEach(c => c.classList.remove('active'));
        
        // Add active class to target
        card.classList.add('active');
        
        // Update Gallery Background
        const bg = card.getAttribute('data-bg');
        if (gallery && bg) {
            gallery.style.background = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${bg}') center/cover no-repeat`;
        }
    }

    // Set initial background based on the HTML's active card
    const initialActive = document.querySelector('.loc-card.active');
    if (initialActive) setActiveCard(initialActive);

    // Click/Tap Events for Cards
    locCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Ignore click if they click the "VIEW PROPERTY" button so the link still works
            if (e.target.tagName !== 'A') {
                e.preventDefault(); 
                setActiveCard(card);

                // Auto-center the clicked card smoothly on mobile
                if (window.innerWidth <= 768) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            }
        });
    });

    // Swipe Logic for Mobile
    let touchStartX = 0;
    
    gallery?.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    gallery?.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        // Ensure the swipe was intentional (more than 50px of movement)
        if (Math.abs(diff) > 50) {
            const activeIndex = Array.from(locCards).findIndex(c => c.classList.contains('active'));
            
            // Swiped Left (Next Card)
            if (diff > 0 && activeIndex < locCards.length - 1) {
                setActiveCard(locCards[activeIndex + 1]);
                locCards[activeIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } 
            // Swiped Right (Previous Card)
            else if (diff < 0 && activeIndex > 0) {
                setActiveCard(locCards[activeIndex - 1]);
                locCards[activeIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, { passive: true });

});
