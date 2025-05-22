import "./input.css"; // Changed from output.css to input.css

import React from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;

// Anything exported from this file is importable by other in-browser modules.
export function publicApiFunction() {}
export { Button } from "./components/ui/button";
