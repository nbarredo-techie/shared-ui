import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import federation from '@originjs/vite-plugin-federation';
import { resolve,dirname } from 'path'; 
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  plugins: [
    react(),
    federation({
      name: 'shared_ui',
      filename: './../remoteEntry.js',
      exposes: {
        './theme': './src/theme.css',
        './components': './src/index.ts'
      },
      shared: {
        react: { 
          requiredVersion: '^19.0.0',
          import: false
        },
        'react-dom': { 
          requiredVersion: '^19.0.0',
          import: false
        }, 
        'tailwindcss': {
          requiredVersion: '^4.0.0',
          import: false
        },
      }
    }),
  ],
  build: {
    target: 'esnext',
    modulePreload: false,
    minify: false, // Helps with debugging
    cssCodeSplit: false, // Prevents CSS code splitting which can cause issues in micro frontends
    rollupOptions: {
      input: './src/entry.ts', // Specify the entry point explicitly
      preserveEntrySignatures: 'strict',
      output: {
        format: 'system',
        entryFileNames: '[name].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    }
  }
});
