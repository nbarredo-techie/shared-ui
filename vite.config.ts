import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import singleSpa from 'vite-plugin-single-spa';
import path from 'path'; 

export default defineConfig({
  plugins: [
    react(), 
    singleSpa({
      type: 'mife', 
      serverPort: 5173,
      spaEntryPoints: './src/shared-ui.tsx', 
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    cors: {
      origin: '*',
      methods: ['GET'],
    },
  },
  build: {
    
    target: 'esnext',
    cssCodeSplit: false,
    modulePreload: false,
    minify: false,
    rollupOptions: { 
      output: {
        format: 'system', 
        preserveModules: false, // important to avoid multiple chunks
      },
    },
  },
});
