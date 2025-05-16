// Export theme
export * from './theme.css';

// Export shadcn components
export * from './components/ui/button';

// Export utility functions used by components
export { cn } from './lib/utils';
import singleSpaReact from 'single-spa-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import RootComponent from './root.component';

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient: ReactDOM,
  rootComponent: RootComponent,
  errorBoundary(err, info, props) {
    return <div>Error! {err.name} {info} {props}</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;