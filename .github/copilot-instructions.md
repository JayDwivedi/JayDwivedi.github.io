# AI Coding Agent Instructions - MyPortfolio

## Project Overview
A personalized portfolio and resume website built on the Start Bootstrap Resume theme (Bootstrap 4 + jQuery). This is a static HTML site with SCSS styling, managed by Gulp for asset compilation. Hosts on GitHub Pages via the `JayDwivedi.github.io` repository.

**Current Branch:** `portfolio-enhancement` (feature development branch)

## Architecture & Key Patterns

### Build System (Gulp 3.x)
The build pipeline handles SCSS compilation, minification, and vendor copying:
- **SCSS Entry Point:** `scss/resume.scss` imports partials in order:
  - `_variables.scss` (Bootstrap color overrides, layout measurements)
  - `_mixins.scss` (heading/body font definitions)
  - `_global.scss` (body padding, typography)
  - `_nav.scss` (navigation styling)
  - `_resume-item.scss` (section components)
  - `_bootstrap-overrides.scss` (custom Bootstrap tweaks)

- **Build Tasks:** Run `gulp` to execute default task (`sass` → `minify-css` → `minify-js` → `copy`). The `copy` task syncs npm dependencies (Bootstrap, Font Awesome, jQuery, etc.) to `/vendor/` directory.

- **Development:** Use `gulp dev` to start BrowserSync hot-reload (watches SCSS, CSS, JS, HTML files for changes). Visit `http://localhost:3000` by default.

- **Output Files:** SCSS compiles to `/css/resume.css` (and `.min.css` for production). JS minifies `/js/resume.js` to `.min.js`.

**Why this structure:** Gulp v3 is an older pattern but used for legacy Bootstrap 4 themes. The vendor copying step is critical—new npm packages won't appear on the website until `gulp copy` runs.

### Styling Architecture
- **Primary Color:** Orange (`#BD5D38` in `_variables.scss` as `$primary` variable)
- **Layout:** Desktop uses a sticky left sidebar (17rem width via `$sidebar-base-width`). Mobile uses top navbar.
  - Implementation: `body { padding-top: 54px; }` on mobile, `padding-left: 17rem;` on desktop (media query at 992px)
- **Typography:** Heading font (Saira) and body font (Open Sans) imported from Google Fonts in `index.html`. Defined via mixins: `@include heading-font` and `@include body-font` in SCSS.

### JavaScript Patterns
Both `resume.js` (core) and `main.js` (legacy) are included; prioritize `resume.js` for new features:
- **Scroll Triggers:** Use class `.js-scroll-trigger` with anchor links for smooth scroll (easeInOutExpo easing, 1000ms duration).
- **Navbar Sync:** ScrollSpy via `$('body').scrollspy({ target: '#sideNav' })` automatically highlights active section in navigation.
- **Responsive Menu:** Mobile nav collapses when clicking scroll triggers (`.navbar-collapse`).

Example pattern for adding a scroll-to-section link:
```html
<a class="js-scroll-trigger" href="#section-id">Link Text</a>
```

### HTML Organization
- `index.html` now uses embedded styles (modern approach) but still links vendor CSS in `<head>`.
- Use semantic HTML5 sections with unique IDs matching navigation anchor links.
- Mobile viewport: `<meta name="viewport" content="width=device-width, initial-scale=1.0">` is set.

## Development Workflows

### Running Locally
```bash
npm install                  # Install dependencies (first time only)
gulp dev                     # Start dev server with BrowserSync
```
Then open `http://localhost:3000` in browser. Changes to SCSS/CSS/JS/HTML auto-reload.

### Building for Production
```bash
npm install                  # Ensure vendor/ is populated
gulp                         # Compile, minify, output to css/ and js/
```
Output files ready for GitHub Pages deployment.

### Adding New NPM Dependencies
1. Install normally: `npm install package-name`
2. Run `gulp copy` to sync into `/vendor/` directory
3. Link new CSS/JS in `index.html` `<head>` or before closing `</body>` tag
4. Update SCSS imports in `scss/resume.scss` if adding SCSS libraries

## Conventions & Specific Patterns

### Content Sections
Index.html uses Bootstrap grid (12-column layout). Wrap resume sections in:
```html
<section class="resume-section p-3 p-lg-5 d-flex flex-column">
  <div class="my-auto">
    <!-- Content -->
  </div>
</section>
```

- `p-3 p-lg-5`: Padding (3 on mobile, 5 on lg screens)
- `d-flex flex-column`: Flex column layout (Bootstrap utilities)
- `my-auto`: Vertical centering helper

### Colors & Styling
- Avoid hardcoding colors—use SCSS variables: `$primary`, `$secondary`, `$gray-600`, etc.
- Form inputs/buttons: Use Bootstrap classes (`btn`, `btn-primary`, `form-control`)
- Icon libraries: Font Awesome (`fa-*` classes), Devicons (`devicons` + tech icon classes), Simple Line Icons

### Media Queries
- Mobile-first approach: base styles apply to all, then use `@media (min-width: 992px)` for desktop overrides
- Example: Body padding differs on mobile (top bar) vs. desktop (sidebar layout)

### Code Banners
Generated files include a Start Bootstrap banner comment block with version/license. This is auto-added by Gulp during minification via `gulp-header` and `package.json` metadata. Do not manually edit minified files.

## Integration Points & Dependencies

### External Dependencies
- **Bootstrap 4** (CSS Grid, utilities): `/vendor/bootstrap/`
- **jQuery 3.2.1+**: Used for smooth scroll, form validation, event handlers
- **Font Awesome**: Icon library; CSS in `/vendor/font-awesome/css/`
- **Google Fonts**: Saira (headings), Open Sans (body) loaded in `index.html` `<head>`

### SendEmail PHP Endpoint
- Form submissions in `main.js` post to `inc/sendEmail.php`
- Contact form validation uses jQuery validate plugin
- Responses: `'OK'` shows success message; any other response is treated as error message to display

### GitHub Pages Hosting
- Repository: `JayDwivedi.github.io`
- Branch: Typically `main` for deployment; features on `portfolio-enhancement`
- Ensure minified CSS/JS are committed; GitHub Pages serves the static files directly

## Common Tasks for AI Agents

### Adding a New Section
1. Create `<section id="section-slug">` in `index.html`
2. Add navigation link in sidebar/navbar with `class="js-scroll-trigger"` and `href="#section-slug"`
3. Style using Bootstrap grid + SCSS if global changes needed (add to `scss/_resume-item.scss` or new partial)
4. Test scrollspy and smooth scroll functionality via `gulp dev`

### Updating Styling
1. Edit SCSS partial in `/scss/` folder (not CSS directly)
2. Run `gulp sass` to recompile
3. For global changes, update `/scss/_global.scss` or relevant partial
4. For component-specific styles, add to `/scss/_resume-item.scss`

### Debugging Layout Issues
- Check media query breakpoint (992px is desktop threshold)
- Inspect Bootstrap grid (12 columns, use `col-`, `col-md-`, `col-lg-` classes)
- Remember sidebar padding on desktop (`padding-left: 17rem`)
- Use BrowserSync in `gulp dev` for rapid iteration

## Notes for Long-Context Tasks
- **Minified files** (`*.min.css`, `*.min.js`) are generated—edit source SCSS/JS instead
- **Vendor folder** is build output; don't manually edit. Update `gulpfile.js` if new vendors needed
- **Legacy JS**: `main.js` uses older patterns; new code should use `resume.js` approach (vanilla DOM + minimal jQuery)
- **Test on both desktop & mobile** during development due to sidebar/navbar layout difference

