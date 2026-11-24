const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const BASE_DIR = __dirname + '/..';
const HTML_FILES = [
  'index.html',
  'about.html',
  'services.html',
  'projects.html',
  'contact.html'
];

function checkImages() {
  let totalImages = 0;
  let issues = 0;
  const errors = [];

  for (const file of HTML_FILES) {
    const filePath = path.join(BASE_DIR, file);
    const html = fs.readFileSync(filePath, 'utf-8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Check all images
    const images = document.querySelectorAll('img');
    for (const img of images) {
      totalImages++;
      const src = img.getAttribute('src');
      const alt = img.getAttribute('alt');

      // Check if image file exists
      if (src && !src.startsWith('http') && !src.startsWith('data:')) {
        const targetPath = path.join(BASE_DIR, src);
        if (!fs.existsSync(targetPath)) {
          issues++;
          errors.push(`MISSING IMAGE FILE in ${file}: ${src}`);
        }
      }

      // Check for alt text
      if (!alt) {
        issues++;
        errors.push(`MISSING ALT TEXT in ${file} for image: ${src || 'inline'}`);
      }

      // Check for width/height attributes (CLS prevention)
      const width = img.getAttribute('width');
      const height = img.getAttribute('height');
      if (!width || !height) {
        issues++;
        errors.push(`MISSING WIDTH/HEIGHT in ${file} for image: ${src || 'inline'} (CLS risk)`);
      }
    }

    // Check CSS background images
    const styleElements = document.querySelectorAll('style');
    for (const style of styleElements) {
      const css = style.textContent;
      const bgMatches = css.match(/background-image:\s*url\(['"]?([^'")]+)['"]?\)/g);
      if (bgMatches) {
        for (const match of bgMatches) {
          const urlMatch = match.match(/url\(['"]?([^'")]+)['"]?\)/);
          if (urlMatch) {
            const url = urlMatch[1];
            if (url && !url.startsWith('http') && !url.startsWith('data:')) {
              totalImages++;
              const targetPath = path.join(BASE_DIR, url);
              if (!fs.existsSync(targetPath)) {
                issues++;
                errors.push(`MISSING BACKGROUND IMAGE in ${file}: ${url}`);
              }
            }
          }
        }
      }
    }
  }

  console.log(`\nImage Check Summary:`);
  console.log(`Total images checked: ${totalImages}`);
  console.log(`Issues found: ${issues}`);

  if (issues > 0) {
    console.log('\nImage issues found:');
    errors.forEach(e => console.log(`  - ${e}`));
    process.exit(1);
  } else {
    console.log('\nAll images valid!');
    process.exit(0);
  }
}

checkImages();