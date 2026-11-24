const { test, expect } = require('@playwright/test');
const path = require('path');

test('Visual regression: Homepage', async ({ page }) => {
  await page.goto('http://localhost:8080/index.html');
  await page.waitForLoadState('networkidle');
  await page.addStyleTag({
    content: `
      .loader, .hero__accents, .k-emblem, .emblem__orbit,
      .dot1, .dot2, .line1, .line2 { visibility: hidden !important; }
    `
  });
  const screenshot = await page.screenshot({ fullPage: true, animations: 'disabled' });
  expect(screenshot).toMatchSnapshot('Homepage', { maxDiffPixels: 1000, threshold: 0.2 });
});

test('Visual regression: About', async ({ page }) => {
  await page.goto('http://localhost:8080/about.html');
  await page.waitForLoadState('networkidle');
  await page.addStyleTag({
    content: `
      .loader, .hero__accents, .k-emblem, .emblem__orbit,
      .dot1, .dot2, .line1, .line2 { visibility: hidden !important; }
    `
  });
  const screenshot = await page.screenshot({ fullPage: true, animations: 'disabled' });
  expect(screenshot).toMatchSnapshot('About', { maxDiffPixels: 1000, threshold: 0.2 });
});

test('Visual regression: Services', async ({ page }) => {
  await page.goto('http://localhost:8080/services.html');
  await page.waitForLoadState('networkidle');
  await page.addStyleTag({
    content: `
      .loader, .hero__accents, .k-emblem, .emblem__orbit,
      .dot1, .dot2, .line1, .line2 { visibility: hidden !important; }
    `
  });
  const screenshot = await page.screenshot({ fullPage: true, animations: 'disabled' });
  expect(screenshot).toMatchSnapshot('Services', { maxDiffPixels: 1000, threshold: 0.2 });
});

test('Visual regression: Projects', async ({ page }) => {
  await page.goto('http://localhost:8080/projects.html');
  await page.waitForLoadState('networkidle');
  await page.addStyleTag({
    content: `
      .loader, .hero__accents, .k-emblem, .emblem__orbit,
      .dot1, .dot2, .line1, .line2 { visibility: hidden !important; }
    `
  });
  const screenshot = await page.screenshot({ fullPage: true, animations: 'disabled' });
  expect(screenshot).toMatchSnapshot('Projects', { maxDiffPixels: 1000, threshold: 0.2 });
});

test('Visual regression: Contact', async ({ page }) => {
  await page.goto('http://localhost:8080/contact.html');
  await page.waitForLoadState('networkidle');
  await page.addStyleTag({
    content: `
      .loader, .hero__accents, .k-emblem, .emblem__orbit,
      .dot1, .dot2, .line1, .line2 { visibility: hidden !important; }
    `
  });
  const screenshot = await page.screenshot({ fullPage: true, animations: 'disabled' });
  expect(screenshot).toMatchSnapshot('Contact', { maxDiffPixels: 1000, threshold: 0.2 });
});