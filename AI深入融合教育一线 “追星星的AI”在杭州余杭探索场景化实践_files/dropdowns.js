/**
 * Dropdown Menu Module
 * Handles dropdown menu interactions for desktop navigation
 */

(function () {
  'use strict';

  const hasDropdownItems = document.querySelectorAll('.has-dropdown');
  const dropdownDelay = 150;
  let dropdownTimeout = [];

  /**
   * Show dropdown menu
   * @param {HTMLElement} element - The parent li element
   */
  function showDropdown(element) {
    // Clear any pending timeout for this element
    const index = Array.from(hasDropdownItems).indexOf(element);
    if (dropdownTimeout[index]) {
      clearTimeout(dropdownTimeout[index]);
      dropdownTimeout[index] = null;
    }

    // Close other open dropdowns
    hasDropdownItems.forEach(function (item) {
      if (item !== element) {
        item.classList.remove('is-active');
      }
    });

    element.classList.add('is-active');
  }

  /**
   * Hide dropdown menu
   * @param {HTMLElement} element - The parent li element
   */
  function hideDropdown(element) {
    const index = Array.from(hasDropdownItems).indexOf(element);

    // Add delay for better UX
    dropdownTimeout[index] = setTimeout(function () {
      element.classList.remove('is-active');
    }, dropdownDelay);
  }

  /**
   * Initialize dropdown with mouse events
   * @param {HTMLElement} item - Dropdown menu item
   */
  function initDropdown(item) {
    const link = item.querySelector('a');

    // Mouse enter - show dropdown
    item.addEventListener('mouseenter', function () {
      showDropdown(item);
    });

    // Mouse leave - hide dropdown with delay
    item.addEventListener('mouseleave', function () {
      hideDropdown(item);
    });

    // Click to toggle (for touch devices)
    link.addEventListener('click', function (e) {
      // Only prevent default if on touch device or menu is closed
      if (window.matchMedia('(hover: none)').matches || !item.classList.contains('is-active')) {
        e.preventDefault();
        if (item.classList.contains('is-active')) {
          item.classList.remove('is-active');
        } else {
          showDropdown(item);
        }
      }
    });

    // Keyboard navigation
    link.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (item.classList.contains('is-active')) {
          item.classList.remove('is-active');
        } else {
          showDropdown(item);
          // Focus first item in dropdown
          const firstLink = item.querySelector('.dropdown-menu a');
          if (firstLink) {
            setTimeout(() => firstLink.focus(), 100);
          }
        }
      }
    });

    // Handle keyboard navigation within dropdown
    const dropdownLinks = item.querySelectorAll('.dropdown-menu a');
    dropdownLinks.forEach(function (dropdownLink, index) {
      dropdownLink.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          e.preventDefault();
          item.classList.remove('is-active');
          link.focus();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextLink = dropdownLinks[index + 1];
          if (nextLink) nextLink.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prevLink = dropdownLinks[index - 1];
          if (prevLink) {
            prevLink.focus();
          } else {
            link.focus();
          }
        }
      });
    });
  }

  // Initialize all dropdown menus
  hasDropdownItems.forEach(function (item) {
    initDropdown(item);
  });

  // Close all dropdowns when clicking outside
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-dropdown')) {
      hasDropdownItems.forEach(function (item) {
        item.classList.remove('is-active');
      });
    }
  });

  // Close all dropdowns on escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      hasDropdownItems.forEach(function (item) {
        item.classList.remove('is-active');
      });
    }
  });

  // Clear timeout on page unload
  window.addEventListener('beforeunload', function () {
    dropdownTimeout.forEach(function (timeout) {
      if (timeout) clearTimeout(timeout);
    });
  });

  // Expose API
  window.dropdowns = {
    closeAll: function () {
      hasDropdownItems.forEach(function (item) {
        item.classList.remove('is-active');
      });
    },
  };
})();
