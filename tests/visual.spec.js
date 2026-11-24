const { test, expect } = require('@playwright/test');

const pages = [
  { path: '/index.html', name: 'Homepage' },
  { path: '/about.html', name: 'About' },
  { path: '/services.html', name: 'Services' },
  { path: '/projects.html', name: 'Projects' },
  { path: '/contact.html', name: 'Contact' }
];

for (const page of pages) {
  test(`Visual regression: ${page.name}`, async ({ page: browserPage }) => {
    await browserPage.goto(`http://localhost:3000${page.path}`);
    await browserPage.waitForLoadState('networkidle');

    // Hide dynamic elements that might cause flaky screenshots
    await browserPage.addStyleTag({
      content: `
        .loader, .hero__accents, .k-emblem, .emblem__orbit,
        .dot1, .dot2, .line1, .line2 { visibility: hidden !important; }
      `
    });

    // Take screenshot
    const screenshot = await browserPage.screenshot({
      fullPage: true,
      animations: 'disabled'
    });

    // Compare with baseline (stored in tests/screenshots/)
    expect(screenshot).toMatchSnapshot(`${page.name}.png`, {
      maxDiffPixels: 1000,
      threshold: 0.2
    });
  });
}