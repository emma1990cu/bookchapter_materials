/**
 * Mobile Menu Module
 * Handles hamburger menu toggle and mobile navigation
 */

(function() {
    'use strict';

    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileMenuPanel = document.querySelector('.mobile-menu-panel');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const body = document.body;

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    body.appendChild(overlay);

    /**
     * Open mobile menu
     */
    function openMenu() {
        hamburgerBtn.classList.add('is-open');
        mobileMenuPanel.classList.add('is-open');
        overlay.classList.add('is-open');
        body.classList.add('menu-open');
        body.style.overflow = 'hidden';
    }

    /**
     * Close mobile menu
     */
    function closeMenu() {
        hamburgerBtn.classList.remove('is-open');
        mobileMenuPanel.classList.remove('is-open');
        overlay.classList.remove('is-open');
        body.classList.remove('menu-open');
        body.style.overflow = '';
    }

    /**
     * Toggle mobile menu
     */
    function toggleMenu() {
        if (mobileMenuPanel.classList.contains('is-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // Event listeners
    hamburgerBtn.addEventListener('click', toggleMenu);
    mobileMenuClose.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuPanel.classList.contains('is-open')) {
            closeMenu();
        }
    });

    // Close menu when clicking on nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-list a');
    mobileNavLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });

    // Mobile submenu toggles
    const mobileToggles = document.querySelectorAll('.mobile-nav-toggle');
    mobileToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            parent.classList.toggle('is-open');
        });
    });

    // Expose closeMenu function globally for potential external use
    window.mobileMenu = {
        close: closeMenu,
        open: openMenu,
        toggle: toggleMenu
    };
})();
