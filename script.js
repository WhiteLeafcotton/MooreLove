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
    // 2. Hero Content & 4444Image Swapping Logic
// ==========================================
// 2. Hero Content & Image Swapping Logic
// ==========================================
const iconItems = document.querySelectorAll('.icon-item');
const heroSection = document.querySelector('.hero');
const heroVideo = document.getElementById('heroVideo');
const heroTitle = document.querySelector('.hero-content h1');
const heroBtn = document.querySelector('.hero-button');
const activeLine = document.getElementById("activeLine");

// 1. The Interaction Function
function updateHeroContent(item) {
    // Hide and pause video ONLY when a user interacts
    if (heroVideo) {
        heroVideo.style.display = 'none';
        heroVideo.pause();
    }
    
    // Update visuals
    heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.4)), url('${item.dataset.image}')`;
    if (heroTitle) heroTitle.innerHTML = item.dataset.title;
    if (heroBtn) heroBtn.innerText = item.dataset.cta;
    
    // Update line position
    if (activeLine) {
        activeLine.style.width = item.offsetWidth + "px";
        activeLine.style.left = item.offsetLeft + "px";
    }
}

// 2. Event Listeners for Interaction
iconItems.forEach((item) => {
    item.addEventListener('mouseenter', () => updateHeroContent(item));
    item.addEventListener('click', (e) => {
        e.preventDefault();
        updateHeroContent(item);
    });
});

// 3. Initialize ONLY the line position on load (Keep the video playing)
setTimeout(() => { 
    if (activeLine && iconItems.length > 0) {
        // Just set the line position to the first item without calling updateHeroContent()
        activeLine.style.width = iconItems[0].offsetWidth + "px";
        activeLine.style.left = iconItems[0].offsetLeft + "px";
    }
}, 100);
  

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



document.addEventListener('DOMContentLoaded', () => {
  const revealSection = document.querySelector('.text-reveal-section');

  if (revealSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve if you only want the sequence to play once upon reveal
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.25 // Triggers when 25% of the section is visible in viewport
    });

    observer.observe(revealSection);
  }
});
