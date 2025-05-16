// Export theme
 
 
import './tailwind.css';
import singleSpaReact from 'single-spa-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import RootComponent from './root.component';

export { Button } from '@rewind-ui/core';

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient: ReactDOM,
  rootComponent: RootComponent,
  errorBoundary(err, info, props) {
    return <div>Error! {err.name} {info} {props}</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;