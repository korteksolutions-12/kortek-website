const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

const pages = [
  { path: '/index.html', name: 'Homepage' },
  { path: '/about.html', name: 'About' },
  { path: '/services.html', name: 'Services' },
  { path: '/projects.html', name: 'Projects' },
  { path: '/contact.html', name: 'Contact' }
];

for (const page of pages) {
  test(`Accessibility check: ${page.name}`, async ({ page: browserPage }) => {
    await browserPage.goto(`http://localhost:3000${page.path}`);
    await browserPage.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page: browserPage })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
}