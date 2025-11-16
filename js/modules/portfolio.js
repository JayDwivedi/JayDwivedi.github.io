/**
 * Portfolio Interactions Module
 * Handles portfolio card interactions and animations
 */

(function() {
    'use strict';

    function initPortfolioCards() {
        const portfolioCards = document.querySelectorAll('.portfolio-card');

        // Build a data-tags attribute from tech list for filtering
        portfolioCards.forEach(card => {
            const techs = Array.from(card.querySelectorAll('.tech')).map(t=>t.textContent.trim().toLowerCase());
            card.dataset.tags = techs.join(' ');

            // click opens modal (unless clicking on an inner link)
            card.addEventListener('click', function(e) {
                if (e.target.tagName === 'A') return;
                openModalForCard(this);
            });
        });

        initFilters(portfolioCards);
    }

    function initFilters(cards) {
        const filterBtns = document.querySelectorAll('.filter-btn');
        if (!filterBtns.length) return;
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b=>b.classList.remove('active'));
                this.classList.add('active');
                const filter = this.dataset.filter;
                applyFilter(filter, cards);
            });
        });
    }

    function applyFilter(filter, cards) {
        cards.forEach(card => {
            if (filter === 'all') {
                card.classList.remove('is-hidden');
                return;
            }
            const tags = card.dataset.tags || '';
            if (tags.includes(filter)) {
                card.classList.remove('is-hidden');
            } else {
                card.classList.add('is-hidden');
            }
        });
    }

    // Modal handling
    const modal = {
        root: null,
        title: null,
        role: null,
        body: null,
        techs: null,
        link: null,
        closeBtn: null
    };

    function initModal() {
        modal.root = document.getElementById('portfolio-modal');
        if (!modal.root) return;
        modal.title = modal.root.querySelector('.modal-title');
        modal.role = modal.root.querySelector('.modal-role');
        modal.body = modal.root.querySelector('.modal-body');
        modal.techs = modal.root.querySelector('.modal-techs');
        modal.link = modal.root.querySelector('.modal-link');
        modal.closeBtn = modal.root.querySelector('.modal-close');

        modal.closeBtn.addEventListener('click', closeModal);
        modal.root.querySelector('.portfolio-modal-backdrop').addEventListener('click', closeModal);
    }

    function openModalForCard(card) {
        initModal();
        if (!modal.root) return;
        modal.title.textContent = card.querySelector('h3') ? card.querySelector('h3').textContent : '';
        modal.role.textContent = card.querySelector('.role') ? card.querySelector('.role').textContent : '';
        modal.body.innerHTML = card.querySelector('.portfolio-card-content p') ? card.querySelector('.portfolio-card-content p').outerHTML : '';
        // techs
        modal.techs.innerHTML = '';
        Array.from(card.querySelectorAll('.tech')).forEach(t => {
            const el = document.createElement('span'); el.className = 'tech'; el.textContent = t.textContent; modal.techs.appendChild(el);
        });
        // link (first anchor in card)
        const a = card.querySelector('a[href]');
        if (a) { modal.link.href = a.href; modal.link.style.display = 'inline-block'; }
        else { modal.link.style.display = 'none'; }

        modal.root.setAttribute('aria-hidden','false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal.root) return;
        modal.root.setAttribute('aria-hidden','true');
        document.body.style.overflow = '';
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPortfolioCards);
    } else {
        initPortfolioCards();
    }

    // Export for use in other modules if needed
    window.PortfolioModule = {
        init: initPortfolioCards
    };
})();
