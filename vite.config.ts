import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shared-ui',
      filename: '../remoteEntry.js', // ✅ forces output to dist/remoteEntry.js
      exposes: {
        './theme': './src/index.ts' // ✅ expose a JS file that references theme.css
      },
      shared: ['react', 'react-dom']
    }),
  ],
  build: {
    target: 'esnext',
    modulePreload: false,
    rollupOptions: {
      input: 'src/entry.ts', // 
      output: {
        format: 'system',
        entryFileNames: '[name].js', //  
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    }
  }
  
});
