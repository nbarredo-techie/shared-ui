// Export theme
export * from './theme.css';

// Export shadcn components
export * from './components/ui/button';

// Export utility functions used by components
export { cn } from './lib/utils';

// Export single-spa lifecycle functions
import React from 'react';
import * as ReactDOM from 'react-dom/client';

// Empty component since we're just sharing UI components
const EmptyComponent = () => {
  // This won't be rendered - we're just using single-spa as a way to load our components
  return React.createElement('div', null, 'Shared UI Components');
};

// Create minimal no-op lifecycle functions
export const bootstrap = async () => {
  console.log('Shared UI bootstrapped');
};

export const mount = async (props: { domElement: HTMLElement }) => {
  console.log('Shared UI mounted');
  // Create a React root for rendering if needed
  if (props.domElement) {
    const root = ReactDOM.createRoot(props.domElement);
    root.render(React.createElement(EmptyComponent));
    return () => {
      root.unmount();
    };
  }
  return () => {};
};

export const unmount = async () => {
  console.log('Shared UI unmounted');
};

