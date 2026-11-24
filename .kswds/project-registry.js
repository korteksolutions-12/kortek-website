#!/usr/bin/env node

/**
 * KSwds Project Registry CLI
 * Manages client project entries
 */

const fs = require('fs');
const path = require('path');

const REGISTRY_PATH = path.join(__dirname, 'registry.json');

/**
 * Initialize empty registry if not exists
 */
function initRegistry() {
  if (!fs.existsSync(REGISTRY_PATH)) {
    const registry = { projects: {}, lastUpdated: new Date().toISOString() };
    fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2));
    console.log('Registry initialized');
  }
}

/**
 * Create new project entry
 */
function createProject(data) {
  initRegistry();
  
  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'));
  const projectId = data.projectId || generateProjectId(data.projectName);
  
  registry.projects[projectId] = {
    projectId,
    projectName: data.projectName,
    clientName: data.clientName,
    tier: data.tier,
    repoUrl: data.repoUrl,
    deployUrl: data.deployUrl,
    blueprintHash: data.blueprintHash,
    technologyStack: data.technologyStack || ['html', 'css', 'javascript', 'gsap'],
    features: data.features || [],
    pages: data.pages || [],
    requirements: data.requirements,
    status: 'planning',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    revisionHistory: []
  };
  
  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2));
  console.log(`Project created: ${projectId}`);
  console.log(`Tier: ${data.tier}`);
  console.log(`Status: planning`);
  
  return registry.projects[projectId];
}

/**
 * Get project by ID
 */
function getProject(projectId) {
  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'));
  return registry.projects[projectId];
}

/**
 * Update project status
 */
function updateStatus(projectId, status, notes) {
  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'));
  
  if (registry.projects[projectId]) {
    registry.projects[projectId].status = status;
    registry.projects[projectId].updatedAt = new Date().toISOString();
    if (notes) {
      registry.projects[projectId].notes = notes;
    }
    fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2));
    console.log(`Project ${projectId} status updated to: ${status}`);
  } else {
    console.log(`Project not found: ${projectId}`);
  }
}

/**
 * List all projects
 */
function listProjects() {
  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf-8'));
  console.log('\n=== PROJECT REGISTRY ===\n');
  
  Object.values(registry.projects).forEach(project => {
    console.log(`${project.projectId}`);
    console.log(`  Name: ${project.projectName}`);
    console.log(`  Client: ${project.clientName}`);
    console.log(`  Tier: ${project.tier}`);
    console.log(`  Status: ${project.status}`);
    console.log(`  Delivery: ${project.estimatedDeliveryDays || 'TBD'} days`);
    console.log('');
  });
}

/**
 * Generate project ID from name
 */
function generateProjectId(projectName) {
  const timestamp = Date.now();
  const safeName = projectName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  return `${safeName}-${timestamp}`;
}

// CLI interface
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'init':
    initRegistry();
    break;
    
  case 'create':
    // For demo, use hardcoded Qura project
    createProject({
      projectId: 'qura-corporate-website-demo',
      projectName: 'Qura Corporate Website',
      clientName: 'Qura Tech Solutions',
      tier: 'premium',
      repoUrl: 'https://github.com/korteksolutions-12/qura-corporate-website',
      deployUrl: 'https://quratech.co.ke',
      blueprintHash: 'a1b2c3d4e5f6',
      requirements: 'Premium website for tech solutions company',
      estimatedDeliveryDays: 7
    });
    break;
    
  case 'list':
    listProjects();
    break;
    
  case 'status':
    if (args[1] && args[2]) {
      updateStatus(args[1], args[2]);
    } else {
      console.log('Usage: project-registry.js status <projectId> <status>');
    }
    break;
    
  default:
    console.log(`KSwds Project Registry CLI

Usage:
  node project-registry.js init              Initialize empty registry
  node project-registry.js create            Create demo Qura project
  node project-registry.js list              List all projects
  node project-registry.js status <id> <s>   Update project status`);
}

module.exports = { createProject, getProject, updateStatus, listProjects, initRegistry };