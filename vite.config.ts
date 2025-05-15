import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve, dirname } from 'path'; 
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    target: 'esnext',
    minify: false, // Helps with debugging
    cssCodeSplit: false, // Keeps CSS in a single file
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'shared-ui',
      fileName: (format) => `shared-ui.js`,
      formats: ['system']
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      external: ['react', 'react-dom'],
      output: {
        // Global variables to use in UMD build for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        // Ensures our component library is optimized for single-spa
        manualChunks: undefined
      }
    }
  }
});
