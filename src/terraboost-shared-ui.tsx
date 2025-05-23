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
export { Input } from "./components/ui/input";
export { Separator } from "./components/ui/separator";
export { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./components/ui/sheet";
export { Sidebar,   SidebarContent,   SidebarFooter, SidebarHeader, SidebarTrigger,SidebarProvider,SidebarMenu, SidebarMenuButton } from "./components/ui/sidebar"; // Assuming sidebar.tsx has similar exports to sheet.tsx
export { Skeleton } from "./components/ui/skeleton";
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/ui/tooltip";
