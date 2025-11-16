/**
 * Smooth Scroll Module
 * Handles smooth scrolling for anchor links
 */

(function() {
    'use strict';

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSmoothScroll);
    } else {
        initSmoothScroll();
    }

    // Export for use in other modules if needed
    window.SmoothScroll = {
        init: initSmoothScroll
    };
})();
