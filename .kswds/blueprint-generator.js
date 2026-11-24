#!/usr/bin/env node

/**
 * KSwds Blueprint Generator
 * Generates complete blueprint JSON from requirements
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const crypto = require('crypto');

const TIER_CONFIGS = {
  basic: {
    pages: { min: 5, max: 7 },
    features: ['contact-form', 'navigation', 'footer', 'seo-meta', 'sitemap'],
    animations: false,
    threeD: false,
    deliveryDays: 2
  },
  standard: {
    pages: { min: 8, max: 12 },
    features: ['contact-form', 'navigation', 'footer', 'seo-meta', 'blog', 'portfolio', 'testimonials', 'services-grid', 'faq-accordion'],
    animations: ['css-transitions', 'fade-in', 'slide-in'],
    threeD: false,
    deliveryDays: 4
  },
  premium: {
    pages: { min: 12, max: 20 },
    features: ['contact-form', 'navigation', 'footer', 'seo-meta', 'blog', 'portfolio', 'testimonials', 'services-grid', 'faq-accordion', 'team', 'pricing', '3d-hero', 'newsletter'],
    animations: ['gsap-trigger', 'scroll-reveal', 'smooth-scroll', 'micro-interactions', 'parallax'],
    threeD: true,
    deliveryDays: 7
  }
};

/**
 * Generate blueprint from requirements file
 */
function generateBlueprint(requirementsPath, outputDir) {
  const content = fs.readFileSync(requirementsPath, 'utf-8');
  const req = yaml.load(content);
  
  const tier = req.tier.toLowerCase();
  const tierConfig = TIER_CONFIGS[tier];
  
  // Calculate pages count
  const pageCount = req.pages ? req.pages.length : 0;
  if (pageCount < tierConfig.pages.min || pageCount > tierConfig.pages.max) {
    console.warn(`Warning: Page count ${pageCount} outside tier range ${tierConfig.pages.min}-${tierConfig.pages.max}`);
  }
  
  // Generate projectId
  const timestamp = Date.now();
  const safeName = req.projectName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  const projectId = `${safeName}-${timestamp}`;
  
  // Build sitemap from pages
  const sitemap = (req.pages || []).map(p => ({
    name: p.name,
    path: p.name.toLowerCase().replace(/\s+/g, '-'),
    sections: p.sections || [],
    order: req.pages.indexOf(p) + 1
  }));
  
  // Build features array
  const features = [...tierConfig.features, ...(req.customFeatures || [])];
  
  // Generate blueprint
  const blueprint = {
    projectId,
    projectName: req.projectName,
    clientName: req.clientName,
    tier,
    tierConfig,
    version: req.version || '1.0.0',
    createdAt: new Date().toISOString(),
    businessObjectives: {
      primaryGoal: req.primaryGoal,
      successMetrics: req.successMetrics || [],
      targetAudience: {
        primary: req.primaryAudience,
        secondary: req.secondaryAudience
      }
    },
    brandIdentity: {
      name: req.brandName,
      tagline: req.tagline,
      values: req.values || [],
      colors: {
        primary: req.primaryColor,
        secondary: req.secondaryColor,
        accent: req.accentColor
      },
      typography: {
        heading: req.headingFont,
        body: req.bodyFont
      },
      toneOfVoice: req.toneOfVoice
    },
    design: {
      style: req.visualStyle,
      references: [req.reference1, req.reference2].filter(Boolean)
    },
    sitemap,
    media: {
      images: req.images || [],
      illustrations: req.illustrations || [],
      videos: req.videos || []
    },
    features,
    animations: {
      enabled: !!tierConfig.animations,
      types: tierConfig.animations
    },
    threeD: tierConfig.threeD,
    seo: {
      keywords: req.seoKeywords ? req.seoKeywords.split(',').map(k => k.trim()) : [],
      titleFormat: req.metaTitleFormat,
      description: req.metaDescription
    },
    hosting: {
      domain: req.domain,
      ssl: true
    },
    estimatedDeliveryDays: tierConfig.deliveryDays,
    checksum: crypto.createHash('sha256').update(JSON.stringify(req)).digest('hex')
  };
  
  // Write output
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const outputPath = path.join(outputDir, `${projectId}-blueprint.json`);
  fs.writeFileSync(outputPath, JSON.stringify(blueprint, null, 2));
  
  console.log(`Blueprint generated: ${outputPath}`);
  console.log(`Project ID: ${projectId}`);
  console.log(`Tier: ${tier}`);
  console.log(`Pages: ${sitemap.length}`);
  console.log(`Estimated Delivery: ${tierConfig.deliveryDays} days`);
  
  return blueprint;
}

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.log('Usage: blueprint-generator.js <requirements.yaml> <output-dir>');
    process.exit(1);
  }
  
  try {
    generateBlueprint(args[0], args[1]);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

module.exports = { generateBlueprint, TIER_CONFIGS };