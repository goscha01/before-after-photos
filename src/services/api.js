import { APP_CONFIG } from '@utils/constants';

/**
 * Base API service for handling HTTP requests
 */
class ApiService {
  constructor() {
    this.baseUrl = '';
    this.timeout = 30000; // 30 seconds
  }

  /**
   * Create request options with common headers
   */
  createRequestOptions(options = {}) {
    return {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      timeout: this.timeout,
      ...options
    };
  }

  /**
   * Handle fetch with timeout
   */
  async fetchWithTimeout(url, options = {}) {
    const { timeout = this.timeout, ...fetchOptions } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }

      throw error;
    }
  }

  /**
   * Generic GET request
   */
  async get(url, options = {}) {
    try {
      const requestOptions = this.createRequestOptions({
        method: 'GET',
        ...options
      });

      const response = await this.fetchWithTimeout(url, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('GET request failed:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Generic POST request
   */
  async post(url, data, options = {}) {
    try {
      const requestOptions = this.createRequestOptions({
        method: 'POST',
        body: JSON.stringify(data),
        ...options
      });

      const response = await this.fetchWithTimeout(url, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('POST request failed:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Form data POST request (for file uploads)
   */
  async postFormData(url, formData, options = {}) {
    try {
      const requestOptions = {
        method: 'POST',
        body: formData,
        timeout: this.timeout * 2, // Longer timeout for uploads
        ...options
      };

      // Don't set Content-Type header for FormData - browser will set it with boundary
      delete requestOptions.headers?.['Content-Type'];

      const response = await this.fetchWithTimeout(url, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Form data POST request failed:', error);
      throw this.handleError(error);
    }
  }

  /**
   * Handle and normalize errors
   */
  handleError(error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return new Error('Network error - please check your internet connection');
    }

    if (error.message === 'Request timeout') {
      return new Error('Request timed out - please try again');
    }

    if (error.message.includes('HTTP 404')) {
      return new Error('Service not found - please check configuration');
    }

    if (error.message.includes('HTTP 403')) {
      return new Error('Access denied - please check permissions');
    }

    if (error.message.includes('HTTP 500')) {
      return new Error('Server error - please try again later');
    }

    return error;
  }

  /**
   * Health check endpoint
   */
  async healthCheck(url) {
    try {
      const response = await this.fetchWithTimeout(url, {
        method: 'HEAD',
        timeout: 5000 // Quick timeout for health checks
      });

      return response.ok;
    } catch (error) {
      console.warn('Health check failed:', error);
      return false;
    }
  }

  /**
   * Check if online
   */
  isOnline() {
    return navigator.onLine;
  }

  /**
   * Wait for online status
   */
  async waitForOnline(timeout = 30000) {
    return new Promise((resolve, reject) => {
      if (this.isOnline()) {
        resolve(true);
        return;
      }

      const timeoutId = setTimeout(() => {
        window.removeEventListener('online', onlineHandler);
        reject(new Error('Timeout waiting for online status'));
      }, timeout);

      const onlineHandler = () => {
        clearTimeout(timeoutId);
        window.removeEventListener('online', onlineHandler);
        resolve(true);
      };

      window.addEventListener('online', onlineHandler);
    });
  }
}

// Create singleton instance
const apiService = new ApiService();

/**
 * Retry mechanism for failed requests
 */
export const retryRequest = async (requestFn, maxRetries = 3, delay = 1000) => {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;
      console.warn(`Request attempt ${attempt} failed:`, error.message);

      if (attempt < maxRetries) {
        // Wait before retrying, with exponential backoff
        const waitTime = delay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }

  throw lastError;
};

/**
 * Queue for offline requests
 */
class OfflineQueue {
  constructor() {
    this.queue = [];
    this.processing = false;

    // Listen for online events
    window.addEventListener('online', () => {
      this.processQueue();
    });
  }

  /**
   * Add request to offline queue
   */
  add(requestFn, metadata = {}) {
    this.queue.push({
      id: Date.now() + Math.random(),
      requestFn,
      metadata,
      timestamp: new Date().toISOString(),
      attempts: 0
    });

    // Try to process if online
    if (navigator.onLine) {
      this.processQueue();
    }
  }

  /**
   * Process queued requests
   */
  async processQueue() {
    if (this.processing || this.queue.length === 0) return;

    this.processing = true;

    while (this.queue.length > 0 && navigator.onLine) {
      const item = this.queue[0];

      try {
        await item.requestFn();
        this.queue.shift(); // Remove successful request
        console.log('Offline request processed successfully:', item.metadata);
      } catch (error) {
        item.attempts++;
        console.error('Offline request failed:', error.message);

        // Remove after too many attempts
        if (item.attempts >= 3) {
          this.queue.shift();
          console.error('Offline request abandoned after 3 attempts:', item.metadata);
        } else {
          // Move to end of queue for retry
          this.queue.push(this.queue.shift());
        }

        // Break on network errors to avoid spam
        if (!navigator.onLine) break;
      }
    }

    this.processing = false;
  }

  /**
   * Get queue status
   */
  getStatus() {
    return {
      pending: this.queue.length,
      processing: this.processing,
      items: this.queue.map(item => ({
        id: item.id,
        metadata: item.metadata,
        timestamp: item.timestamp,
        attempts: item.attempts
      }))
    };
  }

  /**
   * Clear queue
   */
  clear() {
    this.queue = [];
  }
}

// Create offline queue singleton
export const offlineQueue = new OfflineQueue();

export default apiService;