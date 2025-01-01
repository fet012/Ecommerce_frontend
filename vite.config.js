
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, 
  },
  build: {
    outDir: 'public', // or 'build', 'dist'
    index: 'index.html',
    chunkSizeWarningLimit: 1000, // Increase limit (optional)
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Customize chunking logic
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },

});
