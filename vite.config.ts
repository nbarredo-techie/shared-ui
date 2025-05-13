import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shared-ui',
      filename: 'remoteEntry.js',
      exposes: {
        './theme': './src/theme.css'
      },
      shared: ['react', 'react-dom']
    }),
  ],
  build: {
    lib: {
      entry: 'src/entry.ts',
      formats: ['es']
    },
    target: 'esnext',
    modulePreload: false,
    rollupOptions: {
      output: {
        format: 'system'
      }
    }
  },
});
