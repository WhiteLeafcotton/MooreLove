document.addEventListener('DOMContentLoaded', () => {

    // Register GSAP Plugins
    if (typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
        gsap.registerPlugin(ScrollToPlugin);
    }

    const wrapper = document.querySelector('.locations-wrapper');
    const sections = document.querySelectorAll('.location-section');
    const tabs = document.querySelectorAll('.nav-tab');

    // ==========================================
    // 1. GSAP "Plopping" Reveal Function
    // ==========================================
    function animateSection(section) {
        if (!section || typeof gsap === 'undefined') return;

        const targets = section.querySelectorAll('.connecting-line, .section-title, .section-subtitle, .plop-item');

        // Reset and play GSAP animation
        gsap.fromTo(targets, 
            { 
                opacity: 0, 
                y: -40, 
                scale: 0.96 
            }, 
            { 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                duration: 0.8, 
                stagger: 0.12, 
                ease: "back.out(1.4)",
                overwrite: "auto"
            }
        );
    }

    // Trigger initial animation for Section 0 on load
    if (sections.length > 0) {
        animateSection(sections[0]);
    }

    // ==========================================
    // 2. Tab Click Navigation & Smooth Scroll
    // ==========================================
    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const index = parseInt(tab.dataset.section, 10);
            const targetSection = document.getElementById(`section-${index}`);

            if (targetSection && wrapper) {
                // Update Active Tab Styling
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Smooth Scroll Container horizontally
                if (typeof gsap !== 'undefined') {
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

    // ==========================================
    // 3. Scroll Snap & Swipe Observer (Tab Auto-Switch)
    // ==========================================
    if (wrapper && sections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    const index = sectionId.replace('section-', '');

                    // Sync active tab state
                    tabs.forEach(t => {
                        if (t.dataset.section === index) {
                            t.classList.add('active');
                        } else {
                            t.classList.remove('active');
                        }
                    });

                    // Play reveal animation
                    animateSection(entry.target);
                }
            });
        }, {
            root: wrapper,
            threshold: 0.6 // Triggers when section is 60% visible
        });

        sections.forEach(section => observer.observe(section));
    }

});
