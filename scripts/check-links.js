const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const fetch = require('node-fetch');

const BASE_DIR = __dirname + '/..';
const HTML_FILES = [
  'index.html',
  'about.html',
  'services.html',
  'projects.html',
  'contact.html'
];

// Schemes to skip - treated as external/non-file references
const SKIP_SCHEMES = ['mailto:', 'tel:', 'javascript:', 'data:', 'ftp:'];

// External domains to skip (CDNs, fonts, etc.)
const EXTERNAL_DOMAINS_TO_SKIP = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'cdnjs.cloudflare.com',
  'unpkg.com',
  'cdn.jsdelivr.net'
];

function shouldSkipLink(href) {
  if (!href) return true;
  return SKIP_SCHEMES.some(schema => href.startsWith(schema));
}

function isExternalLink(href) {
  return href.startsWith('http://') || href.startsWith('https://');
}

function parseInternalLink(href) {
  // Split on # for fragment identification
  const [filePath, fragment] = href.split('#');
  return { filePath: filePath || '', fragment: fragment || null };
}

async function checkExternalLink(href) {
  try {
    const response = await fetch(href, { 
      method: 'HEAD', 
      timeout: 5000 
    });
    if (response.ok || response.status === 304) {
      return { ok: true };
    }
    if (response.status === 405) {
      // HEAD not allowed, try GET
      const getResponse = await fetch(href, { method: 'GET', timeout: 10000 });
      return { ok: getResponse.ok, status: getResponse.status };
    }
    return { ok: false, status: response.status };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function checkLinks() {
  let totalLinks = 0;
  let brokenLinks = 0;
  const errors = [];

  for (const file of HTML_FILES) {
    const filePath = path.join(BASE_DIR, file);
    if (!fs.existsSync(filePath)) {
      console.warn(`WARNING: HTML file not found: ${file}`);
      continue;
    }

    const html = fs.readFileSync(filePath, 'utf-8');
    const dom = new JSDOM(html, { baseUrl: 'file://' + BASE_DIR + '/' });
    const document = dom.window.document;

    // Check all links (a, area, link elements)
    const linkElements = document.querySelectorAll('a[href], area[href], link[href]');
    for (const el of linkElements) {
      const href = el.getAttribute('href');
      if (!href) continue;

      totalLinks++;

      // Skip anchor/fragment-only links
      if (href.startsWith('#')) continue;

      // Skip mailto:, tel:, javascript:, data: etc.
      if (shouldSkipLink(href)) continue;

      // Skip CDN/external domains we know might be flaky
      if (EXTERNAL_DOMAINS_TO_SKIP.some(d => href.includes(d))) continue;

      // Handle external links
      if (isExternalLink(href)) {
        const result = await checkExternalLink(href);
        if (!result.ok) {
          brokenLinks++;
          const reason = result.error ? result.error : `HTTP ${result.status}`;
          errors.push(`BROKEN EXTERNAL LINK in ${file}: ${href} (${reason})`);
        }
        continue;
      }

      // Handle internal relative links (with optional fragment)
      const { filePath: cleanHref, fragment } = parseInternalLink(href);
      
      // If it's just a fragment, it refers to current page - valid
      if (!cleanHref || cleanHref === file) {
        // Fragment link on current page is valid
        continue;
      }

      // Remove leading slashes
      const normalizedPath = cleanHref.replace(/^\/+/, '');
      const targetPath = path.join(BASE_DIR, normalizedPath);

      if (!fs.existsSync(targetPath)) {
        brokenLinks++;
        errors.push(`BROKEN INTERNAL LINK in ${file}: ${href} -> ${targetPath}`);
      }
      // Note: Fragment validation would require checking if the element exists on target page
      // This is optional - we're just checking file existence here
    }

    // Check form actions
    const forms = document.querySelectorAll('form[action]');
    for (const form of forms) {
      const action = form.getAttribute('action');
      if (!action) continue;

      totalLinks++;

      // Skip external forms, anchor links, etc.
      if (shouldSkipLink(action)) continue;
      if (isExternalLink(action)) continue;

      // Skip fragment-only
      if (action.startsWith('#')) continue;

      const { filePath: cleanAction } = parseInternalLink(action);
      const normalizedPath = cleanAction.replace(/^\/+/, '');
      const targetPath = path.join(BASE_DIR, normalizedPath);

      if (!fs.existsSync(targetPath)) {
        brokenLinks++;
        errors.push(`BROKEN FORM ACTION in ${file}: ${action} -> ${targetPath}`);
      }
    }

    // Check image sources
    const images = document.querySelectorAll('img[src]');
    for (const img of images) {
      const src = img.getAttribute('src');
      if (!src) continue;

      totalLinks++;

      // Skip external images, data URIs
      if (isExternalLink(src)) {
        const result = await checkExternalLink(src);
        if (!result.ok) {
          brokenLinks++;
          const reason = result.error ? result.error : `HTTP ${result.status}`;
          errors.push(`BROKEN IMAGE in ${file}: ${src} (${reason})`);
        }
        continue;
      }

      // Skip data URIs
      if (src.startsWith('data:')) continue;

      // Skip fragment-only
      if (src.startsWith('#')) continue;

      const { filePath: cleanSrc } = parseInternalLink(src);
      const normalizedPath = cleanSrc.replace(/^\/+/, '');
      const targetPath = path.join(BASE_DIR, normalizedPath);

      if (!fs.existsSync(targetPath)) {
        brokenLinks++;
        errors.push(`MISSING IMAGE in ${file}: ${src} -> ${targetPath}`);
      }
    }
  }

  console.log(`\nLink Check Summary:`);
  console.log(`Total links checked: ${totalLinks}`);
  console.log(`Broken links: ${brokenLinks}`);

  if (brokenLinks > 0) {
    console.log('\nBroken links found:');
    errors.forEach(e => console.log(`  - ${e}`));
    process.exit(1);
  } else {
    console.log('\nAll links valid!');
    process.exit(0);
  }
}

checkLinks().catch(err => {
  console.error('Link check failed:', err);
  process.exit(1);
});