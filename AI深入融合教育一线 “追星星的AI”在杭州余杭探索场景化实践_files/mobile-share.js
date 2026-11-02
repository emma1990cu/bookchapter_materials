/**
 * Mobile Share Toolbar Module
 * Handles mobile share button and bottom share toolbar
 */

(function() {
    'use strict';

    const shareBtn = document.querySelector('.mobile-share-btn');
    const shareToolbar = document.querySelector('.mobile-share-toolbar');
    const shareClose = document.querySelector('.mobile-share-close');
    const body = document.body;

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'mobile-share-overlay';
    body.appendChild(overlay);

    /**
     * Open share toolbar
     */
    function openShare() {
        shareToolbar.classList.add('is-open');
        overlay.classList.add('is-open');
        body.style.overflow = 'hidden';
    }

    /**
     * Close share toolbar
     */
    function closeShare() {
        shareToolbar.classList.remove('is-open');
        overlay.classList.remove('is-open');
        body.style.overflow = '';
    }

    /**
     * Toggle share toolbar
     */
    function toggleShare() {
        if (shareToolbar.classList.contains('is-open')) {
            closeShare();
        } else {
            openShare();
        }
    }

    // Event listeners
    if (shareBtn) {
        shareBtn.addEventListener('click', toggleShare);
    }

    if (shareClose) {
        shareClose.addEventListener('click', closeShare);
    }

    overlay.addEventListener('click', closeShare);

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && shareToolbar.classList.contains('is-open')) {
            closeShare();
        }
    });

    // Handle share option clicks - close toolbar after share action
    if (shareToolbar) {
        shareToolbar.addEventListener('click', function(e) {
            var target = e.target.closest('.mobile-share-option');
            if (target) {
                // Close toolbar after a short delay to let share.js handle the click
                setTimeout(closeShare, 100);
            }
        });
    }

    // Expose functions globally
    window.mobileShare = {
        open: openShare,
        close: closeShare,
        toggle: toggleShare
    };
})();
