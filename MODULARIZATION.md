# Portfolio Modularization Guide

## Project Structure

This portfolio has been modularized into component-based CSS and JavaScript modules for better maintainability.

### CSS Components (`/css/components/`)

Each component has its own CSS file:

- **navbar.css** - Navigation bar styling
- **hero.css** - Hero/landing section and resume buttons
- **sections.css** - Common section styles (h2 underlines, padding)
- **about.css** - About section and profile info card
- **skills.css** - Skills cards and skill tags
- **experience.css** - Experience timeline items
- **portfolio.css** - Portfolio grid and cards
- **education.css** - Education items
- **contact.css** - Contact section styling
- **footer.css** - Footer styling
- **responsive.css** - Mobile responsive breakpoints

All component CSS files are linked in the `<head>` of `index.html`.

### JavaScript Modules (`/js/modules/`)

Modular JavaScript files handle specific functionality:

- **utilities.js** - Common utility functions (debounce, viewport checks, active nav tracking)
- **smooth-scroll.js** - Smooth scrolling for anchor links with fade effect
- **navbar.js** - Responsive navbar toggle on mobile
- **portfolio.js** - Portfolio card interactions and animations

All JS modules are loaded at the end of `index.html` before closing `</body>` tag.

## Adding New Components

### To add a new CSS component:

1. Create a new file: `/css/components/component-name.css`
2. Add all styles for that component
3. Link it in the `<head>` of `index.html`:
   ```html
   <link href="css/components/component-name.css" rel="stylesheet">
   ```

### To add a new JavaScript module:

1. Create a new file: `/js/modules/module-name.js`
2. Wrap it in an IIFE (Immediately Invoked Function Expression) for scope isolation:
   ```javascript
   (function() {
       'use strict';
       
       function initModule() {
           // Your code here
       }
       
       // Initialize on DOM ready
       if (document.readyState === 'loading') {
           document.addEventListener('DOMContentLoaded', initModule);
       } else {
           initModule();
       }
       
       // Export module
       window.ModuleName = { init: initModule };
   })();
   ```
3. Load it before `</body>` in `index.html`:
   ```html
   <script src="js/modules/module-name.js"></script>
   ```

## CSS Variables

Global CSS variables are defined in `index.html`:

```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --dark-color: #212529;
    --light-color: #f8f9fa;
}
```

All components use these variables, so updating colors is simple - just change these values.

## No Build Tool Required

This modularization works without any build tools (Gulp, Webpack, etc.):
- Plain CSS files (no SCSS compilation needed)
- Vanilla JavaScript modules
- Direct file loading in HTML
- Works immediately in the browser

## Testing Changes

Simply open `index.html` in a browser or use a local server:

```bash
# Using Python 3
python3 -m http.server 8000

# Then visit: http://localhost:8000
```

Changes to CSS files will reflect immediately. JavaScript modules are scoped and won't conflict with each other.

## Benefits

✅ **Better Organization** - Each component is isolated in its own file
✅ **Easier Maintenance** - Find and update specific styles/functionality quickly
✅ **Reusability** - Components can be copied to other projects
✅ **No Build Tools** - Works without npm, Gulp, or Webpack
✅ **Scalability** - Easy to add new components as portfolio grows
✅ **Performance** - Minimal file size, browser caches individual CSS files
