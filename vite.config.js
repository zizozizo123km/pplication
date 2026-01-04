import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Configure path aliases for cleaner imports in a large project structure
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/store'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },

  // Development server settings
  server: {
    port: 3000,
    open: true,
    // proxy settings can be added here if backend API is running on a different port
  },

  // Production build settings
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Ensure compatibility with modern browsers
    target: 'es2020', 
    rollupOptions: {
      output: {
        // Simple manual chunking for better loading performance
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group major dependencies
            if (id.includes('react') || id.includes('react-dom') || id.includes('framer-motion')) {
              return 'vendor-react';
            }
            if (id.includes('axios')) {
              return 'vendor-api';
            }
            return 'vendor';
          }
        },
      },
    },
  }
});