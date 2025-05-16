// Export theme
export * from './theme.css';


import './theme.css';
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