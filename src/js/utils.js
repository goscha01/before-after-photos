/**
 * Utility Functions Module
 * Contains reusable utility functions for modals, canvas operations, etc.
 */

/**
 * Creates a modal overlay with content
 * @param {string} content - HTML content for the modal
 * @param {Object} options - Configuration options
 * @returns {HTMLElement} The created modal element
 */
export function createModal(content, options = {}) {
  const modal = document.createElement('div');
  modal.style.cssText = options.style || `
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.8); z-index: ${options.zIndex || 1000};
    display: flex; align-items: center; justify-content: center;
  `;
  modal.innerHTML = content;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  return modal;
}

/**
 * Closes and removes a modal from the DOM
 * @param {HTMLElement} modal - The modal element to close
 * @param {Object} options - Configuration options
 */
export function closeModal(modal, options = {}) {
  if (modal && modal.parentNode) {
    document.body.removeChild(modal);
  }
  document.body.style.overflow = '';
  if (options.onClose) options.onClose();
}

/**
 * Attaches close handlers to a modal (backdrop click, escape key, close button)
 * @param {HTMLElement} modal - The modal element
 * @param {Function} closeCallback - Callback to execute on close
 * @param {Object} options - Configuration options
 */
export function attachModalCloseHandlers(modal, closeCallback, options = {}) {
  const handleClose = () => {
    closeCallback();
    if (options.onClose) options.onClose();
  };

  // Close button
  if (options.closeButtonId) {
    const closeBtn = document.getElementById(options.closeButtonId);
    if (closeBtn) {
      closeBtn.addEventListener('click', handleClose);
    }
  }

  // Background click to close
  if (options.closeOnBackdrop !== false) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        handleClose();
      }
    });
  }

  // Escape key to close
  if (options.closeOnEscape !== false) {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
  }
}

/**
 * Cleans up existing modals in the DOM
 * @param {number|null} zIndex - Specific z-index to target, or null for all
 * @param {Object} options - Configuration options
 */
export function cleanupExistingModals(zIndex = null, options = {}) {
  const selector = zIndex
    ? `[style*="position: fixed"][style*="z-index: ${zIndex}"]`
    : '[style*="position: fixed"][style*="z-index"]';

  const existingModals = document.querySelectorAll(selector);
  existingModals.forEach(existing => {
    try {
      // Skip if excluded by ID
      if (options.excludeIds && options.excludeIds.some(id => existing.id === id || existing.id.includes(id))) {
        return;
      }

      if (existing.parentNode) {
        if (existing.parentNode === document.body) {
          document.body.removeChild(existing);
        } else {
          existing.parentNode.removeChild(existing);
        }
      }
    } catch (error) {
      // Silently ignore errors during cleanup
    }
  });
}

/**
 * Draws a text label with background on canvas
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {string} text - Text to draw
 * @param {number} canvasWidth - Canvas width
 * @param {number} canvasHeight - Canvas height
 * @param {Object} position - Position configuration
 */
export function drawCanvasLabel(ctx, text, canvasWidth, canvasHeight, position = {}) {
  const labelSize = Math.max(20, Math.floor(canvasWidth / 30));
  ctx.font = `bold ${labelSize}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const pad = labelSize * 0.5;
  const measure = ctx.measureText(text);

  const x = position.x !== undefined ? position.x : pad;
  const y = position.y !== undefined ? position.y : pad;

  const bgWidth = measure.width + pad * 2;
  const bgHeight = labelSize + pad * 1.2;

  // Background rectangle
  ctx.fillStyle = 'rgba(0,0,0,0.8)';
  ctx.fillRect(x, y, bgWidth, bgHeight);

  // Text (centered horizontally and vertically within the background)
  ctx.fillStyle = 'white';
  ctx.fillText(text, x + bgWidth / 2, y + bgHeight / 2);
}

/**
 * Detects photo orientation based on dimensions
 * @param {number} width - Photo width
 * @param {number} height - Photo height
 * @returns {string} 'landscape' or 'portrait'
 */
export function detectPhotoOrientation(width, height) {
  return width > height ? 'landscape' : 'portrait';
}

/**
 * Formats timestamp to readable date string
 * @param {number} timestamp - Unix timestamp
 * @returns {string} Formatted date string
 */
export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}