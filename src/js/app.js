import * as Utils from './utils.js';
import * as Storage from './storage.js';
import * as PhotoEditor from './photoEditor.js';

      class CleaningPhotoApp {
        constructor() {
          this.photos = [];
          this.currentRoom = 'kitchen';
          this.currentTab = 'photo';
          this.isLandscape = false;
          this.currentTemplate = 'default'; // Default template for all photos
          this.currentBeforeZoom = 1; // Initialize default zoom level
          this.currentAspectRatio = '4:3'; // Initialize aspect ratio

          // Load settings from storage
          const settings = Storage.loadSettings();
          this.labelsEnabled = settings.labelsEnabled !== undefined ? settings.labelsEnabled : true; // Toggle for BEFORE/AFTER labels (default: on)

          this.photos = Storage.loadPhotos(); // Load photos from storage
          this.init();
        }
        
        init() {
          // Check if user is signed in (has URL parameters or stored data)
          const urlParams = new URLSearchParams(window.location.search);
          let cleaner = urlParams.get('cleaner');
          let location = urlParams.get('location');
          
          // If no URL params, check localStorage for stored user data
          if (!cleaner || !location) {
            const storedUserData = Storage.getStoredUserData();
            if (storedUserData.cleaner && storedUserData.location) {
              // Auto-login with stored data
              cleaner = storedUserData.cleaner;
              location = storedUserData.location;
              
              // Update URL with stored data (optional - for consistency)
              const newUrl = `${window.location.origin}${window.location.pathname}?cleaner=${encodeURIComponent(cleaner)}&location=${encodeURIComponent(location)}`;
              window.history.replaceState({ cleaner, location }, '', newUrl);
            }
          }
          
          if (!cleaner || !location) {
            // Show sign-in screen
            this.showSignInScreen();
          } else {
            // User is signed in, show main app
            this.showMainApp();
          }
        }

        showMainApp() {
          // Check orientation
          this.checkOrientation();

          // Reassign photo names to ensure proper sequential numbering
          this.reassignPhotoNames();

          const rootElement = document.getElementById('root');
          if (rootElement) {
            rootElement.innerHTML = this.getAppHTML();

            // Verify header was created
            setTimeout(() => {
              const headerUploadBtn = document.getElementById('header-upload-btn');
            }, 10);

            this.attachEventListeners();
            this.updateTabsCarousel(); // Update carousel layout

            // Ensure bottom panel is hidden in gallery mode
            this.hideActionButtons();

            // Ensure room tab listeners are attached with a small delay
            setTimeout(() => {
              this.attachRoomTabListeners();
            }, 50);

            // BACKUP: Also try a more direct approach after a longer delay
            setTimeout(() => {
              document.querySelectorAll('#tabs-carousel .room-tab').forEach((btn, i) => {
                btn.onclick = (e) => {
                  const room = btn.dataset.room;
                  if (room && room !== this.currentRoom) {
                    this.currentRoom = room;
                    this.currentTab = 'photo';
                    const photosContainer = document.getElementById('photos-container');
                    if (photosContainer) {
                      photosContainer.innerHTML = this.getPhotosHTML();
                      this.attachPhotoListeners();
                    }
                    setTimeout(() => {
                      this.updateTabsCarousel();
                    }, 100);
                  }
                };
              });
            }, 200);

            // Auto-scroll to bottom after app initialization
            setTimeout(() => {
              const mainScrollableContent = document.getElementById('main-scrollable-content');
              if (mainScrollableContent) {
                mainScrollableContent.scrollTop = mainScrollableContent.scrollHeight;
              }
            }, 300);
          }
          
          // Listen for orientation changes
          window.addEventListener('orientationchange', () => {
            setTimeout(() => {
              this.checkOrientation();
              this.init();
            }, 100);
          });
          
          window.addEventListener('resize', () => {
            // Update orientation detection
            const wasLandscape = this.isLandscape;
            this.checkOrientation();
            
            // If orientation changed, update grids
            if (wasLandscape !== this.isLandscape) {
              setTimeout(() => {
                this.updateGridsOnOrientationChange();
              }, 100); // Small delay to ensure layout is stable
            }
            
            this.init();
          });

          // Add scroll listener for auto tab switching
          this.addScrollListener();
        }

        showSignInScreen() {
          
          const rootElement = document.getElementById('root');
          if (rootElement) {
            rootElement.innerHTML = this.getSignInHTML();
            this.attachSignInListeners();
            this.populateStoredUserData();
          }
        }

        populateStoredUserData() {
          const storedData = Storage.getStoredUserData();
          if (storedData.cleaner || storedData.location) {
            const nameInput = document.getElementById('signin-name');
            const cityInput = document.getElementById('signin-city');
            const clearDataContainer = document.getElementById('clear-data-container');
            
            if (nameInput && storedData.cleaner) {
              nameInput.value = storedData.cleaner;
            }
            
            if (cityInput && storedData.location) {
              cityInput.value = storedData.location;
            }
            
            // Show the clear data button if we populated any data
            if (clearDataContainer) {
              clearDataContainer.style.display = 'block';
            }
            
            // Add event listener for clear data button
            const clearDataBtn = document.getElementById('clear-data-btn');
            if (clearDataBtn) {
              clearDataBtn.addEventListener('click', () => {
                this.showClearDataWarning(nameInput, cityInput, clearDataContainer);
              });
            }
          }
        }

        getSignInHTML() {
          return `
            <div style="min-height: 100vh; background: #F2C31B; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box; font-family: 'Quicksand', sans-serif;">
              
              <!-- Logo -->
              <div style="margin-bottom: 40px; text-align: center;">
                <img src="/icons/proofpixwhite.png" alt="ProofPix" style="width: 400px; height: auto;">
              </div>
              
              <!-- Sign In Form -->
              <form id="signin-form" style="width: 100%; max-width: 300px; display: flex; flex-direction: column; gap: 20px;">
                
                <!-- Name Input -->
                <input type="text" id="signin-name" required style="width: 100%; padding: 16px; border: none; border-radius: 8px; font-size: 16px; background: #ffffff; color: #333333; box-sizing: border-box; font-family: 'Quicksand', sans-serif;" placeholder="Enter your name">

                <!-- City Selection -->
                <select id="signin-city" required style="width: 100%; padding: 16px; border: none; border-radius: 8px; font-size: 16px; background: #ffffff; color: #333333; box-sizing: border-box; font-family: 'Quicksand', sans-serif;">
                  <option value="">Choose your city...</option>
                  <option value="tampa">Tampa</option>
                  <option value="st-petersburg">St. Petersburg</option>
                  <option value="jacksonville">Jacksonville</option>
                  <option value="miami">Miami</option>
                </select>

                <!-- Start Button -->
                <button type="submit" id="signin-btn" style="width: 100%; background: #000000 !important; background-color: #000000 !important; color: #ffffff !important; border: none !important; padding: 16px; border-radius: 8px; font-size: 18px; font-weight: bold; cursor: pointer; transition: all 0.2s; font-family: 'Quicksand', sans-serif; margin-top: 20px; position: relative; z-index: 100; box-shadow: none !important; outline: none !important; opacity: 1 !important;" onmouseover="this.style.background='#333333' !important; this.style.backgroundColor='#333333' !important; this.style.transform='translateY(-1px)'" onmouseout="this.style.background='#000000' !important; this.style.backgroundColor='#000000' !important; this.style.transform='translateY(0)'">
                  Start
                </button>
                
                <!-- Clear stored data link (if data exists) -->
                <div id="clear-data-container" style="margin-top: 16px; text-align: center; display: none;">
                  <button type="button" id="clear-data-btn" style="background: none; border: none; color: #ffffff; font-size: 14px; cursor: pointer; text-decoration: underline;">
                    🔄 Use different name/location
                  </button>
                  </div>
                </form>
            </div>
          `;
        }

        attachSignInListeners() {
          const form = document.getElementById('signin-form');
          const nameInput = document.getElementById('signin-name');
          const cityInput = document.getElementById('signin-city');
          const signInBtn = document.getElementById('signin-btn');

          // Form submission
          form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignIn();
          });

          // Real-time validation
          const validateForm = () => {
            const name = nameInput.value.trim();
            const city = cityInput.value.trim();
            
            if (name && city) {
              signInBtn.disabled = false;
              signInBtn.style.cursor = 'pointer';
            } else {
              signInBtn.disabled = true;
              signInBtn.style.cursor = 'not-allowed';
            }
          };

          nameInput.addEventListener('input', validateForm);
          cityInput.addEventListener('change', validateForm);

          // Initial validation
          validateForm();

          // Focus on name input
          setTimeout(() => {
            nameInput.focus();
          }, 100);
        }

        handleSignIn() {
          const name = document.getElementById('signin-name').value.trim();
          const city = document.getElementById('signin-city').value.trim();

          if (!name || !city) {
            alert('Please enter your name and city');
            return;
          }

          // Validate name (basic validation)
          if (name.length < 2) {
            alert('Please enter a valid name (at least 2 characters)');
            return;
          }

          // Save user data to localStorage for future use
          Storage.saveUserData(name, city);

          // Update URL with parameters and reload
          const newUrl = `${window.location.origin}${window.location.pathname}?cleaner=${encodeURIComponent(name)}&location=${encodeURIComponent(city)}`;
          window.location.href = newUrl;
        }
        
        checkOrientation() {
          this.isLandscape = window.innerWidth > window.innerHeight;
        }

        detectPhotoOrientation(width, height) {
          // Detect if a photo is landscape or portrait based on its dimensions
          if (width > height) {
            return 'Landscape';
          } else if (height > width) {
            return 'Portrait';
          } else {
            return 'Square';
          }
        }

        // Modal utility functions




        // Canvas label drawing utility


        calculatePhotoCropDimensions(width, height, templateType, orientation) {
          // Simple fallback for crop dimensions
          return {
            cropX: 0,
            cropY: 0,
            cropWidth: width,
            cropHeight: height,
            targetWidth: width,
            targetHeight: height
          };
        }



        drawImageWithProperCrop(ctx, img, canvasX, canvasY, canvasWidth, canvasHeight) {
          // Calculate the aspect ratios
          const imageAspectRatio = img.width / img.height;
          const targetAspectRatio = canvasWidth / canvasHeight;

          let sourceX, sourceY, sourceWidth, sourceHeight;

          if (imageAspectRatio > targetAspectRatio) {
            // Image is wider than target - crop horizontally (center crop)
            sourceHeight = img.height;
            sourceWidth = img.height * targetAspectRatio;
            sourceX = (img.width - sourceWidth) / 2; // Center horizontally
            sourceY = 0;
          } else {
            // Image is taller than target - crop vertically (center crop)
            sourceWidth = img.width;
            sourceHeight = img.width / targetAspectRatio;
            sourceX = 0;
            sourceY = (img.height - sourceHeight) / 2; // Center vertically
          }

          // Draw the cropped portion of the image to fill the target area exactly
          ctx.drawImage(
            img,
            sourceX, sourceY, sourceWidth, sourceHeight, // Source rectangle (what to crop from image)
            canvasX, canvasY, canvasWidth, canvasHeight   // Destination rectangle (where to draw on canvas)
          );

        }


        
        getBeforePhotoModalHTML() {
          if (this.isLandscape) {
            // Landscape mode - left (camera) and right (existing photos)
            return `
              <div style="position: relative; width: 100vw; height: 100vh; display: flex; flex-direction: column;">
                <!-- Top section - Camera and Photos -->
                <div style="position: relative; width: 100%; height: calc(100% - 80px); display: flex; flex-direction: row;">
                  <!-- Left half - Camera -->
                  <div id="camera-container" style="position: relative; width: 50%; height: 100%; background: black;">
                    <video id="camera-video" autoplay muted playsinline style="width: 100%; height: 100%; object-fit: contain;"></video>
                    
                    <!-- Photo frame overlay for camera -->
                    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none; display: flex; align-items: center; justify-content: center;">
                      <div style="width: 90%; height: 90%; border: 3px solid rgba(255,255,255,0.8); border-radius: 8px; box-shadow: 0 0 20px rgba(0,0,0,0.5);"></div>
                    </div>
                    
                    <!-- Before label -->
                    <div style="position: absolute; top: 20px; left: 20px; background: rgba(0,0,0,0.7); color: white; padding: 8px 16px; border-radius: 20px; font-size: 16px; font-weight: bold;">
                      BEFORE
                    </div>
                    
                    <!-- Zoom controls - HIDDEN - now using bottom panel zoom controls -->
                    <div id="zoom-controls" style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); display: none; gap: 8px; background: rgba(0,0,0,0.7); border-radius: 25px; padding: 8px; backdrop-filter: blur(10px);">
                      <button class="zoom-btn" data-zoom="0.5" style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 12px; border-radius: 18px; font-size: 14px; font-weight: bold; cursor: pointer; transition: all 0.2s;">0.5x</button>
                      <button class="zoom-btn active" data-zoom="1" style="background: #F2C31B; color: #303030; border: none; padding: 8px 12px; border-radius: 18px; font-size: 14px; font-weight: bold; cursor: pointer; transition: all 0.2s;">1x</button>
                      <button class="zoom-btn" data-zoom="2" style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 12px; border-radius: 18px; font-size: 14px; font-weight: bold; cursor: pointer; transition: all 0.2s;">2x</button>
                    </div>

                    
                    <!-- Close button - positioned within camera view -->
                    <button id="close-before-modal-btn" style="position: absolute; top: 20px; right: 20px; background: rgba(0,0,0,0.7); color: #F2C31B; border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 18px; cursor: pointer; z-index: 10; backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center;">
                      ✕
                    </button>
                  </div>
                  
                  <!-- Divider line -->
                  <div style="width: 4px; height: 100%; background: #000;"></div>
                  
                  <!-- Right half - Photo Grid Only -->
                  <div style="position: relative; width: calc(50% - 80px); height: 100%; background: #f8f9fa; overflow-y: auto; padding: 10px; padding-bottom: 15px;">
                    ${this.getBeforePhotosGridHTML()}
                  </div>
                </div>
                
                <!-- Bottom section - Room Tabs (spanning full width) -->
                <div style="position: relative; width: 100%; height: 80px; background: #f8fafc; padding: 10px; box-shadow: 0 -2px 8px rgba(0,0,0,0.1); display: flex; justify-content: center; align-items: center;">
                  <div id="modal-room-tabs-container" style="position: relative; width: 100%; height: 60px; overflow: hidden;">
                    <div id="modal-tabs-carousel" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; transition: transform 0.3s ease;">
                      ${this.getRoomTabsCarousel()}
                    </div>
                  </div>
                </div>
              </div>
            `;
          } else {
            // Portrait mode - top (camera) and bottom (existing photos)
            return `
              <div style="position: relative; width: 100vw; height: 100vh; display: flex; flex-direction: column;">
                <!-- Upper half - Camera -->
                <div id="camera-container" style="position: relative; width: 100%; height: 50%; background: black; display: flex; align-items: center; justify-content: center;">
                  <video id="camera-video" autoplay muted playsinline style="width: 100%; height: 100%;"></video>
                  
                  <!-- Photo frame overlay for camera -->
                  <div class="photo-frame-overlay" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none;">
                    <!-- Dynamic overlay will be inserted here -->
                  </div>
                  
                  <!-- Before label -->
                  <div style="position: absolute; top: 20px; left: 20px; background: rgba(0,0,0,0.7); color: white; padding: 8px 16px; border-radius: 20px; font-size: 16px; font-weight: bold;">
                    BEFORE
                  </div>
                  
                  <!-- Zoom controls for portrait mode - HIDDEN - now using bottom panel zoom controls -->
                  <div id="zoom-controls" style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); display: none; gap: 8px; background: rgba(0,0,0,0.7); border-radius: 25px; padding: 8px; backdrop-filter: blur(10px);">
                    <button class="zoom-btn" data-zoom="0.5" style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 12px; border-radius: 18px; font-size: 14px; font-weight: bold; cursor: pointer; transition: all 0.2s;">0.5x</button>
                    <button class="zoom-btn active" data-zoom="1" style="background: #F2C31B; color: #303030; border: none; padding: 8px 12px; border-radius: 18px; font-size: 14px; font-weight: bold; cursor: pointer; transition: all 0.2s;">1x</button>
                    <button class="zoom-btn" data-zoom="2" style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 12px; border-radius: 18px; font-size: 14px; font-weight: bold; cursor: pointer; transition: all 0.2s;">2x</button>
                  </div>

                </div>
                
                <!-- Room Tabs Section - HIDDEN FOR TEST -->
                <div style="width: 100%; background: #f8fafc; padding: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: none;">
                  <div id="modal-room-tabs-container" style="position: relative; width: 100%; height: 60px; overflow: hidden;">
                    <div id="modal-tabs-carousel" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; transition: transform 0.3s ease;">
                      ${this.getRoomTabsCarousel()}
                    </div>
                  </div>
                </div>

                <!-- Bottom half - Photo Grid with black bars for symmetry -->
                <div style="width: 100%; height: 50%; background: black; display: flex; align-items: center; justify-content: center;">
                  <div id="before-photo-grid" style="width: 100%; height: 100%; background: #f8f9fa; overflow-y: auto; padding: 10px; padding-bottom: 15px;">
                    ${this.getBeforePhotosGridHTML()}
                  </div>
                </div>

                <!-- Close button -->
                <button id="close-before-modal-btn" style="position: absolute; top: 20px; right: 20px; background: transparent; color: #F2C31B; border: none; padding: 8px; border-radius: 50%; font-size: 18px; cursor: pointer;">
                  ✕
                </button>
              </div>
            `;
          }
        }

        getBeforePhotosGridHTML() {
          // Device/platform debugging
          const userAgent = navigator.userAgent;
          const isIPhone = /iPhone|iPad|iPod/.test(userAgent);
          const isAndroid = /Android/.test(userAgent);
          const isMobile = isIPhone || isAndroid;


          // Room icon for placeholders
          const roomIcons = {
            'kitchen': '🍳',
            'bathroom': '🛁',
            'bedroom': '🛏️',
            'living-room': '🛋️',
            'dining-room': '🍽️',
            'office': '💼'
          };

          // Get all before photos for current room
          const beforePhotos = this.photos
            .filter(photo => photo.room === this.currentRoom && photo.mode === 'before')
            .sort((a, b) => a.timestamp - b.timestamp);

          // Create grid layout with all photos and dummy squares
          const gridItems = [];
          
          // Add all existing photos
          beforePhotos.forEach(photo => {
            // Determine object-fit based on photo's original aspect ratio
            // 4:3 aspect ratio photos need "contain" to show full content within square thumbnail
            // 2:3 aspect ratio photos use "contain" to fill the square properly
            const objectFit = (photo.aspectRatio === '4:3') ? 'contain' : 'contain';


            gridItems.push(`
              <div class="before-photo-item" data-photo-id="${photo.id}" style="aspect-ratio: 1; border-radius: 8px; overflow: hidden; position: relative; cursor: pointer; border: 2px solid #e1e5e9; transition: all 0.2s;" onmouseover="this.style.borderColor='#F2C31B'; this.style.transform='scale(1.02)'" onmouseout="this.style.borderColor='#e1e5e9'; this.style.transform='scale(1)'">
                <img src="${photo.dataUrl}" style="width: 100%; height: 100%; object-fit: ${objectFit};" />

                <!-- Delete button -->
                <button class="delete-before-photo-btn" data-photo-id="${photo.id}" style="position: absolute; top: 5px; right: 5px; background: #F2C31B; color: #303030; border: none; padding: 6px; border-radius: 50%; font-size: 12px; cursor: pointer; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-weight: bold; transition: all 0.2s;" onmouseover="this.style.background='#e6b800'; this.style.transform='scale(1.1)'" onmouseout="this.style.background='#F2C31B'; this.style.transform='scale(1)'">
                  ×
                </button>
                
                <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.8)); padding: 8px; color: white;">
                  <div style="font-size: 12px; font-weight: bold; font-family: 'Quicksand', sans-serif;">${photo.name}</div>
                  <div style="font-size: 10px; opacity: 0.9; font-family: 'Quicksand', sans-serif;">${new Date(photo.timestamp).toLocaleTimeString()}</div>
                </div>
              </div>
            `);
          });
          
          // Add one dummy square for taking more photos
          gridItems.push(`
            <div class="dummy-before-photo" data-room="${this.currentRoom}" style="aspect-ratio: 1; border-radius: 8px; background: #f0f0f0; border: 2px dashed #ccc; display: flex; align-items: center; justify-content: center; color: #999; font-size: 24px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#e8e8e8'; this.style.color='#666';" onmouseout="this.style.background='#f0f0f0'; this.style.color='#999';">
              ${roomIcons[this.currentRoom] || '📷'}
            </div>
          `);

          return `
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; grid-auto-rows: minmax(100px, auto); align-content: start; width: 100%; height: auto;">
              ${gridItems.join('')}
            </div>
          `;
        }

        getComparisonModalHTML(photo) {
          if (this.isLandscape) {
            // Landscape mode - left (before photo) and right (camera)
            return `
              <div style="position: relative; width: 100vw; height: 100vh; display: flex; flex-direction: row;">
                <!-- Left half - Before photo -->
                <div style="position: relative; width: 50%; height: 100%; background: black;">
                  <img src="${photo.dataUrl}" style="width: 100%; height: 100%; object-fit: contain;" />
                  
                  <!-- Photo info overlay -->
                  <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.8)); padding: 20px; text-align: center; color: white;">
                    <div style="font-size: 18px; font-weight: bold; margin-bottom: 5px;">
                      ${photo.room.charAt(0).toUpperCase() + photo.room.slice(1).replace('-', ' ')} - BEFORE
                    </div>
                    <div style="font-size: 14px; opacity: 0.9;">
                      ${new Date(photo.timestamp).toLocaleString()}
                    </div>
                  </div>
                  
                  <!-- Before label -->
                  <div style="position: absolute; top: 20px; left: 20px; background: rgba(0,0,0,0.7); color: white; padding: 8px 16px; border-radius: 20px; font-size: 16px; font-weight: bold;">
                    BEFORE
                  </div>
                </div>
                
                <!-- Divider line -->
                <div style="width: 4px; height: 100%; background: #000;"></div>
                
                <!-- Right half - Camera -->
                <div id="camera-container" style="position: relative; width: 50%; height: 100%; background: black;">
                  <video id="comparison-camera" autoplay muted playsinline style="width: 100%; height: 100%; object-fit: contain;"></video>
                  
                  <!-- Photo frame overlay for camera -->
                  <div class="photo-frame-overlay" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none;">
                    <!-- Dynamic overlay will be inserted here -->
                  </div>
                  
                  <!-- After label -->
                  <div style="position: absolute; top: 20px; left: 20px; background: rgba(0,0,0,0.7); color: white; padding: 8px 16px; border-radius: 20px; font-size: 16px; font-weight: bold;">
                    AFTER
                  </div>
                  
                  <!-- Zoom controls - HIDDEN - now using bottom panel zoom controls -->
                  <div id="zoom-controls-comparison" style="position: absolute; top: 60px; left: 50%; transform: translateX(-50%); display: none; gap: 8px; background: rgba(0,0,0,0.7); border-radius: 25px; padding: 8px; backdrop-filter: blur(10px);">
                    <button class="zoom-btn-comparison" data-zoom="0.5" style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 12px; border-radius: 18px; font-size: 14px; font-weight: bold; cursor: pointer; transition: all 0.2s;">0.5x</button>
                    <button class="zoom-btn-comparison active" data-zoom="1" style="background: #F2C31B; color: #303030; border: none; padding: 8px 12px; border-radius: 18px; font-size: 14px; font-weight: bold; cursor: pointer; transition: all 0.2s;">1x</button>
                    <button class="zoom-btn-comparison" data-zoom="2" style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 12px; border-radius: 18px; font-size: 14px; font-weight: bold; cursor: pointer; transition: all 0.2s;">2x</button>
                  </div>

                  
                  <!-- Close button -->
                  <button id="close-comparison-btn" style="position: absolute; top: 20px; right: 20px; background: rgba(0,0,0,0.7); color: #F2C31B; border: none; padding: 8px; border-radius: 50%; font-size: 18px; cursor: pointer; z-index: 99999; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; pointer-events: auto;">
                    ✕
                  </button>
                </div>
              </div>
            `;
          } else {
            // Portrait mode - top (before) and bottom (camera)
            return `
              <div style="position: relative; width: 100vw; height: 100vh; display: flex; flex-direction: column;">
                <!-- Top half - Before photo -->
                <div style="position: relative; width: 100%; height: 50%; background: black;">
                  <img src="${photo.dataUrl}" style="width: 100%; height: 100%; object-fit: contain;" />

                  <!-- Photo info overlay -->
                  <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.8)); padding: 20px; text-align: center; color: white;">
                    <div style="font-size: 18px; font-weight: bold; margin-bottom: 5px;">
                      ${photo.room.charAt(0).toUpperCase() + photo.room.slice(1).replace('-', ' ')} - BEFORE
                    </div>
                    <div style="font-size: 14px; opacity: 0.9;">
                      ${new Date(photo.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>

                <!-- Divider line -->
                <div style="width: 100%; height: 4px; background: #000;"></div>

                <!-- Upper half - Camera -->
                <div id="camera-container" style="position: relative; width: 100%; height: 50%; background: black; display: flex; align-items: center; justify-content: center;">
                  <video id="comparison-camera" autoplay muted playsinline style="width: 100%; height: 100%; object-fit: contain;"></video>
                  
                  <!-- Photo frame overlay for camera -->
                  <div class="photo-frame-overlay" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none;">
                    <!-- Dynamic overlay will be inserted here -->
                  </div>
                  
                  <!-- Zoom controls for portrait mode comparison - HIDDEN - now using bottom panel zoom controls -->
                  <div id="zoom-controls-comparison" style="position: absolute; top: 20px; left: 50%; transform: translateX(-50%); display: none; gap: 8px; background: rgba(0,0,0,0.7); border-radius: 25px; padding: 8px; backdrop-filter: blur(10px);">
                    <button class="zoom-btn-comparison" data-zoom="0.5" style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 12px; border-radius: 18px; font-size: 14px; font-weight: bold; cursor: pointer; transition: all 0.2s;">0.5x</button>
                    <button class="zoom-btn-comparison active" data-zoom="1" style="background: #F2C31B; color: #303030; border: none; padding: 8px 12px; border-radius: 18px; font-size: 14px; font-weight: bold; cursor: pointer; transition: all 0.2s;">1x</button>
                    <button class="zoom-btn-comparison" data-zoom="2" style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 12px; border-radius: 18px; font-size: 14px; font-weight: bold; cursor: pointer; transition: all 0.2s;">2x</button>
                  </div>


                </div>

                <!-- Close button -->
                <button id="close-comparison-btn" style="position: absolute; top: 20px; right: 20px; background: rgba(0,0,0,0.7); color: #F2C31B; border: none; padding: 8px; border-radius: 50%; font-size: 18px; cursor: pointer; z-index: 9999; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; pointer-events: auto;">
                  ✕
                </button>
              </div>
            `;
          }
        }
        
        getSplitScreenPreviewHTML(beforeDataUrl, afterDataUrl, room) {
          if (this.isLandscape) {
            // Landscape mode - left (before) and right (after)
            return `
              <div style="position: relative; width: 100vw; height: 100vh; display: flex; flex-direction: row; background: white;">
                <!-- Left half - Before photo -->
                <div style="position: relative; width: 50%; height: 100%; background: black; overflow: hidden;">
                  <img src="${beforeDataUrl}" style="width: 100%; height: 100%; object-fit: contain;" />
                  <div style="position: absolute; top: 20px; left: 20px; background: rgba(0,0,0,0.8); color: white; padding: 8px 20px; border-radius: 20px; font-size: 18px; font-weight: bold;">
                    BEFORE
                  </div>
                </div>
                
                <!-- Divider line -->
                <div style="width: 4px; height: 100%; background: #000;"></div>
                
                <!-- Right half - After photo -->
                <div style="position: relative; width: 50%; height: 100%; background: black; overflow: hidden;">
                  <img src="${afterDataUrl}" style="width: 100%; height: 100%; object-fit: contain;" />
                  <div style="position: absolute; top: 20px; right: 20px; background: rgba(0,0,0,0.8); color: white; padding: 8px 20px; border-radius: 20px; font-size: 18px; font-weight: bold;">
                    AFTER
                  </div>
                </div>
                
                
                <!-- Close button -->
                <button id="close-split-btn" style="position: absolute; top: 20px; right: 20px; background: transparent; color: #F2C31B; border: none; padding: 8px; border-radius: 50%; font-size: 18px; cursor: pointer;">
                  ✕
                </button>
              </div>
            `;
          } else {
            // Portrait mode - top (before) and bottom (after)
            return `
              <div style="position: relative; width: 100vw; height: 100vh; display: flex; flex-direction: column; background: white;">
                <!-- Top half - Before photo -->
                <div style="position: relative; width: 100%; height: 50%; background: black; overflow: hidden;">
                  <img src="${beforeDataUrl}" style="width: 100%; height: 100%; object-fit: contain;" />
                  <div style="position: absolute; top: 20px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); color: white; padding: 8px 20px; border-radius: 20px; font-size: 18px; font-weight: bold;">
                    BEFORE
                  </div>
                </div>
                
                <!-- Divider line -->
                <div style="width: 100%; height: 4px; background: #000;"></div>
                
                <!-- Bottom half - After photo -->
                <div style="position: relative; width: 100%; height: 50%; background: black; overflow: hidden;">
                  <img src="${afterDataUrl}" style="width: 100%; height: 100%; object-fit: contain;" />
                  <div style="position: absolute; top: 20px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); color: white; padding: 8px 20px; border-radius: 20px; font-size: 18px; font-weight: bold;">
                    AFTER
                  </div>
                </div>
                
                
                <!-- Close button -->
                <button id="close-split-btn" style="position: absolute; top: 20px; right: 20px; background: transparent; color: #F2C31B; border: none; padding: 8px; border-radius: 50%; font-size: 18px; cursor: pointer;">
                  ✕
                </button>
              </div>
            `;
          }
        }
        
        getAppHTML() {
          // Get cleaner name from URL parameter
          const urlParams = new URLSearchParams(window.location.search);
          const currentCleaner = urlParams.get('cleaner') || 'Kate';
          
          return `
            <div style="min-height: 100vh; background: #f8fafc; font-family: 'EB Garamond', 'Garamond', 'Times New Roman', serif; display: flex; flex-direction: column; overflow-x: hidden;">
              <!-- Fixed Header -->
              <div style="position: fixed; top: 0; left: 0; right: 0; z-index: 200; background: #F2C31B; color: #303030; padding: 4px 20px; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; max-width: 100vw; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <!-- Left side - All Photos button -->
                <button id="all-photos-btn" style="background: white; color: #303030; border: none; padding: 8px 12px; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: bold;">
                  📷 All Photos
                </button>

                <!-- Center - Cleaner name with change user option -->
                <div style="display: flex; align-items: center; gap: 8px;">
                  <div style="font-size: 16px; font-weight: bold; font-family: 'Quicksand', sans-serif;">${currentCleaner}</div>
                  <button id="change-user-btn" style="background: none; border: none; color: #666; font-size: 12px; cursor: pointer; padding: 4px; border-radius: 4px; transition: all 0.2s;" title="Change User" onmouseover="this.style.background='rgba(0,0,0,0.1)'; this.style.color='#303030'" onmouseout="this.style.background='none'; this.style.color='#666'">
                    👤
                  </button>
                </div>

                <!-- Right side - Upload button and label toggle -->
                <div style="display: flex; gap: 8px; align-items: center;">
                  <button id="label-toggle-btn" style="background: ${this.labelsEnabled ? '#303030' : '#ccc'}; color: ${this.labelsEnabled ? '#F2C31B' : '#666'}; border: none; padding: 8px 12px; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: bold;" title="Toggle BEFORE/AFTER labels">
                    🏷️
                  </button>
                  <button id="header-upload-btn" style="background: #303030; color: #F2C31B; border: none; padding: 8px 16px; border-radius: 6px; font-size: 14px; cursor: pointer; font-weight: bold;">
                    📤 Upload
                  </button>
                </div>
              </div>

              <!-- Fixed Room Tabs (at bottom) -->
              <div id="sticky-tabs-container" style="position: fixed; ${this.isLandscape ? 'bottom: 0; left: 0; right: 0; z-index: 100; background: #f8fafc; padding: 10px; width: 100vw; box-sizing: border-box; display: flex; justify-content: center; box-shadow: 0 -2px 8px rgba(0,0,0,0.1);' : 'bottom: 0; left: 0; right: 0; z-index: 100; background: #f8fafc; padding: 10px; width: 100vw; box-sizing: border-box; display: flex; justify-content: center; box-shadow: 0 -2px 8px rgba(0,0,0,0.1);'}">
                <div id="room-tabs-container" style="position: relative; ${this.isLandscape ? 'width: 100vw; height: 60px;' : 'width: 100vw; height: 60px;'} overflow: hidden;">
                  <div id="tabs-carousel" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; transition: transform 0.3s ease;">
                    ${this.getRoomTabsCarousel()}
                  </div>
                </div>
              </div>
              
              <!-- Scrollable Content -->
              <div id="main-scrollable-content" style="flex: 1; overflow-y: auto; overflow-x: hidden; padding: 60px 10px 95px 10px; width: 100%; max-width: 100vw; box-sizing: border-box;">
                
                <!-- Photos grid with swipe -->
                <div id="photos-container" style="display: grid; grid-template-columns: ${this.isLandscape ? 'repeat(5, 1fr)' : 'repeat(2, 1fr)'}; gap: 5px; padding: 0 10px; max-width: 100%; box-sizing: border-box;">
                  ${this.getPhotosHTML()}
                </div>
                
              </div>
              
              <!-- Fixed Action Buttons Panel (only for camera modals) -->
              <div id="bottom-panel" style="position: fixed; ${this.isLandscape ? 'right: 0; top: 0; bottom: 0; width: 80px; display: none; flex-direction: column; justify-content: center; align-items: center; gap: 20px; padding-top: 40px; padding-bottom: 40px;' : 'bottom: 0; left: 0; right: 0; display: none; grid-template-columns: 1fr 1fr 1fr; height: 80px; align-items: center;'} z-index: 2001; background: white; box-shadow: ${this.isLandscape ? '0 0 8px rgba(0,0,0,0.1)' : '0 -2px 8px rgba(0,0,0,0.1)'};">
                <!-- Left Section - Aspect Ratio Controls (always visible during camera) -->
                <div style="display: flex; justify-content: center;">
                  <div id="aspect-ratio-controls" style="display: none; gap: 4px; background: rgba(0,0,0,0.7); border-radius: 20px; padding: 4px; backdrop-filter: blur(10px);">
                    <button class="aspect-ratio-btn" data-ratio="4:3" style="background: #F2C31B; color: #303030; border: none; padding: 6px 8px; border-radius: 15px; font-size: 11px; font-weight: bold; cursor: pointer; transition: all 0.2s; min-width: 35px;">4:3</button>
                    <button class="aspect-ratio-btn" data-ratio="2:3" style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 6px 8px; border-radius: 15px; font-size: 11px; font-weight: bold; cursor: pointer; transition: all 0.2s; min-width: 35px;">2:3</button>
                  </div>
                </div>

                <!-- Center Section - Camera Button (main action button) -->
                <div style="display: flex; justify-content: center;">
                  <button id="camera-btn" style="background: #F2C31B; border: none; width: 60px; height: 60px; border-radius: 50%; cursor: pointer; box-shadow: 0 4px 12px rgba(48,48,48,0.3); display: none;"></button>
                  <!-- Retake Button (replaces camera button after capture) -->
                  <button id="btn-retake" style="background: #ef4444; color: white; border: none; width: 50px; height: 50px; border-radius: 8px; font-size: 12px; cursor: pointer; font-weight: bold; display: none; align-items: center; justify-content: center;">
                    🔄 Retake
                  </button>
                </div>

                <!-- Right Section - Zoom Controls and Save Button -->
                <div style="display: flex; justify-content: center; align-items: center; gap: 8px;">
                  <!-- Zoom Controls -->
                  <div id="zoom-controls-panel" style="display: flex; gap: 4px; background: rgba(0,0,0,0.7); border-radius: 20px; padding: 4px; backdrop-filter: blur(10px);">
                    <button class="zoom-btn" data-zoom="0.5" style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 6px 8px; border-radius: 15px; font-size: 11px; font-weight: bold; cursor: pointer; transition: all 0.2s; min-width: 35px;">0.5x</button>
                    <button class="zoom-btn active" data-zoom="1" style="background: #F2C31B; color: #303030; border: none; padding: 6px 8px; border-radius: 15px; font-size: 11px; font-weight: bold; cursor: pointer; transition: all 0.2s; min-width: 35px;">1x</button>
                    <button class="zoom-btn" data-zoom="2" style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 6px 8px; border-radius: 15px; font-size: 11px; font-weight: bold; cursor: pointer; transition: all 0.2s; min-width: 35px;">2x</button>
                  </div>

                  <!-- Save Button -->
                  <button id="btn-save" style="background: #10b981; color: white; border: none; width: 50px; height: 50px; border-radius: 8px; font-size: 12px; cursor: pointer; font-weight: bold; display: none; align-items: center; justify-content: center;">
                    💾 Save
                  </button>
                </div>
              </div>
              
            </div>
          `;
        }
        
        
        
        getRoomTabsCarousel() {
          const rooms = ['kitchen', 'bathroom', 'bedroom', 'living-room', 'dining-room', 'office'];
          const currentIndex = rooms.indexOf(this.currentRoom);

          // Create extended array for infinite loop effect (3x the original)
          const extendedRooms = [...rooms, ...rooms, ...rooms];
          const centerIndex = rooms.length + currentIndex; // Middle set + current position

          return extendedRooms.map((room, index) => {
            const relativePosition = index - centerIndex;
            const distance = Math.abs(relativePosition);

            // Only show tabs that are close to center (within 2 positions)
            if (distance > 2) {
              return '';
            }

            // Calculate positioning with smaller gaps
            const isActive = relativePosition === 0;
            const translateX = relativePosition * 80; // Reduced from 120px to 80px
            const opacity = distance === 0 ? 1 : Math.max(0.5, 1 - (distance * 0.25));
            const scale = distance === 0 ? 1.1 : Math.max(0.85, 1 - (distance * 0.08));

            return `
              <button class="room-tab" data-room="${room}" data-position="${relativePosition}"
                      style="position: absolute;
                             left: 50%;
                             top: 50%;
                             transform: translate(-50%, -50%) translateX(${translateX}px) scale(${scale});
                             padding: 10px 14px;
                             border: none;
                             border-radius: 12px;
                             font-size: ${isActive ? '15px' : '13px'};
                             cursor: pointer;
                             background: ${isActive ? '#F2C31B' : 'rgba(225,225,225,0.9)'};
                             color: ${isActive ? '#303030' : '#666'};
                             transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                             opacity: ${opacity};
                             white-space: nowrap;
                             z-index: ${10 - distance};
                             font-weight: ${isActive ? '600' : '400'};
                             box-shadow: ${isActive ? '0 4px 12px rgba(242,195,27,0.3)' : '0 2px 4px rgba(0,0,0,0.1)'};
                             letter-spacing: ${isActive ? '0.5px' : '0px'};">
                ${room.charAt(0).toUpperCase() + room.slice(1).replace('-', ' ')}
              </button>
            `;
          }).filter(tab => tab !== '').join('');
        }
        
        getAllPhotosHTML() {
          
          // Room icons for display
          const roomIcons = {
            'kitchen': '🍳',
            'bathroom': '🛁',
            'bedroom': '🛏️',
            'living-room': '🛋️',
            'dining-room': '🍽️',
            'office': '💼'
          };

          // Debug: Check all photos first

          // Get all stored photos (before, after, combined/mix, archived - but NOT thumbnails)
          const allPhotos = this.photos
            .filter(photo => {
              // Include before photos
              if (photo.mode === 'before') return true;

              // Include after photos
              if (photo.mode === 'after') return true;

              // Include archived photos
              if (photo.mode === 'archived') return true;

              // Include mix/combined photos
              if (photo.mode === 'mix') return true;

              // Exclude thumbnails - we don't use them anymore
              // if (photo.mode === 'thumbnail') return true;

              return false;
            });


          // Group photos by room and organize them: before, after, combined
          // Handle multiple photos of the same type by grouping them by name/sequence
          const photosByRoomAndName = {};
          allPhotos.forEach(photo => {
            if (!photosByRoomAndName[photo.room]) {
              photosByRoomAndName[photo.room] = {};
            }
            
            // For combined photos with long names, try to match them to the correct before/after set
            let photoKey = photo.name;
            
            if (photo.mode === 'mix' && photo.name.includes('_Combined_')) {
              // Try to find matching before/after photos by timestamp proximity
              const beforePhotos = allPhotos.filter(p => p.mode === 'before' && p.room === photo.room);
              const afterPhotos = allPhotos.filter(p => p.mode === 'after' && p.room === photo.room);
              
              // Find the closest timestamp match
              let closestMatch = null;
              let minTimeDiff = Infinity;
              
              [...beforePhotos, ...afterPhotos].forEach(matchPhoto => {
                const timeDiff = Math.abs(photo.timestamp - matchPhoto.timestamp);
                if (timeDiff < minTimeDiff && timeDiff < 60000) { // Within 1 minute
                  minTimeDiff = timeDiff;
                  closestMatch = matchPhoto;
                }
              });
              
              if (closestMatch) {
                photoKey = closestMatch.name; // Use the matched photo's name
              }
            }
            
            if (!photosByRoomAndName[photo.room][photoKey]) {
              photosByRoomAndName[photo.room][photoKey] = {
                before: null,
                after: null,
                combined: null
              };
            }
            
            if (photo.mode === 'before' || photo.mode === 'archived') {
              photosByRoomAndName[photo.room][photoKey].before = photo;
            } else if (photo.mode === 'after') {
              photosByRoomAndName[photo.room][photoKey].after = photo;
            } else if (photo.mode === 'mix') {
              // Only use properly formatted combined photos
              photosByRoomAndName[photo.room][photoKey].combined = photo;
            }
          });

          // Create ordered array: before, after, combined for each room and photo set
          // Sort photo sets by name to ensure consistent ordering (Kitchen 1, Kitchen 2, Kitchen 3)
          const orderedPhotos = [];
          Object.keys(photosByRoomAndName).forEach(room => {
            const roomPhotoSets = photosByRoomAndName[room];
            const sortedPhotoSetNames = Object.keys(roomPhotoSets).sort((a, b) => {
              // Extract numbers from names for proper sorting
              const aNum = parseInt(a.replace(/\D/g, '')) || 0;
              const bNum = parseInt(b.replace(/\D/g, '')) || 0;
              return aNum - bNum;
            });
            
            sortedPhotoSetNames.forEach(photoSetName => {
              const photoSet = roomPhotoSets[photoSetName];
              
              // Add before photo (or dummy if missing)
              if (photoSet.before) {
                orderedPhotos.push(photoSet.before);
              } else {
                orderedPhotos.push({ 
                  id: `dummy-before-${photoSetName}`, 
                  mode: 'dummy-before', 
                  room: room, 
                  name: photoSetName,
                  isDummy: true 
                });
              }
              
              // Add after photo (or dummy if missing)
              if (photoSet.after) {
                orderedPhotos.push(photoSet.after);
              } else {
                orderedPhotos.push({ 
                  id: `dummy-after-${photoSetName}`, 
                  mode: 'dummy-after', 
                  room: room, 
                  name: photoSetName,
                  isDummy: true 
                });
              }
              
              // Add combined photo (or dummy if missing)
              if (photoSet.combined) {
                orderedPhotos.push(photoSet.combined);
              } else {
                orderedPhotos.push({ 
                  id: `dummy-combined-${photoSetName}`, 
                  mode: 'dummy-combined', 
                  room: room, 
                  name: photoSetName,
                  isDummy: true 
                });
              }
            });
          });



          if (orderedPhotos.length === 0) {
            return `
              <div style="text-align: center; padding: 40px 20px; color: #666;">
                <div style="font-size: 48px; margin-bottom: 20px;">📷</div>
                <h3 style="margin: 0 0 10px 0; color: #303030;">No Photos Yet</h3>
                <p style="margin: 0; font-size: 14px;">Take some photos to see them here!</p>
              </div>
            `;
          }

          // Group photos by room for better organization
          const photosByRoom = {};
          orderedPhotos.forEach(photo => {
            if (!photosByRoom[photo.room]) {
              photosByRoom[photo.room] = [];
            }
            photosByRoom[photo.room].push(photo);
          });


          let html = '';
          
          // Display photos grouped by room
          Object.keys(photosByRoom).forEach(room => {
            const roomPhotos = photosByRoom[room];
            const actualPhotos = roomPhotos.filter(p => !p.isDummy); // Count only real photos
            const roomName = room.charAt(0).toUpperCase() + room.slice(1).replace('-', ' ');
            const roomIcon = roomIcons[room] || '🏠';
            
            
            html += `
              <div style="margin-bottom: 30px;">
                <h3 style="margin: 0 0 15px 0; padding: 0 10px; color: #303030; font-size: 18px; display: flex; align-items: center; justify-content: space-between;">
                  <span style="display: flex; align-items: center; gap: 8px;">${roomIcon} ${roomName} (${actualPhotos.length})</span>
                  <span style="font-size: 12px; color: #666; font-weight: normal;">
                    ${roomPhotos.length > 0 ? new Date(roomPhotos[0].timestamp).toLocaleDateString() : ''}
                  </span>
                </h3>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 0 10px;">
                  <div style="text-align: center; font-size: 12px; font-weight: bold; color: #F2C31B; padding: 5px;">BEFORE</div>
                  <div style="text-align: center; font-size: 12px; font-weight: bold; color: #3B82F6; padding: 5px;">AFTER</div>
                  <div style="text-align: center; font-size: 12px; font-weight: bold; color: #10B981; padding: 5px;">COMBINED</div>
            `;
            
            roomPhotos.forEach((photo, index) => {
              // For combined photos with long names, use the photo set name instead
              let displayName = photo.name || `${room} ${index + 1}`;
              
              if (photo.mode === 'mix' && photo.name.includes('_Combined_')) {
                // Extract the base name from the current photo set
                const currentPhotoSetName = roomPhotos.find(p => p.mode === 'before')?.name || 
                                          roomPhotos.find(p => p.mode === 'after')?.name;
                if (currentPhotoSetName) {
                  displayName = currentPhotoSetName;
                }
              }
              
              const photoIndex = photo.isDummy ? -1 : this.photos.indexOf(photo);
              
              // Handle dummy photos
              if (photo.isDummy) {
                let borderColor = '#E1E1E1';
                let photoLabel = '';
                let icon = '📷';
                
                if (photo.mode === 'dummy-before') {
                  borderColor = '#F2C31B';
                  icon = '📸';
                } else if (photo.mode === 'dummy-after') {
                  borderColor = '#3B82F6';
                  icon = '📷';
                } else if (photo.mode === 'dummy-combined') {
                  borderColor = '#10B981';
                  icon = '🔄';
                }
                
                html += `
                  <div class="dummy-card" data-room="${photo.room}" data-name="${photo.name}" data-mode="${photo.mode}" style="border: 2px dashed ${borderColor}; border-radius: 8px; overflow: hidden; position: relative; aspect-ratio: 1; background: #f8f9fa; display: flex; align-items: center; justify-content: center; opacity: 0.6; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.opacity='0.8'; this.style.background='#e9ecef';" onmouseout="this.style.opacity='0.6'; this.style.background='#f8f9fa';">
                    <div style="text-align: center; color: #666;">
                      <div style="font-size: 24px; margin-bottom: 8px;">${icon}</div>
                      <div style="font-size: 8px; color: #999;">Click to add</div>
                    </div>
                  </div>
                `;
                return;
              }
              
              if (photo.mode === 'after') {
                // After photo - show with blue border
                const borderColor = '#3B82F6';

                // Determine object-fit based on photo's original aspect ratio
                const objectFit = 'contain'; // Keep contain for proper display within square


                html += `
                  <div class="photo-item" data-photo-index="${photoIndex}" style="border: 2px solid ${borderColor}; border-radius: 8px; overflow: hidden; position: relative; transition: transform 0.2s; aspect-ratio: 1; cursor: pointer;">
                    <img src="${photo.dataUrl}" style="width: 100%; height: 100%; object-fit: ${objectFit};" />

                    <!-- Photo info -->
                    <div style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.8); color: white; padding: 5px 8px; font-size: 10px;">
                      <div style="font-weight: bold; font-family: 'Quicksand', sans-serif;">${displayName}</div>
                    </div>
                  </div>
                `;
              } else {
                // Single photo (before, archived, or mix/combined)
                let borderColor = '#E1E1E1';
                let photoLabel = '';

                if (photo.mode === 'before') {
                  borderColor = '#F2C31B';
                } else if (photo.mode === 'mix') {
                  borderColor = '#10B981';
                } else if (photo.mode === 'archived') {
                  borderColor = '#6B7280';
                }

                // Determine object-fit based on photo's original aspect ratio
                const objectFit = 'contain'; // Keep contain for proper display within square


                html += `
                  <div class="photo-item" data-photo-index="${photoIndex}" style="border: 2px solid ${borderColor}; border-radius: 8px; overflow: hidden; position: relative; transition: transform 0.2s; aspect-ratio: 1; cursor: pointer;">
                    <img src="${photo.dataUrl}" style="width: 100%; height: 100%; object-fit: ${objectFit};" />
                    
                    <!-- Photo info -->
                    <div style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.8); color: white; padding: 5px 8px; font-size: 10px;">
                      <div style="font-weight: bold; font-family: 'Quicksand', sans-serif;">${displayName}</div>
                    </div>
                  </div>
                `;
              }
            });
            
            html += `
                </div>
              </div>
            `;
          });

          return html;
        }

        showToast(message, duration = 2000) {
          const toast = document.createElement('div');
          toast.textContent = message;
          toast.style.cssText = `
            position: fixed;
            bottom: 120px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(48, 48, 48, 0.95);
            color: #F2C31B;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: bold;
            z-index: 10000;
            animation: fadeInOut ${duration}ms ease-in-out;
          `;

          document.body.appendChild(toast);

          setTimeout(() => {
            if (toast.parentNode) {
              document.body.removeChild(toast);
            }
          }, duration);
        }

        showAllPhotosModal() {
          // Clean up any existing modals first
          Utils.cleanupExistingModals(2500);

          const modal = document.createElement('div');
          modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 2500;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            box-sizing: border-box;
          `;

          modal.innerHTML = `
            <div style="
              width: 100%;
              max-width: 500px;
              height: 90vh;
              background: white;
              border-radius: 12px;
              display: flex;
              flex-direction: column;
              overflow: hidden;
              box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            ">
              <!-- Header -->
              <div style="
                padding: 20px;
                background: #F2C31B;
                color: #303030;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-shrink: 0;
              ">
                <h2 style="margin: 0; font-size: 20px; font-weight: bold;">📷 All Photos</h2>
                
                <div style="display: flex; align-items: center; gap: 10px;">
                  <button id="delete-all-photos-btn" style="
                    background: #dc2626;
                    color: white;
                    border: none;
                    padding: 8px 12px;
                    border-radius: 6px;
                    font-size: 12px;
                    font-weight: bold;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    transition: background 0.2s;
                  " onmouseover="this.style.background='#b91c1c'" onmouseout="this.style.background='#dc2626'">
                    🗑️ Delete All
                  </button>
                  
                  <button id="close-all-photos-modal" style="
                    background: transparent;
                    border: none;
                    color: #303030;
                    font-size: 24px;
                    cursor: pointer;
                    padding: 5px;
                    border-radius: 50%;
                    width: 35px;
                    height: 35px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  ">×</button>
                </div>
              </div>
              
              <!-- Scrollable content -->
              <div id="all-photos-content" style="
                flex: 1;
                overflow-y: auto;
                padding: 20px;
                background: #f8f9fa;
              ">
                ${this.getAllPhotosHTML()}
              </div>
            </div>
          `;

          document.body.appendChild(modal);

          // Prevent background scrolling
          document.body.style.overflow = 'hidden';

          // Add event listeners
          document.getElementById('close-all-photos-modal').addEventListener('click', () => {
            this.closeAllPhotosModal(modal);
          });

          // Delete All button functionality
          document.getElementById('delete-all-photos-btn').addEventListener('click', () => {
            // Close the gallery modal first
            this.closeAllPhotosModal(modal);
            
            // Show the delete all confirmation (same as upload button)
            setTimeout(() => {
              this.showDeleteAllConfirmation();
            }, 100);
          });


          // Close on background click
          Utils.attachModalCloseHandlers(modal, () => this.closeAllPhotosModal(modal), {
            closeOnBackdrop: true,
            closeOnEscape: false
          });

          // Add photo click listeners for fullscreen view
          this.attachGalleryPhotoListeners(modal);
        }

        attachGalleryPhotoListeners(modal = null) {
          setTimeout(() => {
            // If no modal provided, try to find it
            if (!modal) {
              modal = document.querySelector('[style*="position: fixed"][style*="z-index: 2500"]');
            }
            
            if (!modal) return;
            
            const photoItems = modal.querySelectorAll('.photo-item');
            
            photoItems.forEach((item, index) => {
              // Remove any existing listeners by cloning the element
              const newItem = item.cloneNode(true);
              item.parentNode.replaceChild(newItem, item);
              
              newItem.addEventListener('click', (e) => {
                
                const photoIndex = parseInt(e.currentTarget.dataset.photoIndex);
                if (photoIndex >= 0 && photoIndex < this.photos.length) {
                  const photo = this.photos[photoIndex];

                  // Show the photo as overlay on top of All Photos modal
                  this.showPhotoFullscreenFromModal(photo);
                } else {
                  console.error('getAllPhotosModal - Invalid photo index:', photoIndex);
                }
              });
            });
            
            // Add dummy card click handlers for camera functionality
            const dummyCards = modal.querySelectorAll('.dummy-card');
            dummyCards.forEach((card) => {
              // Remove any existing listeners by cloning the element
              const newCard = card.cloneNode(true);
              card.parentNode.replaceChild(newCard, card);
              
              newCard.addEventListener('click', (e) => {
                const room = e.currentTarget.dataset.room;
                const name = e.currentTarget.dataset.name;
                const mode = e.currentTarget.dataset.mode;
                
                
                // Close the all photos modal first
                this.closeAllPhotosModal(modal);
                
                // Open camera based on the dummy type
                setTimeout(() => {
                  if (mode === 'dummy-before') {
                    this.openCameraFromGallery(room, name, 'before');
                  } else if (mode === 'dummy-after') {
                    this.openCameraFromGallery(room, name, 'after');
                  }
                  // Note: dummy-combined cards don't need camera functionality
                  // as combined photos are auto-generated when both before/after exist
                }, 100);
              });
            });
          }, 100);
        }

        closeAllPhotosModal(modal) {
          if (modal && modal.parentNode) {
            document.body.removeChild(modal);
          }
          // Restore background scrolling
          document.body.style.overflow = '';
        }

        showUploadOptionsPopup() {
          // Close any existing modals
          Utils.cleanupExistingModals(3000);

          // Get current location from URL or default
          const urlParams = new URLSearchParams(window.location.search);
          const currentLocation = urlParams.get('location') || 'tampa';
          const currentCleaner = urlParams.get('cleaner') || 'Kate';

          // Generate default album name based on current date and location
          const today = new Date();
          const dateStr = today.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          });
          const defaultAlbumName = `${currentCleaner} - ${dateStr}`;

          const modal = document.createElement('div');
          modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.8);
            z-index: 3000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            box-sizing: border-box;
          `;

          modal.innerHTML = `
            <div style="background: white; border-radius: 16px; padding: 20px; max-width: 450px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
              <!-- Header -->
              <div style="background: #F2C31B; margin: -20px -20px 20px -20px; padding: 14px 20px; border-radius: 16px 16px 0 0;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                  <h2 style="margin: 0; color: #303030; font-size: 24px; font-weight: bold;">📤 Upload</h2>
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <select id="upload-city-select" style="width: 120px; padding: 10px 12px; border: 2px solid #000; border-radius: 6px; font-size: 14px; background: #F2C31B; color: #000; font-weight: bold;">
                      <option value="tampa" ${currentLocation === 'tampa' ? 'selected' : ''}>Tampa</option>
                      <option value="st-petersburg" ${currentLocation === 'st-petersburg' ? 'selected' : ''}>St. Petersburg</option>
                      <option value="jacksonville" ${currentLocation === 'jacksonville' ? 'selected' : ''}>Jacksonville</option>
                      <option value="miami" ${currentLocation === 'miami' ? 'selected' : ''}>Miami</option>
                    </select>
                    <button id="close-upload-popup" style="background: none; border: none; font-size: 24px; color: #303030; cursor: pointer; padding: 4px; border-radius: 4px;" onmouseover="this.style.color='#000'" onmouseout="this.style.color='#303030'">✕</button>
                  </div>
                </div>
              </div>

              <!-- Upload Source and Album Name -->
              <div style="margin-bottom: 16px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                  <div>
                    <label style="display: block; font-weight: bold; color: #303030; margin-bottom: 6px; font-size: 15px;">
                      📤 Source
                    </label>
                    <select id="upload-method-select" style="width: 100%; padding: 12px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 16px; background: white; box-sizing: border-box;">
                      <option value="phone">📱 Phone</option>
                      <option value="google-drive" selected>☁️ Google Drive</option>
                      <option value="dropbox">📦 Dropbox</option>
                      <option value="storage">💾 Storage</option>
                    </select>
                  </div>
                  <div>
                    <label style="display: block; font-weight: bold; color: #303030; margin-bottom: 6px; font-size: 15px;">
                      📁 Album Name
                    </label>
                    <input type="text" id="album-name-input" value="${defaultAlbumName}" style="width: 100%; padding: 12px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 16px; background: white; color: #303030; box-sizing: border-box; font-family: 'Quicksand', sans-serif;" placeholder="Enter album name" readonly>
                  </div>
                </div>
              </div>

              <!-- Quality -->
              <div style="margin-bottom: 16px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
                  <label style="font-weight: bold; color: #303030; font-size: 15px;">
                    🗜️ Quality
                  </label>
                  <button id="quality-info-btn" style="background: none; border: none; font-size: 16px; color: #666; cursor: pointer; padding: 2px; border-radius: 4px;" onmouseover="this.style.color='#F2C31B'" onmouseout="this.style.color='#666'" title="Quality Options Guide">ℹ️</button>
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px;">
                  <label style="display: flex; align-items: center; padding: 8px 10px; border: 2px solid #999; border-radius: 8px; cursor: pointer; transition: all 0.2s; background: #f5f5f5;">
                    <input type="radio" name="quality" value="messenger" style="margin-right: 8px; transform: scale(1.2); accent-color: #000;">
                    <span style="font-size: 13px; font-weight: bold; color: #999;">Messenger (WhatsApp, SMS, Telegram)</span>
                  </label>
                  <label style="display: flex; align-items: center; padding: 8px 10px; border: 2px solid #F2C31B; border-radius: 8px; cursor: pointer; transition: all 0.2s; background: #F2C31B;">
                    <input type="radio" name="quality" value="social" checked style="margin-right: 8px; transform: scale(1.2); accent-color: #000;">
                    <span style="font-size: 13px; font-weight: bold; color: #000;">Social (Instagram, Facebook, LinkedIn)</span>
                  </label>
                  <label style="display: flex; align-items: center; padding: 8px 10px; border: 2px solid #999; border-radius: 8px; cursor: pointer; transition: all 0.2s; background: #f5f5f5;">
                    <input type="radio" name="quality" value="presentation" style="margin-right: 8px; transform: scale(1.2); accent-color: #000;">
                    <span style="font-size: 13px; font-weight: bold; color: #999;">Presentation (Websites, Portfolios)</span>
                  </label>
                  <label style="display: flex; align-items: center; padding: 8px 10px; border: 2px solid #999; border-radius: 8px; cursor: pointer; transition: all 0.2s; background: #f5f5f5;">
                    <input type="radio" name="quality" value="print" style="margin-right: 8px; transform: scale(1.2); accent-color: #000;">
                    <span style="font-size: 13px; font-weight: bold; color: #999;">Print (Flyers, Brochures, High-Detail)</span>
                  </label>
                </div>
              </div>

              <!-- Photo Types -->
              <div style="margin-bottom: 16px;">
                <label style="display: block; font-weight: bold; color: #303030; margin-bottom: 10px; font-size: 15px;">
                  📸 Photo Types
                </label>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;">
                  <label style="display: flex; align-items: center; padding: 6px; border: 2px solid #999; border-radius: 8px; cursor: pointer; transition: all 0.2s; background: #f5f5f5;">
                    <input type="checkbox" id="upload-before" style="margin-right: 6px; transform: scale(1.2); accent-color: #000;">
                    <span style="font-size: 13px; color: #999; font-weight: bold;">Before</span>
                  </label>
                  <label style="display: flex; align-items: center; padding: 6px; border: 2px solid #999; border-radius: 8px; cursor: pointer; transition: all 0.2s; background: #f5f5f5;">
                    <input type="checkbox" id="upload-after" style="margin-right: 6px; transform: scale(1.2); accent-color: #000;">
                    <span style="font-size: 13px; color: #999; font-weight: bold;">After</span>
                  </label>
                  <label style="display: flex; align-items: center; padding: 6px; border: 2px solid #F2C31B; border-radius: 8px; cursor: pointer; transition: all 0.2s; background: #F2C31B;">
                    <input type="checkbox" id="upload-combined" checked style="margin-right: 6px; transform: scale(1.2); accent-color: #000;">
                    <span style="font-size: 13px; color: #000; font-weight: bold;">Combined</span>
                  </label>
                </div>
              </div>


              <!-- Formats -->
              <div style="margin-bottom: 20px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
                  <label style="font-weight: bold; color: #303030; font-size: 15px;">
                    📐 Formats
                  </label>
                  <button id="format-info-btn" style="background: none; border: none; font-size: 16px; color: #666; cursor: pointer; padding: 2px; border-radius: 4px;" onmouseover="this.style.color='#F2C31B'" onmouseout="this.style.color='#666'" title="Formats Guide">ℹ️</button>
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px;">
                  <label style="display: flex; align-items: center; padding: 8px 10px; border: 2px solid #F2C31B; border-radius: 8px; cursor: pointer; transition: all 0.2s; background: #F2C31B;">
                    <input type="checkbox" id="format-instagram-facebook" checked style="margin-right: 8px; transform: scale(1.2); accent-color: #000;">
                    <span style="font-size: 13px; font-weight: bold; color: #000;">Instagram / Facebook Feed (4:5)</span>
                  </label>
                  <div id="square-format-card" class="format-card" style="border: 2px solid #F2C31B; border-radius: 8px; padding: 8px 10px; background: #F2C31B; transition: all 0.2s;" onmouseover="this.style.background='#F4C635'" onmouseout="this.updateCardStyle ? this.updateCardStyle() : this.style.background='#F2C31B'">
                    <div style="display: flex; align-items: center; margin-bottom: 6px;">
                      <span style="font-size: 13px; font-weight: bold; color: #000;">Square - LinkedIn / Yelp (1:1)</span>
                    </div>
                    <div style="display: flex; gap: 12px; margin-left: 8px;">
                      <label style="display: flex; align-items: center; cursor: pointer; padding: 2px 4px; border-radius: 4px; transition: all 0.2s;" onmouseover="this.style.background='rgba(0,0,0,0.1)'" onmouseout="this.style.background='transparent'">
                        <input type="checkbox" id="format-square-sidebyside" checked style="margin-right: 4px; transform: scale(0.9); accent-color: #000;">
                        <span style="font-size: 11px; color: #000;">Side-by-Side (vertical split)</span>
                      </label>
                      <label style="display: flex; align-items: center; cursor: pointer; padding: 2px 4px; border-radius: 4px; transition: all 0.2s;" onmouseover="this.style.background='rgba(0,0,0,0.1)'" onmouseout="this.style.background='transparent'">
                        <input type="checkbox" id="format-square-stack" checked style="margin-right: 4px; transform: scale(0.9); accent-color: #000;">
                        <span style="font-size: 11px; color: #000;">Stack (horizontal split)</span>
                      </label>
                    </div>
                  </div>
                  <div id="landscape-format-card" class="format-card" style="border: 2px solid #999; border-radius: 8px; padding: 8px 10px; background: #f5f5f5; transition: all 0.2s;" onmouseover="this.style.background='#e5e5e5'" onmouseout="this.updateCardStyle()">
                    <div style="display: flex; align-items: center; margin-bottom: 6px;">
                      <span style="font-size: 13px; font-weight: bold; color: #999;">Websites / Presentations (16:9)</span>
                    </div>
                    <div style="display: flex; gap: 12px; margin-left: 8px;">
                      <label style="display: flex; align-items: center; cursor: pointer; padding: 2px 4px; border-radius: 4px; transition: all 0.2s;" onmouseover="this.style.background='rgba(0,0,0,0.1)'" onmouseout="this.style.background='transparent'">
                        <input type="checkbox" id="format-landscape-sidebyside" style="margin-right: 4px; transform: scale(0.9); accent-color: #000;">
                        <span style="font-size: 11px; color: #999;">Side-by-Side (vertical split)</span>
                      </label>
                      <label style="display: flex; align-items: center; cursor: pointer; padding: 2px 4px; border-radius: 4px; transition: all 0.2s;" onmouseover="this.style.background='rgba(0,0,0,0.1)'" onmouseout="this.style.background='transparent'">
                        <input type="checkbox" id="format-landscape-stack" style="margin-right: 4px; transform: scale(0.9); accent-color: #000;">
                        <span style="font-size: 11px; color: #999;">Stack (horizontal split)</span>
                      </label>
                    </div>
                  </div>
                  <label style="display: flex; align-items: center; padding: 8px 10px; border: 2px solid #999; border-radius: 8px; cursor: pointer; transition: all 0.2s; background: #f5f5f5;">
                    <input type="checkbox" id="format-instagram-landscape" style="margin-right: 8px; transform: scale(1.2); accent-color: #000;">
                    <span style="font-size: 13px; font-weight: bold; color: #999;">Instagram / Facebook Landscape (1.91:1)</span>
                  </label>
                </div>
              </div>

              <!-- Action Buttons -->
              <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button id="cancel-upload" style="background: #f5f5f5; color: #666; border: none; padding: 12px 20px; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: bold; transition: all 0.2s;" onmouseover="this.style.background='#e5e5e5'" onmouseout="this.style.background='#f5f5f5'">
                  Cancel
                </button>
                <button id="preview-formats" style="background: #303030; color: #F2C31B; border: none; padding: 12px 20px; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: bold; transition: all 0.2s;" onmouseover="this.style.background='#404040'" onmouseout="this.style.background='#303030'">
                  👁️ Preview
                </button>
                <button id="start-upload" style="background: #F2C31B; color: #303030; border: none; padding: 12px 20px; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: bold; transition: all 0.2s;" onmouseover="this.style.background='#E6B800'" onmouseout="this.style.background='#F2C31B'">
                  📤 Start Upload
                </button>
              </div>
            </div>
          `;

          document.body.appendChild(modal);
          document.body.style.overflow = 'hidden';

          // Add event listeners
          this.setupUploadPopupListeners(modal);
        }

        formatLocationName(location) {
          const locationNames = {
            'tampa': 'Tampa',
            'st-petersburg': 'St. Petersburg',
            'jacksonville': 'Jacksonville',
            'miami': 'Miami'
          };
          return locationNames[location] || location;
        }

        formatUploadMethod(method) {
          const methodNames = {
            'phone': 'Phone',
            'google-drive': 'Google Drive',
            'dropbox': 'Dropbox',
            'storage': 'Storage'
          };
          return methodNames[method] || method;
        }

        formatQuality(quality) {
          const qualityNames = {
            'messenger': 'Messenger (WhatsApp, SMS, Telegram)',
            'social': 'Social (Instagram, Facebook, LinkedIn)',
            'presentation': 'Presentation (Websites, Portfolios)',
            'print': 'Print (Flyers, Brochures, High-Detail)'
          };
          return qualityNames[quality] || quality;
        }

        formatSelectedFormats(formats) {
          const formatNames = {
            'instagram-facebook': 'Instagram / Facebook Feed (4:5)',
            'square-sidebyside': 'Square - LinkedIn / Yelp (1:1) - Side-by-Side (vertical split)',
            'square-stack': 'Square - LinkedIn / Yelp (1:1) - Stack (horizontal split)',
            'landscape-sidebyside': 'Websites / Presentations (16:9) - Side-by-Side (vertical split)',
            'landscape-stack': 'Websites / Presentations (16:9) - Stack (horizontal split)',
            'instagram-landscape': 'Instagram / Facebook Landscape (1.91:1)'
          };
          
          const selectedFormats = Object.keys(formats).filter(key => formats[key]);
          if (selectedFormats.length === 0) return 'None selected';
          if (selectedFormats.length === 1) return formatNames[selectedFormats[0]];
          if (selectedFormats.length === 2) return formatNames[selectedFormats[0]] + ', ' + formatNames[selectedFormats[1]];
          return selectedFormats.length + ' formats selected';
        }

        showInfoPopup(type) {
          const modal = document.createElement('div');
          modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.7);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            box-sizing: border-box;
          `;

          let content = '';
          let title = '';

          if (type === 'quality') {
            title = 'Quality Options Guide';
            content = `
              <div style="margin-bottom: 20px;">
                <h3 style="color: #303030; margin: 0 0 15px 0; font-size: 18px;">1️⃣ Quality Options</h3>
                <div style="overflow-x: auto;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 600px;">
                    <thead>
                      <tr style="background: #f8f9fa;">
                        <th style="padding: 8px 6px; text-align: left; border: 1px solid #ddd; font-size: 12px;">Quality</th>
                        <th style="padding: 8px 6px; text-align: left; border: 1px solid #ddd; font-size: 12px;">Platforms</th>
                        <th style="padding: 8px 6px; text-align: left; border: 1px solid #ddd; font-size: 12px;">Resolution</th>
                        <th style="padding: 8px 6px; text-align: left; border: 1px solid #ddd; font-size: 12px;">JPEG</th>
                        <th style="padding: 8px 6px; text-align: left; border: 1px solid #ddd; font-size: 12px;">Use Case</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-weight: bold; font-size: 12px;">Messenger</td>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-size: 11px;">WhatsApp, SMS, Telegram</td>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-size: 11px;">800×450 px</td>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-size: 11px;">30%</td>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-size: 11px;">Quick send, small file size</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-weight: bold; font-size: 12px;">Social Media</td>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-size: 11px;">Instagram, Facebook, LinkedIn</td>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-size: 11px;">1024×576 px</td>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-size: 11px;">50%</td>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-size: 11px;">Best for feeds & stories</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-weight: bold; font-size: 12px;">Presentation</td>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-size: 11px;">Websites, Reports, Portfolios</td>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-size: 11px;">1600×900 px</td>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-size: 11px;">70%</td>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-size: 11px;">Sharp and professional</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-weight: bold; font-size: 12px;">Print</td>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-size: 11px;">Flyers, Brochures, High-Detail</td>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-size: 11px;">1920×1080 px</td>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-size: 11px;">85%</td>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-size: 11px;">Highest quality for print</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div style="margin-bottom: 20px;">
                <h4 style="color: #303030; margin: 0 0 10px 0;">Notes:</h4>
                <ul style="margin: 0; padding-left: 20px; color: #666;">
                  <li>Higher resolution and JPEG quality = larger file size.</li>
                  <li>Choose the setting based on where the photo will be used.</li>
                </ul>
              </div>
              <div>
                <h4 style="color: #303030; margin: 0 0 10px 0;">Tips for Choosing:</h4>
                <ul style="margin: 0; padding-left: 20px; color: #666;">
                  <li><strong>Messenger:</strong> Quick sharing with clients or team members via WhatsApp/SMS/Telegram.</li>
                  <li><strong>Social Media:</strong> Use for Instagram or Facebook posts; balanced quality keeps file size manageable.</li>
                  <li><strong>Presentation:</strong> Professional look for slideshows, websites, or client portfolios.</li>
                  <li><strong>Print:</strong> Use only when you need high-detail images for brochures, flyers, or archival purposes.</li>
                </ul>
              </div>
            `;
          } else if (type === 'format') {
            title = 'Photo Formats Guide';
            content = `
              <div style="margin-bottom: 20px;">
                <h3 style="color: #303030; margin: 0 0 15px 0; font-size: 18px;">2️⃣ Photo Formats (Aspect Ratios)</h3>
                <div style="overflow-x: auto;">
                  <table style="width: 100%; border-collapse: collapse; font-size: 13px; min-width: 500px;">
                    <thead>
                      <tr style="background: #f8f9fa;">
                        <th style="padding: 8px 6px; text-align: left; border: 1px solid #ddd; font-size: 12px;">Format</th>
                        <th style="padding: 8px 6px; text-align: left; border: 1px solid #ddd; font-size: 12px;">Platforms</th>
                        <th style="padding: 8px 6px; text-align: left; border: 1px solid #ddd; font-size: 12px;">Ratio</th>
                        <th style="padding: 8px 6px; text-align: left; border: 1px solid #ddd; font-size: 12px;">Use Case</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-weight: bold; font-size: 12px;">Instagram / Facebook Feed</td>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-size: 11px;">Instagram, Facebook</td>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-size: 11px;">4:5</td>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-size: 11px;">Best for vertical feed posts</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-weight: bold; font-size: 12px;">Square - LinkedIn / Yelp</td>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-size: 11px;">LinkedIn, Yelp</td>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-size: 11px;">1:1</td>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-size: 11px;">Square format for business listings</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-weight: bold; font-size: 12px;">Websites / Presentations</td>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-size: 11px;">Websites, client reports</td>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-size: 11px;">16:9</td>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-size: 11px;">Standard landscape for slides</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-weight: bold; font-size: 12px;">Instagram / Facebook Landscape</td>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-size: 11px;">Instagram, Facebook</td>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-size: 11px;">1.91:1</td>
                        <td style="padding: 8px 6px; border: 1px solid #ddd; font-size: 11px;">Landscape posts for feeds</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div style="margin-bottom: 20px;">
                <h4 style="color: #303030; margin: 0 0 10px 0;">Notes:</h4>
                <ul style="margin: 0; padding-left: 20px; color: #666;">
                  <li>Formats automatically adjust resolution proportionally to preserve quality.</li>
                  <li>Users can pick a format independent of quality — e.g., Social Media quality with Square or Portrait format.</li>
                </ul>
              </div>
            `;
          }

          modal.innerHTML = `
            <div style="background: white; border-radius: 16px; padding: 20px; max-width: 95vw; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 8px 32px rgba(0,0,0,0.3); margin: 0 10px;">
              <!-- Header -->
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 2px solid #f0f0f0; position: relative;">
                <h2 style="margin: 0; color: #303030; font-size: 20px; font-weight: bold; line-height: 1.3;">📖 QuickBeforeAfter – Photo Export Guide</h2>
                <button id="close-info-popup" style="background: #f5f5f5; border: 2px solid #ddd; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; color: #666; cursor: pointer; position: absolute; top: -8px; right: -8px;" onmouseover="this.style.background='#e5e5e5'; this.style.borderColor='#ccc'" onmouseout="this.style.background='#f5f5f5'; this.style.borderColor='#ddd'">✕</button>
              </div>

              <div style="margin-bottom: 20px; color: #666; font-size: 14px; line-height: 1.5;">
                This guide explains all export options in QuickBeforeAfter: Quality Levels, Resolutions, and Formats. Use it to pick the best settings for social media, client reports, presentations, or printing.
              </div>

              ${content}
            </div>
          `;

          document.body.appendChild(modal);
          document.body.style.overflow = 'hidden';

          // Add event listeners
          document.getElementById('close-info-popup').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
          });

          // Close on background click
          Utils.attachModalCloseHandlers(modal, () => Utils.closeModal(modal), {
            closeOnBackdrop: true,
            closeOnEscape: true
          });
        }

        setupUploadPopupListeners(modal) {
          // Add updateCardStyle function to format cards
          const landscapeCard = document.getElementById('landscape-format-card');
          if (landscapeCard) {
            landscapeCard.updateCardStyle = function() {
              const sideBySideChecked = document.getElementById('format-landscape-sidebyside').checked;
              const stackChecked = document.getElementById('format-landscape-stack').checked;

              if (sideBySideChecked || stackChecked) {
                this.style.border = '2px solid #F2C31B';
                this.style.background = '#F2C31B';
                this.querySelector('span').style.color = '#000';
                this.querySelectorAll('label span').forEach(span => span.style.color = '#000');
              } else {
                this.style.border = '2px solid #999';
                this.style.background = '#f5f5f5';
                this.querySelector('span').style.color = '#999';
                this.querySelectorAll('label span').forEach(span => span.style.color = '#999');
              }
            };
          }

          const squareCard = document.getElementById('square-format-card');
          if (squareCard) {
            squareCard.updateCardStyle = function() {
              const sideBySideChecked = document.getElementById('format-square-sidebyside').checked;
              const stackChecked = document.getElementById('format-square-stack').checked;

              if (sideBySideChecked || stackChecked) {
                this.style.border = '2px solid #F2C31B';
                this.style.background = '#F2C31B';
                this.querySelector('span').style.color = '#000';
                this.querySelectorAll('label span').forEach(span => span.style.color = '#000');
              } else {
                this.style.border = '2px solid #999';
                this.style.background = '#f5f5f5';
                this.querySelector('span').style.color = '#999';
                this.querySelectorAll('label span').forEach(span => span.style.color = '#999');
              }
            };
          }

          // Close button
          document.getElementById('close-upload-popup').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
          });

          // Cancel button
          document.getElementById('cancel-upload').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
          });

          // Close on background click
          Utils.attachModalCloseHandlers(modal, () => Utils.closeModal(modal), {
            closeOnBackdrop: true,
            closeOnEscape: true
          });

          // Start upload button
          document.getElementById('start-upload').addEventListener('click', () => {
            this.handleUploadStart(modal);
          });

          // Preview formats button
          document.getElementById('preview-formats').addEventListener('click', () => {
            this.showFormatPreview(modal);
          });

          // Update album name and URL when city changes
          document.getElementById('upload-city-select').addEventListener('change', (e) => {
            const albumNameInput = document.getElementById('album-name-input');
            const currentCleaner = new URLSearchParams(window.location.search).get('cleaner') || 'Kate';
            const selectedLocation = e.target.value;
            const today = new Date();
            const dateStr = today.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            });
            const newAlbumName = `${currentCleaner} - ${this.formatLocationName(selectedLocation)} - ${dateStr}`;
            albumNameInput.value = newAlbumName;
            
            // Update URL parameters to reflect new city selection
            if (selectedLocation) {
              const newUrl = `${window.location.origin}${window.location.pathname}?cleaner=${encodeURIComponent(currentCleaner)}&location=${encodeURIComponent(selectedLocation)}`;
              
              // Update URL without page reload using pushState
              window.history.pushState({ cleaner: currentCleaner, location: selectedLocation }, '', newUrl);
              
              // Update the header to reflect the new city (if needed)
              // Since the header shows cleaner name, no change needed there
            }
          });

          // Add checkbox change handlers for dynamic styling
          const checkboxIds = ['upload-before', 'upload-after', 'upload-combined'];
          
          checkboxIds.forEach(id => {
            const checkbox = document.getElementById(id);
            const label = checkbox.closest('label');
            
            checkbox.addEventListener('change', () => {
              if (checkbox.checked) {
                // Active state: yellow background, black text, yellow border
                label.style.background = '#F2C31B';
                label.style.borderColor = '#F2C31B';
                
                // Update text colors to black
                const spans = label.querySelectorAll('span');
                spans.forEach(span => {
                  span.style.color = '#000';
                });
                
                // Update visual indicators to black
                const divs = label.querySelectorAll('div[style*="background:"]');
                divs.forEach(div => {
                  if (div.style.background.includes('999') || div.style.background.includes('#999')) {
                    div.style.background = '#000';
                  }
                });
              } else {
                // Inactive state: gray background, gray text, gray border
                label.style.background = '#f5f5f5';
                label.style.borderColor = '#999';
                
                // Update text colors to gray
                const spans = label.querySelectorAll('span');
                spans.forEach(span => {
                  span.style.color = '#999';
                });
                
                // Update visual indicators to gray
                const divs = label.querySelectorAll('div[style*="background:"]');
                divs.forEach(div => {
                  if (div.style.background.includes('000') || div.style.background.includes('#000')) {
                    div.style.background = '#999';
                  }
                });
              }
            });
          });

          // Add radio button change handlers for quality selection
          const qualityRadios = document.querySelectorAll('input[name="quality"]');
          
          qualityRadios.forEach(radio => {
            radio.addEventListener('change', () => {
              // Reset all quality labels to inactive state
              qualityRadios.forEach(r => {
                const label = r.closest('label');
                label.style.background = '#f5f5f5';
                label.style.borderColor = '#999';
                
                const spans = label.querySelectorAll('span');
                spans.forEach(span => {
                  span.style.color = '#999';
                });
              });
              
              // Set selected radio to active state
              const selectedLabel = radio.closest('label');
              selectedLabel.style.background = '#F2C31B';
              selectedLabel.style.borderColor = '#F2C31B';
              
              const selectedSpans = selectedLabel.querySelectorAll('span');
              selectedSpans.forEach(span => {
                span.style.color = '#000';
              });
            });
          });

          // Add checkbox change handlers for format selection
          const formatCheckboxIds = ['format-instagram-facebook', 'format-square-sidebyside', 'format-square-stack', 'format-landscape-sidebyside', 'format-landscape-stack', 'format-instagram-landscape'];
          
          formatCheckboxIds.forEach(id => {
            const checkbox = document.getElementById(id);
            if (!checkbox) return; // Skip if checkbox doesn't exist

            // Handle different checkbox types
            if (id.includes('format-square-') || id.includes('format-landscape-')) {
              // Square and landscape checkboxes are in cards, not labels
              checkbox.addEventListener('change', () => {
                const card = checkbox.closest('.format-card');
                if (card && card.updateCardStyle) {
                  card.updateCardStyle();
                }
              });
            } else {
              // Instagram checkboxes are still in labels
              const label = checkbox.closest('label');
              if (!label) return;

              checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                  // Active state: yellow background, black text, yellow border
                  label.style.background = '#F2C31B';
                  label.style.borderColor = '#F2C31B';

                  // Update text colors to black
                  const spans = label.querySelectorAll('span');
                  spans.forEach(span => {
                    span.style.color = '#000';
                  });
                } else {
                  // Inactive state: gray background, gray text, gray border
                  label.style.background = '#f5f5f5';
                  label.style.borderColor = '#999';

                  // Update text colors to gray
                  const spans = label.querySelectorAll('span');
                  spans.forEach(span => {
                    span.style.color = '#999';
                  });
                }
              });
            }
          });

          // Add info button event listeners
          document.getElementById('quality-info-btn').addEventListener('click', () => {
            this.showInfoPopup('quality');
          });

          document.getElementById('format-info-btn').addEventListener('click', () => {
            this.showInfoPopup('format');
          });

        }

        handleUploadStart(modal) {
          // Get selected options
          const albumName = document.getElementById('album-name-input').value.trim();
          const selectedCity = document.getElementById('upload-city-select').value;
          const uploadMethod = document.getElementById('upload-method-select').value;
          const selectedQuality = document.querySelector('input[name="quality"]:checked').value;
          
          const photoTypes = {
            before: document.getElementById('upload-before').checked,
            after: document.getElementById('upload-after').checked,
            combined: document.getElementById('upload-combined').checked
          };

          const selectedFormats = {
            'instagram-facebook': document.getElementById('format-instagram-facebook').checked,
            'square-sidebyside': document.getElementById('format-square-sidebyside').checked,
            'square-stack': document.getElementById('format-square-stack').checked,
            'landscape-sidebyside': document.getElementById('format-landscape-sidebyside').checked,
            'landscape-stack': document.getElementById('format-landscape-stack').checked,
            'instagram-landscape': document.getElementById('format-instagram-landscape').checked
          };

          // Validation
          if (!albumName) {
            alert('Please enter an album name');
            return;
          }

          const hasSelectedTypes = Object.values(photoTypes).some(selected => selected);
          if (!hasSelectedTypes) {
            alert('Please select at least one photo type to upload');
            return;
          }

          const hasSelectedFormats = Object.values(selectedFormats).some(selected => selected);
          if (!hasSelectedFormats) {
            alert('Please select at least one format');
            return;
          }

          // Close the popup
          document.body.removeChild(modal);
          document.body.style.overflow = '';

          // Start the upload process
          this.processUpload({
            albumName,
            city: selectedCity,
            uploadMethod,
            quality: selectedQuality,
            formats: selectedFormats,
            photoTypes
          });
        }

        showFormatPreview(uploadModal) {
          // Get the selected formats from the upload modal
          const selectedFormats = {
            'instagram-facebook': document.getElementById('format-instagram-facebook').checked,
            'square-sidebyside': document.getElementById('format-square-sidebyside').checked,
            'square-stack': document.getElementById('format-square-stack').checked,
            'landscape-sidebyside': document.getElementById('format-landscape-sidebyside').checked,
            'landscape-stack': document.getElementById('format-landscape-stack').checked,
            'instagram-landscape': document.getElementById('format-instagram-landscape').checked
          };

          // Filter only selected formats
          const activeFormats = Object.keys(selectedFormats).filter(key => selectedFormats[key]);

          if (activeFormats.length === 0) {
            alert('Please select at least one format to preview');
            return;
          }

          // Find any before/after photo pair to use for preview generation
          const beforePhotos = this.photos.filter(photo => photo.mode === 'before');
          if (beforePhotos.length === 0) {
            alert('No before photos available for preview. Please take some before/after photos first.');
            return;
          }

          // Use the first before photo and try to find its corresponding after photo
          const sampleBefore = beforePhotos[0];
          const sampleAfter = this.photos.find(photo =>
            photo.mode === 'after' &&
            photo.room === sampleBefore.room &&
            photo.name === sampleBefore.name
          );

          if (!sampleAfter) {
            alert('No matching before/after photo pairs available for preview.');
            return;
          }

          // Create preview modal
          const previewModal = document.createElement('div');
          previewModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.9);
            z-index: 3001;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            box-sizing: border-box;
            overflow-y: auto;
          `;

          // Generate preview content
          let previewContent = `
            <div style="background: white; border-radius: 16px; padding: 24px; max-width: 900px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
              <!-- Header -->
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; border-bottom: 2px solid #F2C31B; padding-bottom: 16px;">
                <h2 style="margin: 0; color: #303030; font-size: 28px; font-weight: bold;">👁️ Format Preview</h2>
                <button id="close-preview-modal" style="background: none; border: none; font-size: 28px; color: #666; cursor: pointer; padding: 4px; border-radius: 4px;" onmouseover="this.style.color='#F2C31B'" onmouseout="this.style.color='#666'">✕</button>
              </div>

              <!-- Preview explanation -->
              <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin-bottom: 24px; border-left: 4px solid #F2C31B;">
                <p style="margin: 0; color: #303030; font-size: 16px; line-height: 1.5;">
                  <strong>Preview Mode:</strong> Shows how your selected formats will appear for download vs. display.<br>
                  <strong>Sample Photo:</strong> ${sampleBefore.name} - ${sampleBefore.room}
                </p>
              </div>

              <!-- Format previews -->
              <div style="display: grid; gap: 32px;">
          `;

          // Add preview for each selected format
          activeFormats.forEach(format => {
            // Map format to templateType and get display name (same as actual processing)
            const templateType = this.mapFormatToTemplateType(format);
            const formatName = this.getTemplateDisplayName(templateType);
            previewContent += `
              <div style="border: 2px solid #e1e5e9; border-radius: 12px; padding: 20px; background: #fafbfc;">
                <h3 style="margin: 0 0 16px 0; color: #303030; font-size: 20px; font-weight: bold; border-bottom: 1px solid #e1e5e9; padding-bottom: 8px;">
                  ${formatName}
                </h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                  <!-- Preview Mode -->
                  <div style="text-align: center;">
                    <h4 style="margin: 0 0 12px 0; color: #666; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Preview Mode</h4>
                    <div style="border: 2px dashed #F2C31B; border-radius: 8px; padding: 16px; background: #fff9e6; min-height: 200px; display: flex; align-items: center; justify-content: center;">
                      <img id="preview-${format}" src="" style="max-width: 100%; max-height: 180px; object-fit: contain; border-radius: 4px;" />
                    </div>
                    <p style="margin: 8px 0 0 0; font-size: 12px; color: #666; font-style: italic;">Optimized for quick preview</p>
                  </div>

                  <!-- Download Mode -->
                  <div style="text-align: center;">
                    <h4 style="margin: 0 0 12px 0; color: #666; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Download Ready</h4>
                    <div style="border: 2px solid #303030; border-radius: 8px; padding: 16px; background: #f8f9fa; min-height: 200px; display: flex; align-items: center; justify-content: center;">
                      <img id="download-${format}" src="" style="max-width: 100%; max-height: 180px; object-fit: contain; border-radius: 4px;" />
                    </div>
                    <p style="margin: 8px 0 0 0; font-size: 12px; color: #666; font-style: italic;">High quality for final use</p>
                  </div>
                </div>
              </div>
            `;
          });

          previewContent += `
              </div>

              <!-- Action buttons -->
              <div style="margin-top: 32px; display: flex; gap: 12px; justify-content: flex-end; border-top: 2px solid #e1e5e9; padding-top: 20px;">
                <button id="close-preview-btn" style="background: #f5f5f5; color: #666; border: none; padding: 12px 24px; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: bold; transition: all 0.2s;" onmouseover="this.style.background='#e5e5e5'" onmouseout="this.style.background='#f5f5f5'">
                  Close Preview
                </button>
                <button id="back-to-upload" style="background: #F2C31B; color: #303030; border: none; padding: 12px 24px; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: bold; transition: all 0.2s;" onmouseover="this.style.background='#E6B800'" onmouseout="this.style.background='#F2C31B'">
                  Back to Upload
                </button>
              </div>
            </div>
          `;

          previewModal.innerHTML = previewContent;
          document.body.appendChild(previewModal);

          // Generate the actual format variations
          this.generateFormatPreviews(sampleBefore, sampleAfter, activeFormats);

          // Add event listeners
          this.setupPreviewModalListeners(previewModal);
        }


        async generateFormatPreviews(beforePhoto, afterPhoto, formats) {
          for (const format of formats) {
            try {
              // Map format to templateType for the existing logic
              const templateType = this.mapFormatToTemplateType(format);

              // Generate preview version (lower quality, optimized for quick display)
              const previewData = await this.createCombinedPhotoForFormat(
                beforePhoto, afterPhoto, templateType, 'preview'
              );
              const previewImg = document.getElementById(`preview-${format}`);
              if (previewImg && previewData) {
                previewImg.src = previewData;
              }

              // Generate download version (high quality, ready for final use)
              const downloadData = await this.createCombinedPhotoForFormat(
                beforePhoto, afterPhoto, templateType, 'download'
              );
              const downloadImg = document.getElementById(`download-${format}`);
              if (downloadImg && downloadData) {
                downloadImg.src = downloadData;
              }
            } catch (error) {
              console.error(`Error generating preview for format ${format}:`, error);
            }
          }
        }

        mapFormatToTemplateType(format) {
          const formatMapping = {
            'instagram-facebook': 'portrait',
            'square-sidebyside': 'square_side',
            'square-stack': 'square_stack',
            'landscape-sidebyside': 'sidebyside_landscape',
            'landscape-stack': 'landscape',
            'instagram-landscape': 'blog'
          };
          return formatMapping[format] || 'default';
        }

        async createCombinedPhotoForFormat(beforePhoto, afterPhoto, templateType, mode = 'download') {
          return new Promise((resolve) => {
            // Use the existing createCombinedPhotoInMemory logic but apply quality mode
            PhotoEditor.createCombinedPhotoInMemory(
              beforePhoto.originalDataUrlNoLabel || beforePhoto.originalDataUrl || beforePhoto.dataUrl,
              afterPhoto.originalDataUrlNoLabel || afterPhoto.originalDataUrl || afterPhoto.dataUrl,
              templateType,
              beforePhoto,
              afterPhoto,
              (combinedDataUrl) => {
                if (mode === 'preview') {
                  // For preview mode, compress/scale down the result
                  this.compressImageForPreview(combinedDataUrl).then(resolve);
                } else {
                  // For download mode, use the full quality result
                  resolve(combinedDataUrl);
                }
              },
              this.labelsEnabled
            );
          });
        }

        async compressImageForPreview(dataUrl) {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');

              // Scale down for preview (50% size)
              canvas.width = Math.round(img.naturalWidth * 0.5);
              canvas.height = Math.round(img.naturalHeight * 0.5);

              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

              // Lower quality for faster display
              const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
              resolve(compressedDataUrl);
            };
            img.src = dataUrl;
          });
        }

        setupPreviewModalListeners(previewModal) {
          // Close buttons
          const closeBtn = document.getElementById('close-preview-btn');
          const closeModalBtn = document.getElementById('close-preview-modal');
          const backBtn = document.getElementById('back-to-upload');

          const closePreview = () => {
            document.body.removeChild(previewModal);
          };

          if (closeBtn) closeBtn.addEventListener('click', closePreview);
          if (closeModalBtn) closeModalBtn.addEventListener('click', closePreview);
          if (backBtn) backBtn.addEventListener('click', closePreview);

          // ESC key handler
          const handleEscape = (e) => {
            if (e.key === 'Escape') {
              closePreview();
              document.removeEventListener('keydown', handleEscape);
            }
          };
          document.addEventListener('keydown', handleEscape);
        }

        processUpload(options) {
          
          // Filter photos based on selected types
          let photosToUpload = this.photos.filter(photo => {
            const shouldInclude = (
              (photo.mode === 'before' && options.photoTypes.before) ||
              (photo.mode === 'after' && options.photoTypes.after) ||
              (photo.mode === 'mix' && options.photoTypes.combined)
            );
            return shouldInclude;
          });


          if (photosToUpload.length === 0) {
            alert('No photos found matching the selected criteria');
            return;
          }

          // Show upload progress
          this.showUploadProgress(photosToUpload, options);
        }

        showUploadProgress(photos, options) {
          // Create progress modal
          const modal = document.createElement('div');
          modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.8);
            z-index: 3000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            box-sizing: border-box;
          `;

          modal.innerHTML = `
            <div style="background: white; border-radius: 16px; padding: 24px; max-width: 400px; width: 100%; text-align: center; box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
              <h2 style="margin: 0 0 20px 0; color: #303030; font-size: 24px; font-weight: bold;">📤 Uploading Photos</h2>
              
              <div style="margin-bottom: 16px;">
                <div style="font-size: 16px; color: #666; margin-bottom: 8px;">Album: <strong>${options.albumName}</strong></div>
                <div style="font-size: 16px; color: #666; margin-bottom: 8px;">City: <strong>${this.formatLocationName(options.city)}</strong></div>
                <div style="font-size: 14px; color: #666; margin-bottom: 4px;">
                  Upload Method: <strong>${this.formatUploadMethod(options.uploadMethod)}</strong>
                </div>
                <div style="font-size: 14px; color: #666; margin-bottom: 4px;">
                  Quality: <strong>${this.formatQuality(options.quality)}</strong>
                </div>
                <div style="font-size: 14px; color: #666; margin-bottom: 4px;">
                  Formats: <strong>${this.formatSelectedFormats(options.formats)}</strong>
                </div>
              </div>

              <div style="margin-bottom: 20px;">
                <div style="font-size: 18px; font-weight: bold; color: #303030; margin-bottom: 8px;">
                  <span id="upload-current">0</span> / <span id="upload-total">${photos.length * Object.keys(options.formats).filter(key => options.formats[key]).length}</span> uploads
                </div>
                <div style="width: 100%; height: 8px; background: #f0f0f0; border-radius: 4px; overflow: hidden;">
                  <div id="upload-progress-bar" style="height: 100%; background: #F2C31B; width: 0%; transition: width 0.3s ease;"></div>
                </div>
              </div>

              <div id="upload-status" style="font-size: 14px; color: #666; margin-bottom: 16px;">
                Preparing upload...
              </div>

              <button id="cancel-upload-process" style="background: #f5f5f5; color: #666; border: none; padding: 10px 16px; border-radius: 6px; font-size: 14px; cursor: pointer;" onmouseover="this.style.background='#e5e5e5'" onmouseout="this.style.background='#f5f5f5'">
                Cancel Upload
              </button>
            </div>
          `;

          document.body.appendChild(modal);

          // Start real upload process with parallel uploads
          this.parallelUpload(photos, options, modal);
        }


        async parallelUpload(photos, options, modal) {
          const progressBar = document.getElementById('upload-progress-bar');
          const currentSpan = document.getElementById('upload-current');
          const statusDiv = document.getElementById('upload-status');
          
          let cancelled = false;
          let completedUploads = 0;
          let uploadedFiles = [];
          let errors = [];

          // Get environment variables based on location
          const locationKey = this.getLocationKey(options.city);
          const SCRIPT_URL = window[`VITE_${locationKey}_SCRIPT_URL`] || window.GOOGLE_SCRIPT_URL;
          const FOLDER_ID = window[`VITE_${locationKey}_FOLDER_ID`] || window.GOOGLE_FOLDER_ID;

          if (!SCRIPT_URL || !FOLDER_ID) {
            statusDiv.textContent = 'Configuration error: Missing script URL or folder ID';
            setTimeout(() => {
              alert('Upload configuration is missing. Please contact administrator.');
              document.body.removeChild(modal);
              document.body.style.overflow = '';
            }, 2000);
            return;
          }

          // Cancel button with confirmation
          document.getElementById('cancel-upload-process').addEventListener('click', () => {
            this.showCancelUploadConfirmation(modal, () => {
              cancelled = true;
              statusDiv.textContent = 'Upload cancelled by user';
              
              const cancelBtn = document.getElementById('cancel-upload-process');
              if (cancelBtn) {
                cancelBtn.textContent = 'Cancelling...';
                cancelBtn.disabled = true;
                cancelBtn.style.opacity = '0.6';
                cancelBtn.style.cursor = 'not-allowed';
              }
              
              setTimeout(() => {
                document.body.removeChild(modal);
                document.body.style.overflow = '';
              }, 1000);
            });
          });

          // Create upload tasks for all photos and formats
          const uploadTasks = [];
          
          photos.forEach(photo => {
            // Get all selected formats
            const selectedFormats = Object.keys(options.formats).filter(key => options.formats[key]);
            
            selectedFormats.forEach(format => {
              uploadTasks.push({ photo, format });
            });
          });

          const totalTasks = uploadTasks.length;

          const uploadPhoto = async (photo, format = 'default') => {
            if (cancelled) return null;
            
            
            try {
              let photoData = photo.dataUrl;
              let filename = `${photo.name}_${photo.mode}`;
              
              // Generate different formats if needed
              if (format !== 'default') {
                photoData = await this.generatePhotoFormat(photo, format);
                filename = `${photo.name}_${photo.mode}_${format}`;
              }
              
              // Apply compression based on quality setting
              const compressionSettings = this.getCompressionSettings(options.quality);
              
              const originalSize = photoData.length;
              const compressionStart = performance.now();
              
              photoData = await this.compressPhoto(
                photoData, 
                compressionSettings.quality, 
                compressionSettings.maxWidth, 
                compressionSettings.maxHeight
              );
              
              const compressionTime = performance.now() - compressionStart;
              const compressedSize = photoData.length;
              const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
              
              
              filename += '.jpg';
              
              // Prepare form data
              const formData = new FormData();
              formData.append('folderId', FOLDER_ID);
              formData.append('filename', filename);
              formData.append('albumName', options.albumName);
              formData.append('room', photo.room || 'general');
              formData.append('type', photo.mode);
              formData.append('format', format);
              formData.append('timestamp', photo.timestamp || Date.now());
              formData.append('location', options.city);
              formData.append('cleanerName', new URLSearchParams(window.location.search).get('cleaner') || 'Kate');
              formData.append('image', photoData);

              const uploadStart = performance.now();
              
              const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                body: formData
              });

              const uploadTime = performance.now() - uploadStart;
              
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }

              const result = await response.json();
              
              if (result.success) {
                return {
                  ...result,
                  originalPhoto: photo,
                  format: format
                };
              } else {
                throw new Error(result.message || 'Upload failed');
              }
            } catch (error) {
              console.error(`❌ Upload error for ${photo.name}:`, error);
              throw { photo, format, error: error.message };
            }
          };

          // Process uploads in parallel batches (increased for better speed)
          const BATCH_SIZE = 5; // Upload 5 photos at a time for better parallelization
          const batches = [];
          
          for (let i = 0; i < uploadTasks.length; i += BATCH_SIZE) {
            batches.push(uploadTasks.slice(i, i + BATCH_SIZE));
          }


          for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
            if (cancelled) break;
            
            const batch = batches[batchIndex];
            statusDiv.textContent = `Processing batch ${batchIndex + 1}/${batches.length}...`;
            
            
            // Process all uploads in this batch simultaneously
            const batchPromises = batch.map(task => uploadPhoto(task.photo, task.format));
            
            try {
              const results = await Promise.allSettled(batchPromises);
              
              results.forEach((result, index) => {
                completedUploads++;
                
                if (result.status === 'fulfilled' && result.value) {
                  uploadedFiles.push(result.value);
                } else if (result.status === 'rejected') {
                  errors.push(result.reason);
                }
                
                // Update progress
                currentSpan.textContent = completedUploads;
                progressBar.style.width = `${(completedUploads / totalTasks) * 100}%`;
              });
              
            } catch (error) {
              console.error('Batch processing error:', error);
            }
            
            // Small delay between batches to avoid overwhelming the server
            if (batchIndex < batches.length - 1 && !cancelled) {
              await new Promise(resolve => setTimeout(resolve, 500));
            }
          }

          // Show final results
          const successCount = uploadedFiles.length;
          const errorCount = errors.length;
          
          if (cancelled) {
            statusDiv.textContent = 'Upload cancelled';
          } else if (errorCount === 0) {
            statusDiv.textContent = 'Upload completed successfully!';
            setTimeout(() => {
              document.body.removeChild(modal);
              document.body.style.overflow = '';
              this.showUploadSuccessNotification(successCount, options.albumName);
            }, 2000);
          } else {
            statusDiv.textContent = `Upload completed with ${errorCount} errors`;
            setTimeout(() => {
              document.body.removeChild(modal);
              document.body.style.overflow = '';
              // Show custom notification for partial success
              this.showSuccessNotification(
                'Upload Partially Complete', 
                `${successCount} photos uploaded successfully, ${errorCount} failed. Check console for details.`,
                '⚠️'
              );
            }, 2000);
          }
        }

        getLocationKey(city) {
          // Map cities to location keys from .env file
          const locationMap = {
            'tampa': 'LOCATION_A',
            'st-petersburg': 'LOCATION_B', 
            'jacksonville': 'LOCATION_C',
            'miami': 'LOCATION_D'
          };
          return locationMap[city] || 'LOCATION_A'; // Default to Tampa
        }

        getCompressionSettings(quality) {
          const settings = {
            'messenger': {
              quality: 0.3,       // 30% JPEG quality
              maxWidth: 800,      // Max 800px width
              maxHeight: 450,     // Max 450px height
              description: 'Messenger (Quick send, small size)'
            },
            'social': {
              quality: 0.5,       // 50% JPEG quality
              maxWidth: 1024,     // Max 1024px width
              maxHeight: 576,     // Max 576px height
              description: 'Social Media (Best for feeds & stories)'
            },
            'presentation': {
              quality: 0.7,       // 70% JPEG quality
              maxWidth: 1600,     // Max 1600px width
              maxHeight: 900,     // Max 900px height
              description: 'Presentation (Sharp & professional)'
            },
            'print': {
              quality: 0.85,      // 85% JPEG quality
              maxWidth: 1920,     // Max 1920px width
              maxHeight: 1080,    // Max 1080px height
              description: 'Print (Highest quality)'
            }
          };
          return settings[quality] || settings['messenger'];
        }

        showCancelUploadConfirmation(parentModal, onConfirm) {
          // Create confirmation modal
          const confirmModal = document.createElement('div');
          confirmModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.9);
            z-index: 3100;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            box-sizing: border-box;
          `;

          confirmModal.innerHTML = `
            <div style="background: white; border-radius: 16px; padding: 24px; max-width: 350px; width: 100%; text-align: center; box-shadow: 0 8px 32px rgba(0,0,0,0.4);">
              <!-- Warning Icon -->
              <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
              
              <!-- Title -->
              <h3 style="margin: 0 0 12px 0; color: #303030; font-size: 20px; font-weight: bold;">Cancel Upload?</h3>
              
              <!-- Message -->
              <p style="margin: 0 0 24px 0; color: #666; font-size: 16px; line-height: 1.4;">
                Are you sure you want to cancel the upload? Any photos already uploaded will remain in your Google Drive.
              </p>
              
              <!-- Upload Progress Info -->
              <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; margin-bottom: 24px; text-align: left;">
                <div style="font-size: 14px; color: #666; margin-bottom: 4px;">Upload Status:</div>
                <div style="font-size: 14px; font-weight: bold; color: #303030;" id="cancel-progress-info">
                  Checking current progress...
                </div>
              </div>
              
              <!-- Action Buttons -->
              <div style="display: flex; gap: 12px; justify-content: center;">
                <button id="cancel-upload-no" style="background: #f5f5f5; color: #666; border: none; padding: 12px 20px; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: bold; transition: all 0.2s;" onmouseover="this.style.background='#e5e5e5'" onmouseout="this.style.background='#f5f5f5'">
                  Continue Upload
                </button>
                <button id="cancel-upload-yes" style="background: #dc3545; color: white; border: none; padding: 12px 20px; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: bold; transition: all 0.2s;" onmouseover="this.style.background='#c82333'" onmouseout="this.style.background='#dc3545'">
                  Yes, Cancel Upload
                </button>
              </div>
            </div>
          `;

          document.body.appendChild(confirmModal);

          // Update progress info
          setTimeout(() => {
            const progressInfo = document.getElementById('cancel-progress-info');
            const currentSpan = parentModal.querySelector('#upload-current');
            const totalSpan = parentModal.querySelector('#upload-total');
            
            if (progressInfo && currentSpan && totalSpan) {
              const current = currentSpan.textContent || '0';
              const total = totalSpan.textContent || '0';
              progressInfo.textContent = `${current} of ${total} files uploaded`;
            }
          }, 100);

          // Event listeners
          document.getElementById('cancel-upload-no').addEventListener('click', () => {
            document.body.removeChild(confirmModal);
          });

          document.getElementById('cancel-upload-yes').addEventListener('click', () => {
            document.body.removeChild(confirmModal);
            onConfirm();
          });

          // Close on background click
          confirmModal.addEventListener('click', (e) => {
            if (e.target === confirmModal) {
              document.body.removeChild(confirmModal);
            }
          });

          // Close on Escape key
          const handleEscape = (e) => {
            if (e.key === 'Escape') {
              document.body.removeChild(confirmModal);
              document.removeEventListener('keydown', handleEscape);
            }
          };
          document.addEventListener('keydown', handleEscape);
        }

        async compressPhoto(dataUrl, quality = 0.7, maxWidth = 1920, maxHeight = 1080) {
          return new Promise((resolve) => {
            const originalSize = dataUrl.length;
            
            // Skip compression for already small photos (less than 200KB)
            if (originalSize < 200000) {
              resolve(dataUrl);
              return;
            }
            
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              
              // Calculate new dimensions while maintaining aspect ratio
              let { width, height } = img;
              
              // Only resize if image is larger than max dimensions
              if (width > maxWidth || height > maxHeight) {
                const ratio = Math.min(maxWidth / width, maxHeight / height);
                width = Math.round(width * ratio);
                height = Math.round(height * ratio);
              }
              
              canvas.width = width;
              canvas.height = height;
              
              // Enable image smoothing for better quality
              ctx.imageSmoothingEnabled = true;
              ctx.imageSmoothingQuality = 'high';
              
              // Draw and compress
              ctx.drawImage(img, 0, 0, width, height);
              
              // Convert to compressed JPEG
              const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
              
              // Only use compressed version if it's actually smaller
              const compressedSize = compressedDataUrl.length;
              if (compressedSize < originalSize) {
                const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
                resolve(compressedDataUrl);
              } else {
                resolve(dataUrl);
              }
            };
            img.src = dataUrl;
          });
        }

        async generatePhotoFormat(photo, format, mode = 'download') {

          // For combined photos, generate the proper layout for the specific format
          if (photo.mode === 'mix') {
            return this.generateCombinedPhotoForUpload(photo, format, mode);
          }

          // For regular photos (before/after), don't apply format transformations
          // These should be uploaded in their original form only

          // Return the original photo data without any transformations
          return Promise.resolve(photo.originalDataUrl || photo.dataUrl);
        }

        async generateCombinedPhotoForUpload(combinedPhoto, format, mode = 'download') {

          // Find the original before/after photos for this combined photo
          const beforePhoto = this.photos.find(p =>
            p.mode === 'before' &&
            p.room === combinedPhoto.room &&
            p.name === combinedPhoto.name
          );
          const afterPhoto = this.photos.find(p =>
            p.mode === 'after' &&
            p.room === combinedPhoto.room &&
            p.name === combinedPhoto.name
          );

          if (!beforePhoto || !afterPhoto) {
            console.error('Could not find original before/after photos for upload format generation');
            // Fallback to just resizing the existing combined photo
            return this.resizePhotoForFormat(combinedPhoto, format, mode);
          }

          // Map format to templateType and generate the proper layout
          const templateType = this.mapFormatToTemplateType(format);

          return new Promise((resolve) => {
            PhotoEditor.createCombinedPhotoInMemory(
              beforePhoto.originalDataUrlNoLabel || beforePhoto.originalDataUrl || beforePhoto.dataUrl,
              afterPhoto.originalDataUrlNoLabel || afterPhoto.originalDataUrl || afterPhoto.dataUrl,
              templateType,
              beforePhoto,
              afterPhoto,
              (combinedDataUrl) => {
                resolve(combinedDataUrl);
              },
              this.labelsEnabled
            );
          });
        }

        async resizePhotoForFormat(photo, format, mode = 'download') {
          // Fallback method - just resize existing photo
          return new Promise((resolve, reject) => {
            try {
              const img = new Image();
              img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Define format dimensions
                let targetWidth, targetHeight;
                const previewScale = mode === 'preview' ? 0.5 : 1;

                switch (format) {
                  case 'instagram-facebook':
                    targetWidth = Math.round(1080 * previewScale);
                    targetHeight = Math.round(1350 * previewScale);
                    break;
                  case 'square-sidebyside':
                  case 'square-stack':
                    targetWidth = Math.round(1080 * previewScale);
                    targetHeight = Math.round(1080 * previewScale);
                    break;
                  case 'landscape-sidebyside':
                  case 'landscape-stack':
                    targetWidth = Math.round(1920 * previewScale);
                    targetHeight = Math.round(1080 * previewScale);
                    break;
                  case 'instagram-landscape':
                    targetWidth = Math.round(1200 * previewScale);
                    targetHeight = Math.round(630 * previewScale);
                    break;
                  default:
                    targetWidth = Math.round(img.naturalWidth * previewScale);
                    targetHeight = Math.round(img.naturalHeight * previewScale);
                }

                canvas.width = targetWidth;
                canvas.height = targetHeight;

                const scaleX = targetWidth / img.naturalWidth;
                const scaleY = targetHeight / img.naturalHeight;
                const scale = Math.max(scaleX, scaleY);

                const scaledWidth = img.naturalWidth * scale;
                const scaledHeight = img.naturalHeight * scale;

                const offsetX = (targetWidth - scaledWidth) / 2;
                const offsetY = (targetHeight - scaledHeight) / 2;

                ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);

                const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
                resolve(dataUrl);
              };

              img.onerror = () => {
                reject(new Error('Failed to load image for resizing'));
              };

              img.src = photo.originalDataUrl || photo.dataUrl;
            } catch (error) {
              reject(error);
            }
          });
        }


        openCameraFromGallery(room, name, mode) {
          
          // Set up context for gallery return
          this.galleryReturnContext = {
            returnToGallery: true,
            room: room,
            name: name,
            mode: mode
          };
          
          // Set the current room and mode
          this.currentRoom = room;
          
          if (mode === 'before') {
            // Set specific photo name for before photo
            this.pendingPhotoName = name;
            this.openCamera('before');
          } else if (mode === 'after') {
            // Find the corresponding before photo to open comparison camera
            const beforePhoto = this.photos.find(p => 
              p.room === room && 
              p.name === name && 
              p.mode === 'before'
            );
            
            if (beforePhoto) {
              // Set the before photo reference for the comparison camera
              this.currentBeforePhoto = beforePhoto;
              this.pendingPhotoName = name;
              
              // Open the comparison camera view (after mode) with the before photo
              this.showPhotoFullscreen(beforePhoto);
            } else {
              console.error('Cannot take after photo without corresponding before photo');
              // Return to gallery if error
              setTimeout(() => {
                this.showAllPhotosModal();
              }, 100);
            }
          }
        }

        async showPhotoFullscreenFromModal(photo) {
          // For gallery view, always show enlarged photo without camera functionality
          this.showPhotoEnlarged(photo, 'allPhotosModal');
        }

        async showPhotoEnlarged(photo, source = 'mainGrid') {
          // Always show enlarged view regardless of photo mode - no camera functionality
          // Clean up any existing photo fullscreen modals first
          const existingPhotoModals = document.querySelectorAll('[style*="position: fixed"][style*="z-index: 2000"], [style*="position: fixed"][style*="z-index: 2002"]');
          existingPhotoModals.forEach(existing => {
            if (existing.parentNode) {
              document.body.removeChild(existing);
            }
          });

          const modal = document.createElement('div');
          // Use higher z-index when opened from All Photos modal to appear on top
          const zIndex = source === 'allPhotosModal' ? '3000' : '2000';
          modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0,0,0,0.95); z-index: ${zIndex}; display: flex;
            flex-direction: column;
          `;

          if (photo.mode === 'mix') {
            // Combined photos get templates
            const templateType = photo.templateType || 'default';
            modal.innerHTML = this.getEnlargedPhotoHTML(photo, templateType);
            this.setupEnlargedPhotoListeners(modal, photo, source);
          } else {
            // Individual photos (before/after) show raw photo only, no templates
            const orientation = this.detectPhotoOrientation(photo.naturalWidth || 800, photo.naturalHeight || 600);
            modal.innerHTML = `
              <div style="position: relative; width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; overflow: auto; background: rgba(0,0,0,0.95); padding: 80px 20px; box-sizing: border-box;">
                <img src="${photo.dataUrl}" style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 8px; box-shadow: 0 10px 40px rgba(0,0,0,0.5);" />

                <!-- Photo info overlay -->
                <div style="position: fixed; top: 20px; left: 20px; background: rgba(0,0,0,0.8); color: white; padding: 15px 20px; border-radius: 8px; backdrop-filter: blur(10px); z-index: 10;">
                  <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">
                    ${photo.room.charAt(0).toUpperCase() + photo.room.slice(1).replace('-', ' ')} - ${photo.mode.charAt(0).toUpperCase() + photo.mode.slice(1)}
                  </div>
                  <div style="font-size: 14px; opacity: 0.9; margin-bottom: 4px;">
                    ${new Date(photo.timestamp).toLocaleString()}
                  </div>
                  <div style="font-size: 12px; opacity: 0.7;">
                    Orientation: ${orientation} | Raw photo as captured
                  </div>
                </div>

                <!-- Close button -->
                <button id="close-photo-btn" style="position: fixed; top: 20px; right: 20px; background: rgba(0,0,0,0.8); color: #F2C31B; border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 18px; cursor: pointer; backdrop-filter: blur(10px); z-index: 10;">
                  ✕
                </button>
              </div>
            `;

            // Close button functionality
            const closeBtn = modal.querySelector('#close-photo-btn');
            if (closeBtn) {
              closeBtn.addEventListener('click', () => {
                document.body.removeChild(modal);
                document.body.style.overflow = '';

                  // Return to the appropriate view based on source
                if (source === 'allPhotosModal') {
                  // Don't reopen All Photos modal - it's still there underneath
                  // Keep body overflow hidden to maintain All Photos modal scroll state
                  document.body.style.overflow = 'hidden';
                } else {
                  // Default: return to main room tabs
                  this.showMainRoomTabs();
                }
              });
            }
          }

          document.body.appendChild(modal);
          document.body.style.overflow = 'hidden';
        }

        getTemplateDisplayName(templateType) {
          // Convert internal template keys to user-friendly display names that match upload modal
          let displayName;
          switch(templateType) {
            case 'portrait':
              displayName = 'Instagram / Facebook Feed (4:5)';
              break;
            case 'default':
              displayName = 'Square - LinkedIn / Yelp (1:1) - Stack (horizontal split)';
              break;
            case 'square':
            case 'square_stack':
              displayName = 'Square - LinkedIn / Yelp (1:1) - Stack (horizontal split)';
              break;
            case 'square_side':
              displayName = 'Square - LinkedIn / Yelp (1:1) - Side-by-Side (vertical split)';
              break;
            case 'landscape':
              displayName = 'Websites / Presentations (16:9) - Stack (horizontal split)';
              break;
            case 'sidebyside_landscape':
              displayName = 'Websites / Presentations (16:9) - Side-by-Side (vertical split)';
              break;
            case 'blog':
              displayName = 'Instagram / Facebook Landscape (1.91:1)';
              break;
            default:
              displayName = templateType.charAt(0).toUpperCase() + templateType.slice(1);
              break;
          }
          return displayName;
        }

        getTemplateLayoutType(templateType) {
          // Extract just the layout type part (Stack/Side-by-Side)
          switch(templateType) {
            case 'portrait':
              return 'Stack (horizontal split)';
            case 'default':
            case 'square':
            case 'square_stack':
            case 'landscape':
              return 'Stack (horizontal split)';
            case 'square_side':
            case 'sidebyside_landscape':
              return 'Side-by-Side (vertical split)';
            case 'blog':
              return 'Side-by-Side (vertical split)';
            default:
              return 'Stack (horizontal split)';
          }
        }

        getTemplatePurpose(templateType) {
          // Extract the purpose/platform part
          switch(templateType) {
            case 'portrait':
              return 'Perfect for Instagram and Facebook feeds';
            case 'default':
            case 'square':
            case 'square_stack':
              return 'Ideal for LinkedIn posts and Yelp reviews';
            case 'square_side':
              return 'Great for LinkedIn posts and Yelp reviews with side comparison';
            case 'blog':
              return 'Perfect for Instagram landscape posts';
            case 'sidebyside_landscape':
              return 'Ideal for websites and presentations with side comparison';
            case 'landscape':
              return 'Perfect for websites and presentations';
            default:
              return 'Ideal for LinkedIn posts and Yelp reviews';
          }
        }

        getTemplateMainTitle(templateType) {
          // Extract just the main platform/ratio title for selectors
          switch(templateType) {
            case 'portrait':
              return 'Instagram / Facebook Feed (4:5)';
            case 'default':
            case 'square':
            case 'square_stack':
              return 'LinkedIn / Yelp (1:1)';
            case 'square_side':
              return 'LinkedIn / Yelp (1:1)';
            case 'blog':
              return 'Instagram Landscape (1.91:1)';
            case 'sidebyside_landscape':
              return 'Websites / Presentations (16:9)';
            case 'landscape':
              return 'Websites / Presentations (16:9)';
            default:
              return 'LinkedIn / Yelp (1:1)';
          }
        }

        getEnlargedPhotoHTML(photo, templateType) {
          const orientation = this.detectPhotoOrientation(photo.width || 800, photo.height || 600);
          return `
            <div style="position: relative; width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; overflow: auto; background: rgba(0,0,0,0.95); padding-top: 80px; padding-bottom: 120px; box-sizing: border-box;">
              <!-- Scrollable container for actual size viewing -->
              <div id="photo-container" style="position: relative; display: flex; align-items: center; justify-content: center; max-width: 95vw; max-height: calc(100vh - 200px); overflow: auto;">
                <img id="fullscreen-photo" src="${photo.dataUrl}" style="display: block; border-radius: 8px; box-shadow: 0 10px 40px rgba(0,0,0,0.5);" />
              </div>

              <!-- Layout type and purpose info at top -->
              <div style="position: fixed; top: 20px; left: 20px; right: 80px; background: rgba(0,0,0,0.9); color: white; padding: 16px; border-radius: 12px; backdrop-filter: blur(10px); z-index: 10; border: 2px solid #F2C31B;">
                <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px; color: #F2C31B; text-align: center;">
                  ${this.getTemplateLayoutType(templateType)}
                </div>
                <div style="font-size: 14px; opacity: 0.9; margin-bottom: 12px; text-align: center;">
                  ${this.getTemplatePurpose(templateType)}
                </div>
                <div style="font-size: 14px; opacity: 0.9; text-align: center;">
                  ${photo.room.charAt(0).toUpperCase() + photo.room.slice(1).replace('-', ' ')} - ${photo.mode.charAt(0).toUpperCase() + photo.mode.slice(1)} | ${new Date(photo.timestamp).toLocaleString()}
                </div>
              </div>

              ${this.getTemplateSelector(photo, templateType)}

              <!-- Close button -->
              <button id="close-photo-btn" style="position: fixed; top: 20px; right: 20px; background: rgba(0,0,0,0.8); color: #F2C31B; border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 18px; cursor: pointer; backdrop-filter: blur(10px); z-index: 10;">
                ✕
              </button>
            </div>
          `;
        }

        getTemplateSelector(photo, templateType) {
          // Determine the base mode for template selection
          // For combined photos, detect original mode from aspect ratio or stored metadata
          let baseMode = 'stack'; // Default
          let isHorizontalPhoto = false;

          if (photo.mode === 'mix') {
            // For combined photos, find the original before/after photos to determine their orientation
            const beforePhoto = this.photos.find(p =>
              p.mode === 'before' && p.room === photo.room && p.name === photo.name
            );
            const afterPhoto = this.photos.find(p =>
              p.mode === 'after' && p.room === photo.room && p.name === photo.name
            );

            if (beforePhoto && afterPhoto) {
              // Use the stored aspectRatio property (much simpler!)
              // '4:3' = horizontal/landscape photos → Stack Mode
              // '2:3' = vertical/portrait photos → Side-by-Side Mode
              const beforeIsHorizontal = beforePhoto.aspectRatio === '4:3';
              const afterIsHorizontal = afterPhoto.aspectRatio === '4:3';

              // If either photo was taken in horizontal mode, use Stack Mode
              isHorizontalPhoto = beforeIsHorizontal || afterIsHorizontal;

            } else {
              console.warn('Could not find original before/after photos for combined photo');
              // Fallback: Use the combined photo's own dimensions to determine mode
              const photoWidth = photo.naturalWidth || photo.width || 800;
              const photoHeight = photo.naturalHeight || photo.height || 600;
              const photoAspectRatio = photoWidth / photoHeight;
              // If combined photo is landscape (aspect ratio > 1), it's likely side-by-side mode
              // If combined photo is portrait (aspect ratio < 1), it's likely stack mode
              isHorizontalPhoto = photoAspectRatio < 1; // Portrait combined = stack mode, landscape combined = side-by-side mode
            }
          }

          // Define template info based on the rules:
          // - Horizontal originals (4:3): Stack Mode (horizontal split line, stacked vertically)
          // - Vertical originals (2:3): Side-by-Side Mode (vertical split line, placed left-right)
          // - 1:1 format: Available to both with their respective split types

          if (isHorizontalPhoto) {
            // Horizontal originals (4:3) → Stack Mode (stacked vertically with horizontal split line)
            const stackTemplates = {
              portrait: { ratio: '4:5', description: 'Instagram / Facebook Feed (4:5) ⭐', cropInfo: 'Best fit for portrait feeds', splitType: 'horizontal' },
              square_stack: { ratio: '1:1', description: 'Square - LinkedIn / Yelp (1:1) - Stack', cropInfo: 'Horizontal split - before/after stacked', splitType: 'horizontal' },
              landscape: { ratio: '16:9', description: 'Websites / Presentations (16:9) - Stack', cropInfo: 'Good for presentations', splitType: 'horizontal' }
            };

            return this.getStackModeTemplateSelector(stackTemplates, templateType);
          } else {
            // Vertical originals (2:3) → Side-by-Side Mode (placed left-right with vertical split line)
            const sideTemplates = {
              blog: { ratio: '1.91:1', description: 'Instagram / Facebook Landscape (1.91:1) ⭐', cropInfo: 'Best fit for landscape feeds', splitType: 'vertical' },
              sidebyside_landscape: { ratio: '16:9', description: 'Websites / Presentations (16:9) - Side-by-Side', cropInfo: 'Great for presentations/websites', splitType: 'vertical' },
              square_side: { ratio: '1:1', description: 'Square - LinkedIn / Yelp (1:1) - Side-by-Side', cropInfo: 'Vertical split - before/after side-by-side', splitType: 'vertical' }
            };

            return this.getSideBySideModeTemplateSelector(sideTemplates, templateType);
          }
        }

        getStackModeTemplateSelector(stackTemplates, templateType) {
          // Stack Mode Templates (for horizontal original photos)
          return `
            <!-- Template selector for Stack Mode (horizontal original photos) -->
            <div style="position: fixed; bottom: 20px; left: 20px; right: 20px; background: rgba(0,0,0,0.9); padding: 16px; border-radius: 12px; backdrop-filter: blur(10px); z-index: 10; box-shadow: 0 4px 16px rgba(0,0,0,0.4);">

              <!-- Portrait -->
              <label style="display: flex; align-items: center; color: white; cursor: pointer; padding: 8px; border-radius: 6px; transition: all 0.2s; border: 2px solid ${templateType === 'default' || templateType === 'portrait' ? '#F2C31B' : 'transparent'}; background: ${templateType === 'default' || templateType === 'portrait' ? 'rgba(242, 195, 27, 0.2)' : 'transparent'}; margin-bottom: 6px;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='${templateType === 'default' || templateType === 'portrait' ? 'rgba(242, 195, 27, 0.2)' : 'transparent'}'">
                <input type="radio" name="template-selector" value="portrait" style="display: none;" ${templateType === 'default' || templateType === 'portrait' ? 'checked' : ''}>
                <div style="width: 24px; height: 30px; background: #F2C31B; border-radius: 2px; margin-right: 12px; display: flex; align-items: center; justify-content: center;">
                  <div style="font-size: 6px; color: #303030; font-weight: bold;">4:5</div>
                </div>
                <div>
                  <div style="font-weight: bold; margin-bottom: 2px;">${this.getTemplateMainTitle('portrait')}</div>
                </div>
              </label>

              <!-- Square Stack -->
              <label style="display: flex; align-items: center; color: white; cursor: pointer; padding: 8px; border-radius: 6px; transition: all 0.2s; border: 2px solid ${templateType === 'square' || templateType === 'square_stack' ? '#F2C31B' : 'transparent'}; background: ${templateType === 'square' || templateType === 'square_stack' ? 'rgba(242, 195, 27, 0.2)' : 'transparent'}; margin-bottom: 6px;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='${templateType === 'square' || templateType === 'square_stack' ? 'rgba(242, 195, 27, 0.2)' : 'transparent'}'">
                <input type="radio" name="template-selector" value="square_stack" style="display: none;" ${templateType === 'square' || templateType === 'square_stack' ? 'checked' : ''}>
                <div style="width: 24px; height: 24px; background: #F2C31B; border-radius: 2px; margin-right: 12px; display: flex; align-items: center; justify-content: center; position: relative;">
                  <div style="font-size: 6px; color: #303030; font-weight: bold;">1:1</div>
                  <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 18px; height: 1px; background: #303030;"></div>
                </div>
                <div>
                  <div style="font-weight: bold; margin-bottom: 2px;">${this.getTemplateMainTitle('square_stack')}</div>
                </div>
              </label>

              <!-- Landscape -->
              <label style="display: flex; align-items: center; color: white; cursor: pointer; padding: 8px; border-radius: 6px; transition: all 0.2s; border: 2px solid ${templateType === 'landscape' ? '#F2C31B' : 'transparent'}; background: ${templateType === 'landscape' ? 'rgba(242, 195, 27, 0.2)' : 'transparent'};" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='${templateType === 'landscape' ? 'rgba(242, 195, 27, 0.2)' : 'transparent'}'">
                <input type="radio" name="template-selector" value="landscape" style="display: none;" ${templateType === 'landscape' ? 'checked' : ''}>
                <div style="width: 32px; height: 18px; background: #F2C31B; border-radius: 2px; margin-right: 12px; display: flex; align-items: center; justify-content: center;">
                  <div style="font-size: 6px; color: #303030; font-weight: bold;">16:9</div>
                </div>
                <div>
                  <div style="font-weight: bold; margin-bottom: 2px;">${this.getTemplateMainTitle('landscape')}</div>
                </div>
              </label>
            </div>
          `;
        }

        getSideBySideModeTemplateSelector(sideTemplates, templateType) {
          // Side-by-Side Mode Templates (for vertical original photos)
          return `
            <!-- Template selector for Side-by-Side Mode (vertical original photos) -->
            <div style="position: fixed; bottom: 20px; left: 20px; right: 20px; background: rgba(0,0,0,0.9); padding: 16px; border-radius: 12px; backdrop-filter: blur(10px); z-index: 10; box-shadow: 0 4px 16px rgba(0,0,0,0.4);">

              <!-- Landscape -->
              <label style="display: flex; align-items: center; color: white; cursor: pointer; padding: 8px; border-radius: 6px; transition: all 0.2s; border: 2px solid ${templateType === 'default' || templateType === 'blog' ? '#F2C31B' : 'transparent'}; background: ${templateType === 'default' || templateType === 'blog' ? 'rgba(242, 195, 27, 0.2)' : 'transparent'}; margin-bottom: 6px;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='${templateType === 'default' || templateType === 'blog' ? 'rgba(242, 195, 27, 0.2)' : 'transparent'}'">
                <input type="radio" name="template-selector" value="blog" style="display: none;" ${templateType === 'default' || templateType === 'blog' ? 'checked' : ''}>
                <div style="width: 32px; height: 21px; background: #F2C31B; border-radius: 2px; margin-right: 12px; display: flex; align-items: center; justify-content: center;">
                  <div style="font-size: 6px; color: #303030; font-weight: bold;">1.91:1</div>
                </div>
                <div>
                  <div style="font-weight: bold; margin-bottom: 2px;">${this.getTemplateMainTitle('blog')}</div>
                </div>
              </label>

              <!-- Wide Landscape -->
              <label style="display: flex; align-items: center; color: white; cursor: pointer; padding: 8px; border-radius: 6px; transition: all 0.2s; border: 2px solid ${templateType === 'sidebyside_landscape' ? '#F2C31B' : 'transparent'}; background: ${templateType === 'sidebyside_landscape' ? 'rgba(242, 195, 27, 0.2)' : 'transparent'}; margin-bottom: 6px;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='${templateType === 'sidebyside_landscape' ? 'rgba(242, 195, 27, 0.2)' : 'transparent'}'">
                <input type="radio" name="template-selector" value="sidebyside_landscape" style="display: none;" ${templateType === 'sidebyside_landscape' ? 'checked' : ''}>
                <div style="width: 32px; height: 18px; background: #F2C31B; border-radius: 2px; margin-right: 12px; display: flex; align-items: center; justify-content: center;">
                  <div style="font-size: 6px; color: #303030; font-weight: bold;">16:9</div>
                </div>
                <div>
                  <div style="font-weight: bold; margin-bottom: 2px;">${this.getTemplateMainTitle('sidebyside_landscape')}</div>
                </div>
              </label>

              <!-- Square Side-by-Side -->
              <label style="display: flex; align-items: center; color: white; cursor: pointer; padding: 8px; border-radius: 6px; transition: all 0.2s; border: 2px solid ${templateType === 'square' || templateType === 'square_side' ? '#F2C31B' : 'transparent'}; background: ${templateType === 'square' || templateType === 'square_side' ? 'rgba(242, 195, 27, 0.2)' : 'transparent'}; margin-bottom: 6px;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='${templateType === 'square' || templateType === 'square_side' ? 'rgba(242, 195, 27, 0.2)' : 'transparent'}'">
                <input type="radio" name="template-selector" value="square_side" style="display: none;" ${templateType === 'square' || templateType === 'square_side' ? 'checked' : ''}>
                <div style="width: 24px; height: 24px; background: #F2C31B; border-radius: 2px; margin-right: 12px; display: flex; align-items: center; justify-content: center; position: relative;">
                  <div style="font-size: 6px; color: #303030; font-weight: bold;">1:1</div>
                  <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 1px; height: 18px; background: #303030;"></div>
                </div>
                <div>
                  <div style="font-weight: bold; margin-bottom: 2px;">${this.getTemplateMainTitle('square_side')}</div>
                </div>
              </label>

            </div>
          `;
        }

        setupEnlargedPhotoListeners(modal, photo, source = 'mainGrid') {
          // Set default to fit screen mode
          const imgElement = modal.querySelector('#fullscreen-photo');
          const imgContainer = modal.querySelector('#photo-container');
          
          // Configure for fit-to-screen display
          imgElement.style.maxWidth = '100%';
          imgElement.style.maxHeight = '100%';
          imgElement.style.width = 'auto';
          imgElement.style.height = 'auto';
          imgContainer.style.maxWidth = '95vw';
          imgContainer.style.maxHeight = '95vh';
          imgContainer.style.overflow = 'hidden';

          // Template selector functionality (generate on-demand)
          const templateRadios = modal.querySelectorAll('input[name="template-selector"]');
          templateRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
              if (e.target.checked) {
                const newTemplate = e.target.value;
                
                // Update visual selection state
                this.updateTemplateVisualSelection(modal, newTemplate);
                
                // Show loading state
                const imgElement = modal.querySelector('#fullscreen-photo');
                if (imgElement) {
                  imgElement.style.opacity = '0.5';
                }
                
                // Handle template change based on photo type
                if (photo.mode === 'mix') {
                  // For combined photos, regenerate with new template
                  this.generateCombinedPhotoOnDemand(photo, newTemplate, modal);
                } else {
                  // For individual photos, crop the single photo to the selected template
                  this.cropIndividualPhotoOnDemand(photo, newTemplate, modal);
                }
              }
            });
          });

          const closeBtn = modal.querySelector('#close-photo-btn');
          if (closeBtn) {
            closeBtn.addEventListener('click', () => {
              document.body.removeChild(modal);
              document.body.style.overflow = '';

              // Return to the appropriate view based on source
              if (source === 'allPhotosModal') {
                // Don't reopen All Photos modal - it's still there underneath
                // Keep body overflow hidden to maintain All Photos modal scroll state
                document.body.style.overflow = 'hidden';
              } else {
                // Default: return to main room tabs
                this.showMainRoomTabs();
              }
            });
          }

          // Close on background click
          Utils.attachModalCloseHandlers(modal, () => {
            Utils.closeModal(modal);
            // Return to the appropriate view based on source
            if (source === 'allPhotosModal') {
              // Don't reopen All Photos modal - it's still there underneath
              // Keep body overflow hidden to maintain All Photos modal scroll state
              document.body.style.overflow = 'hidden';
            } else {
              // Default: return to main room tabs
              this.showMainRoomTabs();
            }
          }, {
            closeOnBackdrop: true,
            closeOnEscape: false
          });
        }


        updateModalWithNewPhoto(modal, newPhoto) {
          // Update the modal to show the newly created combined photo
          const imgElement = modal.querySelector('#fullscreen-photo');
          if (imgElement) {
            imgElement.src = newPhoto.dataUrl;
            imgElement.style.opacity = '1';
          }
          
          // Update photo info
          const infoDiv = modal.querySelector('[style*="position: fixed; top: 20px; left: 20px"]');
          if (infoDiv) {
            const orientation = this.detectPhotoOrientation(newPhoto.naturalWidth || 800, newPhoto.naturalHeight || 600);
            infoDiv.innerHTML = `
              <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">
                ${newPhoto.room.charAt(0).toUpperCase() + newPhoto.room.slice(1).replace('-', ' ')} - ${newPhoto.mode.charAt(0).toUpperCase() + newPhoto.mode.slice(1)}
              </div>
              <div style="font-size: 14px; opacity: 0.9; margin-bottom: 4px;">
                ${new Date(newPhoto.timestamp).toLocaleString()}
              </div>
              <div style="font-size: 12px; opacity: 0.7;">
                Orientation: ${orientation} | Template: ${this.getTemplateDisplayName(newPhoto.templateType)}
              </div>
            `;
          }
          
          // Update main photos container
          const photosContainer = document.getElementById('photos-container');
          if (photosContainer) {
            photosContainer.innerHTML = this.getPhotosHTML();
            this.attachPhotoListeners();
          }
          
          // Update gallery modal if it's open
          const allPhotosContent = document.getElementById('all-photos-content');
          if (allPhotosContent) {
            allPhotosContent.innerHTML = this.getAllPhotosHTML();
            this.attachGalleryPhotoListeners();
          }
          
          // Save updated photos
          this.savePhotos();
          
        }

        generateCombinedPhotoOnDemand(photo, templateType, modal) {
          
          // Find the before and after photos
          let beforePhoto, afterPhoto;
          
          if (photo.mode === 'before') {
            beforePhoto = photo;
            afterPhoto = this.photos.find(p => p.mode === 'after' && p.beforePhotoId === photo.id);
          } else if (photo.mode === 'after') {
            afterPhoto = photo;
            beforePhoto = this.photos.find(p => p.mode === 'before' && p.id === photo.beforePhotoId);
          } else if (photo.mode === 'mix') {
            // For temporary combined photos, use the embedded references
            if (photo.beforePhoto && photo.afterPhoto) {
              beforePhoto = photo.beforePhoto;
              afterPhoto = photo.afterPhoto;
            } else {
              // Fallback: find the original pair
              beforePhoto = this.photos.find(p => p.mode === 'before' && p.room === photo.room && p.name === photo.name);
              afterPhoto = this.photos.find(p => p.mode === 'after' && p.room === photo.room && p.name === photo.name);
            }
          }
          
          if (!beforePhoto || !afterPhoto) {
            console.error('Cannot find before/after pair for on-demand generation');
            const imgElement = modal.querySelector('#fullscreen-photo');
            if (imgElement) {
              imgElement.style.opacity = '1';
            }
            return;
          }
          
          // Generate combined photo without storing it - use original full resolution photos
          const beforeDataUrl = beforePhoto.originalDataUrlNoLabel || beforePhoto.originalDataUrl || beforePhoto.dataUrl; // Fallback chain
          const afterDataUrl = afterPhoto.originalDataUrlNoLabel || afterPhoto.originalDataUrl || afterPhoto.dataUrl; // Fallback chain
          PhotoEditor.createCombinedPhotoInMemory(beforeDataUrl, afterDataUrl, templateType, beforePhoto, afterPhoto, (combinedDataUrl) => {
            // Update modal with generated photo
            const imgElement = modal.querySelector('#fullscreen-photo');
            if (imgElement) {
              imgElement.src = combinedDataUrl;
              imgElement.style.opacity = '1';
            }

            // Update photo info with consistent 3-line format
            const infoDiv = modal.querySelector('[style*="position: fixed; top: 20px; left: 20px"]');
            if (infoDiv) {
              infoDiv.innerHTML = `
                <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px; color: #F2C31B; text-align: center;">
                  ${this.getTemplateLayoutType(templateType)}
                </div>
                <div style="font-size: 14px; opacity: 0.9; margin-bottom: 12px; text-align: center;">
                  ${this.getTemplatePurpose(templateType)}
                </div>
                <div style="font-size: 14px; opacity: 0.9; text-align: center;">
                  ${beforePhoto.room.charAt(0).toUpperCase() + beforePhoto.room.slice(1).replace('-', ' ')} - ${photo.mode.charAt(0).toUpperCase() + photo.mode.slice(1)} | ${new Date(photo.timestamp || beforePhoto.timestamp).toLocaleString()}
                </div>
              `;
            }

            // Update the current photo object's template type for future reference
            photo.templateType = templateType;
          }, this.labelsEnabled);
        }


        updateTemplateVisualSelection(modal, selectedTemplate) {
          // Update the visual state of all template labels
          const templateLabels = modal.querySelectorAll('label');
          templateLabels.forEach(label => {
            const radio = label.querySelector('input[name="template-selector"]');
            if (radio) {
              const templateValue = radio.value;
              
              if (templateValue === selectedTemplate) {
                // Selected state - golden border and background
                label.style.border = '2px solid #F2C31B';
                label.style.background = 'rgba(242, 195, 27, 0.2)';
              } else {
                // Unselected state - transparent border and background
                label.style.border = '2px solid transparent';
                label.style.background = 'transparent';
              }
            }
          });
        }

        cropIndividualPhotoOnDemand(photo, templateType, modal) {
          
          // Create image object to get dimensions and crop
          const img = new Image();
          
          img.onload = () => {
            // Get template dimensions
            const templateSizes = PhotoEditor.getTemplateSizes();
            const targetTemplate = templateSizes[templateType] || templateSizes.default;
            
            // Detect photo orientation
            const orientation = this.detectPhotoOrientation(img.width, img.height);
            
            // Calculate crop dimensions for this individual photo
            const cropDimensions = this.calculatePhotoCropDimensions(
              img.width, img.height, templateType, orientation
            );
            
            // Create canvas with target template size
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = targetTemplate.width;
            canvas.height = targetTemplate.height;
            
            // Fill white background
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Calculate how to fit the cropped photo into the template canvas
            const cropAspectRatio = cropDimensions.cropWidth / cropDimensions.cropHeight;
            const templateAspectRatio = targetTemplate.width / targetTemplate.height;
            
            let drawWidth, drawHeight, drawX, drawY;
            
            if (cropAspectRatio > templateAspectRatio) {
              // Crop is wider, fit to height
              drawHeight = targetTemplate.height;
              drawWidth = drawHeight * cropAspectRatio;
              drawX = (targetTemplate.width - drawWidth) / 2;
              drawY = 0;
            } else {
              // Crop is taller, fit to width
              drawWidth = targetTemplate.width;
              drawHeight = drawWidth / cropAspectRatio;
              drawX = 0;
              drawY = (targetTemplate.height - drawHeight) / 2;
            }
            
            // Draw the cropped photo
            ctx.drawImage(
              img,
              cropDimensions.cropX, cropDimensions.cropY, 
              cropDimensions.cropWidth, cropDimensions.cropHeight,
              drawX, drawY, drawWidth, drawHeight
            );
            
            // Add photo type label
            ctx.fillStyle = 'rgba(0,0,0,0.8)';
            ctx.font = 'bold 18px Arial';
            ctx.textAlign = 'center';
            
            const labelWidth = 120;
            const labelHeight = 30;
            const labelX = (canvas.width - labelWidth) / 2;
            const labelY = 20;
            
            ctx.fillRect(labelX, labelY, labelWidth, labelHeight);
            ctx.fillStyle = '#ffffff';
            ctx.fillText(photo.mode.toUpperCase(), canvas.width / 2, labelY + 20);
            
            // Convert to data URL and update modal
            const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
            
            // Update modal with cropped photo
            const imgElement = modal.querySelector('#fullscreen-photo');
            if (imgElement) {
              imgElement.src = croppedDataUrl;
              imgElement.style.opacity = '1';
            }
            
            // Update photo info with consistent 3-line format
            const infoDiv = modal.querySelector('[style*="position: fixed; top: 20px; left: 20px"]');
            if (infoDiv) {
              infoDiv.innerHTML = `
                <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px; color: #F2C31B; text-align: center;">
                  ${this.getTemplateLayoutType(templateType)}
                </div>
                <div style="font-size: 14px; opacity: 0.9; margin-bottom: 12px; text-align: center;">
                  ${this.getTemplatePurpose(templateType)}
                </div>
                <div style="font-size: 14px; opacity: 0.9; text-align: center;">
                  ${photo.room.charAt(0).toUpperCase() + photo.room.slice(1).replace('-', ' ')} - ${photo.mode.charAt(0).toUpperCase() + photo.mode.slice(1)} | ${new Date(photo.timestamp).toLocaleString()}
                </div>
              `;
            }
            
          };
          
          img.src = photo.dataUrl;
        }
        
        getPhotosHTML() {

          // Room icon for placeholders
          const roomIcons = {
            'kitchen': '🍳',
            'bathroom': '🛁',
            'bedroom': '🛏️',
            'living-room': '🛋️',
            'dining-room': '🍽️',
            'office': '💼'
          };

          // Get all before photos for this room, sorted by timestamp (oldest first)
          const beforePhotos = this.photos
            .filter(photo => photo.room === this.currentRoom && photo.mode === 'before')
            .sort((a, b) => a.timestamp - b.timestamp); // Oldest first


          // Create grid layout with all photos and dummy squares
          const gridItems = [];
          

          // Add all existing photos
          beforePhotos.forEach((beforePhoto, i) => {
            // Check if there's a corresponding after photo linked to this before photo
            const afterPhoto = this.photos.find(p =>
              p.room === this.currentRoom &&
              p.mode === 'after' &&
              p.beforePhotoId === beforePhoto.id
            );

            if (afterPhoto) {
              // Check if there's a properly formatted combined photo
              let displayPhoto = this.photos.find(p =>
                p.mode === 'mix' && p.room === beforePhoto.room && p.name === beforePhoto.name
              );

              let isFormatted = !!displayPhoto;


              if (displayPhoto) {
                // Show formatted combined photo
                const displayName = beforePhoto.name || `${beforePhoto.room} 1`;

                // Determine object-fit based on photo's original aspect ratio
                const objectFit = 'contain'; // Keep contain for proper display within square


                gridItems.push(`
                  <div class="photo-item" data-photo-index="${this.photos.indexOf(displayPhoto)}" style="border: 1px solid #E1E1E1; border-radius: 8px; overflow: hidden; position: relative; transition: transform 0.2s; aspect-ratio: 1;">
                    <img src="${displayPhoto.dataUrl}" style="width: 100%; height: 100%; object-fit: ${objectFit}; filter: blur(3px);" />

                    <!-- Retake button in center (original workflow) -->
                    <button class="retake-combined-btn" data-before-photo-id="${beforePhoto.id}" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #F2C31B; color: #303030; border: none; padding: 8px 12px; border-radius: 6px; font-size: 12px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.3); z-index: 10;">
                      🔄 Retake
                    </button>

                    <!-- Transparent title overlay -->
                    <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 8px; background: linear-gradient(transparent, rgba(0,0,0,0.7));">
                      <div style="color: white; font-weight: bold; font-size: 11px; text-shadow: 1px 1px 2px rgba(0,0,0,0.8); font-family: 'Quicksand', sans-serif;">${displayName}</div>
                      <div style="color: rgba(255,255,255,0.9); font-size: 10px; text-shadow: 1px 1px 2px rgba(0,0,0,0.8); font-family: 'Quicksand', sans-serif;">${new Date(beforePhoto.timestamp).toLocaleString()}</div>
                    </div>

                    <!-- Delete button -->
                    <button class="delete-photo-btn" data-photo-index="${this.photos.indexOf(displayPhoto)}" style="position: absolute; top: 5px; right: 5px; background: rgba(48,48,48,0.9); color: white; border: none; padding: 5px; border-radius: 50%; font-size: 12px; cursor: pointer; width: 25px; height: 25px; display: flex; align-items: center; justify-content: center;">
                      🗑️
                    </button>
                  </div>
                `);
              }
            } else {
              // Show only before photo
              const displayName = beforePhoto.name || `${beforePhoto.room} 1`;

              // Determine object-fit based on photo's original aspect ratio
              const objectFit = 'contain'; // Keep contain for proper display


              gridItems.push(`
                <div class="photo-item" data-photo-index="${this.photos.indexOf(beforePhoto)}" style="border: 3px solid #F2C31B; border-radius: 8px; overflow: hidden; position: relative; transition: transform 0.2s; aspect-ratio: 1;">
                  <img src="${beforePhoto.dataUrl}" style="width: 100%; height: 100%; object-fit: ${objectFit}; cursor: pointer;" />
                  <div style="padding: 8px; font-size: 11px; color: #B3B3B3;">
                    <div style="font-weight: bold; margin-bottom: 2px; color: #303030; font-family: 'Quicksand', sans-serif;">${displayName}</div>
                    <div style="font-size: 10px; opacity: 0.8; font-family: 'Quicksand', sans-serif;">${new Date(beforePhoto.timestamp).toLocaleString()}</div>
                  </div>
                  <!-- Delete button -->
                  <button class="delete-photo-btn" data-photo-index="${this.photos.indexOf(beforePhoto)}" style="position: absolute; top: 5px; right: 5px; background: rgba(48,48,48,0.9); color: white; border: none; padding: 5px; border-radius: 50%; font-size: 12px; cursor: pointer; width: 25px; height: 25px; display: flex; align-items: center; justify-content: center;">
                    🗑️
                  </button>
                </div>
              `);
            }
          });
          
          // Add one dummy square for taking more photos
          gridItems.push(`
            <div class="dummy-photo" data-room="${this.currentRoom}" style="aspect-ratio: 1; border-radius: 8px; background: #f0f0f0; border: 2px dashed #ccc; display: flex; align-items: center; justify-content: center; color: #999; font-size: 24px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#e8e8e8'; this.style.color='#666';" onmouseout="this.style.background='#f0f0f0'; this.style.color='#999';">
              ${roomIcons[this.currentRoom] || '📷'}
            </div>
          `);

          return gridItems.join('');
        }
        
        getRoomPhotosByType(type) {
          const roomPhotos = this.photos.filter(photo => photo.room === this.currentRoom);
          
          if (type === 'photo') {
            const result = roomPhotos.filter(photo => photo.mode === 'before' || photo.mode === 'after');
            return result;
          } else if (type === 'combined') {
            const result = roomPhotos.filter(photo => photo.mode === 'mix');
            return result;
          } else if (type === 'all') {
            const result = roomPhotos.filter(photo => photo.mode === 'archived' || photo.mode === 'mix');
            return result;
          }
          return roomPhotos;
        }
        
        addSwipeListeners() {
          // Only add listeners once
          if (this.swipeListenersAdded) return;
          this.swipeListenersAdded = true;
          
          // Ensure room order matches the visual tab order exactly
          const rooms = ['kitchen', 'bathroom', 'bedroom', 'living-room', 'dining-room', 'office'];
          let startX = 0;
          let startY = 0;
          
          // Add touch events for swiping
          document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
          });
          
          document.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only trigger swipe if horizontal movement is greater than vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
              const currentIndex = rooms.indexOf(this.currentRoom);
              
              if (diffX > 0) {
                // Swipe left - next room (following tab order)
                const nextIndex = (currentIndex + 1) % rooms.length;
                this.currentRoom = rooms[nextIndex];
              } else {
                // Swipe right - previous room (following tab order)
                const prevIndex = (currentIndex - 1 + rooms.length) % rooms.length;
                this.currentRoom = rooms[prevIndex];
              }
              
              this.currentTab = 'photo';
              
              // Check if we're in a camera modal - if so, don't call init() to avoid regenerating the entire app
              const isInCameraModal = document.querySelector('[style*="position: fixed"][style*="z-index: 1000"]') !== null ||
                                      document.querySelector('[style*="position: fixed"][style*="z-index: 2000"]') !== null ||
                                      document.querySelector('[style*="position: fixed"][style*="z-index: 2002"]') !== null;
              
              if (isInCameraModal) {
                // Just update modal elements without regenerating the entire app
                setTimeout(() => {
                  this.updateModalRoomTabs();
                  this.updateModalPhotoGrid();
                }, 100);
              } else {
                // Normal app update
                this.init();
                setTimeout(() => {
                  this.updateTabsCarousel();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 200);
              }
            }
          });
          
          // Add keyboard support for cycling
          document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
              e.preventDefault();
              const currentIndex = rooms.indexOf(this.currentRoom);
              
              if (e.key === 'ArrowLeft') {
                const prevIndex = (currentIndex - 1 + rooms.length) % rooms.length;
                this.currentRoom = rooms[prevIndex];
              } else {
                const nextIndex = (currentIndex + 1) % rooms.length;
                this.currentRoom = rooms[nextIndex];
              }
              
              this.currentTab = 'photo';
              
              // Check if we're in a camera modal - if so, don't call init() to avoid regenerating the entire app
              const isInCameraModal = document.querySelector('[style*="position: fixed"][style*="z-index: 1000"]') !== null ||
                                      document.querySelector('[style*="position: fixed"][style*="z-index: 2000"]') !== null ||
                                      document.querySelector('[style*="position: fixed"][style*="z-index: 2002"]') !== null;
              
              if (isInCameraModal) {
                // Just update modal elements without regenerating the entire app
                setTimeout(() => {
                  this.updateModalRoomTabs();
                  this.updateModalPhotoGrid();
                }, 100);
              } else {
                // Normal app update
                this.init();
                setTimeout(() => {
                  this.updateTabsCarousel();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 200);
              }
            }
          });
        }
        
        updateTabsCarousel() {
          // Just re-render the tabs - the carousel positioning is handled in getRoomTabsCarousel()
          const tabsCarousel = document.getElementById('tabs-carousel');
          if (tabsCarousel) {
            tabsCarousel.innerHTML = this.getRoomTabsCarousel();

            // Reattach event listeners after updating the DOM
            this.attachRoomTabListeners();
          }
        }

        attachRoomTabListeners() {

          // Room tabs click listeners - specifically for main gallery (not modal)
          const mainCarousel = document.getElementById('tabs-carousel');

          if (!mainCarousel) {
            const allElements = document.querySelectorAll('*[id*="tab"]');
            return;
          }

          const roomTabs = mainCarousel.querySelectorAll('.room-tab');

          roomTabs.forEach((btn, index) => {

            // Remove any existing listeners first
            btn.removeEventListener('click', this.roomTabClickHandler);

            // Add new listener
            btn.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();

              // Get room from current target (the button) instead of target (might be inner element)
              const room = e.currentTarget.dataset.room;

              if (room && room !== this.currentRoom) {
                this.currentRoom = room;
                this.currentTab = 'photo'; // Reset to photo tab when switching rooms

                // Update only the content area instead of full re-init
                const photosContainer = document.getElementById('photos-container');
                if (photosContainer) {
                  photosContainer.innerHTML = this.getPhotosHTML();
                  this.attachPhotoListeners();
                }

                // Update carousel and scroll
                setTimeout(() => {
                  this.updateTabsCarousel();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              } else {
              }
            });

            // Make sure buttons are interactive
            btn.style.pointerEvents = 'auto';
            btn.style.cursor = 'pointer';
            btn.style.backgroundColor = btn.style.backgroundColor || '#f0f0f0';

            // Add hover effect for testing
            btn.addEventListener('mouseenter', () => {
              btn.style.opacity = '0.8';
            });

            btn.addEventListener('mouseleave', () => {
              btn.style.opacity = '1';
            });

            // Add mousedown and mouseup for more testing
            btn.addEventListener('mousedown', () => {
            });

            btn.addEventListener('mouseup', () => {
            });

            // Check if element is being blocked
            btn.addEventListener('pointerdown', () => {
            });

          });

        }

        // Test function to manually check room tab functionality
        testRoomTabs() {
          const carousel = document.getElementById('tabs-carousel');

          if (carousel) {
            const tabs = carousel.querySelectorAll('.room-tab');

            tabs.forEach((tab, i) => {
              const rect = tab.getBoundingClientRect();
              const style = window.getComputedStyle(tab);

              // Check what element is actually at the center of the button
              const centerX = rect.x + rect.width / 2;
              const centerY = rect.y + rect.height / 2;
              const elementAtPoint = document.elementFromPoint(centerX, centerY);
            });

            // Try to click the first tab
            if (tabs.length > 0) {
              tabs[0].click();
            }
          }
        }

        updateModalRoomTabs() {
          // Update room tabs in the modal
          const modalTabsCarousel = document.getElementById('modal-tabs-carousel');
          if (modalTabsCarousel) {
            modalTabsCarousel.innerHTML = this.getRoomTabsCarousel();

            // Reattach modal room tab listeners
            this.attachModalRoomTabListeners();
          }
        }

        attachModalRoomTabListeners() {
          // Room tab listeners specifically for the modal
          const modalCarousel = document.getElementById('modal-tabs-carousel');
          if (!modalCarousel) return;

          modalCarousel.querySelectorAll('.room-tab').forEach(btn => {
            btn.addEventListener('click', (e) => {
              const room = e.currentTarget.dataset.room;
              if (room && room !== this.currentRoom) {
                this.currentRoom = room;
                this.updateModalRoomTabs();
                this.updateModalPhotoGrid();
              }
            });
          });
        }

        updateModalPhotoGrid() {
          // Update photo grid in the modal
          const beforePhotoGrid = document.getElementById('before-photo-grid');
          if (beforePhotoGrid) {
            // Store current scroll position and content height
            const previousScrollTop = beforePhotoGrid.scrollTop;
            const previousScrollHeight = beforePhotoGrid.scrollHeight;

            beforePhotoGrid.innerHTML = this.getBeforePhotosGridHTML();
            this.attachBeforePhotoListeners();

            // Smart scrolling to keep content visible above bottom panel
            setTimeout(() => {
              const currentScrollHeight = beforePhotoGrid.scrollHeight;
              const containerHeight = beforePhotoGrid.clientHeight;
              const bottomPanelHeight = 80; // Height of bottom panel

              // If content grew (new photos added), scroll up to accommodate
              if (currentScrollHeight > previousScrollHeight) {
                const heightDifference = currentScrollHeight - previousScrollHeight;

                // Calculate optimal scroll position to keep latest content visible
                // but not hidden behind bottom panel
                const maxVisibleScroll = currentScrollHeight - containerHeight + bottomPanelHeight;
                const newScrollTop = Math.min(previousScrollTop + heightDifference, maxVisibleScroll);

                beforePhotoGrid.scrollTop = Math.max(0, newScrollTop);
              }
            }, 100);
          }
        }

        showActionButtons() {
          // Show retake and save buttons, hide camera button
          const retakeBtn = document.getElementById('btn-retake');
          const saveBtn = document.getElementById('btn-save');
          const cameraBtn = document.getElementById('camera-btn');
          const bottomPanel = document.getElementById('bottom-panel');

          // Show the bottom panel with appropriate layout
          if (bottomPanel) {
            bottomPanel.style.display = this.isLandscape ? 'flex' : 'grid';
          }

          if (retakeBtn) retakeBtn.style.display = 'flex';
          if (saveBtn) saveBtn.style.display = 'flex';
          if (cameraBtn) cameraBtn.style.display = 'none';
          
          // Adjust main content padding in landscape mode
          if (this.isLandscape) {
            this.adjustMainContentForRightPanel(true);
          }
          
          // Check if we're in after mode (comparison camera modal) and make bottom panel transparent
          if (bottomPanel) {
            const cameraModal = document.querySelector('[style*="position: fixed"][style*="z-index: 1000"]') ||
                               document.querySelector('[style*="position: fixed"][style*="z-index: 2000"]') ||
                               document.querySelector('[style*="position: fixed"][style*="z-index: 2002"]');
            
            if (cameraModal && cameraModal.innerHTML.includes('comparison-camera')) {
              // After mode (comparison camera) - transparent panel
              bottomPanel.style.background = 'transparent';
              bottomPanel.style.boxShadow = 'none';
            } else {
              // Before mode - white panel to cover gallery
              bottomPanel.style.background = 'white';
              bottomPanel.style.boxShadow = 'none';
            }
          }
        }

        hideActionButtons() {
          // Hide retake and save buttons, keep camera button hidden for gallery
          const retakeBtn = document.getElementById('btn-retake');
          const saveBtn = document.getElementById('btn-save');
          const cameraBtn = document.getElementById('camera-btn');
          const bottomPanel = document.getElementById('bottom-panel');

          // Hide the entire bottom panel in gallery mode
          if (bottomPanel) bottomPanel.style.display = 'none';

          if (retakeBtn) retakeBtn.style.display = 'none';
          if (saveBtn) saveBtn.style.display = 'none';
          
          // Reset bottom panel styling to original
          if (bottomPanel) {
            bottomPanel.style.background = 'white';
            bottomPanel.style.boxShadow = '0 -2px 8px rgba(0,0,0,0.1)';
          }
          
          // Check if we're in a camera modal - if so, keep camera button visible
          const isInCameraModal = document.querySelector('[style*="position: fixed"][style*="z-index: 1000"]') !== null ||
                                  document.querySelector('[style*="position: fixed"][style*="z-index: 2000"]') !== null ||
                                  document.querySelector('[style*="position: fixed"][style*="z-index: 2002"]') !== null;
          if (cameraBtn) {
            if (isInCameraModal) {
              cameraBtn.style.display = 'block'; // Keep visible during camera modal
            } else {
              cameraBtn.style.display = 'none'; // Hide for gallery
            }
          }
        }

        showCameraButton() {
          // Show camera button during photo capture screens
          const cameraBtn = document.getElementById('camera-btn');
          const aspectRatioControls = document.getElementById('aspect-ratio-controls');
          const bottomPanel = document.getElementById('bottom-panel');
          const zoomControlsPanel = document.getElementById('zoom-controls-panel');

          // Show the bottom panel with appropriate layout
          if (bottomPanel) {
            bottomPanel.style.display = this.isLandscape ? 'flex' : 'grid';
          }

          if (cameraBtn) cameraBtn.style.display = 'block';
          if (aspectRatioControls) {
            aspectRatioControls.style.display = 'flex';
            // Ensure aspect ratio controls always have proper styling for visibility
            aspectRatioControls.style.background = 'rgba(0,0,0,0.7)';
            aspectRatioControls.style.borderRadius = '20px';
            aspectRatioControls.style.backdropFilter = 'blur(10px)';
          }
          if (zoomControlsPanel) {
            zoomControlsPanel.style.display = 'flex';
            // Ensure zoom controls always have proper styling for visibility
            zoomControlsPanel.style.background = 'rgba(0,0,0,0.7)';
            zoomControlsPanel.style.borderRadius = '20px';
            zoomControlsPanel.style.backdropFilter = 'blur(10px)';
          }
          
          // Adjust main content padding in landscape mode
          if (this.isLandscape) {
            this.adjustMainContentForRightPanel(true);
          }
          
          // Check if we're in a camera modal and apply appropriate styling
          if (bottomPanel && cameraBtn) {
            const cameraModal = document.querySelector('[style*="position: fixed"][style*="z-index: 1000"]') ||
                               document.querySelector('[style*="position: fixed"][style*="z-index: 2000"]') ||
                               document.querySelector('[style*="position: fixed"][style*="z-index: 2002"]');
            
            if (cameraModal) {
              // Conditional styling based on camera mode
              if (cameraModal.innerHTML.includes('comparison-camera')) {
                // After mode (comparison camera) - transparent panel
                bottomPanel.style.background = 'transparent';
                bottomPanel.style.boxShadow = 'none';
              } else {
                // Before mode - white panel to cover gallery
                bottomPanel.style.background = 'white';
                bottomPanel.style.boxShadow = 'none';
              }

              // Make individual sections transparent, except control panels
              const sections = bottomPanel.querySelectorAll('div');
              sections.forEach(section => {
                // Don't make control panels transparent - they need dark background for contrast
                if (section.id !== 'zoom-controls-panel' && section.id !== 'aspect-ratio-controls') {
                  section.style.background = 'transparent';
                }
              });
              
              cameraBtn.style.background = '#F2C31B';
              cameraBtn.style.border = '2px solid rgba(255,255,255,0.8)';
              cameraBtn.style.boxShadow = '0 4px 12px rgba(48,48,48,0.3)';
            } else {
              // Not in camera modal - keep panel transparent (room tabs are at bottom)
              bottomPanel.style.background = 'transparent';
              bottomPanel.style.boxShadow = 'none';
              cameraBtn.style.background = '#F2C31B';
              cameraBtn.style.border = 'none';
              cameraBtn.style.boxShadow = '0 4px 12px rgba(48,48,48,0.3)';
            }
          }
        }

        hideCameraButton() {
          // Hide camera button and reset styling
          const cameraBtn = document.getElementById('camera-btn');
          const aspectRatioControls = document.getElementById('aspect-ratio-controls');
          const bottomPanel = document.getElementById('bottom-panel');
          const zoomControlsPanel = document.getElementById('zoom-controls-panel');

          // Hide the entire bottom panel
          if (bottomPanel) bottomPanel.style.display = 'none';
          if (aspectRatioControls) aspectRatioControls.style.display = 'none';
          if (zoomControlsPanel) zoomControlsPanel.style.display = 'none';

          // Restore main content padding in landscape mode
          if (this.isLandscape) {
            this.adjustMainContentForRightPanel(false);
          }

          if (cameraBtn) {
            cameraBtn.style.display = 'none';
            // Reset camera button styling to original
            cameraBtn.style.background = '#F2C31B';
            cameraBtn.style.border = 'none';
            cameraBtn.style.boxShadow = '0 4px 12px rgba(48,48,48,0.3)';
          }

          // Keep bottom panel white when hidden (to cover any gallery content)
          if (bottomPanel) {
            bottomPanel.style.background = 'white';
            bottomPanel.style.boxShadow = 'none';

            // Reset individual sections to transparent (they sit on white background)
            const sections = bottomPanel.querySelectorAll('div');
            sections.forEach(section => {
              section.style.background = 'transparent';
            });
          }
        }

        adjustMainContentForRightPanel(show) {
          // Adjust main content padding when right panel is shown/hidden in landscape mode
          const mainContent = document.getElementById('main-scrollable-content');
          if (mainContent && this.isLandscape) {
            if (show) {
              mainContent.style.paddingRight = '90px'; // Account for 80px panel + 10px margin
            } else {
              mainContent.style.paddingRight = '10px'; // Restore original padding
            }
          }
        }

        updateGridsOnOrientationChange() {
          // Update main gallery grid
          const photosContainer = document.getElementById('photos-container');
          if (photosContainer) {
            if (this.isLandscape) {
              photosContainer.style.gridTemplateColumns = 'repeat(5, 1fr)';
            } else {
              photosContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
            }
          }

          // Update before photo grid if it exists
          const beforePhotoGrid = document.getElementById('before-photo-grid');
          if (beforePhotoGrid) {
            const gridContainer = beforePhotoGrid.querySelector('div');
            if (gridContainer) {
              const squareSize = this.calculateSquareSize(3);
              // Always use 3 columns in both orientations
              gridContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
              gridContainer.style.gridAutoRows = `minmax(${squareSize}px, 1fr)`;
            }
          }
        }
        
        hideMainRoomTabs() {
          // Hide main room tabs when in camera mode
          const stickyTabsContainer = document.getElementById('sticky-tabs-container');
          if (stickyTabsContainer) {
            stickyTabsContainer.style.display = 'none';
          }
        }
        
        showMainRoomTabs() {
          // Show main room tabs when returning to gallery
          const stickyTabsContainer = document.getElementById('sticky-tabs-container');
          if (stickyTabsContainer) {
            stickyTabsContainer.style.display = 'flex';
          }

          // Also ensure header is visible
          this.showHeader();
        }

        showHeader() {
          // Ensure header is visible - find the header element
          const headerUploadBtn = document.getElementById('header-upload-btn');
          if (headerUploadBtn) {
            // Header exists, make sure its parent is visible
            const header = headerUploadBtn.closest('div');
            if (header) {
              header.style.display = 'flex';
              header.style.visibility = 'visible';
              header.style.opacity = '1';
            }
          } else {
            // If header is missing, something went wrong - reinitialize
            setTimeout(() => {
              this.init();
            }, 100);
          }
        }

        // Helper function to restore scrolling if no camera modals are open
        restoreScrollingIfNoCameraModals() {
          // Check if there are any camera-related modals still open
          const cameraModals = document.querySelectorAll('[style*="position: fixed"][style*="z-index: 1000"], [style*="position: fixed"][style*="z-index: 2000"], [style*="position: fixed"][style*="z-index: 2002"]');
          if (cameraModals.length === 0) {
            // No camera modals are open, restore scrolling
            document.body.style.overflow = '';
          }
        }

        addScrollListener() {
          // Throttle scroll events for performance
          let scrollTimeout;

          window.addEventListener('scroll', () => {
            if (scrollTimeout) {
              clearTimeout(scrollTimeout);
            }

            scrollTimeout = setTimeout(() => {
              this.checkVisibleRoom();
            }, 100); // Check every 100ms during scroll
          });
        }

        checkVisibleRoom() {
          // Room sections removed - scroll-based room switching disabled
          // Users can only switch rooms through tabs
        }
        
        attachPhotoListeners() {
          // Only attach listeners for photo elements (called after photo grid updates)
          // Clear any existing listeners first to prevent duplicates
          setTimeout(() => {
            document.querySelectorAll('.photo-item').forEach(item => {
              // Remove any existing listeners by cloning the element
              const newItem = item.cloneNode(true);
              item.parentNode.replaceChild(newItem, item);
              
              // Photo click to view fullscreen
              newItem.addEventListener('click', (e) => {
                // Don't trigger if clicking delete button or retake button
                if (e.target.classList.contains('delete-photo-btn') ||
                    e.target.classList.contains('retake-combined-btn')) {
                  return;
                }

                const photoIndex = parseInt(e.currentTarget.dataset.photoIndex);
                if (photoIndex >= 0 && photoIndex < this.photos.length) {
                  this.showPhotoFullscreen(this.photos[photoIndex]);
                }
              });

              // Add hover effect
              newItem.addEventListener('mouseenter', (e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
              });

              newItem.addEventListener('mouseleave', (e) => {
                e.currentTarget.style.transform = 'scale(1)';
              });
            });

            // Delete button functionality for photos
            document.querySelectorAll('.delete-photo-btn').forEach(btn => {
              btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const photoIndex = parseInt(e.target.dataset.photoIndex);
                this.deletePhoto(photoIndex);
              });
            });

            // Retake button functionality for combined photos (original workflow)
            document.querySelectorAll('.retake-combined-btn').forEach(btn => {
              btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const beforePhotoId = parseInt(e.target.dataset.beforePhotoId);
                const beforePhoto = this.photos.find(p => p.id === beforePhotoId);
                if (beforePhoto) {
                  // Open the comparison camera for retaking the after photo
                  this.showPhotoFullscreen(beforePhoto);
                }
              });
            });


            // Dummy photos click handlers
            document.querySelectorAll('.dummy-photo').forEach(dummy => {
              dummy.addEventListener('click', (e) => {
                const room = e.currentTarget.dataset.room;
                this.openCameraForRoom(room);
              });
            });
            
            // Auto-scroll to bottom to show latest photos (main gallery only)
            setTimeout(() => {
              const mainScrollableContent = document.getElementById('main-scrollable-content');
              if (mainScrollableContent) {
                
                if (mainScrollableContent.scrollHeight > mainScrollableContent.clientHeight) {
                  mainScrollableContent.scrollTop = mainScrollableContent.scrollHeight;
                } else {
                }
              } else {
              }
            }, 200);
          }, 100);
        }

        attachEventListeners() {
          // Room tabs with swipe support - attach with delay to ensure DOM is ready
          setTimeout(() => {
            this.attachRoomTabListeners();
          }, 100);
          
          // Add swipe functionality to room tabs
          this.addSwipeListeners();

          // Camera button - only visible during photo capture screens
          const cameraBtn = document.getElementById('camera-btn');
          if (cameraBtn) {
            cameraBtn.addEventListener('click', () => {
              // Check if we're in a camera modal (before or after mode)
              const cameraModal = document.querySelector('[style*="position: fixed"][style*="z-index: 1000"]') ||
                                 document.querySelector('[style*="position: fixed"][style*="z-index: 2000"]') ||
                                 document.querySelector('[style*="position: fixed"][style*="z-index: 2002"]');

              if (cameraModal) {
                // We're in a camera modal, capture photo
                if (cameraModal.innerHTML.includes('camera-video')) {
                  // Before mode - regular camera
                  this.captureFromCameraModal();
                } else if (cameraModal.innerHTML.includes('comparison-camera')) {
                  // After mode - comparison camera
                  this.captureFromComparisonModal();
                }
              }
            });
          }
          
          // Header upload button - show upload options popup
          const headerUploadBtn = document.getElementById('header-upload-btn');
          if (headerUploadBtn) {
            headerUploadBtn.addEventListener('click', () => {
              this.showUploadOptionsPopup();
            });
          }

          // Label toggle button - toggle BEFORE/AFTER labels
          const labelToggleBtn = document.getElementById('label-toggle-btn');
          if (labelToggleBtn) {
            labelToggleBtn.addEventListener('click', () => {
              this.labelsEnabled = !this.labelsEnabled;
              Storage.saveSettings({ labelsEnabled: this.labelsEnabled });

              // Update button appearance
              labelToggleBtn.style.background = this.labelsEnabled ? '#303030' : '#ccc';
              labelToggleBtn.style.color = this.labelsEnabled ? '#F2C31B' : '#666';

              // Show feedback
              const feedback = this.labelsEnabled ? 'Labels enabled ✓' : 'Labels disabled';
              this.showToast(feedback);
            });
          }

          // All Photos button - show all photos modal
          const allPhotosBtn = document.getElementById('all-photos-btn');
          if (allPhotosBtn) {
            allPhotosBtn.addEventListener('click', () => {
              this.showAllPhotosModal();
            });
          }
          
          // Change User button - clear stored data and reload to sign-in
          const changeUserBtn = document.getElementById('change-user-btn');
          if (changeUserBtn) {
            changeUserBtn.addEventListener('click', () => {
              this.showChangeUserWarning();
            });
          }
          
          // Location select
          const locationSelect = document.getElementById('location-select');
          if (locationSelect) {
            locationSelect.addEventListener('change', (e) => {
              // You can add location-specific functionality here
            });
          }
          
          // Retake and Save button handlers
          const retakeBtn = document.getElementById('btn-retake');
          if (retakeBtn) {
            retakeBtn.addEventListener('click', () => {
              if (this.currentSplitScreen) {
                // Store the room before closing split screen
                const room = this.currentSplitScreen.room;

                // Close current split screen
                this.closeSplitScreenPreview();

                // Clean up any remaining modals (exclude permanent UI elements)
                Utils.cleanupExistingModals(null, { excludeIds: ['bottom-panel', 'sticky-tabs-container'] });

                // Restore scrolling if no camera modals remain
                this.restoreScrollingIfNoCameraModals();

                // Small delay to ensure cleanup completes
                setTimeout(() => {
                  // Find the before photo and reopen comparison camera
                  const beforePhoto = this.photos.find(p =>
                    p.room === room && p.mode === 'before'
                  );

                  if (beforePhoto) {
                    this.showPhotoFullscreen(beforePhoto);
                  }
                }, 100);
              }
            });
          }

          const saveBtn = document.getElementById('btn-save');
          if (saveBtn) {
            saveBtn.addEventListener('click', () => {
              if (this.currentSplitScreen) {
                // Save the combined photo
                this.captureSplitScreenPhoto(
                  this.currentSplitScreen.beforeDataUrl,
                  this.currentSplitScreen.afterDataUrl,
                  this.currentSplitScreen.room
                );

                // Close split screen and return to gallery
                this.closeSplitScreenPreview();
              }
            });
          }
          
          // Photo event listeners moved to attachPhotoListeners() to prevent duplicates
          this.attachPhotoListeners();
        }
        
        
        deletePhoto(photoIndex) {
          if (photoIndex >= 0 && photoIndex < this.photos.length) {
            const photo = this.photos[photoIndex];
            const photoType = photo.mode === 'mix' ? 'combined before/after' : photo.mode;

            this.showDeleteConfirmation(photoType, photo.room, photoIndex);
          }
        }

        showDeleteConfirmation(photoType, room, photoIndex) {
          // Clean up any existing confirmation modals first
          Utils.cleanupExistingModals(3000);

          const modal = document.createElement('div');
          modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0,0,0,0.7); z-index: 3000; display: flex;
            align-items: center; justify-content: center; padding: 20px;
          `;

          modal.innerHTML = `
            <div style="background: white; border-radius: 16px; padding: 24px; max-width: 400px; width: 100%; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
              <!-- Title -->
              <h3 style="text-align: center; font-size: 20px; font-weight: bold; color: #1f2937; margin-bottom: 24px;">
                Are you sure?
              </h3>
              
              <!-- Buttons -->
              <div style="display: flex; gap: 12px;">
                <button id="cancel-delete-btn" style="flex: 1; padding: 12px 20px; border: 2px solid #d1d5db; background: white; color: #374151; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.2s;">
                  Cancel
                </button>
                <button id="confirm-delete-btn" style="flex: 1; padding: 12px 20px; border: none; background: #F2C31B; color: #303030; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.2s;">
                  Delete
                </button>
              </div>
            </div>
          `;

          document.body.appendChild(modal);

          // Add hover effects
          const cancelBtn = document.getElementById('cancel-delete-btn');
          const confirmBtn = document.getElementById('confirm-delete-btn');

          cancelBtn.addEventListener('mouseenter', () => {
            cancelBtn.style.background = '#f9fafb';
            cancelBtn.style.borderColor = '#9ca3af';
          });
          cancelBtn.addEventListener('mouseleave', () => {
            cancelBtn.style.background = 'white';
            cancelBtn.style.borderColor = '#d1d5db';
          });

          confirmBtn.addEventListener('mouseenter', () => {
            confirmBtn.style.background = '#e6b800';
          });
          confirmBtn.addEventListener('mouseleave', () => {
            confirmBtn.style.background = '#F2C31B';
          });

          // Event listeners
          cancelBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
          });

          confirmBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
            this.confirmDeletePhoto(photoIndex);
          });

          // Close on background click and Escape key
          Utils.attachModalCloseHandlers(modal, () => Utils.closeModal(modal), {
            closeOnBackdrop: true,
            closeOnEscape: true
          });
        }

        confirmDeletePhoto(photoIndex) {
          if (photoIndex >= 0 && photoIndex < this.photos.length) {
            const photo = this.photos[photoIndex];

            // Special handling for combined photos (mode === 'mix')
            if (photo.mode === 'mix') {
              // First find the corresponding before photo using room and name
              const beforePhoto = this.photos.find(p =>
                p.mode === 'before' &&
                p.room === photo.room &&
                p.name === photo.name
              );

              let afterPhotoIndex = -1;

              if (beforePhoto) {
                // Find the after photo using the beforePhotoId relationship
                afterPhotoIndex = this.photos.findIndex(p =>
                  p.mode === 'after' &&
                  p.beforePhotoId === beforePhoto.id
                );
              }

              // If we couldn't find using beforePhotoId, try the old way as fallback
              if (afterPhotoIndex === -1) {
                afterPhotoIndex = this.photos.findIndex(p =>
                  p.mode === 'after' &&
                  p.room === photo.room &&
                  p.name === photo.name
                );
              }

              // Find and remove any old thumbnails for this photo pair
              const thumbnailIndices = this.photos
                .map((p, index) => ({ photo: p, index }))
                .filter(({ photo: p }) =>
                  p.mode === 'thumbnail' &&
                  p.room === photo.room &&
                  p.name === photo.name
                )
                .map(({ index }) => index)
                .sort((a, b) => b - a); // Sort in descending order for safe removal

              // Remove all found items (thumbnails, after photo, combined photo) in descending index order
              const indicesToRemove = [...thumbnailIndices];

              if (afterPhotoIndex !== -1) {
                indicesToRemove.push(afterPhotoIndex);
              }

              indicesToRemove.push(photoIndex);

              // Sort in descending order and remove
              indicesToRemove.sort((a, b) => b - a);
              indicesToRemove.forEach(index => {
                this.photos.splice(index, 1);
              });

              // Keep the before photo - it should remain untouched
            } else {
              // For non-combined photos, use the original logic
              this.photos.splice(photoIndex, 1);
            }

            // Save changes to localStorage
            this.savePhotos();


            // Reassign names to maintain proper sequential numbering
            this.reassignPhotoNames();

            // Update photo grid without full DOM regeneration
            const photosContainer = document.getElementById('photos-container');
            if (photosContainer) {
              photosContainer.innerHTML = this.getPhotosHTML();
              this.attachPhotoListeners(); // Re-attach event listeners for updated photo elements
            }

            // Update gallery modal if it's open (all photos view)
            const allPhotosContent = document.getElementById('all-photos-content');
            if (allPhotosContent) {
              allPhotosContent.innerHTML = this.getAllPhotosHTML();
              this.attachGalleryPhotoListeners();
            }

            // Update before photo grid in modal if it exists
            this.updateModalPhotoGrid();
          }
        }

        showDeleteAllConfirmation() {
          // Clean up any existing confirmation modals first
          Utils.cleanupExistingModals(3000);

          const modal = document.createElement('div');
          modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0,0,0,0.7); z-index: 3000; display: flex;
            align-items: center; justify-content: center; padding: 20px;
          `;

          modal.innerHTML = `
            <div style="background: white; border-radius: 12px; padding: 30px; max-width: 400px; width: 90%; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
              <div style="font-size: 48px; margin-bottom: 20px;">⚠️</div>
              <h2 style="margin: 0 0 15px 0; color: #303030; font-size: 20px;">Delete All Photos?</h2>
              <p style="margin: 0 0 25px 0; color: #666; line-height: 1.4;">
                This will permanently delete all ${this.photos.length} photos from all rooms. This action cannot be undone.
              </p>
              <div style="display: flex; gap: 15px;">
                <button id="cancel-delete-all" style="flex: 1; background: #f3f4f6; color: #374151; border: none; padding: 12px 20px; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: 500;">
                  Cancel
                </button>
                <button id="confirm-delete-all" style="flex: 1; background: #dc2626; color: white; border: none; padding: 12px 20px; border-radius: 8px; font-size: 16px; cursor: pointer; font-weight: 500;">
                  Delete All
                </button>
              </div>
            </div>
          `;

          document.body.appendChild(modal);

          const cancelBtn = document.getElementById('cancel-delete-all');
          const confirmBtn = document.getElementById('confirm-delete-all');

          // Event listeners
          cancelBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
          });

          confirmBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
            this.deleteAllPhotos();
          });

          // Close on background click and Escape key
          Utils.attachModalCloseHandlers(modal, () => Utils.closeModal(modal), {
            closeOnBackdrop: true,
            closeOnEscape: true
          });
        }

        deleteAllPhotos() {

          // Clear the photos array
          this.photos = [];

          // Clear localStorage
          localStorage.removeItem('cleaning-photos');

          // Update the UI to show empty state
          const photosContainer = document.getElementById('photos-container');
          if (photosContainer) {
            photosContainer.innerHTML = this.getPhotosHTML();
            this.attachPhotoListeners();
          }

          // Update before photo grid in modal if it exists
          this.updateModalPhotoGrid();


        }

        async showPhotoFullscreen(photo) {

          // Clean up any existing photo fullscreen modals first
          const existingPhotoModals = document.querySelectorAll('[style*="position: fixed"][style*="z-index: 2000"], [style*="position: fixed"][style*="z-index: 2002"]');
          existingPhotoModals.forEach(existing => {
            if (existing.parentNode) {
              document.body.removeChild(existing);
            }
          });

          const modal = document.createElement('div');
          modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0,0,0,0.95); z-index: 2000; display: flex;
            flex-direction: column;
          `;
          
          if (photo.mode === 'before') {
            // Store the specific before photo that was clicked for later reference
            this.currentBeforePhoto = photo;

            // Restore the aspect ratio from the before photo
            if (photo.aspectRatio) {
              this.currentAspectRatio = photo.aspectRatio;
              // Update the aspect ratio overlay immediately to match before photo
              setTimeout(() => {
                this.updateAspectRatioOverlay();
              }, 100);
            }

            // Split screen: before photo and camera
            modal.innerHTML = this.getComparisonModalHTML(photo);

            document.body.appendChild(modal);

            // Prevent background scrolling when modal is open
            document.body.style.overflow = 'hidden';

            // Hide main room tabs and show camera button for photo capture
            this.hideMainRoomTabs();
            this.showCameraButton();
            
            // Initialize camera for comparison
            try {
              let stream;
              try {
                const constraints = this.getIOSCameraConstraints();
                stream = await navigator.mediaDevices.getUserMedia(constraints);
              } catch (backCameraError) {
                const aspectRatio = this.getAspectRatio();
                const targetAspectRatio = aspectRatio.width / aspectRatio.height;

                stream = await navigator.mediaDevices.getUserMedia({
                  video: {
                    facingMode: 'environment'
                    // Removed aspectRatio constraint to get full native sensor area
                  }
                });
              }
              
              const video = document.getElementById('comparison-camera');
              video.srcObject = stream;
              
              let currentFacingMode = 'environment';
              let currentZoom = this.currentBeforePhoto?.zoomLevel || 1; // Use before photo's zoom level
              
              // Initialize zoom controls for comparison camera
              this.initializeZoomControls(stream, 'comparison-camera', currentZoom, 'comparison');

              // Initialize aspect ratio button
              this.initializeAspectRatioButton();

              // Initialize aspect ratio overlay
              setTimeout(() => {
                this.updateAspectRatioOverlay();
              }, 100);

              // Close button
              document.getElementById('close-comparison-btn').addEventListener('click', () => {
                stream.getTracks().forEach(track => track.stop());
                document.body.removeChild(modal);
                this.hideCameraButton();
                this.showMainRoomTabs(); // Show room tabs when returning to gallery
                this.currentBeforePhoto = null; // Clear the reference

                // Restore background scrolling when modal is closed
                document.body.style.overflow = '';
              });
              
            } catch (error) {
              alert('Camera access denied or failed: ' + error.message);
              document.body.removeChild(modal);
              this.hideCameraButton();
              this.showMainRoomTabs(); // Show room tabs when returning to gallery
              this.currentBeforePhoto = null; // Clear the reference

              // Restore background scrolling when modal is closed
              document.body.style.overflow = '';
            }
            
          } else if (photo.mode === 'after') {
            // For after photos, find the linked before photo and open comparison camera for retaking
            const linkedBeforePhoto = this.photos.find(p => 
              p.id === photo.beforePhotoId && p.mode === 'before'
            );
            
            if (linkedBeforePhoto) {
              // Store the specific before photo that was clicked for later reference
              this.currentBeforePhoto = linkedBeforePhoto;
              
              // Split screen: before photo and camera
              modal.innerHTML = this.getComparisonModalHTML(linkedBeforePhoto);

              document.body.appendChild(modal);

              // Prevent background scrolling when modal is open
              document.body.style.overflow = 'hidden';

              // Hide main room tabs and show camera button for photo capture
              this.hideMainRoomTabs();
              this.showCameraButton();
              
              // Initialize camera for comparison
              try {
                let stream;
                try {
                  const constraints = this.getIOSCameraConstraints();
                  stream = await navigator.mediaDevices.getUserMedia(constraints);
                } catch (backCameraError) {
                  stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                      facingMode: 'environment'
                      // Remove aspectRatio constraint to capture full native resolution
                    }
                  });
                }
                
                const video = document.getElementById('comparison-camera');
                video.srcObject = stream;
                
                let currentFacingMode = 'environment';
                let currentZoom = linkedBeforePhoto?.zoomLevel || 1; // Use before photo's zoom level
                
                // Initialize zoom controls for comparison camera
                this.initializeZoomControls(stream, 'comparison-camera', currentZoom, 'comparison');

                // Initialize aspect ratio button
                this.initializeAspectRatioButton();

                // Initialize aspect ratio overlay
                setTimeout(() => {
                  this.updateAspectRatioOverlay();
                }, 100);

                // Close button
                document.getElementById('close-comparison-btn').addEventListener('click', () => {
                  stream.getTracks().forEach(track => track.stop());
                  document.body.removeChild(modal);
                  this.hideCameraButton();
                  this.showMainRoomTabs(); // Show room tabs when returning to gallery
                  this.currentBeforePhoto = null; // Clear the reference

                  // Restore background scrolling when modal is closed
                  document.body.style.overflow = '';
                });
                
              } catch (error) {
                alert('Camera access denied or failed: ' + error.message);
                document.body.removeChild(modal);
                this.hideCameraButton();
                this.showMainRoomTabs(); // Show room tabs when returning to gallery
                this.currentBeforePhoto = null; // Clear the reference

                // Restore background scrolling when modal is closed
                document.body.style.overflow = '';
              }
            } else {
              // Fallback: Regular fullscreen if no linked before photo found
              modal.innerHTML = `
                <div style="position: relative; width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center;">
                  <img src="${photo.dataUrl}" style="width: 100vw; height: 100vh; object-fit: contain;" />
                  
                  <!-- Photo info overlay -->
                  <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.8)); padding: 40px 20px 20px; text-align: center; color: white;">
                    <div style="font-size: 20px; font-weight: bold; margin-bottom: 8px;">
                      ${photo.room.charAt(0).toUpperCase() + photo.room.slice(1).replace('-', ' ')} - ${photo.mode.charAt(0).toUpperCase() + photo.mode.slice(1)}
                    </div>
                    <div style="font-size: 16px; opacity: 0.9;">
                      ${new Date(photo.timestamp).toLocaleString()}
                    </div>
                  </div>
                  
                  <!-- Close button -->
                  <button id="close-photo-btn" style="position: absolute; top: 20px; right: 20px; background: transparent; color: #F2C31B; border: none; padding: 8px; border-radius: 50%; font-size: 18px; cursor: pointer;">
                    ✕
                  </button>
                </div>
              `;
              
              document.body.appendChild(modal);

              // Prevent background scrolling when modal is open
              document.body.style.overflow = 'hidden';

              document.getElementById('close-photo-btn').addEventListener('click', () => {
                document.body.removeChild(modal);

                // Restore UI elements when closing regular photo fullscreen
                this.showMainRoomTabs();
                document.body.style.overflow = '';
              });

              // Close on background click
              Utils.attachModalCloseHandlers(modal, () => {
                Utils.closeModal(modal);
                // Restore UI elements when closing regular photo fullscreen
                this.showMainRoomTabs();
              }, {
                closeOnBackdrop: true,
                closeOnEscape: false
              });
            }
          } else {
            // Regular fullscreen for individual photos - show raw photo as taken, no templates
            const orientation = this.detectPhotoOrientation(photo.naturalWidth || 800, photo.naturalHeight || 600);

            modal.innerHTML = `
              <div style="position: relative; width: 100vw; height: 100vh; display: flex; align-items: flex-start; justify-content: center; overflow: auto; background: rgba(0,0,0,0.95); padding-top: 80px; padding-bottom: 80px; box-sizing: border-box;">
                <!-- Scrollable container for actual size viewing -->
                <div id="photo-container" style="position: relative; display: flex; align-items: center; justify-content: center; max-width: 95vw; max-height: calc(100vh - 160px); overflow: auto; margin-top: 20px;">
                  <img id="fullscreen-photo" src="${photo.dataUrl}" style="display: block; border-radius: 8px; box-shadow: 0 10px 40px rgba(0,0,0,0.5);" />
                </div>

                <!-- Photo info overlay -->
                <div style="position: fixed; top: 20px; left: 20px; background: rgba(0,0,0,0.8); color: white; padding: 15px 20px; border-radius: 8px; backdrop-filter: blur(10px); z-index: 10;">
                  <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">
                    ${photo.room.charAt(0).toUpperCase() + photo.room.slice(1).replace('-', ' ')} - ${photo.mode.charAt(0).toUpperCase() + photo.mode.slice(1)}
                  </div>
                  <div style="font-size: 14px; opacity: 0.9; margin-bottom: 4px;">
                    ${new Date(photo.timestamp).toLocaleString()}
                  </div>
                  <div style="font-size: 12px; opacity: 0.7;">
                    Orientation: ${orientation} | Raw photo as captured
                  </div>
                </div>
                
                <!-- Template selector for combined photos (larger icons, 2 rows) -->
                ${photo.mode === 'mix' ? `
                <div style="position: fixed; bottom: 20px; left: 20px; right: 20px; background: rgba(0,0,0,0.9); padding: 12px; border-radius: 12px; backdrop-filter: blur(10px); z-index: 10; box-shadow: 0 4px 16px rgba(0,0,0,0.4);">
                  <!-- First row: Default and Landscape -->
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 8px;">
                    <!-- Default 4:3 -->
                    <label style="display: flex; flex-direction: column; align-items: center; color: white; cursor: pointer; padding: 12px; border-radius: 6px; transition: all 0.2s; border: 2px solid ${templateType === 'default' ? '#F2C31B' : 'transparent'}; background: ${templateType === 'default' ? 'rgba(242, 195, 27, 0.2)' : 'transparent'};" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='${templateType === 'default' ? 'rgba(242, 195, 27, 0.2)' : 'transparent'}'">
                      <input type="radio" name="template-selector" value="default" style="display: none;" ${templateType === 'default' ? 'checked' : ''}>
                      <div style="width: 32px; height: 24px; background: #F2C31B; border-radius: 2px; margin-bottom: 6px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                        <div style="font-size: 8px; color: #303030; font-weight: bold;">4:3</div>
                      </div>
                      <div style="font-size: 11px; font-weight: bold; text-align: center;">Default</div>
                      <div style="font-size: 9px; opacity: 0.8; text-align: center;">Standard</div>
                    </label>

                    <!-- Landscape 16:9 -->
                    <label style="display: flex; flex-direction: column; align-items: center; color: white; cursor: pointer; padding: 12px; border-radius: 6px; transition: all 0.2s; border: 2px solid ${templateType === 'landscape' ? '#F2C31B' : 'transparent'}; background: ${templateType === 'landscape' ? 'rgba(242, 195, 27, 0.2)' : 'transparent'};" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='${templateType === 'landscape' ? 'rgba(242, 195, 27, 0.2)' : 'transparent'}'">
                      <input type="radio" name="template-selector" value="landscape" style="display: none;" ${templateType === 'landscape' ? 'checked' : ''}>
                      <div style="width: 40px; height: 22px; background: #F2C31B; border-radius: 2px; margin-bottom: 6px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                        <div style="font-size: 8px; color: #303030; font-weight: bold;">16:9</div>
                      </div>
                      <div style="font-size: 11px; font-weight: bold; text-align: center;">Landscape</div>
                      <div style="font-size: 9px; opacity: 0.8; text-align: center;">YouTube</div>
                    </label>
                  </div>

                  <!-- Second row: Square, Portrait, Blog -->
                  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;">
                    <!-- Square 1:1 -->
                    <label style="display: flex; flex-direction: column; align-items: center; color: white; cursor: pointer; padding: 10px; border-radius: 6px; transition: all 0.2s; border: 2px solid ${templateType === 'square' ? '#F2C31B' : 'transparent'}; background: ${templateType === 'square' ? 'rgba(242, 195, 27, 0.2)' : 'transparent'};" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='${templateType === 'square' ? 'rgba(242, 195, 27, 0.2)' : 'transparent'}'">
                      <input type="radio" name="template-selector" value="square" style="display: none;" ${templateType === 'square' ? 'checked' : ''}>
                      <div style="width: 24px; height: 24px; background: #F2C31B; border-radius: 2px; margin-bottom: 5px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                        <div style="font-size: 7px; color: #303030; font-weight: bold;">1:1</div>
                      </div>
                      <div style="font-size: 10px; font-weight: bold; text-align: center;">Square</div>
                      <div style="font-size: 8px; opacity: 0.8; text-align: center;">Instagram</div>
                    </label>

                    <!-- Portrait 4:5 -->
                    <label style="display: flex; flex-direction: column; align-items: center; color: white; cursor: pointer; padding: 10px; border-radius: 6px; transition: all 0.2s; border: 2px solid ${templateType === 'portrait' ? '#F2C31B' : 'transparent'}; background: ${templateType === 'portrait' ? 'rgba(242, 195, 27, 0.2)' : 'transparent'};" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='${templateType === 'portrait' ? 'rgba(242, 195, 27, 0.2)' : 'transparent'}'">
                      <input type="radio" name="template-selector" value="portrait" style="display: none;" ${templateType === 'portrait' ? 'checked' : ''}>
                      <div style="width: 19px; height: 24px; background: #F2C31B; border-radius: 2px; margin-bottom: 5px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                        <div style="font-size: 7px; color: #303030; font-weight: bold;">4:5</div>
                      </div>
                      <div style="font-size: 10px; font-weight: bold; text-align: center;">Portrait</div>
                      <div style="font-size: 8px; opacity: 0.8; text-align: center;">LinkedIn</div>
                    </label>

                    <!-- Blog 3:2 -->
                    <label style="display: flex; flex-direction: column; align-items: center; color: white; cursor: pointer; padding: 10px; border-radius: 6px; transition: all 0.2s; border: 2px solid ${templateType === 'blog' ? '#F2C31B' : 'transparent'}; background: ${templateType === 'blog' ? 'rgba(242, 195, 27, 0.2)' : 'transparent'};" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='${templateType === 'blog' ? 'rgba(242, 195, 27, 0.2)' : 'transparent'}'">
                      <input type="radio" name="template-selector" value="blog" style="display: none;" ${templateType === 'blog' ? 'checked' : ''}>
                      <div style="width: 28px; height: 19px; background: #F2C31B; border-radius: 2px; margin-bottom: 5px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                        <div style="font-size: 7px; color: #303030; font-weight: bold;">3:2</div>
                      </div>
                      <div style="font-size: 10px; font-weight: bold; text-align: center;">Blog</div>
                      <div style="font-size: 8px; opacity: 0.8; text-align: center;">Articles</div>
                    </label>
                  </div>

                </div>
                ` : ''}

                
                <!-- Close button -->
                <button id="close-photo-btn" style="position: fixed; top: 20px; right: 20px; background: rgba(0,0,0,0.8); color: #F2C31B; border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 18px; cursor: pointer; backdrop-filter: blur(10px); z-index: 10;">
                  ✕
                </button>
              </div>
            `;
            
            document.body.appendChild(modal);

            // Prevent background scrolling when modal is open
            document.body.style.overflow = 'hidden';

            // Set default to fit screen mode
            const imgElement = modal.querySelector('#fullscreen-photo');
            const imgContainer = modal.querySelector('#photo-container');
            
            // Configure for fit-to-screen display
            imgElement.style.maxWidth = '100%';
            imgElement.style.maxHeight = '100%';
            imgElement.style.width = 'auto';
            imgElement.style.height = 'auto';
            imgContainer.style.maxWidth = '95vw';
            imgContainer.style.maxHeight = '95vh';
            imgContainer.style.overflow = 'hidden';

            // Template selector functionality (only for combined photos)
            if (photo.mode === 'mix') {
              const templateRadios = modal.querySelectorAll('input[name="template-selector"]');
              templateRadios.forEach(radio => {
                radio.addEventListener('change', (e) => {
                  if (e.target.checked) {
                    const newTemplate = e.target.value;
                    
                    // Show loading state
                    const imgElement = modal.querySelector('#fullscreen-photo');
                    if (imgElement) {
                      imgElement.style.opacity = '0.5';
                    }
                    
                    // Regenerate this specific photo with new template
                    this.regenerateSpecificPhoto(photo, newTemplate, modal);
                  }
                });
              });
            }

            document.getElementById('close-photo-btn').addEventListener('click', () => {
              document.body.removeChild(modal);

              // Restore UI elements when closing regular photo fullscreen
              this.showMainRoomTabs();
              document.body.style.overflow = '';
            });

            // Close on background click
            Utils.attachModalCloseHandlers(modal, () => {
              Utils.closeModal(modal);
              // Restore UI elements when closing regular photo fullscreen
              this.showMainRoomTabs();
            }, {
              closeOnBackdrop: true,
              closeOnEscape: false
            });
          }
        }
        
        captureComparisonPhoto(video, stream, beforePhoto) {
          const videoWidth = video.videoWidth;
          const videoHeight = video.videoHeight;

          console.log('=== CAPTURE DEBUG ===');
          console.log('Video dimensions:', videoWidth, 'x', videoHeight);
          console.log('Video aspect ratio:', (videoWidth / videoHeight).toFixed(3));
          console.log('====================');

          // Store the full original photo
          const originalCanvas = document.createElement('canvas');
          const originalCtx = originalCanvas.getContext('2d');
          originalCanvas.width = videoWidth;
          originalCanvas.height = videoHeight;
          originalCtx.drawImage(video, 0, 0, videoWidth, videoHeight, 0, 0, videoWidth, videoHeight);

          // Save version without label (for PhotoEditor to combine)
          const originalDataUrlNoLabel = originalCanvas.toDataURL('image/jpeg', 0.8);

          // Add label to original if labels are enabled
          if (this.labelsEnabled !== false) { // Default to true
            Utils.drawCanvasLabel(originalCtx, 'AFTER', originalCanvas.width, originalCanvas.height);
          }

          const originalDataUrl = originalCanvas.toDataURL('image/jpeg', 0.8);

          // Create cropped preview to match before photo aspect ratio
          const previewCanvas = document.createElement('canvas');
          const previewCtx = previewCanvas.getContext('2d');
          const targetAspectRatio = beforePhoto.aspectRatio || this.currentAspectRatio || '4:3';

          let cropWidth, cropHeight, cropX, cropY;
          const videoAspectRatio = videoWidth / videoHeight;

          if (targetAspectRatio === '4:3') {
            previewCanvas.width = 800;
            previewCanvas.height = 600;
            if (videoAspectRatio > (4/3)) {
              cropHeight = videoHeight;
              cropWidth = videoHeight * (4/3);
              cropX = (videoWidth - cropWidth) / 2;
              cropY = 0;
            } else {
              cropWidth = videoWidth;
              cropHeight = videoWidth * (3/4);
              cropX = 0;
              cropY = (videoHeight - cropHeight) / 2;
            }
          } else {
            previewCanvas.width = 600;
            previewCanvas.height = 900;
            if (videoAspectRatio > (2/3)) {
              cropHeight = videoHeight;
              cropWidth = videoHeight * (2/3);
              cropX = (videoWidth - cropWidth) / 2;
              cropY = 0;
            } else {
              cropWidth = videoWidth;
              cropHeight = videoWidth * (3/2);
              cropX = 0;
              cropY = (videoHeight - cropHeight) / 2;
            }
          }

          previewCtx.drawImage(video, cropX, cropY, cropWidth, cropHeight, 0, 0, previewCanvas.width, previewCanvas.height);

          // Add AFTER label to preview if labels are enabled
          if (this.labelsEnabled !== false) {
            Utils.drawCanvasLabel(previewCtx, 'AFTER', previewCanvas.width, previewCanvas.height);
          }

          const previewDataUrl = previewCanvas.toDataURL('image/jpeg', 0.6);


          // Automatically save the "after" photo with both preview and original
          this.saveAfterPhotoToAll(previewDataUrl, originalDataUrl, originalDataUrlNoLabel, beforePhoto, videoWidth, videoHeight);

          // Stop camera stream
          stream.getTracks().forEach(track => track.stop());

          // Close modal overlays only (exclude permanent UI elements)
          Utils.cleanupExistingModals(null, { excludeIds: ['bottom-panel', 'sticky-tabs-container'] });

          // Restore scrolling if no camera modals remain
          this.restoreScrollingIfNoCameraModals();

          // Small delay to ensure cleanup completes before updating gallery
          setTimeout(() => {
            // Check if photo was taken from gallery dummy card
            if (this.galleryReturnContext && this.galleryReturnContext.returnToGallery) {
              
              // Clear the gallery return context
              this.galleryReturnContext = null;
              
              // Clear the before photo reference
              this.currentBeforePhoto = null;
              
              // Hide action buttons and restore UI
              this.hideActionButtons();
              this.showMainRoomTabs();
              document.body.style.overflow = '';
              
              // Return to All Photos gallery
              setTimeout(() => {
                this.showAllPhotosModal();
              }, 200);
              
            } else {
              // Normal flow - update main gallery
              const photosContainer = document.getElementById('photos-container');
              if (photosContainer) {
                photosContainer.innerHTML = this.getPhotosHTML();
                this.attachPhotoListeners(); // Re-attach event listeners for new photo elements
              }

              // Hide action buttons and return to gallery view
              this.hideActionButtons();
              
              // Clear the before photo reference
              this.currentBeforePhoto = null;
              
              // Auto-cycle to next unpaired before photo in current room
              // Only auto-cycle if we're still in the same room where the photo was taken
              if (this.currentRoom === beforePhoto.room) {
                this.autoCycleToNextBeforePhoto(this.currentRoom);
              } else {
                // User switched rooms - just restore the UI and return to gallery
                this.showMainRoomTabs();
                this.hideActionButtons();
                document.body.style.overflow = '';
              }
            }
          }, 100);
        }
        
        autoCycleToNextBeforePhoto(room) {
          // Find all before photos in this room that don't have corresponding after photos
          const beforePhotos = this.photos.filter(p => p.room === room && p.mode === 'before');
          const afterPhotos = this.photos.filter(p => p.room === room && p.mode === 'after');
          
          // Find before photos that don't have a corresponding after photo
          const unpairedBeforePhotos = beforePhotos.filter(beforePhoto => {
            return !afterPhotos.some(afterPhoto => afterPhoto.beforePhotoId === beforePhoto.id);
          });
          
          if (unpairedBeforePhotos.length > 0) {
            // Sort by timestamp to get the next one chronologically
            unpairedBeforePhotos.sort((a, b) => a.timestamp - b.timestamp);
            const nextBeforePhoto = unpairedBeforePhotos[0];
            
            
            // Open comparison modal with the next before photo
            this.showPhotoFullscreen(nextBeforePhoto);
          } else {

            // Restore UI when all photos are paired - return to gallery
            this.showMainRoomTabs();
            this.hideActionButtons();
            document.body.style.overflow = '';

            // Update the photo grid to show current room
            const photosContainer = document.getElementById('photos-container');
            if (photosContainer) {
              photosContainer.innerHTML = this.getPhotosHTML();
              this.attachPhotoListeners();
            }
          }
        }
        
        async initializeComparisonCamera(modal) {
          try {
            let stream;
            try {
              // Try iPhone optimized constraints first
              const constraints = this.getIOSCameraConstraints();
              stream = await navigator.mediaDevices.getUserMedia(constraints);
            } catch (backCameraError) {
              const aspectRatio = this.getAspectRatio();
              const targetAspectRatio = aspectRatio.width / aspectRatio.height;

              stream = await navigator.mediaDevices.getUserMedia({
                video: {
                  facingMode: 'environment'
                  // Removed aspectRatio constraint to get full native sensor area
                }
              });
            }
            
            const video = document.getElementById('comparison-camera');
            video.srcObject = stream;
            
            let currentFacingMode = 'environment';
            let currentZoom = this.currentBeforePhoto?.zoomLevel || 1; // Use before photo's zoom level
            
            // Initialize zoom controls for comparison camera
            this.initializeZoomControls(stream, 'comparison-camera', currentZoom, 'comparison');

            // Initialize aspect ratio button
            this.initializeAspectRatioButton();

            // Initialize aspect ratio overlay
            setTimeout(() => {
              this.updateAspectRatioOverlay();
            }, 100);

            // Close button
            document.getElementById('close-comparison-btn').addEventListener('click', () => {
              stream.getTracks().forEach(track => track.stop());
              document.body.removeChild(modal);
              this.hideCameraButton();
              this.showMainRoomTabs(); // Show room tabs when returning to gallery
              this.currentBeforePhoto = null; // Clear the reference

              // Restore background scrolling when modal is closed
              document.body.style.overflow = '';
            });
            
          } catch (error) {
            alert('Camera access denied or failed: ' + error.message);
            document.body.removeChild(modal);
            this.hideCameraButton();
            this.showMainRoomTabs(); // Show room tabs when returning to gallery
            this.currentBeforePhoto = null; // Clear the reference

            // Restore background scrolling when modal is closed
            document.body.style.overflow = '';
          }
        }
        
        generatePhotoName(room, mode) {
          // Get all photos for this room and mode, sorted by timestamp (oldest first)
          const roomPhotos = this.photos
            .filter(p => p.room === room && p.mode === mode)
            .sort((a, b) => a.timestamp - b.timestamp);
          
          // The position should be based on the chronological order in the grid
          // Since photos are sorted by timestamp, the position is the index + 1
          const position = roomPhotos.length + 1;
          
          // Create simple name: "kitchen 1", "kitchen 2", etc.
          const roomName = room.charAt(0).toUpperCase() + room.slice(1).replace('-', ' ');
          return `${roomName} ${position}`;
        }

        // Function to reassign names to all photos based on their current grid position
        reassignPhotoNames() {
          const rooms = ['kitchen', 'bathroom', 'bedroom', 'living-room', 'dining-room', 'office'];
          
          rooms.forEach(room => {
            // Get all before photos for this room, sorted by timestamp (oldest first)
            const beforePhotos = this.photos
              .filter(p => p.room === room && p.mode === 'before')
              .sort((a, b) => a.timestamp - b.timestamp);
            
            // Reassign names based on chronological position
            beforePhotos.forEach((photo, index) => {
              const roomName = room.charAt(0).toUpperCase() + room.slice(1).replace('-', ' ');
              const newName = `${roomName} ${index + 1}`;
              photo.name = newName;
              
              // Also update any linked after photos
              const afterPhoto = this.photos.find(p => 
                p.mode === 'after' && p.beforePhotoId === photo.id
              );
              if (afterPhoto) {
                afterPhoto.name = newName;
              }
            });
          });
          
          this.savePhotos();
        }

        saveAfterPhotoToAll(afterPhotoDataUrl, originalDataUrl, originalDataUrlNoLabel, beforePhoto, videoWidth, videoHeight) {
          // Check if there's already an after photo linked to this before photo
          const existingAfterPhotoIndex = this.photos.findIndex(p =>
            p.mode === 'after' && p.beforePhotoId === beforePhoto.id
          );

          // Use the same name as the before photo
          const afterPhotoName = beforePhoto.name;

          const afterPhoto = {
            id: Date.now(),
            dataUrl: afterPhotoDataUrl, // Use cropped preview for display (maintains original UI)
            originalDataUrl: originalDataUrl, // Store full original for combination
            originalDataUrlNoLabel: originalDataUrlNoLabel, // Store version without label for PhotoEditor
            room: beforePhoto.room,
            mode: 'after', // Save as after photo for split-screen display
            name: afterPhotoName,
            timestamp: Date.now(),
            beforePhotoId: beforePhoto.id, // Link to specific before photo
            aspectRatio: beforePhoto.aspectRatio || this.currentAspectRatio || '4:3', // Keep original aspect ratio system for UI
            originalWidth: videoWidth,
            originalHeight: videoHeight
          };

          if (existingAfterPhotoIndex !== -1) {
            // Replace existing after photo
            this.photos[existingAfterPhotoIndex] = afterPhoto;
          } else {
            // Add new after photo
            this.photos.push(afterPhoto);
          }

          // Create a full combined photo with format selector capability
          this.createCombinedPhoto(beforePhoto.originalDataUrlNoLabel || beforePhoto.originalDataUrl || beforePhoto.dataUrl, originalDataUrlNoLabel || originalDataUrl, beforePhoto.room, beforePhoto.name, 'default');

          this.savePhotos();
        }
        
        createCombinedPhoto(beforeDataUrl, afterDataUrl, room, photoName, templateType = null) {
          // Use current global template if none specified
          const actualTemplateType = templateType || this.currentTemplate;

          // Find the original before/after photo objects for aspect ratio info
          const beforePhoto = this.photos.find(p => p.mode === 'before' && p.room === room && p.name === photoName);
          const afterPhoto = this.photos.find(p => p.mode === 'after' && p.room === room && p.name === photoName);

          // Use createCombinedPhotoInMemory to actually create the photo
          PhotoEditor.createCombinedPhotoInMemory(beforeDataUrl, afterDataUrl, actualTemplateType, beforePhoto, afterPhoto, (combinedDataUrl) => {
            // Save the combined photo
            this.saveCombinedPhoto(combinedDataUrl, room, photoName, actualTemplateType);
          }, this.labelsEnabled);
        }



        getTemplateOptions() {
          return [
            {
              type: 'default',
              name: 'Default',
              ratio: '4:3',
              description: 'Original size (800×600)',
              previewHeight: 90
            },
            {
              type: 'square',
              name: 'Square',
              ratio: '1:1',
              description: 'Perfect for social media',
              previewHeight: 120
            },
            {
              type: 'portrait',
              name: 'Portrait',
              ratio: '4:5',
              description: 'Tall format (800×1000)',
              previewHeight: 150
            },
            {
              type: 'landscape',
              name: 'Landscape',
              ratio: '16:9',
              description: 'Wide format (800×450)',
              previewHeight: 68
            }
          ];
        }

        regenerateCombinedPhoto(beforePhoto, afterPhoto, templateType) {
          
          // Remove existing formatted photos for this before/after pair
          this.photos = this.photos.filter(p =>
            !(p.mode === 'mix' && p.name === beforePhoto.name && p.room === beforePhoto.room)
          );

          // Also remove thumbnail since we'll show the formatted result
          this.photos = this.photos.filter(p =>
            !(p.mode === 'thumbnail' && p.name === beforePhoto.name && p.room === beforePhoto.room)
          );

          // Create new combined photo with selected template
          this.createCombinedPhoto(beforePhoto.originalDataUrlNoLabel || beforePhoto.originalDataUrl || beforePhoto.dataUrl, afterPhoto.originalDataUrlNoLabel || afterPhoto.originalDataUrl || afterPhoto.dataUrl, beforePhoto.room, beforePhoto.name, templateType);

          // Update UI
          setTimeout(() => {
            const photosContainer = document.getElementById('photos-container');
            if (photosContainer) {
              photosContainer.innerHTML = this.getPhotosHTML();
              this.attachPhotoListeners();
            }
          }, 500); // Give time for photo generation
        }


        regenerateSpecificPhoto(photo, newTemplate, modal) {
          
          // Find the before and after photos that created this combined photo
          const beforePhoto = this.photos.find(p => 
            p.mode === 'before' && p.room === photo.room && p.name === photo.name
          );
          const afterPhoto = this.photos.find(p => 
            p.mode === 'after' && p.room === photo.room && p.name === photo.name
          );
          
          
          if (!beforePhoto || !afterPhoto) {
            console.error('Could not find before/after photos for regeneration');
            console.error('Looking for room:', photo.room, 'name:', photo.name);
            console.error('Available photos:', this.photos.map(p => ({mode: p.mode, room: p.room, name: p.name})));
            
            // Reset image opacity and show error
            const imgElement = modal.querySelector('#fullscreen-photo');
            if (imgElement) {
              imgElement.style.opacity = '1';
            }
            return;
          }
          
          // Store original photo info before removal
          const originalPhotoInfo = {
            id: photo.id,
            room: photo.room,
            name: photo.name,
            timestamp: photo.timestamp
          };
          
          // Remove the old combined photo from the array
          const photoIndex = this.photos.findIndex(p => p.id === photo.id);
          if (photoIndex !== -1) {
            this.photos.splice(photoIndex, 1);
          }
          
          // Create new combined photo with the selected template and store reference
          this.createCombinedPhotoWithCallback(
            beforePhoto.originalDataUrlNoLabel || beforePhoto.originalDataUrl || beforePhoto.dataUrl,
            afterPhoto.originalDataUrlNoLabel || afterPhoto.originalDataUrl || afterPhoto.dataUrl,
            originalPhotoInfo.room,
            originalPhotoInfo.name,
            newTemplate,
            (createdPhoto) => {
              // Callback with the newly created photo
              this.handlePhotoRegenerated(createdPhoto, modal, originalPhotoInfo);
            }
          );
          
        }

        createCombinedPhotoWithCallback(beforeDataUrl, afterDataUrl, room, photoName, templateType = null, callback) {
          // Use current global template if none specified
          const actualTemplateType = templateType || this.currentTemplate;

          // Find the original before/after photo objects for aspect ratio info
          const beforePhoto = this.photos.find(p => p.mode === 'before' && p.room === room && p.name === photoName);
          const afterPhoto = this.photos.find(p => p.mode === 'after' && p.room === room && p.name === photoName);

          // Use createCombinedPhotoInMemory to actually create the photo
          PhotoEditor.createCombinedPhotoInMemory(beforeDataUrl, afterDataUrl, actualTemplateType, beforePhoto, afterPhoto, (combinedDataUrl) => {
            // Save the combined photo with callback
            this.saveCombinedPhotoWithCallback(combinedDataUrl, room, photoName, actualTemplateType, callback);
          }, this.labelsEnabled);
        }


        saveCombinedPhotoWithCallback(combinedDataUrl, room, photoName, templateType = 'default', callback) {
          
          // Create the combined photo with the same name as before/after photos
          const combinedPhoto = {
            id: Date.now(),
            dataUrl: combinedDataUrl,
            room: room,
            mode: 'mix',
            name: photoName, // Use the same name as before/after photos
            templateType: templateType, // Store template type for future reference
            timestamp: Date.now()
          };
          
          
          // Add the combined photo
          this.photos.push(combinedPhoto);
          
          // Call the callback immediately with the created photo
          if (callback) {
            callback(combinedPhoto);
          }
          
          return combinedPhoto;
        }

        handlePhotoRegenerated(createdPhoto, modal, originalPhotoInfo) {
          
          // Update the image in the modal
          const imgElement = modal.querySelector('#fullscreen-photo');
          if (imgElement) {
            imgElement.src = createdPhoto.dataUrl;
            imgElement.style.opacity = '1'; // Remove loading state
            
            // Update the photo info
            const infoDiv = modal.querySelector('[style*="position: fixed; top: 20px; left: 20px"]');
            if (infoDiv) {
              const orientation = this.detectPhotoOrientation(createdPhoto.naturalWidth || 800, createdPhoto.naturalHeight || 600);
              infoDiv.innerHTML = `
                <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">
                  ${createdPhoto.room.charAt(0).toUpperCase() + createdPhoto.room.slice(1).replace('-', ' ')} - ${createdPhoto.mode.charAt(0).toUpperCase() + createdPhoto.mode.slice(1)}
                </div>
                <div style="font-size: 14px; opacity: 0.9; margin-bottom: 4px;">
                  ${new Date(createdPhoto.timestamp).toLocaleString()}
                </div>
                <div style="font-size: 12px; opacity: 0.7;">
                  Orientation: ${orientation} | Template: ${this.getTemplateDisplayName(createdPhoto.templateType)}
                </div>
              `;
            }
          }
          
          // Update main photos container
          const photosContainer = document.getElementById('photos-container');
          if (photosContainer) {
            photosContainer.innerHTML = this.getPhotosHTML();
            this.attachPhotoListeners();
          }
          
          // Update gallery modal if it's open
          const allPhotosContent = document.getElementById('all-photos-content');
          if (allPhotosContent) {
            allPhotosContent.innerHTML = this.getAllPhotosHTML();
            this.attachGalleryPhotoListeners();
          }
          
          // Save updated photos
          this.savePhotos();
          
          // Reattach template selector listeners to the modal
          this.reattachTemplateListeners(modal, createdPhoto);
          
        }

        reattachTemplateListeners(modal, photo) {
          
          if (!modal || !photo || photo.mode !== 'mix') {
            return;
          }
          
          // Reattach radio button listeners (always visible now)
          const templateRadios = modal.querySelectorAll('input[name="template-selector"]');
          
          templateRadios.forEach(radio => {
            // Remove existing listeners by cloning
            const newRadio = radio.cloneNode(true);
            radio.parentNode.replaceChild(newRadio, radio);
            
            // Add fresh event listener
            newRadio.addEventListener('change', (e) => {
              if (e.target.checked) {
                const newTemplate = e.target.value;
                
                // Show loading state
                const imgElement = modal.querySelector('#fullscreen-photo');
                if (imgElement) {
                  imgElement.style.opacity = '0.5';
                }
                
                // Regenerate this specific photo with new template
                this.regenerateSpecificPhoto(photo, newTemplate, modal);
              }
            });
          });
          
        }
        
        

        closeSplitScreenPreview() {
          if (this.currentSplitScreen && this.currentSplitScreen.modal) {
            try {
              if (this.currentSplitScreen.modal.parentNode) {
                if (this.currentSplitScreen.modal.parentNode === document.body) {
                  document.body.removeChild(this.currentSplitScreen.modal);
                } else {
                  this.currentSplitScreen.modal.parentNode.removeChild(this.currentSplitScreen.modal);
                }
              }
            } catch (error) {
            }
          }

          // Clean up any remaining split screen modals that might be orphaned
          const splitScreenModals = document.querySelectorAll('[style*="position: fixed"][style*="z-index: 2000"], [style*="position: fixed"][style*="z-index: 2002"]');
          splitScreenModals.forEach(modal => {
            try {
              if (modal.parentNode) {
                if (modal.parentNode === document.body) {
                  document.body.removeChild(modal);
                } else {
                  modal.parentNode.removeChild(modal);
                }
              }
            } catch (error) {
            }
          });

          // Hide action buttons and show camera button
          this.hideActionButtons();

          // Clear current split screen data
          this.currentSplitScreen = null;
        }
        
        captureSplitScreenPhoto(beforeDataUrl, afterDataUrl, room) {
          // Create a temporary fullscreen container for the split-screen photo
          const tempContainer = document.createElement('div');
          tempContainer.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; 
            background: white; z-index: 9999;
          `;
          
          tempContainer.innerHTML = `
            <div style="position: relative; width: 100%; height: 100%; display: flex; flex-direction: column;">
              <!-- Before photo (top half) -->
              <div style="position: relative; width: 100%; height: 50%; background: black; overflow: hidden;">
                <img src="${beforeDataUrl}" style="width: 100%; height: 100%; object-fit: contain;" />
                <div style="position: absolute; top: 20px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); color: white; padding: 8px 20px; border-radius: 20px; font-size: 18px; font-weight: bold;">
                  BEFORE
                </div>
              </div>
              
              <!-- Divider line -->
              <div style="width: 100%; height: 4px; background: #000;"></div>
              
              <!-- After photo (bottom half) -->
              <div style="position: relative; width: 100%; height: 50%; background: black; overflow: hidden;">
                <img src="${afterDataUrl}" style="width: 100%; height: 100%; object-fit: contain;" />
                <div style="position: absolute; top: 20px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); color: white; padding: 8px 20px; border-radius: 20px; font-size: 18px; font-weight: bold;">
                  AFTER
                </div>
              </div>
            </div>
          `;
          
          document.body.appendChild(tempContainer);
          
          // Use html2canvas to capture the entire screen
          setTimeout(() => {
            this.captureScreenAsImage(tempContainer, room);
          }, 500); // Give time for images to load
        }
        
        captureScreenAsImage(container, room) {
          // Create a canvas to capture the screen
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Set canvas size to match the container
          canvas.width = container.offsetWidth;
          canvas.height = container.offsetHeight;
          
          // Fill white background
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Get all images from the container
          const images = container.querySelectorAll('img');
          let imagesLoaded = 0;
          const totalImages = images.length;
          
          if (totalImages === 0) {
            // No images, just save the container
            this.saveCombinedPhoto(canvas.toDataURL('image/jpeg', 0.9), room);
            document.body.removeChild(container);
            return;
          }
          
          const onImageLoad = () => {
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
              // All images loaded, now draw them
              const halfHeight = canvas.height / 2;
              
              // Draw before photo (top half)
              const beforeImg = images[0];
              ctx.drawImage(beforeImg, 0, 0, canvas.width, halfHeight);
              
              // Draw divider line
              ctx.strokeStyle = '#000000';
              ctx.lineWidth = 4;
              ctx.beginPath();
              ctx.moveTo(0, halfHeight);
              ctx.lineTo(canvas.width, halfHeight);
              ctx.stroke();
              
              // Draw after photo (bottom half)
              const afterImg = images[1];
              ctx.drawImage(afterImg, 0, halfHeight, canvas.width, halfHeight);

              // No need to add labels - they're already baked into the individual photos

              // Convert to data URL and save
              const combinedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
              this.saveCombinedPhoto(combinedDataUrl, room);
              
              // Clean up
              document.body.removeChild(container);
            }
          };
          
          // Set up image load handlers
          images.forEach(img => {
            if (img.complete) {
              onImageLoad();
            } else {
              img.onload = onImageLoad;
            }
          });
        }
        
        saveCombinedPhoto(combinedDataUrl, room, photoName, templateType = 'default') {
          
          // Create the combined photo with the same name as before/after photos
          const combinedPhoto = {
            id: Date.now(),
            dataUrl: combinedDataUrl,
            room: room,
            mode: 'mix',
            name: photoName, // Use the same name as before/after photos
            templateType: templateType, // Store template type for future reference
            timestamp: Date.now()
          };
          

          // Add the combined photo
          this.photos.push(combinedPhoto);

          // Keep before photo in main gallery (don't move to archived)
          // The combined photo will appear in All Photos gallery separately

          this.savePhotos();

          // Update UI immediately
          const photosContainer = document.getElementById('photos-container');
          if (photosContainer) {
            photosContainer.innerHTML = this.getPhotosHTML();
            this.attachPhotoListeners();
          }

          // Photo saved successfully - modal closing handled by caller
        }
        
        async openCameraForRoom(room) {
          // Set the current room
          this.currentRoom = room;
          
          // Open camera
          await this.openCamera();
        }
        
        async openCamera() {

          // Prevent multiple camera modals from opening simultaneously
          if (this.isOpeningCamera) {
            return;
          }
          this.isOpeningCamera = true;

          try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
              alert('Camera not supported on this device');
              this.isOpeningCamera = false;
              return;
            }

            // Clean up any existing camera modals first
            const existingCameraModals = document.querySelectorAll('[style*="position: fixed"][style*="z-index: 1000"]');
            existingCameraModals.forEach(existing => {
              if (existing.parentNode) {
                document.body.removeChild(existing);
              }
            });

            // Restore scrolling if no camera modals remain
            this.restoreScrollingIfNoCameraModals();

            // Try iPhone optimized constraints first, fallback to basic
            let stream;
            try {
              const constraints = this.getIOSCameraConstraints();
              stream = await navigator.mediaDevices.getUserMedia(constraints);
            } catch (backCameraError) {
              const aspectRatio = this.getAspectRatio();
              const targetAspectRatio = aspectRatio.width / aspectRatio.height;

              stream = await navigator.mediaDevices.getUserMedia({
                video: {
                  facingMode: 'environment'
                  // Removed aspectRatio constraint to get full native sensor area
                }
              });
            }

            // Create fullscreen camera modal
            const modal = document.createElement('div');
            modal.style.cssText = `
              position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; 
              background: black; z-index: 1000; display: flex; 
              flex-direction: column; align-items: center; justify-content: center;
            `;
            
            modal.innerHTML = this.getBeforePhotoModalHTML();
            
            document.body.appendChild(modal);

            // Prevent background scrolling when modal is open
            document.body.style.overflow = 'hidden';

            // Hide main room tabs and show camera button for photo capture
            this.hideMainRoomTabs();
            this.showCameraButton();
            
            const video = document.getElementById('camera-video');
            if (video) {
              video.srcObject = stream;
            } else {
              console.error('Video element not found!');
            }
            
            // Store current facing mode and zoom level
            let currentFacingMode = 'environment'; // Start with back camera
            let currentZoom = 1; // Start with 1x zoom
            this.currentBeforeZoom = currentZoom; // Track zoom for before photos
            
            // Initialize zoom controls for before mode camera
            this.initializeZoomControls(stream, 'camera-video', currentZoom);

            // Initialize aspect ratio button
            this.initializeAspectRatioButton();

            // Initialize aspect ratio overlay
            setTimeout(() => {
              this.updateAspectRatioOverlay();
            }, 100);

            // Capture will be handled by the bottom panel camera button
            
            document.getElementById('close-before-modal-btn').addEventListener('click', () => {
              stream.getTracks().forEach(track => track.stop());
              if (modal && modal.parentNode) {
                document.body.removeChild(modal);
              }
              this.isOpeningCamera = false; // Reset flag
              this.hideCameraButton(); // Hide camera button when closing modal
              this.showMainRoomTabs(); // Show room tabs when returning to gallery

              // Restore background scrolling when modal is closed
              document.body.style.overflow = '';
            });

            // Attach listeners to before photo items
            this.attachBeforePhotoListeners();
            
            // Auto-scroll to bottom to show latest photos
            setTimeout(() => {
              const beforePhotoGrid = document.getElementById('before-photo-grid');
              if (beforePhotoGrid) {
                beforePhotoGrid.scrollTop = beforePhotoGrid.scrollHeight;
              }
            }, 200);
            
          } catch (error) {
            alert('Camera access denied or failed: ' + error.message);
            this.isOpeningCamera = false; // Reset flag on error
            this.hideCameraButton();
            this.showMainRoomTabs(); // Show room tabs when returning to gallery
          }
        }
        
        captureFromCameraModal() {
          // Get the camera video element
          const video = document.getElementById('camera-video');
          if (!video || !video.srcObject) {
            console.error('Camera not found or no stream');
            return;
          }
          
          // Get the stream from the video element
          const stream = video.srcObject;
          
          // Capture the before photo
          this.capturePhoto(video, stream);
        }
        
        captureFromComparisonModal() {
          // Get the comparison camera video element
          const video = document.getElementById('comparison-camera');
          if (!video || !video.srcObject) {
            console.error('Comparison camera not found or no stream');
            return;
          }
          
          // Get the stream from the video element
          const stream = video.srcObject;
          
          // Use the specific before photo that was clicked to open the comparison modal
          const beforePhoto = this.currentBeforePhoto;

          if (!beforePhoto) {
            console.error('No before photo reference found - this should not happen');
            return;
          }
          
          // Capture the after photo
          this.captureComparisonPhoto(video, stream, beforePhoto);
        }
        
        // Helper function to get aspect ratio based on current setting
        getAspectRatio() {
          // Default to 4:3 ratio if not set (for stack mode)
          if (!this.currentAspectRatio) {
            this.currentAspectRatio = '4:3';
          }

          if (this.currentAspectRatio === '4:3') {
            return { width: 4, height: 3 }; // 4:3 for stack mode (landscape crop from portrait)
          } else if (this.currentAspectRatio === '2:3' || this.currentAspectRatio === '3:4') {
            return { width: 2, height: 3 }; // 2:3 for side-by-side mode (portrait crop)
          } else {
            return { width: 2, height: 3 }; // Default fallback to portrait
          }
        }

        // Get camera constraints for maximum sensor area
        getIOSCameraConstraints() {
          // Request maximum resolution without constraining aspect ratio or dimensions
          // This allows the camera to use its native orientation and sensor size
          const constraints = {
            video: {
              facingMode: 'environment',
              // Request highest available resolution in any aspect ratio
              width: { ideal: 9999 },
              height: { ideal: 9999 }
            }
          };

          return constraints;
        }

        // Switch between aspect ratios

        // Initialize aspect ratio controls
        initializeAspectRatioButton() {
          const aspectRatioControls = document.getElementById('aspect-ratio-controls');
          if (!aspectRatioControls) {
            return;
          }

          const aspectRatioButtons = aspectRatioControls.querySelectorAll('.aspect-ratio-btn');
          if (aspectRatioButtons.length === 0) {
            return;
          }

          const currentRatio = this.currentAspectRatio || '4:3';

          // Set initial active button based on current aspect ratio
          aspectRatioButtons.forEach(btn => {
            const btnRatio = btn.dataset.ratio;
            if (btnRatio === currentRatio) {
              btn.classList.add('active');
              btn.style.background = '#F2C31B';
              btn.style.color = '#303030';
            } else {
              btn.classList.remove('active');
              btn.style.background = 'rgba(255,255,255,0.2)';
              btn.style.color = 'white';
            }
          });

          // Set up event listeners for aspect ratio buttons
          aspectRatioButtons.forEach(button => {
            button.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();

              const newRatio = button.dataset.ratio;

              // Update active button styling
              aspectRatioButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.background = 'rgba(255,255,255,0.2)';
                btn.style.color = 'white';
              });

              button.classList.add('active');
              button.style.background = '#F2C31B';
              button.style.color = '#303030';

              // Update aspect ratio if different
              if (newRatio !== this.currentAspectRatio) {
                this.currentAspectRatio = newRatio;
                this.updateAspectRatioOverlay();
              }
            });
          });
        }

        // Get aspect ratio overlay HTML

        // Update video element styling based on aspect ratio mode
        updateVideoStyling() {
          const aspectRatio = this.currentAspectRatio || '4:3';

          const videoElements = document.querySelectorAll('#camera-video, #comparison-camera');

          videoElements.forEach(video => {
            // Remove any wrapper that might exist from previous manual sizing
            const wrapper = video.parentElement.querySelector('.video-wrapper');
            if (wrapper && wrapper !== video.parentElement) {
              wrapper.parentElement.insertBefore(video, wrapper);
              wrapper.remove();
            }

            if (aspectRatio === '4:3') {
              // Stack mode: Fill full width but add top/bottom spacing for equal borders
              video.style.objectFit = 'cover';
              video.style.objectPosition = 'center center';
              video.style.width = '100%';
              video.style.height = '75%'; // Reduced height to create top/bottom black bars
            } else {
              // Side-by-side mode: Show full video with side black bars (keep as is - was perfect)
              video.style.objectFit = 'contain';
              video.style.objectPosition = 'center center';
              video.style.width = '100%';
              video.style.height = '100%';
            }

            video.style.margin = '0';
            video.style.display = 'block';
            video.style.transform = 'none';
          });
        }

        // Update aspect ratio overlay with frames and dimming
        updateAspectRatioOverlay() {

          // Update video styling based on aspect ratio mode
          this.updateVideoStyling();

          // Find all photo frame overlays and update them
          const overlays = document.querySelectorAll('.photo-frame-overlay');
          overlays.forEach(overlay => {
            // Determine if this is before or after mode
            const isAfterMode = document.getElementById('comparison-camera') !== null;
            const aspectRatio = this.currentAspectRatio || '4:3';

            // Calculate frame dimensions based on aspect ratio
            let frameWidth, frameHeight;
            const containerWidth = overlay.offsetWidth;
            const containerHeight = overlay.offsetHeight;
            const border = 10; // 10px border as requested

            // Get actual video stream dimensions
            const videoElement = document.querySelector('#camera-video, #comparison-camera');
            let actualVideoWidth, actualVideoHeight;

            if (videoElement && videoElement.videoWidth && videoElement.videoHeight) {
              actualVideoWidth = videoElement.videoWidth;
              actualVideoHeight = videoElement.videoHeight;
            } else {
              // Fallback dimensions
              actualVideoWidth = aspectRatio === '4:3' ? 3024 : 3024;
              actualVideoHeight = aspectRatio === '4:3' ? 2268 : 4032;
            }

            const actualVideoAspectRatio = actualVideoWidth / actualVideoHeight;
            const containerAspectRatio = containerWidth / containerHeight;

            // Calculate visible video dimensions based on object-fit mode
            let visibleVideoWidth, visibleVideoHeight;

            // Calculate visible video dimensions based on aspect ratio mode
            if (aspectRatio === '4:3') {
              // Stack mode uses object-fit: cover - video fills container
              visibleVideoWidth = containerWidth;
              visibleVideoHeight = containerHeight;
            } else {
              // Side-by-side mode uses object-fit: contain - video fits with black bars
              if (actualVideoAspectRatio > containerAspectRatio) {
                // Video is wider than container - constrained by width
                visibleVideoWidth = containerWidth;
                visibleVideoHeight = containerWidth / actualVideoAspectRatio;
              } else {
                // Video is taller than container - constrained by height
                visibleVideoHeight = containerHeight;
                visibleVideoWidth = containerHeight * actualVideoAspectRatio;
              }
            }

            // Now calculate frame based on desired aspect ratio, not actual video
            let targetAspectRatio;
            if (aspectRatio === '4:3') {
              // Stack mode: 4:3 individual → Combined: 4:6 = 2:3 (portrait)
              targetAspectRatio = 4/3; // 1.333 - Individual frame for stacking
            } else {
              // Side-by-side mode: 3:4 individual → Combined: 6:4 = 3:2 (landscape)
              targetAspectRatio = 3/4; // 0.750 - Individual frame for side-by-side
            }


            // Calculate frame size for target aspect ratio within visible video area
            const availableWidth = visibleVideoWidth - 2*border;
            const availableHeight = visibleVideoHeight - 2*border;

            if (aspectRatio === '4:3') {
              // Stack mode: Use full width for enlarged frame
              // Create symmetric top/bottom black borders like side-by-side has side borders
              frameWidth = availableWidth;
              frameHeight = frameWidth / targetAspectRatio;

              // Ensure frame doesn't exceed available height - if it does, scale down proportionally
              if (frameHeight > availableHeight) {
                frameHeight = availableHeight;
                frameWidth = frameHeight * targetAspectRatio;
              }
            } else {
              // Side-by-side mode: Height constrained to create side borders
              frameHeight = availableHeight;
              frameWidth = frameHeight * targetAspectRatio;

              // Ensure frame doesn't exceed available width
              if (frameWidth > availableWidth) {
                frameWidth = availableWidth;
                frameHeight = frameWidth / targetAspectRatio;
              }
            }


            // Ensure frame doesn't go negative
            if (frameWidth < 0) frameWidth = availableWidth * 0.9;
            if (frameHeight < 0) frameHeight = availableHeight * 0.9;

            const frameLeft = (containerWidth - frameWidth) / 2;
            const frameTop = (containerHeight - frameHeight) / 2;

            overlay.innerHTML = `
              <!-- Frame area -->
              <div style="position: absolute; top: ${frameTop}px; left: ${frameLeft}px; width: ${frameWidth}px; height: ${frameHeight}px; background: transparent; border: 2px solid white; z-index: 2;"></div>

              <!-- Mode label -->
              <div style="position: absolute; top: 20px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.8); color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: bold; z-index: 10;">
                ${isAfterMode ? 'AFTER' : 'BEFORE'} - ${aspectRatio === '4:3' ? 'STACK' : 'SIDE-BY-SIDE'} (${aspectRatio})
              </div>
            `;
          });
        }

        // Initialize zoom controls for camera
        initializeZoomControls(stream, videoElementId, currentZoom = 1, mode = 'before') {
          const zoomControlsId = mode === 'comparison' ? 'zoom-controls-comparison' : 'zoom-controls';
          const zoomButtonClass = mode === 'comparison' ? 'zoom-btn-comparison' : 'zoom-btn';

          // Get zoom buttons from both old controls (hidden) and new bottom panel controls
          let zoomButtons = [];

          // Try to get buttons from old controls (for backward compatibility)
          const zoomControls = document.getElementById(zoomControlsId);
          if (zoomControls) {
            zoomButtons = [...zoomButtons, ...zoomControls.querySelectorAll(`.${zoomButtonClass}`)];
          }

          // Also get buttons from new bottom panel controls
          const bottomPanelZoomControls = document.getElementById('zoom-controls-panel');
          if (bottomPanelZoomControls) {
            zoomButtons = [...zoomButtons, ...bottomPanelZoomControls.querySelectorAll('.zoom-btn')];
          }

          if (zoomButtons.length === 0) {
            return;
          }
          
          // Set initial active button based on currentZoom
          zoomButtons.forEach(btn => {
            const btnZoom = parseFloat(btn.dataset.zoom);
            if (btnZoom === currentZoom) {
              btn.classList.add('active');
              btn.style.background = '#F2C31B';
              btn.style.color = '#303030';
            } else {
              btn.classList.remove('active');
              btn.style.background = 'rgba(255,255,255,0.2)';
              btn.style.color = 'white';
            }
          });
          
          // Apply initial zoom level
          setTimeout(() => {
            this.applyZoom(stream, videoElementId, currentZoom);
          }, 100);
          
          // Set up zoom button event listeners
          zoomButtons.forEach(button => {
            button.addEventListener('click', async () => {
              const newZoom = parseFloat(button.dataset.zoom);
              
              // Update active button styling
              zoomButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.background = 'rgba(255,255,255,0.2)';
                btn.style.color = 'white';
              });
              
              button.classList.add('active');
              button.style.background = '#F2C31B';
              button.style.color = '#303030';
              
              // Track zoom level for before photos
              if (mode === 'before') {
                this.currentBeforeZoom = newZoom;
              }
              
              // Apply zoom to video stream
              await this.applyZoom(stream, videoElementId, newZoom);
            });
          });
        }

        // Apply zoom to video stream using constraints
        async applyZoom(stream, videoElementId, zoomLevel) {
          try {
            const videoTracks = stream.getVideoTracks();
            if (videoTracks.length === 0) {
              return;
            }

            const track = videoTracks[0];
            const capabilities = track.getCapabilities();
            
            // Check if zoom is supported
            if (capabilities.zoom) {
              const constraints = {
                advanced: [{
                  zoom: Math.max(capabilities.zoom.min, Math.min(capabilities.zoom.max, zoomLevel))
                }]
              };
              
              await track.applyConstraints(constraints);
            } else {
              // Fallback: use CSS transform for devices that don't support zoom constraints
              const video = document.getElementById(videoElementId);
              if (video) {
                video.style.transform = `scale(${zoomLevel})`;
              }
            }
          } catch (error) {
            console.error('Error applying zoom:', error);
            
            // Fallback to CSS transform if constraints fail
            const video = document.getElementById(videoElementId);
            if (video) {
              video.style.transform = `scale(${zoomLevel})`;
            }
          }
        }

        // Enhanced photo sizing and cropping system
        // Default sizes for different templates




        // Helper function to calculate square size for grids
        calculateSquareSize(columns) {
          if (this.isLandscape) {
            // In landscape mode, use the height (which equals portrait width) to calculate square size
            const landscapeHeight = window.innerHeight; // This is equivalent to portrait width
            const availableHeight = landscapeHeight - 200; // Account for headers, tabs, padding
            const squareSize = Math.floor(availableHeight / columns);
            
            return squareSize;
          } else {
            // In portrait mode, calculate actual size based on screen width
            const availableWidth = window.innerWidth - 20; // Account for padding
            return Math.floor(availableWidth / columns);
          }
        }

        capturePhoto(video, stream) {
          const videoWidth = video.videoWidth;
          const videoHeight = video.videoHeight;

          console.log('=== CAPTURE DEBUG (BEFORE) ===');
          console.log('Video dimensions:', videoWidth, 'x', videoHeight);
          console.log('Video aspect ratio:', (videoWidth / videoHeight).toFixed(3));
          console.log('===============================');

          // Store the full original photo
          const originalCanvas = document.createElement('canvas');
          const originalCtx = originalCanvas.getContext('2d');
          originalCanvas.width = videoWidth;
          originalCanvas.height = videoHeight;
          originalCtx.drawImage(video, 0, 0, videoWidth, videoHeight, 0, 0, videoWidth, videoHeight);

          // Save version without label (for PhotoEditor to combine)
          const originalDataUrlNoLabel = originalCanvas.toDataURL('image/jpeg', 0.8);

          // Add label to original if labels are enabled
          if (this.labelsEnabled !== false) { // Default to true
            Utils.drawCanvasLabel(originalCtx, 'BEFORE', originalCanvas.width, originalCanvas.height);
          }

          const originalDataUrl = originalCanvas.toDataURL('image/jpeg', 0.8);

          // Create cropped preview for current aspect ratio (for display)
          const previewCanvas = document.createElement('canvas');
          const previewCtx = previewCanvas.getContext('2d');
          const targetAspectRatio = this.currentAspectRatio || '4:3';

          let cropWidth, cropHeight, cropX, cropY;
          const videoAspectRatio = videoWidth / videoHeight;

          if (targetAspectRatio === '4:3') {
            previewCanvas.width = 800;
            previewCanvas.height = 600;
            if (videoAspectRatio > (4/3)) {
              cropHeight = videoHeight;
              cropWidth = videoHeight * (4/3);
              cropX = (videoWidth - cropWidth) / 2;
              cropY = 0;
            } else {
              cropWidth = videoWidth;
              cropHeight = videoWidth * (3/4);
              cropX = 0;
              cropY = (videoHeight - cropHeight) / 2;
            }
          } else {
            previewCanvas.width = 600;
            previewCanvas.height = 900;
            if (videoAspectRatio > (2/3)) {
              cropHeight = videoHeight;
              cropWidth = videoHeight * (2/3);
              cropX = (videoWidth - cropWidth) / 2;
              cropY = 0;
            } else {
              cropWidth = videoWidth;
              cropHeight = videoWidth * (3/2);
              cropX = 0;
              cropY = (videoHeight - cropHeight) / 2;
            }
          }

          previewCtx.drawImage(video, cropX, cropY, cropWidth, cropHeight, 0, 0, previewCanvas.width, previewCanvas.height);

          // Add BEFORE label to preview if labels are enabled
          if (this.labelsEnabled !== false) {
            Utils.drawCanvasLabel(previewCtx, 'BEFORE', previewCanvas.width, previewCanvas.height);
          }

          const previewDataUrl = previewCanvas.toDataURL('image/jpeg', 0.6);


          // First photos are always "before" photos
          const photoMode = 'before';

          // Create simple position-based name or use pending name from gallery
          const photoName = this.pendingPhotoName || this.generatePhotoName(this.currentRoom, photoMode);

          const photo = {
            id: Date.now(),
            dataUrl: previewDataUrl, // Use cropped preview for display (maintains original UI)
            originalDataUrl: originalDataUrl, // Store full original for combination
            originalDataUrlNoLabel: originalDataUrlNoLabel, // Store version without label for PhotoEditor
            room: this.currentRoom,
            mode: photoMode,
            name: photoName,
            timestamp: Date.now(),
            zoomLevel: this.currentBeforeZoom || 1,
            aspectRatio: this.currentAspectRatio || '4:3', // Keep original aspect ratio system for UI
            originalWidth: videoWidth,
            originalHeight: videoHeight
          };
          
          this.photos.push(photo);
          this.savePhotos();
          
          // Update the before photo grid in the modal
          const beforePhotoGrid = document.getElementById('before-photo-grid');
          if (beforePhotoGrid) {
            // Store current scroll position and content height
            const previousScrollTop = beforePhotoGrid.scrollTop;
            const previousScrollHeight = beforePhotoGrid.scrollHeight;

            beforePhotoGrid.innerHTML = this.getBeforePhotosGridHTML();
            this.attachBeforePhotoListeners();

            // Smart scrolling to keep content visible above bottom panel
            setTimeout(() => {
              const currentScrollHeight = beforePhotoGrid.scrollHeight;
              const containerHeight = beforePhotoGrid.clientHeight;
              const bottomPanelHeight = 80; // Height of bottom panel

              // If content grew (new photos added), scroll up to accommodate
              if (currentScrollHeight > previousScrollHeight) {
                const heightDifference = currentScrollHeight - previousScrollHeight;

                // Calculate optimal scroll position to keep latest content visible
                // but not hidden behind bottom panel
                const maxVisibleScroll = currentScrollHeight - containerHeight + bottomPanelHeight;
                const newScrollTop = Math.min(previousScrollTop + heightDifference, maxVisibleScroll);

                beforePhotoGrid.scrollTop = Math.max(0, newScrollTop);
              }
            }, 100);
          }

          // Update main gallery as well
          const photosContainer = document.getElementById('photos-container');
          if (photosContainer) {
            photosContainer.innerHTML = this.getPhotosHTML();
            this.attachPhotoListeners();
          }

          // Check if photo was taken from gallery dummy card (before photo)
          if (this.galleryReturnContext && this.galleryReturnContext.returnToGallery && this.galleryReturnContext.mode === 'before') {
            
            // Close the before photo modal
            setTimeout(() => {
              // Stop camera stream
              const video = document.querySelector('video');
              if (video && video.srcObject) {
                const stream = video.srcObject;
                stream.getTracks().forEach(track => track.stop());
              }
              
              // Close modal overlays
              const existingModals = document.querySelectorAll('[style*="position: fixed"][style*="z-index"]');
              existingModals.forEach(modal => {
                try {
                  if (modal.parentNode &&
                      !modal.id.includes('bottom-panel') &&
                      !modal.id.includes('sticky-tabs-container') &&
                      modal.id !== 'bottom-panel' &&
                      modal.id !== 'sticky-tabs-container') {
                    if (modal.parentNode === document.body) {
                      document.body.removeChild(modal);
                    } else if (modal.parentNode) {
                      modal.parentNode.removeChild(modal);
                    }
                  }
                } catch (error) {
                }
              });
              
              // Clear the gallery return context
              this.galleryReturnContext = null;
              
              // Hide action buttons and restore UI
              this.hideActionButtons();
              this.showMainRoomTabs();
              document.body.style.overflow = '';
              
              // Return to All Photos gallery
              setTimeout(() => {
                this.showAllPhotosModal();
              }, 200);
              
            }, 500); // Small delay to let user see the photo was captured
          }

        }

        attachBeforePhotoListeners() {
          // Add click listeners to before photo items in the modal
          setTimeout(() => {
            // Delete button listeners
            document.querySelectorAll('.delete-before-photo-btn').forEach(btn => {
              btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering the photo click
                const photoId = parseInt(e.currentTarget.dataset.photoId);
                const photoIndex = this.photos.findIndex(p => p.id === photoId);
                if (photoIndex !== -1) {
                  this.showDeleteConfirmation('before', this.currentRoom, photoIndex);
                }
              });
            });

            // Photo item click listeners (for enlarging photo)
            document.querySelectorAll('.before-photo-item').forEach(item => {
              item.addEventListener('click', (e) => {
                // Only trigger if clicking on the photo itself, not on buttons
                if (e.target === item || e.target.tagName === 'IMG') {
                  const photoId = parseInt(e.currentTarget.dataset.photoId);
                  const photo = this.photos.find(p => p.id === photoId);
                  if (photo) {
                    // Show enlarged photo
                    this.showPhotoEnlarged(photo);
                  }
                }
              });
            });

            // Room tab listeners in modal
            document.querySelectorAll('#modal-tabs-carousel .room-tab').forEach(btn => {
              btn.addEventListener('click', (e) => {
                const room = e.currentTarget.dataset.room;
                if (room && room !== this.currentRoom) {
                  this.currentRoom = room;
                  this.updateModalRoomTabs();
                  this.updateModalPhotoGrid();
                }
              });
            });

            // Dummy square listeners in modal (for taking new before photos)
            document.querySelectorAll('.dummy-before-photo').forEach(dummy => {
              dummy.addEventListener('click', (e) => {
                // Dummy squares don't do anything special - camera button is already available
                // They just provide visual feedback that more photos can be taken
              });
            });
          }, 100);
        }


        savePhotos() {
          try {
            // Check storage size before saving
            const photosData = JSON.stringify(this.photos);
            const sizeInMB = (photosData.length * 2) / (1024 * 1024); // Rough estimate of size in MB

            localStorage.setItem('cleaning-photos', photosData);
          } catch (e) {
            if (e.name === 'QuotaExceededError') {
              this.manageStorage();
            } else {
              console.error('Error saving photos:', e);
            }
          }
        }

        manageStorage() {
          // Remove oldest photos if storage is full
          const maxPhotos = 50; // Limit to 50 photos total

          if (this.photos.length > maxPhotos) {
            // Sort by timestamp and keep only the newest photos
            this.photos.sort((a, b) => b.timestamp - a.timestamp);
            const removedCount = this.photos.length - maxPhotos;
            this.photos = this.photos.slice(0, maxPhotos);


            // Try saving again
            try {
              localStorage.setItem('cleaning-photos', JSON.stringify(this.photos));

              // Update the UI to reflect the changes
              const photosContainer = document.getElementById('photos-container');
              if (photosContainer) {
                photosContainer.innerHTML = this.getPhotosHTML();
                this.attachPhotoListeners();
              }
            } catch (e) {
              alert('Storage is full. Please delete some photos manually.');
            }
          } else {
            // If we don't have too many photos, try compressing them
            this.compressPhotosAndSave();
          }
        }

        compressPhotosAndSave() {

          // Compress images by reducing quality
          const compressedPhotos = this.photos.map(photo => {
            if (photo.dataUrl && photo.dataUrl.startsWith('data:image/')) {
              // Create a canvas to re-compress the image
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              const img = new Image();

              return new Promise(resolve => {
                img.onload = () => {
                  // Reduce size if image is too large
                  const maxWidth = 800;
                  const maxHeight = 600;
                  let { width, height } = img;

                  if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(maxWidth / width, maxHeight / height);
                    width *= ratio;
                    height *= ratio;
                  }

                  canvas.width = width;
                  canvas.height = height;

                  ctx.drawImage(img, 0, 0, width, height);

                  // Compress with lower quality
                  const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.5);
                  resolve({ ...photo, dataUrl: compressedDataUrl });
                };
                img.src = photo.dataUrl;
              });
            }
            return Promise.resolve(photo);
          });

          Promise.all(compressedPhotos).then(compressed => {
            this.photos = compressed;
            try {
              localStorage.setItem('cleaning-photos', JSON.stringify(this.photos));
            } catch (e) {
              // Fall back to removing old photos
              this.manageStorage();
            }
          });
        }
        

        // User data storage methods



        showChangeUserWarning() {
          // Get current user info for the warning
          const urlParams = new URLSearchParams(window.location.search);
          const currentCleaner = urlParams.get('cleaner') || 'Current User';
          
          const modal = document.createElement('div');
          modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; 
            background: rgba(0,0,0,0.6); z-index: 3000; display: flex; 
            align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;
            backdrop-filter: blur(5px);
          `;
          
          modal.innerHTML = `
            <div style="
              background: white; 
              border-radius: 20px; 
              padding: 40px; 
              max-width: 400px; 
              width: 100%; 
              box-shadow: 0 20px 60px rgba(0,0,0,0.3); 
              text-align: center;
              font-family: 'EB Garamond', 'Garamond', 'Times New Roman', serif;
              animation: slideIn 0.3s ease-out;
            ">
              <!-- Warning Icon -->
              <div style="font-size: 64px; margin-bottom: 20px; color: #F2C31B;">
                ⚠️
              </div>
              
              <!-- Title -->
              <h2 style="margin: 0 0 16px 0; color: #303030; font-size: 24px; font-weight: bold;">
                Switch User?
              </h2>
              
              <!-- Message -->
              <div style="margin-bottom: 24px; color: #666; font-size: 16px; line-height: 1.5;">
                <p style="margin: 0 0 12px 0;">You are currently signed in as:</p>
                <p style="margin: 0 0 16px 0; font-weight: bold; color: #303030; font-size: 18px;">
                  ${currentCleaner}
                </p>
                <p style="margin: 0; font-size: 14px;">
                  Switching users will clear your stored preferences and you'll need to sign in again.
                </p>
              </div>
              
              <!-- Buttons -->
              <div style="display: flex; gap: 12px; justify-content: center;">
                <button id="cancel-change-user" style="
                  background: #f8f9fa; 
                  color: #666; 
                  border: 2px solid #e1e5e9; 
                  padding: 12px 24px; 
                  border-radius: 10px; 
                  font-size: 16px; 
                  font-weight: bold; 
                  cursor: pointer; 
                  transition: all 0.2s;
                  font-family: inherit;
                " onmouseover="this.style.background='#e9ecef'; this.style.borderColor='#d1d5db'" onmouseout="this.style.background='#f8f9fa'; this.style.borderColor='#e1e5e9'">
                  Cancel
                </button>
                
                <button id="confirm-change-user" style="
                  background: #F2C31B; 
                  color: #303030; 
                  border: 2px solid #F2C31B; 
                  padding: 12px 24px; 
                  border-radius: 10px; 
                  font-size: 16px; 
                  font-weight: bold; 
                  cursor: pointer; 
                  transition: all 0.2s;
                  font-family: inherit;
                  box-shadow: 0 4px 12px rgba(242, 195, 27, 0.3);
                " onmouseover="this.style.background='#E6B800'; this.style.borderColor='#E6B800'; this.style.transform='translateY(-1px)'" onmouseout="this.style.background='#F2C31B'; this.style.borderColor='#F2C31B'; this.style.transform='translateY(0)'">
                  Switch User
                </button>
              </div>
            </div>
            
            <style>
              @keyframes slideIn {
                from {
                  opacity: 0;
                  transform: scale(0.8) translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: scale(1) translateY(0);
                }
              }
            </style>
          `;
          
          document.body.appendChild(modal);
          
          // Prevent background scrolling
          document.body.style.overflow = 'hidden';
          
          // Event listeners
          document.getElementById('cancel-change-user').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
          });
          
          document.getElementById('confirm-change-user').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
            
            // Clear user data and redirect
            Storage.clearUserData();
            window.location.href = `${window.location.origin}${window.location.pathname}`;
          });
          
          // Close on backdrop click and Escape key
          Utils.attachModalCloseHandlers(modal, () => Utils.closeModal(modal), {
            closeOnBackdrop: true,
            closeOnEscape: true
          });
        }

        showClearDataWarning(nameInput, cityInput, clearDataContainer) {
          // Get stored user info for the warning
          const storedData = Storage.getStoredUserData();
          const storedName = storedData.cleaner || 'Unknown User';
          const storedLocation = storedData.location || 'Unknown Location';
          
          const modal = document.createElement('div');
          modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; 
            background: rgba(0,0,0,0.6); z-index: 3000; display: flex; 
            align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;
            backdrop-filter: blur(5px);
          `;
          
          modal.innerHTML = `
            <div style="
              background: white; 
              border-radius: 20px; 
              padding: 40px; 
              max-width: 400px; 
              width: 100%; 
              box-shadow: 0 20px 60px rgba(0,0,0,0.3); 
              text-align: center;
              font-family: 'EB Garamond', 'Garamond', 'Times New Roman', serif;
              animation: slideIn 0.3s ease-out;
            ">
              <!-- Warning Icon -->
              <div style="font-size: 64px; margin-bottom: 20px; color: #F2C31B;">
                🗑️
              </div>
              
              <!-- Title -->
              <h2 style="margin: 0 0 16px 0; color: #303030; font-size: 24px; font-weight: bold;">
                Clear Stored Data?
              </h2>
              
              <!-- Message -->
              <div style="margin-bottom: 24px; color: #666; font-size: 16px; line-height: 1.5;">
                <p style="margin: 0 0 12px 0;">This will remove your stored information:</p>
                <div style="margin: 0 0 16px 0; padding: 16px; background: #f8f9fa; border-radius: 10px; border: 2px solid #e1e5e9;">
                  <p style="margin: 0 0 8px 0; font-weight: bold; color: #303030;">
                    📝 Name: ${storedName}
                  </p>
                  <p style="margin: 0; font-weight: bold; color: #303030;">
                    📍 Location: ${storedLocation.charAt(0).toUpperCase() + storedLocation.slice(1).replace('-', ' ')}
                  </p>
                </div>
                <p style="margin: 0; font-size: 14px;">
                  You'll need to enter this information again next time you visit.
                </p>
              </div>
              
              <!-- Buttons -->
              <div style="display: flex; gap: 12px; justify-content: center;">
                <button id="cancel-clear-data" style="
                  background: #f8f9fa; 
                  color: #666; 
                  border: 2px solid #e1e5e9; 
                  padding: 12px 24px; 
                  border-radius: 10px; 
                  font-size: 16px; 
                  font-weight: bold; 
                  cursor: pointer; 
                  transition: all 0.2s;
                  font-family: inherit;
                " onmouseover="this.style.background='#e9ecef'; this.style.borderColor='#d1d5db'" onmouseout="this.style.background='#f8f9fa'; this.style.borderColor='#e1e5e9'">
                  Keep Data
                </button>
                
                <button id="confirm-clear-data" style="
                  background: #dc2626; 
                  color: white; 
                  border: 2px solid #dc2626; 
                  padding: 12px 24px; 
                  border-radius: 10px; 
                  font-size: 16px; 
                  font-weight: bold; 
                  cursor: pointer; 
                  transition: all 0.2s;
                  font-family: inherit;
                  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
                " onmouseover="this.style.background='#b91c1c'; this.style.borderColor='#b91c1c'; this.style.transform='translateY(-1px)'" onmouseout="this.style.background='#dc2626'; this.style.borderColor='#dc2626'; this.style.transform='translateY(0)'">
                  Clear Data
                </button>
              </div>
            </div>
            
            <style>
              @keyframes slideIn {
                from {
                  opacity: 0;
                  transform: scale(0.8) translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: scale(1) translateY(0);
                }
              }
            </style>
          `;
          
          document.body.appendChild(modal);
          
          // Prevent background scrolling
          document.body.style.overflow = 'hidden';
          
          // Event listeners
          document.getElementById('cancel-clear-data').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
          });
          
          document.getElementById('confirm-clear-data').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
            
            // Clear user data and form
            Storage.clearUserData();
            // Clear the form fields
            if (nameInput) nameInput.value = '';
            if (cityInput) cityInput.value = '';
            // Hide the clear button
            if (clearDataContainer) clearDataContainer.style.display = 'none';
          });
          
          // Close on backdrop click and Escape key
          Utils.attachModalCloseHandlers(modal, () => Utils.closeModal(modal), {
            closeOnBackdrop: true,
            closeOnEscape: true
          });
        }

        showSuccessNotification(title, message, icon = '✅') {
          const notification = document.createElement('div');
          notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; 
            background: white; border-radius: 12px; 
            padding: 20px; max-width: 350px; width: auto;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2); 
            z-index: 4000; display: flex; align-items: flex-start; gap: 12px;
            font-family: 'EB Garamond', 'Garamond', 'Times New Roman', serif;
            border-left: 4px solid #10B981;
            animation: slideInRight 0.4s ease-out;
          `;
          
          notification.innerHTML = `
            <!-- Success Icon -->
            <div style="font-size: 24px; color: #10B981; margin-top: 2px;">
              ${icon}
            </div>
            
            <!-- Content -->
            <div style="flex: 1;">
              <h3 style="margin: 0 0 8px 0; color: #303030; font-size: 18px; font-weight: bold;">
                ${title}
              </h3>
              <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.4;">
                ${message}
              </p>
            </div>
            
            <!-- Close button -->
            <button id="close-notification" style="
              background: none; border: none; color: #999; 
              font-size: 16px; cursor: pointer; padding: 4px;
              border-radius: 4px; transition: all 0.2s;
            " onmouseover="this.style.background='#f3f4f6'; this.style.color='#666'" onmouseout="this.style.background='none'; this.style.color='#999'">
              ✕
            </button>
            
            <style>
              @keyframes slideInRight {
                from {
                  opacity: 0;
                  transform: translateX(100px);
                }
                to {
                  opacity: 1;
                  transform: translateX(0);
                }
              }
              
              @keyframes slideOutRight {
                from {
                  opacity: 1;
                  transform: translateX(0);
                }
                to {
                  opacity: 0;
                  transform: translateX(100px);
                }
              }
            </style>
          `;
          
          document.body.appendChild(notification);
          
          // Close button functionality
          const closeBtn = notification.querySelector('#close-notification');
          closeBtn.addEventListener('click', () => {
            this.removeNotification(notification);
          });
          
          // Auto-remove after 4 seconds
          setTimeout(() => {
            if (document.body.contains(notification)) {
              this.removeNotification(notification);
            }
          }, 4000);
          
          // Click anywhere on notification to close
          notification.addEventListener('click', (e) => {
            if (e.target !== closeBtn) {
              this.removeNotification(notification);
            }
          });
        }

        removeNotification(notification) {
          notification.style.animation = 'slideOutRight 0.3s ease-in';
          setTimeout(() => {
            if (document.body.contains(notification)) {
              document.body.removeChild(notification);
            }
          }, 300);
        }


        showUploadSuccessNotification(count, albumName) {
          const title = count > 1 ? 'Photos Uploaded!' : 'Photo Uploaded!';
          const message = count > 1
            ? `Successfully uploaded ${count} photos to "${albumName}".`
            : `Successfully uploaded photo to "${albumName}".`;
          
          this.showSuccessNotification(title, message, '📤');
        }
      }
      
      // Initialize app


export default CleaningPhotoApp;

// Initialize app when DOM is ready
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const app = new CleaningPhotoApp();
    window.app = app;
  });
}
