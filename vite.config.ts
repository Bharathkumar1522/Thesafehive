import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // JS bundle analysis (run `npm run build` then open bundle-report.html)
    visualizer({
      filename: 'bundle-report.html',
      open: false, // set to true if you want report to open automatically
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // Each stable library in its own chunk → long-term CDN/browser caching
        manualChunks: {
          'react-core': ['react', 'react-dom'],
          'react-router': ['react-router-dom'],
          'framer-motion': ['framer-motion'],
          'lucide': ['lucide-react'],
          'contentful': ['contentful'],
          'keen-slider': ['keen-slider'],
        },
      },
    },
  },
  resolve: {
    // Allow importing these extensions without specifying them in import paths
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.webp', '.avif'],
  },
});
