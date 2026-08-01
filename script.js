document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Sticky Navigation Logic
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
    // 2. Heavy & Cinematic Image Cross-Fade & Dynamic CTA Routing Logic
    // ==========================================
    // ==========================================
    // 2. Heavy & Cinematic Image Cross-Fade & Dynamic CTA Routing Logic
    // ==========================================
    // ==========================================
    // 2. Heavy & Cinematic Image Cross-Fade & Dynamic CTA Routing Logic
    // ==========================================
    // ==========================================
    // 2. Heavy & Cinematic Image Cross-Fade & Dynamic CTA Routing Logic
    // ==========================================
    <!-- Interactive Icon Bar (Preview Tabs Only) -->
<div class="icon-bar-container">
    <div class="icon-bar-line">
        <div class="active-line" id="activeLine"></div>
    </div>

    <div class="icon-wrapper">
        <div class="icon-item" data-image="folk.jpg" data-title="ELEVATED <span>LIFESTYLE</span> EXPERIENCES" data-cta="Explore Lifestyle" data-href="lifestyle.html">
            <i data-lucide="footprints"></i>
            <span>Lifestyle</span>
        </div>

        <div class="icon-item" data-image="lifestyle.jpg" data-title="PERSONALIZED <span>WELLNESS</span> CARE" data-cta="Explore Wellness" data-href="wellness.html">
            <i data-lucide="pill"></i>
            <span>Wellness</span>
        </div>

        <div class="icon-item" data-image="chair.jpg" data-title="WARM RESIDENTIAL <span>COMMUNITY</span>" data-cta="Explore Community" data-href="location.html">
            <i data-lucide="house"></i>
            <span>Community</span>
        </div>

        <div class="icon-item" data-image="hand.jpg" data-title="DEDICATED <span>SUPPORT</span> SERVICES" data-cta="Explore Support" data-href="support.html">
            <i data-lucide="hand-heart"></i>
            <span>Support</span>
        </div>
    </div>
</div>
    // ==========================================
    // 3. Featured Card Intersection Observer
    // ==========================================
    const featuredCard = document.querySelector('.featured-card');
    if (featuredCard) {
        const featuredObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    featuredCard.classList.add('is-visible');
                    const title = entry.target.querySelector('h3');
                    if (title) title.classList.add('is-visible');
                    featuredObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });

        featuredObserver.observe(featuredCard);
    }

    // ==========================================
    // 4. Mosaic Grid Reveal Animation
    // ==========================================
    const mosaicGrid = document.getElementById('mosaicGrid');
    const mosaicSection = document.getElementById('mosaicSection');

    if (mosaicSection && mosaicGrid) {
        const mosaicObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const cards = mosaicGrid.querySelectorAll('.tile-card');
                cards.forEach((card, index) => {
                    setTimeout(() => card.classList.add('is-active'), index * 150);
                });
                mosaicObserver.disconnect();
            }
        }, { threshold: 0.2 });

        mosaicObserver.observe(mosaicSection);
    }

    // ==========================================
    // 5. Locations Gallery & Swipe Logic
    // ==========================================
    const gallery = document.getElementById('locationsGallery');
    const locCards = document.querySelectorAll('.loc-card');

    function setActiveCard(card) {
        locCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        const bg = card.getAttribute('data-bg');
        if (gallery && bg) {
            gallery.style.background = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${bg}') center/cover no-repeat`;
        }
    }

    const initialActive = document.querySelector('.loc-card.active');
    if (initialActive) setActiveCard(initialActive);

    locCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'A') {
                e.preventDefault(); 
                setActiveCard(card);

                if (window.innerWidth <= 768) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            }
        });
    });

    let touchStartX = 0;

    gallery?.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    gallery?.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            const activeIndex = Array.from(locCards).findIndex(c => c.classList.contains('active'));

            if (diff > 0 && activeIndex < locCards.length - 1) {
                setActiveCard(locCards[activeIndex + 1]);
                locCards[activeIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } 
            else if (diff < 0 && activeIndex > 0) {
                setActiveCard(locCards[activeIndex - 1]);
                locCards[activeIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, { passive: true });

    // ==========================================
    // 6. Text Reveal Section Animation
    // ==========================================
    const revealTarget = document.querySelector(".message-block");

    if (revealTarget) {
        const textObserverOptions = {
            root: null,
            rootMargin: "0px 0px -15% 0px",
            threshold: 0.15
        };

        const textObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    obs.unobserve(entry.target);
                }
            });
        }, textObserverOptions);

        textObserver.observe(revealTarget);
    }

});
