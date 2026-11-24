const { test, expect } = require('@playwright/test');

const viewports = [
  { name: 'Desktop', width: 1920, height: 1080 },
  { name: 'Tablet Landscape', width: 1024, height: 768 },
  { name: 'Tablet Portrait', width: 768, height: 1024 },
  { name: 'Mobile Large', width: 414, height: 896 },
  { name: 'Mobile Small', width: 375, height: 667 }
];

const pages = [
  { path: '/index.html', name: 'Homepage' },
  { path: '/about.html', name: 'About' },
  { path: '/services.html', name: 'Services' },
  { path: '/projects.html', name: 'Projects' },
  { path: '/contact.html', name: 'Contact' }
];

for (const viewport of viewports) {
  for (const page of pages) {
    test(`Responsive: ${page.name} @ ${viewport.name}`, async ({ page: browserPage }) => {
      await browserPage.setViewportSize({ width: viewport.width, height: viewport.height });
      await browserPage.goto(`http://localhost:8080${page.path}`);
      await browserPage.waitForLoadState('networkidle');

      // Check for horizontal overflow
      const bodyWidth = await browserPage.evaluate(() => document.body.scrollWidth);
      const viewportWidth = viewport.width;
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20); // Allow small tolerance

      // Check that all interactive elements are at least 44px on mobile
      if (viewport.width <= 768) {
        const smallTargets = await browserPage.evaluate(() => {
          const elements = document.querySelectorAll('a, button, input, select, textarea, [role="button"]');
          const small = [];
          elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
              small.push({ tag: el.tagName, width: rect.width, height: rect.height });
            }
          });
          return small;
        });

        if (smallTargets.length > 0) {
          console.warn(`Small touch targets on ${page.name} @ ${viewport.name}:`, smallTargets);
        }
      }

      // Verify no content is cut off
      const overflow = await browserPage.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth ||
               document.body.scrollWidth > document.body.clientWidth;
      });
      expect(overflow).toBeFalsy();
    });
  }
}