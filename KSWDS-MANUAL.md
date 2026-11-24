# KSWDS - Kortek Signature Website Development System

## Overview

KSWDS is Kortek's standardized website development methodology and codebase. It ensures consistent, professional, and high-quality websites across all projects.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [HTML Standards](#html-standards)
3. [CSS Architecture (BEM)](#css-architecture-bem)
4. [JavaScript Patterns](#javascript-patterns)
5. [Asset Management](#asset-management)
6. [Quality Assurance Pipeline](#quality-assurance-pipeline)
7. [Deployment Process](#deployment-process)
8. [Accessibility Requirements](#accessibility-requirements)
9. [Performance Guidelines](#performance-guidelines)

---

## 1. Project Structure

```
project/
├── index.html              # Homepage
├── about.html              # About page
├── services.html           # Services page
├── projects.html           # Portfolio/Projects
├── contact.html            # Contact page
├── favicon.html            # Favicon generator
├── robots.txt              # SEO robots
├── sitemap.xml             # Sitemap
├── css/
│   ├── style.css           # Main stylesheet
│   └── service-images.css  # Image utilities
├── js/
│   ├── main.js             # Main JavaScript module
│   └── [feature].js        # Feature-specific modules
├── assets/
│   ├── images/
│   │   ├── logo.png        # Logo variants
│   │   ├── og-image.png    # Open Graph image
│   │   └── services/       # Service-specific images
│   └── fonts/              # Custom fonts (if any)
├── tests/
│   ├── a11y.spec.js        # Accessibility tests
│   ├── responsive.spec.js    # Responsive tests
│   └── visual.spec.js        # Visual regression
├── scripts/
│   ├── check-links.js      # Link checker
│   └── check-images.js     # Image validator
└── .github/workflows/
    └── qa-checks.yml       # CI/CD pipeline
```

---

## 2. HTML Standards

### 2.1 Document Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="...">
    <meta property="og:title" content="...">
    <meta property="og:description" content="...">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://kortek.co.ke/page-name">
    <meta property="og:image" content="...">
    <meta name="twitter:card" content="summary_large_image">
    <title>Page Title - Kortek Solutions</title>
    <link rel="stylesheet" href="css/style.css">
    <!-- Preconnect to CDNs -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>
<body>
    <!-- Content -->
    <script src="js/main.js" type="module"></script>
</body>
</html>
```

### 2.2 Naming Conventions

- **Files**: `kebab-case.html` (e.g., `services.html`, `contact-us.html`)
- **IDs**: `kebab-case` with semantic meaning
- **Classes**: BEM methodology (see CSS Architecture)

### 2.3 Required Meta Tags

| Tag | Required | Description |
|-----|----------|-------------|
| `<meta charset>` | ✅ | UTF-8 encoding |
| `<meta name="viewport">` | ✅ | Mobile responsiveness |
| `<meta name="description">` | ✅ | SEO description |
| `<meta property="og:*">` | ✅ | Social sharing |
| `<meta name="twitter:card">` | ✅ | Twitter cards |

---

## 3. CSS Architecture (BEM)

### 3.1 BEM Methodology

```
.block__element--modifier
```

**Examples:**
- `.btn` → `.btn--primary` → `.btn--large`
- `.service-card` → `.service-card__title` → `.service-card__title--highlighted`
- `.hero__container` → `.hero__title`

### 3.2 Naming Patterns

| Pattern | Example | Description |
|---------|---------|-------------|
| Block | `.btn`, `.card` | Standalone class |
| Element | `.btn__text` | Child of block |
| Modifier | `.btn--primary` | Variation of block |
| Modifier with element | `.btn__text--large` | Variation of element |

### 3.3 CSS Variables (Design Tokens)

```css
:root {
  /* Colors */
  --primary-color: #2563eb;
  --secondary-color: #1e293b;
  --dark-color: #111827;
  --gray-color: #64748b;
  --light-color: #f8fafc;
  
  /* Typography */
  --font-primary: 'Inter', sans-serif;
  --font-heading: 'Montserrat', sans-serif;
  
  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  
  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 24px;
}
```

### 3.4 Media Queries (Breakpoint System)

```css
/* Mobile First */
@media (max-width: 1024px) {
  /* Tablet and below */
}

@media (max-width: 768px) {
  /* Mobile portrait */
}

@media (max-width: 480px) {
  /* Small screens */
}
```

---

## 4. JavaScript Patterns

### 4.1 Module Structure

```javascript
// main.js - Entry point
import { Navigation } from './navigation.js';
import { FormHandling } from './form-handling.js';

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Navigation().init();
  new FormHandling().init();
});
```

### 4.2 Navigation Module Example

```javascript
export class Navigation {
  constructor() {
    this.mobileToggle = document.getElementById('navToggle');
    this.navList = document.querySelector('.nav__list');
  }

  init() {
    this.mobileToggle?.addEventListener('click', () => {
      this.navList.classList.toggle('active');
    });
  }
}
```

### 4.3 Event Handling

- Use `addEventListener` (not inline handlers)
- Delegate events where possible
- Clean up event listeners on component destroy

---

## 5. Asset Management

### 5.1 Image Handling

#### Responsive Images (with WebP fallback)

```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" 
       alt="Descriptive alt text" 
       width="560" 
       height="315"
       loading="lazy"
       decoding="async">
</picture>
```

#### Image Requirements

| Property | Value |
|----------|-------|
| Alt text | Always descriptive |
| Dimensions | Specify width/height |
| Lazy loading | Use `loading="lazy"` |
| WebP | Provide fallback with `<picture>` |

### 5.2 Image Optimization Checklist

- [ ] File size < 150KB for hero images
- [ ] File size < 50KB for content images  
- [ ] WebP version available
- [ ] Proper dimensions specified
- [ ] Alt text present and descriptive
- [ ] No broken image paths

---

## 6. Quality Assurance Pipeline

### 6.1 Automated Tests

| Test | Tool | Command | Description |
|------|------|---------|-------------|
| CSS Linting | stylelint | `npm run lint:css` | CSS syntax & standards |
| JS Linting | eslint | `npm run lint:js` | JavaScript code quality |
| HTML Validation | html-validator-cli | `npm run validate:html` | W3C compliance |
| HTML Lint | htmlhint | `npm run lint:html` | HTML best practices |
| Accessibility | axe-core + Playwright | `npm run test:a11y` | WCAG 2.1 AA |
| Link Checking | custom script | `npm run test:links` | Broken link detection |
| Image Checking | custom script | `npm run test:images` | Missing/broken images |
| Responsive | Playwright | `npm run test:responsive` | Multi-device testing |
| Visual Regression | Playwright | `npm run test:visual` | Screenshot comparison |

### 6.2 Threshold System

**Performance Requirements:**
- Lighthouse Performance: ≥ 85
- Lighthouse Accessibility: ≥ 95
- Lighthouse Best Practices: ≥ 95
- Lighthouse SEO: ≥ 95

### 6.3 GitHub Actions Workflow

The `.github/workflows/qa-checks.yml` runs:
1. **Linting** - CSS, JS, HTML validation
2. **Link Checking** - Internal and external links
3. **Image Checking** - File existence and attributes
4. **Accessibility Testing** - axe-core scans
5. **Responsive Testing** - Multiple viewport sizes
6. **Visual Regression** - Screenshot comparison
7. **Performance Testing** - Lighthouse CI

---

## 7. Deployment Process

### 7.1 Pre-Deployment Checklist

- [ ] All QA tests pass
- [ ] No accessibility violations
- [ ] No broken links
- [ ] Images optimized and validated
- [ ] Meta tags correct for page
- [ ] OG/Twitter cards configured

### 7.2 GitHub Pages Deployment

```bash
# On merge to main branch
git push origin main
# GitHub Actions handles deployment
```

### 7.3 Manual Deployment Verification

1. Check `https://username.github.io/repository/`
2. Verify all pages accessible
3. Test contact forms
4. Confirm analytics tracking

---

## 8. Accessibility Requirements

### 8.1 WCAG 2.1 AA Checklist

| Requirement | Implementation |
|-------------|----------------|
| Semantic HTML | Use `<nav>`, `<main>`, `<section>`, `<header>`, `<footer>` |
| Alt text | All images have descriptive alt text |
| Color contrast | Minimum 4.5:1 for normal text |
| Keyboard navigation | All interactive elements accessible |
| Focus management | Visible focus indicators |
| ARIA labels | Use where appropriate |

### 8.2 Common Issues to Avoid

- Missing alt attributes on images
- Empty links/buttons
- Color-only indicators
- Keyboard traps
- Incorrect heading hierarchy

---

## 9. Performance Guidelines

### 9.1 Image Optimization

- Serve WebP format with JPEG/PNG fallback
- Compress images: < 150KB for hero, < 50KB for content
- Use proper dimensions (no scaling up)
- Implement lazy loading

### 9.2 CSS Optimization

- Minify for production
- Use `@media` queries efficiently
- Avoid unused CSS rules

### 9.3 JavaScript Optimization

- Minimize bundle size
- Defer non-critical JS
- Use `type="module"` for modern browsers

---

## KSWDS Implementation Status

### ✅ Complete
- Project structure established
- HTML templates created
- CSS architecture (BEM) defined
- JavaScript module patterns
- QA pipeline scripts
- GitHub Actions workflow
- Accessibility testing setup

### ⏳ In Progress
- Visual regression baselines
- Performance optimization
- Full documentation

### 🔧 Pending
- Contact form backend integration
- Analytics implementation
- SEO audit completion