// Configuration for local development
// Location-based configuration matching .env file

// Tampa (Location A)
window.VITE_LOCATION_A_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxspnDE6GdPhXML4Hiq03ylzuMT6C-rHV6tn-5gppmkPWn0v64sGyaLi-4XQ_0vxG_T/exec';
window.VITE_LOCATION_A_FOLDER_ID = '1G6TFwfrx0IkGc7aFmwxUQgesjaKywt04wH5ZXRxzKKwePa5_xo36OTY15kBHoc9xZ9XzYbUh';

// St. Petersburg (Location B)
window.VITE_LOCATION_B_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby1qUuPg8svqacqPubKQO5UjlErxSfgGvukRb7g6uzEsnDqSefH6hLuJzrYvOJrWF1MbA/exec';
window.VITE_LOCATION_B_FOLDER_ID = '1-7IKEG1MLave-HXuA4h7hLBRS5A65KhM';

// Jacksonville (Location C)
window.VITE_LOCATION_C_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwLc0mDRVO_ACkeiEryXQjPiyt-B6HdgC-xzPxZ_KcdCepyvuveCtfgQuPueA1b0Q/exec';
window.VITE_LOCATION_C_FOLDER_ID = '1S-xRmLw45EfPfeoIcgz0BFkJN1dNl9Yf';

// Miami (Location D)
window.VITE_LOCATION_D_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz6uHyzW5ZVHEK7ewyDbZjFx7qio3R6jT6uC3d8T7U0bi3zGqPEiC5Qszkw3N7lE_A/exec';
window.VITE_LOCATION_D_FOLDER_ID = '1D1ssBJNVUqkZU04s-wryBZOSZcAs19p6';

// Fallback values (for backward compatibility)
window.GOOGLE_SCRIPT_URL = window.VITE_LOCATION_A_SCRIPT_URL;
window.GOOGLE_FOLDER_ID = window.VITE_LOCATION_A_FOLDER_ID;
