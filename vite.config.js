import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// Plugin to remove type="module" from script tags for iOS Safari compatibility
function removeModuleAttribute() {
  return {
    name: 'remove-module-attribute',
    transformIndexHtml(html) {
      return html.replace(/<script type="module" crossorigin/g, '<script crossorigin');
    }
  }
}

export default defineConfig({
  plugins: [
    removeModuleAttribute(),
    // Temporarily disable PWA to debug caching issues
    /*
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Cleaning Photo App',
        short_name: 'CleaningApp',
        description: 'Mobile-first cleaning photo documentation app',
        theme_color: '#667eea',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'any'
          }
        ]
      }
    })
    */
  ],
  define: {
    // Replace environment variables in HTML file for vanilla JS
    __VITE_LOCATION_A_SCRIPT_URL__: JSON.stringify(process.env.VITE_LOCATION_A_SCRIPT_URL || ''),
    __VITE_LOCATION_A_FOLDER_ID__: JSON.stringify(process.env.VITE_LOCATION_A_FOLDER_ID || ''),
    __VITE_LOCATION_B_SCRIPT_URL__: JSON.stringify(process.env.VITE_LOCATION_B_SCRIPT_URL || ''),
    __VITE_LOCATION_B_FOLDER_ID__: JSON.stringify(process.env.VITE_LOCATION_B_FOLDER_ID || ''),
    __VITE_LOCATION_C_SCRIPT_URL__: JSON.stringify(process.env.VITE_LOCATION_C_SCRIPT_URL || ''),
    __VITE_LOCATION_C_FOLDER_ID__: JSON.stringify(process.env.VITE_LOCATION_C_FOLDER_ID || ''),
    __VITE_LOCATION_D_SCRIPT_URL__: JSON.stringify(process.env.VITE_LOCATION_D_SCRIPT_URL || ''),
    __VITE_LOCATION_D_FOLDER_ID__: JSON.stringify(process.env.VITE_LOCATION_D_FOLDER_ID || '')
  },
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    target: ['es2015', 'safari11'], // Target iOS Safari 11+
    rollupOptions: {
      output: {
        format: 'iife', // Use IIFE format for better compatibility
        manualChunks: undefined, // Don't split into chunks
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
})