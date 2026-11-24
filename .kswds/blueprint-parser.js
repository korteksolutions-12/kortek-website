#!/usr/bin/env node

/**
 * KSwds Blueprint Parser
 * Converts requirements into structured blueprint JSON
 */

const fs = require('fs');
const path = require('path');

const TIER_CONFIGS = {
  basic: {
    pages: { min: 5, max: 7 },
    features: ['contact-form', 'navigation', 'footer', 'seo-meta'],
    animations: false,
    threeD: false,
    deliveryDays: 2
  },
  standard: {
    pages: { min: 8, max: 12 },
    features: ['contact-form', 'navigation', 'footer', 'seo-meta', 'blog', 'portfolio', 'testimonials', 'services-grid'],
    animations: ['css-transitions', 'fade-in', 'slide-in'],
    threeD: false,
    deliveryDays: 4
  },
  premium: {
    pages: { min: 12, max: 20 },
    features: ['contact-form', 'navigation', 'footer', 'seo-meta', 'blog', 'portfolio', 'testimonials', 'services-grid', '3d-hero', 'parallax', 'animations', 'newsletter', 'search'],
    animations: ['gsap-trigger', 'scroll-reveal', 'smooth-scroll', 'micro-interactions'],
    threeD: true,
    deliveryDays: 7
  }
};

/**
 * Parse requirements file into structured blueprint
 * @param {string} inputPath - Path to requirements markdown file
 * @param {string} outputDir - Directory to write blueprint JSON
 */
function parseBlueprint(inputPath, outputDir) {
  const content = fs.readFileSync(inputPath, 'utf-8');
  
  // Parse frontmatter from markdown
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
  let frontmatter = {};
  
  if (frontmatterMatch) {
    const lines = frontmatterMatch[1].split('\n');
    lines.forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        frontmatter[key.trim()] = valueParts.join(':').trim();
      }
    });
  }
  
  // Parse tier and validate
  const tier = frontmatter.tier?.toLowerCase() || 'standard';
  const tierConfig = TIER_CONFIGS[tier];
  
  if (!tierConfig) {
    throw new Error(`Invalid tier: ${tier}. Valid tiers: basic, standard, premium`);
  }
  
  // Generate sitemap structure
  const pages = parsePageStructure(frontmatter.pages || '');
  
  // Build blueprint object
  const blueprint = {
    projectId: generateProjectId(frontmatter.projectName, Date.now()),
    projectName: frontmatter.projectName || 'Untitled',
    clientName: frontmatter.clientName || 'Client',
    tier: tier,
    tierConfig: tierConfig,
    version: '1.0.0',
    createdAt: new Date().toISOString(),
    businessObjectives: {
      primaryGoal: frontmatter.primaryGoal || '',
      successMetrics: parseList(frontmatter.successMetrics)
    },
    targetAudience: {
      primary: frontmatter.primaryAudience || '',
      secondary: frontmatter.secondaryAudience || ''
    },
    brandIdentity: {
      colors: {
        primary: frontmatter.primaryColor || '#3b82f6',
        secondary: frontmatter.secondaryColor || '#64748b',
        accent: frontmatter.accentColor || '#f59e0b'
      },
      typography: {
        heading: frontmatter.headingFont || 'Inter',
        body: frontmatter.bodyFont || 'Inter'
      }
    },
    sitemap: pages,
    media: {
      images: parseList(frontmatter.images),
      illustrations: parseList(frontmatter.illustrations),
      videos: parseList(frontmatter.videos)
    },
    features: {
      required: tierConfig.features,
      custom: parseList(frontmatter.customFeatures)
    },
    animations: {
      enabled: !!tierConfig.animations,
      types: tierConfig.animations
    },
    threeD: tierConfig.threeD,
    seo: {
      keywords: parseList(frontmatter.seoKeywords),
      titleFormat: frontmatter.metaTitleFormat,
      description: frontmatter.metaDescription
    },
    hosting: {
      domain: frontmatter.domain,
      ssl: true
    },
    estimatedDeliveryDays: tierConfig.deliveryDays
  };
  
  // Write blueprint JSON
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const outputPath = path.join(outputDir, `${blueprint.projectId}-blueprint.json`);
  fs.writeFileSync(outputPath, JSON.stringify(blueprint, null, 2));
  
  console.log(`Blueprint generated: ${outputPath}`);
  return blueprint;
}

function parsePageStructure(pagesStr) {
  if (!pagesStr) return [];
  
  const pages = [];
  const lines = pagesStr.split('\n').filter(l => l.trim());
  
  let currentPage = null;
  
  lines.forEach(line => {
    const indent = (line.match(/^(\s*)/) || [''])[1].length;
    const content = line.trim();
    
    if (indent === 0 && content.startsWith('- ')) {
      if (currentPage) pages.push(currentPage);
      currentPage = {
        name: content.replace(/^- /, ''),
        sections: []
      };
    } else if (currentPage && content.startsWith('- ')) {
      currentPage.sections.push(content.replace(/^- /, ''));
    }
  });
  
  if (currentPage) pages.push(currentPage);
  
  return pages;
}

function parseList(str) {
  if (!str) return [];
  return str.split(',').map(s => s.trim()).filter(s => s);
}

function generateProjectId(projectName, timestamp) {
  const safeName = projectName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  return `${safeName}-${timestamp}`;
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('Usage: blueprint-parser.js <requirements.md> <output-dir>');
    process.exit(1);
  }
  
  try {
    const blueprint = parseBlueprint(args[0], args[1]);
    console.log(JSON.stringify(blueprint, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

module.exports = { parseBlueprint, TIER_CONFIGS };