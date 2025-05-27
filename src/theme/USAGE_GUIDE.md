# Theme Toggle Usage Guide

## Issue Resolution

The theme toggle wasn't visible because the import paths were using `@/` aliases which don't work in shared libraries. This has been fixed with relative imports.

## How to Use in Your Microfrontend

### 1. Basic Setup

```tsx
import React from 'react';
import { ThemeProvider, ThemeToggle } from '@terraboost/shared-ui';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="my-app-theme">
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b">
          <div className="flex h-16 items-center px-4">
            <div className="ml-auto">
              <ThemeToggle />
            </div>
          </div>
        </header>
        
        <main className="container mx-auto py-6">
          <h1 className="text-2xl font-bold">My Application</h1>
          <p className="text-muted-foreground">
            Toggle between light and dark themes using the button in the header.
          </p>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
```

### 2. In a Header Component

```tsx
import React from 'react';
import { ThemeToggle } from '@terraboost/shared-ui';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block">
              Your App Name
            </span>
          </a>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
```

### 3. Custom Theme Hook Usage

```tsx
import React from 'react';
import { useTheme } from '@terraboost/shared-ui';

export function ThemeStatus() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Current Theme</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Active theme: <span className="font-mono">{theme}</span>
      </p>
      
      <div className="flex gap-2">
        <button 
          onClick={() => setTheme('light')}
          className="px-3 py-1 text-sm rounded border"
        >
          Light
        </button>
        <button 
          onClick={() => setTheme('dark')}
          className="px-3 py-1 text-sm rounded border"
        >
          Dark
        </button>
        <button 
          onClick={() => setTheme('system')}
          className="px-3 py-1 text-sm rounded border"
        >
          System
        </button>
      </div>
    </div>
  );
}
```

## Troubleshooting

### Theme Toggle Not Visible
- ✅ **Fixed**: Updated imports to use relative paths instead of `@/` aliases
- Ensure you're wrapping your app with `ThemeProvider`
- Make sure you have the required CSS classes in your Tailwind config

### Styling Issues
- Ensure your consuming app has Tailwind CSS configured with dark mode
- Import the CSS from the shared library: `import '@terraboost/shared-ui/dist/output.css'`
- Add `darkMode: "class"` to your Tailwind config

### TypeScript Issues
- The shared library exports full TypeScript definitions
- Import types: `import type { Theme } from '@terraboost/shared-ui'`

## Required Tailwind Configuration

In your consuming app's `tailwind.config.js`:

```js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@terraboost/shared-ui/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Important: enables class-based dark mode
  // ... rest of your config
}
```
