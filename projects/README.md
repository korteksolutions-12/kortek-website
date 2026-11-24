# Project Registry

This directory contains the Kortek Project Registry System - a centralized tracking system for all client projects.

## Files

- `registry.json` - JSON Schema for the project registry
- `registry-data.json` - Current project data

## Schema Definition

The registry follows a structured JSON schema that tracks:

### Project Fields
- `id` - Unique project identifier (slug format)
- `name` - Client/project name
- `clientId` - Reference to client ID
- `description` - Brief project description
- `repository` - Git repository details
- `deployment` - Deployment information
- `requirements` - Technical requirements/features
- `qualityTier` - Quality level (basic/standard/premium)
- `status` - Project status
- `createdAt/updatedAt` - Timestamps

### Repository Fields
- `gitUrl` - Git repository URL
- `defaultBranch` - Default branch name
- `framework` - Technology stack
- `buildCommand` - Build command
- `outputDirectory` - Build output directory

### Deployment Fields
- `url` - Live deployment URL
- `platform` - Hosting platform
- `branch` - Deployment branch
- `lastDeployed` - Last deployment timestamp

## Current Projects

| ID | Name | Client | Tier | Status |
|----|------|--------|------|--------|
| kortek-website | Kortek Main Website | Kortek Solutions | premium | active |
| qura-website | Qura Beauty Website | Qura Beauty | standard | active |
| kortek-developer | Kortek Developer Workspace | Kortek Solutions | basic | active |

## Usage

### Add New Project
```bash
# Edit registry-data.json
vim projects/registry-data.json

# Add project entry to projects array
```

### Query Projects
```bash
# List all projects
cat projects/registry-data.json | jq '.projects[].name'

# Find by client
cat projects/registry-data.json | jq '.projects[] | select(.clientId == "kortek") | .name'
```

## Integration

The registry is automatically read by the QA pipeline and documentation generators to:
- Validate repository URLs
- Check deployment status
- Generate project dashboards
- Track requirements against deliverables