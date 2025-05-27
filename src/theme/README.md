# Theme Provider Usage

This shared library exports theme components that can be used across your microfrontends.

## Components Exported

- `ThemeProvider` - Context provider for theme state
- `useTheme` - Hook to access theme state
- `ThemeToggle` - UI component for switching themes

## Usage in Microfrontends

### 1. Wrap your root component with ThemeProvider

```tsx
import React from "react";
import { ThemeProvider } from "terraboost-shared-ui";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="your-app-theme">
      {/* Your app content */}
    </ThemeProvider>
  );
}

export default App;
```

### 2. Use the ThemeToggle component

```tsx
import React from "react";
import { ThemeToggle } from "terraboost-shared-ui";

function Header() {
  return (
    <header>
      <div>Your Header Content</div>
      <ThemeToggle />
    </header>
  );
}
```

### 3. Use the useTheme hook for custom theme logic

```tsx
import React from "react";
import { useTheme } from "terraboost-shared-ui";

function CustomComponent() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme("dark")}>Switch to Dark</button>
    </div>
  );
}
```

## Theme Values

- `"light"` - Light theme
- `"dark"` - Dark theme
- `"system"` - Follow system preference

## CSS Classes

The theme provider automatically adds the appropriate CSS class (`light` or `dark`) to the document root element. Make sure your CSS includes dark mode styles:

```css
/* Light mode (default) */
.light {
  /* light theme styles */
}

/* Dark mode */
.dark {
  /* dark theme styles */
}
```

## Storage

Theme preference is automatically persisted to localStorage using the provided `storageKey`.
