# Kortek Solutions Website

A professional, modern, responsive website for Kortek - technology and business solutions company serving Kenya and international clients.

## Project Structure

```
kortek-website/
├── index.html              # Homepage
├── about.html              # About Kortek page
├── services.html           # Services page
├── projects.html           # Projects/Portfolio page
├── contact.html            # Contact page
├── preview.html            # Preview/dashboard page
├── robots.txt              # Search engine crawler instructions
├── sitemap.xml             # XML sitemap for SEO
├── favicon.html            # Favicon SVG source
├── css/
│   └── style.css           # Main stylesheet (20KB+)
├── js/
│   └── main.js             # JavaScript functionality (6KB+)
├── images/                 # Image assets directory
│   ├── .gitkeep            # Directory placeholder
│   ├── logo.png            # Company logo
│   ├── favicon-32x32.png   # Favicon
│   └── og-image.png        # Social sharing image
└── projects/
    └── README.md           # Project documentation template
```

### All HTML Files Include:
- SVG favicon (inline)
- Google Fonts (Inter, Montserrat)
- Open Graph meta tags for social sharing
- SEO meta description

## Website Features

- ✅ Professional homepage with hero section
- ✅ About page with mission, vision, and values
- ✅ Comprehensive services page covering:
  - Website Development
  - Software Development
  - Business Automation
  - Digital Marketing
  - Data Analytics
  - Professional Business Solutions
- ✅ Projects/Portfolio section (filterable by category)
- ✅ Contact page with contact form
- ✅ Mobile-responsive design
- ✅ SEO-friendly structure
- ✅ Accessible navigation
- ✅ Smooth animations on scroll
- ✅ Mobile hamburger menu
- ✅ Project category filtering
- ✅ Contact form validation

## Technology Stack

- HTML5 semantic markup
- CSS3 with custom properties (variables)
- JavaScript (vanilla, no frameworks)
- Google Fonts (Inter, Montserrat)
- Responsive grid layout
- CSS Grid and Flexbox
- Mobile-first design

## File Sizes

| File | Size | Description |
|------|------|-------------|
| style.css | ~20KB | All styling, mobile-responsive |
| main.js | ~6KB | Navigation, filtering, animations |
| index.html | ~8KB | Homepage |
| about.html | ~10KB | About page |
| services.html | ~15KB | Services overview |
| projects.html | ~14KB | Portfolio gallery |
| contact.html | ~9KB | Contact form |

## Deployment for GitHub Pages

Ready for GitHub Pages deployment:

1. **Fork or clone** the repository to your GitHub account
2. **Push to GitHub** (or use existing repo)
3. **Enable GitHub Pages** from repository settings:
   - Go to Settings → Pages
   - Select source branch (main/master) and folder (/root)
4. **Site URL** will be: `https://<username>.github.io/<repository-name>/`

## Content Customization

### Replaceable Content:
- **Logo**: Replace `images/logo.png` or update class `.logo` in header
- **Contact Info**: Update footer and contact.html
- **Team Members**: Edit team section in about.html
- **Projects**: Add to projects.html following existing card structure
- **Company Name**: "Kortek" throughout all HTML files

### To Update Contact Form:
1. Replace `<form action="#">` with your preferred service
2. Options: Formspree, Getform, Netlify Forms, or custom backend

### To Add Real Project Screenshots:
1. Place images in `images/` or `projects/` folder
2. Update `<div class="project-card__image">` placeholders
3. Add actual client testimonials

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## SEO Meta Tags Included

Each page has:
- `description` meta tag
- `og:title`, `og:description`, `og:type`, `og:url`
- `twitter:card` for social sharing
- `sitemap.xml` and `robots.txt` for search engines

## License

MIT License - Feel free to use and modify

---

**✅ Website complete and ready for deployment!**