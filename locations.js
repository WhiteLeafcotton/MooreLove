document.addEventListener('DOMContentLoaded', () => {

    const wrapper = document.querySelector('.locations-wrapper');
    const sections = document.querySelectorAll('.location-section');
    const tabs = document.querySelectorAll('.nav-tab');

    // Force reveal all elements immediately on load as a fail-safe
    document.querySelectorAll('.plop-item, .connecting-line, .section-title, .section-subtitle').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0) scale(1)';
    });

    // Helper: GSAP Reveal
    function animateSection(section) {
        if (!section || typeof gsap === 'undefined') return;

        const targets = section.querySelectorAll('.connecting-line, .section-title, .section-subtitle, .plop-item');
        
        gsap.fromTo(targets, 
            { opacity: 0, y: -30, scale: 0.97 }, 
            { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: "power2.out", overwrite: "auto" }
        );
    }

    // Tab Navigation
    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const index = parseInt(tab.dataset.section, 10);
            const targetSection = document.getElementById(`section-${index}`);

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            if (targetSection && wrapper) {
                if (typeof gsap !== 'undefined' && gsap.plugins?.scrollTo) {
                    gsap.to(wrapper, {
                        scrollTo: { x: targetSection, autoKill: false },
                        duration: 0.8,
                        ease: "power2.inOut",
                        onComplete: () => animateSection(targetSection)
                    });
                } else {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    animateSection(targetSection);
                }
            }
        });
    });

    // Intersection Observer for swipe / manual horizontal scrolling
    if (wrapper && sections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = entry.target.id.replace('section-', '');
                    
                    tabs.forEach(t => {
                        if (t.dataset.section === index) {
                            t.classList.add('active');
                        } else {
                            t.classList.remove('active');
                        }
                    });

                    animateSection(entry.target);
                }
            });
        }, { root: wrapper, threshold: 0.5 });

        sections.forEach(sec => observer.observe(sec));
    }

});
