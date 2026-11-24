#!/usr/bin/env node

/**
 * Generate Qura demo website
 */

const { MrDeveloper } = require('./mr-developer-core.js');

const dev = new MrDeveloper();
dev.generate(
  path.join(__dirname, 'demo-blueprint-generated.json'),
  path.join(__dirname, '../qura-demo-website')
).then(result => {
  console.log('\n=== GENERATION COMPLETE ===');
  console.log('Project:', result.projectId);
  console.log('Pages:', result.pagesGenerated);
  console.log('Tier:', result.tier);
  console.log('Days:', result.estimatedDeliveryDays);
}).catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});