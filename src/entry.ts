// src/entry.ts
import './theme.css';

// Export the theme CSS module
export * from './theme.css';

// Initialize the shared UI module
const init = () => {
  // Add any initialization logic here if needed
  console.log('Shared UI module initialized');
};

export { init };
