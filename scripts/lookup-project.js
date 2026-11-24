#!/usr/bin/env node

/**
 * Project Registry Lookup Tool
 * Usage: node scripts/lookup-project.js <project-name>
 * Returns: JSON with repository URL, client requirements, and validation status
 */

const fs = require('fs');
const path = require('path');

const registryPath = path.join(__dirname, '..', 'projects', 'registry-data.json');

function lookupProject(name) {
  const data = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const project = data.projects.find(p => 
    p.name.toLowerCase() === name.toLowerCase() || 
    p.id.toLowerCase() === name.toLowerCase()
  );

  if (!project) {
    console.log(JSON.stringify({ error: `Project '${name}' not found` }, null, 2));
    process.exit(1);
  }

  const client = data.clients[project.clientId];

  // Validate domain in deployment URL
  const validations = [];
  if (project.deployment?.url) {
    try {
      const url = new URL(project.deployment.url);
      const domain = url.hostname;
      
      // Check for broken domain references
      if (domain.includes('qura.com') && project.deployment.url.includes('kortek')) {
        validations.push({
          field: 'deployment.url',
          status: 'FAIL',
          message: 'Domain mismatch: qura.com in URL for Kortek project'
        });
      } else {
        validations.push({
          field: 'deployment.url',
          status: 'PASS',
          message: `Domain '${domain}' correctly configured`
        });
      }
    } catch (e) {
      validations.push({
        field: 'deployment.url',
        status: 'ERROR',
        message: `Invalid URL: ${e.message}`
      });
    }
  }

  // Check repository matches client
  if (client?.githubRepo && project.repository?.gitUrl) {
    if (!project.repository.gitUrl.includes(client.githubRepo)) {
      validations.push({
        field: 'repository.gitUrl',
        status: 'FAIL',
        message: `Repository URL does not match client: ${client.githubRepo}`
      });
    } else {
      validations.push({
        field: 'repository.gitUrl',
        status: 'PASS',
        message: `Repository correctly belongs to ${client.name}`
      });
    }
  }

  const result = {
    project: {
      id: project.id,
      name: project.name,
      status: project.status,
      qualityTier: project.qualityTier
    },
    client: {
      id: project.clientId,
      name: client?.name || 'Unknown',
      contact: client?.contact || {}
    },
    repository: {
      gitUrl: project.repository.gitUrl,
      defaultBranch: project.repository.defaultBranch,
      framework: project.repository.framework,
      validation: validations.find(v => v.field === 'repository.gitUrl')
    },
    deployment: {
      url: project.deployment.url,
      platform: project.deployment.platform,
      validation: validations.find(v => v.field === 'deployment.url')
    },
    requirements: project.requirements || [],
    validations: validations
  };

  // Check all validations
  const hasFailures = validations.some(v => v.status === 'FAIL' || v.status === 'ERROR');
  result.summary = hasFailures ? 'ISSUES FOUND' : 'ALL VALIDATIONS PASS';

  console.log(JSON.stringify(result, null, 2));
}

if (process.argv.length < 3) {
  console.log(JSON.stringify({
    error: 'Usage: node scripts/lookup-project.js <project-name>',
    examples: [
      'node scripts/lookup-project.js kortek-website',
      'node scripts/lookup-project.js "Kortek Main Website"',
      'node scripts/lookup-project.js qura-website'
    ]
  }, null, 2));
  process.exit(1);
}

lookupProject(process.argv[2]);