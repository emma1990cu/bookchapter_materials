/**
 * Main Entry Point
 * Initializes all modules and global functionality
 */

(function () {
  'use strict';

  // IE Detection
  var isIE = /*@cc_on!@*/false || !!document.documentMode;

  /**
   * Initialize share button interactions
   */
  function initShareButtons() {
    // IE 下简化分享功能
    if (isIE) {
      return;
    }

    const shareButtons = document.querySelectorAll('.share-btn');

    shareButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        // Add animation keyframes
        if (!document.getElementById('toast-animation')) {
          const style = document.createElement('style');
          style.id = 'toast-animation';
          style.textContent = `
                        @keyframes fadeInOut {
                            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
                            20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                            80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
                        }
                    `;
          document.head.appendChild(style);
        }
      });
    });
  }

  /**
   * Smooth scroll for anchor links
   */
  function initSmoothScroll() {
    // IE 不支持 CSS scroll-behavior，使用降级方案
    if (isIE) {
      const anchorLinks = document.querySelectorAll('a[href^="#"]');

      anchorLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
          const href = this.getAttribute('href');

          if (href === '#') {
            e.preventDefault();
            return;
          }

          const target = document.querySelector(href);

          if (target) {
            e.preventDefault();
            // IE 下使用即时滚动
            target.scrollIntoView();
          }
        });
      });
      return;
    }

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip empty anchors
        if (href === '#') {
          e.preventDefault();
          return;
        }

        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
  }

  /**
   * Handle external links
   * Add target="_blank" and rel attributes for security
   */
  function initExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');

    externalLinks.forEach(function (link) {
      if (!link.hasAttribute('target')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  /**
   * Initialize video iframe responsive wrapper
   * Note: Aspect ratio is handled by CSS (aspect-ratio: 16 / 9)
   * IE 下需要动态计算高度
   */
  function initVideoWrappers() {
    // IE 不支持 aspect-ratio，需要动态计算
    if (isIE) {
      const iframes = document.querySelectorAll('.article-body iframe');

      iframes.forEach(function (iframe) {
        // 设置固定高度 16:9 比例
        var width = iframe.offsetWidth;
        var height = Math.round(width * 9 / 16);
        iframe.style.height = height + 'px';
      });

      // 窗口大小改变时重新计算
      window.addEventListener('resize', function () {
        iframes.forEach(function (iframe) {
          var width = iframe.offsetWidth;
          var height = Math.round(width * 9 / 16);
          iframe.style.height = height + 'px';
        });
      });

      return;
    }

    // CSS handles the aspect ratio, no JS needed
    return;
  }

  /**
   * Handle print functionality
   */
  function initPrint() {
    // Add print button if it doesn't exist (optional enhancement)
    window.addEventListener('beforeprint', function () {
      // Hide elements before print
      document.body.classList.add('is-printing');
    });

    window.addEventListener('afterprint', function () {
      document.body.classList.remove('is-printing');
    });
  }

  /**
   * Handle breadcrumb visibility
   * Hide breadcrumb when there's only one node
   */
  function initBreadcrumb() {
    var breadcrumb = document.querySelector('[data-breadcrumb]');
    if (!breadcrumb) return;

    // Count breadcrumb items (links and text spans, excluding separators)
    var items = breadcrumb.querySelectorAll('a, span:not(.breadcrumb-separator)');

    if (items.length <= 1) {
      breadcrumb.classList.add('is-hidden');
    }
  }

  /**
   * Initialize all functionality when DOM is ready
   */
  function init() {
    initShareButtons();
    initSmoothScroll();
    initExternalLinks();
    initVideoWrappers();
    initPrint();
    initBreadcrumb();

    console.log('China Daily News Detail Page - Initialized');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
