/**
 * Navbar Module (side/top responsive)
 * Handles toggling, outside-click close and active link highlighting
 */

(function() {
    'use strict';

    function closeAll() {
        var lists = document.querySelectorAll('#sideNavList');
        lists.forEach(function(l) { l.classList.remove('open'); });
    }

    function initNavbar() {
        var toggle = document.querySelector('.nav-toggle');
        var navList = document.getElementById('sideNavList');
        if (toggle && navList) {
            toggle.addEventListener('click', function() {
                var isOpen = navList.classList.toggle('open');
                toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            });

            // close when clicking outside on small screens
            document.addEventListener('click', function(e) {
                var withinNav = e.target.closest && e.target.closest('.side-nav');
                if (!withinNav && navList.classList.contains('open')) closeAll();
            });
        }

        // Highlight active link on scroll
        var links = document.querySelectorAll('.side-nav .nav-link.js-scroll-trigger');
        var sections = Array.prototype.map.call(links, function(a) {
            var id = a.getAttribute('href');
            return document.querySelector(id);
        }).filter(Boolean);

        function onScroll() {
            var fromTop = window.scrollY + 120;
            var currentIndex = -1;
            sections.forEach(function(sec, i) { if (sec.offsetTop <= fromTop) currentIndex = i; });
            links.forEach(function(l) { l.classList.remove('active'); });
            if (currentIndex >= 0 && links[currentIndex]) links[currentIndex].classList.add('active');
        }

        window.addEventListener('scroll', onScroll);
        onScroll();
    }

    // Collapse/expand side panel logic
    function initCollapse() {
        var sideNav = document.querySelector('.side-nav');
        var collapseBtn = document.querySelector('.side-collapse-btn');
        if (!sideNav || !collapseBtn) return;

        // apply saved state
        try {
            var saved = localStorage.getItem('sideNavCollapsed');
            if (saved === 'true') {
                sideNav.classList.add('collapsed');
            }
        } catch (e) {}

        // ensure icon and aria attributes match state
        var icon = collapseBtn.querySelector('i');
        function applyCollapseAttrs(isCollapsedNow){
            if (icon) {
                icon.classList.toggle('fa-chevron-left', !isCollapsedNow);
                icon.classList.toggle('fa-chevron-right', isCollapsedNow);
            }
            collapseBtn.setAttribute('aria-label', isCollapsedNow ? 'Expand navigation' : 'Collapse navigation');
            collapseBtn.setAttribute('title', isCollapsedNow ? 'Expand navigation' : 'Collapse navigation');
        }

        applyCollapseAttrs(sideNav.classList.contains('collapsed'));

        collapseBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            var isCollapsed = sideNav.classList.toggle('collapsed');
            applyCollapseAttrs(isCollapsed);
            try { localStorage.setItem('sideNavCollapsed', isCollapsed ? 'true' : 'false'); } catch (err) {}
        });
    }

    // Initialize on DOM ready
    function boot(){ initNavbar(); initCollapse(); }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

    // Export for use in other modules
    window.NavbarModule = { init: initNavbar };
})();
