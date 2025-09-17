import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAppStore = create(
  persist(
    (set, get) => ({
      // Authentication state
      cleaner: null,
      isAuthenticated: false,

      // Current session state
      currentProperty: null,
      currentRoom: null,
      currentMode: 'before', // 'before' | 'after'

      // Photo storage - structure: { [propertyId]: { [roomId]: { before: dataURL, after: dataURL, timestamp: Date } } }
      photoStorage: {},

      // Upload state
      uploadData: null,
      uploadProgress: {},
      uploadStatus: 'idle', // 'idle' | 'uploading' | 'success' | 'error'

      // Properties list - stored locally for quick access
      properties: [],

      // Settings
      cameraSettings: {
        facingMode: 'environment', // 'environment' | 'user'
        quality: 0.85,
        format: 'jpeg'
      },

      // Actions
      setCleaner: (cleaner) => {
        set({
          cleaner,
          isAuthenticated: !!cleaner
        });
      },

      logout: () => {
        set({
          cleaner: null,
          isAuthenticated: false,
          currentProperty: null,
          currentRoom: null,
          photoStorage: {},
          uploadData: null,
          uploadProgress: {},
          uploadStatus: 'idle'
        });
      },

      setCurrentProperty: (property) => {
        set({ currentProperty: property });
      },

      setCurrentRoom: (roomId) => {
        set({ currentRoom: roomId });
      },

      setCurrentMode: (mode) => {
        set({ currentMode: mode });
      },

      // Property management
      addProperty: (property) => {
        const { properties } = get();
        const newProperty = {
          ...property,
          id: property.id || `prop_${Date.now()}`,
          createdAt: new Date().toISOString(),
          lastUsed: new Date().toISOString()
        };

        set({
          properties: [newProperty, ...properties.filter(p => p.id !== newProperty.id)]
        });

        return newProperty;
      },

      updatePropertyLastUsed: (propertyId) => {
        const { properties } = get();
        set({
          properties: properties.map(p =>
            p.id === propertyId
              ? { ...p, lastUsed: new Date().toISOString() }
              : p
          )
        });
      },

      deleteProperty: (propertyId) => {
        const { properties, photoStorage } = get();
        const newPhotoStorage = { ...photoStorage };
        delete newPhotoStorage[propertyId];

        set({
          properties: properties.filter(p => p.id !== propertyId),
          photoStorage: newPhotoStorage
        });
      },

      // Photo management
      storePhoto: (propertyId, roomId, mode, photoData) => {
        const { photoStorage } = get();
        const timestamp = new Date().toISOString();

        set({
          photoStorage: {
            ...photoStorage,
            [propertyId]: {
              ...photoStorage[propertyId],
              [roomId]: {
                ...photoStorage[propertyId]?.[roomId],
                [mode]: photoData,
                [`${mode}Timestamp`]: timestamp,
                lastUpdated: timestamp
              }
            }
          }
        });
      },

      deletePhoto: (propertyId, roomId, mode) => {
        const { photoStorage } = get();
        if (!photoStorage[propertyId]?.[roomId]) return;

        const roomData = { ...photoStorage[propertyId][roomId] };
        delete roomData[mode];
        delete roomData[`${mode}Timestamp`];

        set({
          photoStorage: {
            ...photoStorage,
            [propertyId]: {
              ...photoStorage[propertyId],
              [roomId]: roomData
            }
          }
        });
      },

      deleteRoomPhotos: (propertyId, roomId) => {
        const { photoStorage } = get();
        if (!photoStorage[propertyId]) return;

        const propertyData = { ...photoStorage[propertyId] };
        delete propertyData[roomId];

        set({
          photoStorage: {
            ...photoStorage,
            [propertyId]: propertyData
          }
        });
      },

      getPhotoCount: (propertyId) => {
        const { photoStorage } = get();
        if (!photoStorage[propertyId]) return { total: 0, rooms: 0, complete: 0 };

        const rooms = Object.keys(photoStorage[propertyId]);
        let total = 0;
        let complete = 0;

        rooms.forEach(roomId => {
          const room = photoStorage[propertyId][roomId];
          if (room.before) total++;
          if (room.after) total++;
          if (room.before && room.after) complete++;
        });

        return {
          total,
          rooms: rooms.length,
          complete
        };
      },

      getRoomPhotoStatus: (propertyId, roomId) => {
        const { photoStorage } = get();
        const room = photoStorage[propertyId]?.[roomId];

        return {
          hasBefore: !!room?.before,
          hasAfter: !!room?.after,
          isComplete: !!(room?.before && room?.after),
          lastUpdated: room?.lastUpdated
        };
      },

      // Upload management
      setUploadData: (data) => {
        set({ uploadData: data });
      },

      setUploadStatus: (status) => {
        set({ uploadStatus: status });
      },

      setUploadProgress: (progress) => {
        set({ uploadProgress: progress });
      },

      clearUploadData: () => {
        set({
          uploadData: null,
          uploadProgress: {},
          uploadStatus: 'idle'
        });
      },

      // Camera settings
      updateCameraSettings: (settings) => {
        const { cameraSettings } = get();
        set({
          cameraSettings: {
            ...cameraSettings,
            ...settings
          }
        });
      },

      // Utility functions
      getPropertyPhotos: (propertyId) => {
        const { photoStorage } = get();
        return photoStorage[propertyId] || {};
      },

      getAllPhotosForUpload: (propertyId) => {
        const { photoStorage, cleaner, currentProperty } = get();
        const propertyPhotos = photoStorage[propertyId];
        if (!propertyPhotos || !cleaner || !currentProperty) return null;

        const photos = [];
        Object.entries(propertyPhotos).forEach(([roomId, roomData]) => {
          if (roomData.before) {
            photos.push({
              room: roomId,
              type: 'before',
              data: roomData.before,
              timestamp: roomData.beforeTimestamp
            });
          }
          if (roomData.after) {
            photos.push({
              room: roomId,
              type: 'after',
              data: roomData.after,
              timestamp: roomData.afterTimestamp
            });
          }
        });

        return {
          property: currentProperty,
          cleaner: cleaner,
          photos: photos,
          captureDate: new Date().toISOString()
        };
      },

      // Reset specific property photos (useful after successful upload)
      clearPropertyPhotos: (propertyId) => {
        const { photoStorage } = get();
        const newPhotoStorage = { ...photoStorage };
        delete newPhotoStorage[propertyId];

        set({ photoStorage: newPhotoStorage });
      }
    }),
    {
      name: 'cleaning-app-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist specific parts of the state
        cleaner: state.cleaner,
        isAuthenticated: state.isAuthenticated,
        properties: state.properties,
        photoStorage: state.photoStorage,
        cameraSettings: state.cameraSettings
      })
    }
  )
);

export default useAppStore;