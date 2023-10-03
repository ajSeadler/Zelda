import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Specify the port for your development server
  },
  resolve: {
    alias: {
      // Define custom aliases for importing modules
      '@components': '/src/components',
      '@styles': '/src/styles',
    },
  },
  build: {
    outDir: 'dist', // Specify the output directory for production builds
  },
});
