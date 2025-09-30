/**
 * Storage Module
 * Handles localStorage operations for photos and user data
 */

const PHOTOS_STORAGE_KEY = 'cleaning-photos';
const USER_PREFS_STORAGE_KEY = 'user-preferences';
const SETTINGS_STORAGE_KEY = 'app-settings';

/**
 * Loads photos from localStorage
 * @returns {Array} Array of photo objects
 */
export function loadPhotos() {
  const saved = localStorage.getItem(PHOTOS_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Error parsing photos:', e);
      return [];
    }
  }
  return [];
}

/**
 * Saves photos to localStorage
 * @param {Array} photos - Array of photo objects
 */
export function savePhotos(photos) {
  try {
    localStorage.setItem(PHOTOS_STORAGE_KEY, JSON.stringify(photos));
  } catch (e) {
    console.error('Error saving photos:', e);
  }
}

/**
 * Clears all photos from localStorage
 */
export function clearPhotos() {
  localStorage.removeItem(PHOTOS_STORAGE_KEY);
}

/**
 * Gets stored user data (cleaner name, location)
 * @returns {Object} User data object
 */
export function getStoredUserData() {
  const stored = localStorage.getItem(USER_PREFS_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing stored user data:', e);
      return {};
    }
  }
  return {};
}

/**
 * Saves user data to localStorage
 * @param {string} cleaner - Cleaner name
 * @param {string} location - Location/city
 */
export function saveUserData(cleaner, location) {
  const userData = {
    cleaner: cleaner,
    location: location,
    savedAt: Date.now()
  };
  localStorage.setItem(USER_PREFS_STORAGE_KEY, JSON.stringify(userData));
}

/**
 * Clears user data from localStorage
 */
export function clearUserData() {
  localStorage.removeItem(USER_PREFS_STORAGE_KEY);
}

/**
 * Gets user info from URL parameters
 * @returns {Object} Object with cleaner and location
 */
export function getUserFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    cleaner: urlParams.get('cleaner') || '',
    location: urlParams.get('location') || ''
  };
}

/**
 * Updates URL parameters with user info
 * @param {string} cleaner - Cleaner name
 * @param {string} location - Location/city
 */
export function updateURLParams(cleaner, location) {
  const url = new URL(window.location);
  url.searchParams.set('cleaner', cleaner);
  url.searchParams.set('location', location);
  window.history.replaceState({}, '', url);
}

/**
 * Loads app settings from localStorage
 * @returns {Object} Settings object
 */
export function loadSettings() {
  const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Error parsing settings:', e);
      return {};
    }
  }
  return {};
}

/**
 * Saves app settings to localStorage
 * @param {Object} settings - Settings object
 */
export function saveSettings(settings) {
  try {
    const existing = loadSettings();
    const updated = { ...existing, ...settings };
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving settings:', e);
  }
}