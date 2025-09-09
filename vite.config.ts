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
  optimizeDeps: {
    // Keep lucide-react out of pre-bundling to save some dev build time
    exclude: ['lucide-react'],
  },
  build: {
    chunkSizeWarningLimit: 800, // raise from default 500 KB to reduce noise
    rollupOptions: {
      output: {
        // Manual vendor chunk splitting for better caching
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['lucide-react'],
        },
      },
    },
  },
  resolve: {
    // Allow importing these extensions without specifying them in import paths
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.webp', '.avif'],
  },
});
