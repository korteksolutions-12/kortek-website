#!/usr/bin/env node

/**
 * Generate enhanced Qura demo website with all Stage 2 features
 */

const { MrDeveloper } = require('./mr-developer-core.js');
const path = require('path');

const dev = new MrDeveloper();
dev.generate(
  path.join(__dirname, 'demo-blueprint-generated.json'),
  path.join(__dirname, '../qura-demo-website')
).then(result => {
  console.log('\n=== STAGE 2 GENERATION COMPLETE ===');
  console.log('Project:', result.projectId);
  console.log('Tier:', result.tier);
  console.log('Pages:', result.pagesGenerated);
  console.log('QA Passed:', result.qaResults.passed + '/' + result.qaResults.total);
  console.log('Duration:', result.estimatedDeliveryDays + ' days');
  console.log('\nFiles generated:');
  console.log('  - 6 HTML pages');
  console.log('  - CSS (style.css, animations.css for premium)');
  console.log('  - JavaScript (main.js)');
  console.log('  - Assets (placeholders)');
  console.log('  - Package.json with dependencies');
}).catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});