#!/usr/bin/env node

/**
 * QURA Premium Website Generator - Stage 3
 * Full Premium implementation with Three.js 3D hero and GSAP animations
 */

const fs = require('fs');
const path = require('path');
const { MrDeveloper } = require('./mr-developer-core.js');

class QuraPremiumGenerator extends MrDeveloper {
  constructor() {
    super();
    this.stagingUrl = null;
  }

  async generateFullPremium(blueprintPath, outputDir) {
    console.log('\n=== QURA PREMIUM STAGE 3 GENERATION ===\n');

    const result = await this.generate(blueprintPath, outputDir);

    // Enhanced Premium features
    await this._generateThreeJSHero(outputDir);
    await this._generateGSAPAnimations(outputDir);
    await this._generateContactFormBackend(outputDir);
    await this._generateStagingConfig(outputDir);

    console.log('\n=== PREMIUM FEATURES COMPLETE ===');
    console.log(`Three.js 3D Hero: ✅`);
    console.log(`GSAP Animations: ✅`);
    console.log(`Form Backend: ✅`);
    console.log(`Staging Config: Created\n`);

    return {
      ...result,
      premiumFeatures: {
        threeD: true,
        gsap: true,
        formBackend: true,
        stagingReady: true
      }
    };
  }

  async _generateThreeJSHero(outputDir) {
    // 3D Hero scene initialization
    const threeJSCode = `
// Three.js 3D Hero Scene
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls;
let animationFrameId;

export function initThreeHero(canvasId = 'threejs-hero') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  // Scene setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0a0a);

  // Camera
  const fov = 75;
  const aspect = canvas.clientWidth / canvas.clientHeight;
  const near = 0.1;
  const far = 1000;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 2, 5);

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enablePan = false;
  controls.minDistance = 3;
  controls.maxDistance = 10;

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);

  // Create floating geometric shapes
  createFloatingGeometry();

  // Start animation
  animate();

  // Handle resize
  window.addEventListener('resize', () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  return { scene, camera, renderer };
}

let geometries = [];

function createFloatingGeometry() {
  const geometryTypes = [
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.SphereGeometry(0.7, 32, 32),
    new THREE.TorusGeometry(0.7, 0.3, 16, 100),
    new THREE.OctahedronGeometry(0.8)
  ];

  const material = new THREE.MeshStandardMaterial({
    color: 0x0ea5e9,
    emissive: 0x0ea5e9,
    emissiveIntensity: 0.3,
    metalness: 0.3,
    roughness: 0.4
  });

  for (let i = 0; i < 8; i++) {
    const geometry = geometryTypes[i % geometryTypes.length].clone();
    const mesh = new THREE.Mesh(geometry, material);
    
    mesh.position.set(
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 4
    );
    
    mesh.userData = {
      rotationSpeed: { x: (Math.random() - 0.5) * 0.02, y: (Math.random() - 0.5) * 0.02 },
      bobAmplitude: 0.2 + Math.random() * 0.3,
      bobSpeed: 0.5 + Math.random() * 0.5,
      initialTime: Math.random() * Math.PI * 2
    };
    
    scene.add(mesh);
    geometries.push(mesh);
  }
}

function animate() {
  animationFrameId = requestAnimationFrame(animate);
  
  if (controls) controls.update();
  
  const time = Date.now() * 0.001;
  
  geometries.forEach((mesh, i) => {
    // Rotation
    mesh.rotation.x += mesh.userData.rotationSpeed.x;
    mesh.rotation.y += mesh.userData.rotationSpeed.y;
    
    // Floating bob
    mesh.position.y += Math.sin(time + mesh.userData.initialTime) * 
                        mesh.userData.bobAmplitude * 0.01;
    
    // Color pulse
    const pulse = 0.5 + 0.5 * Math.sin(time * 2 + i);
    mesh.material.color.setHSL(0.6, 0.8, 0.5 + pulse * 0.2);
  });
  
  renderer.render(scene, camera);
}

export function destroyThreeHero() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  if (renderer) {
    renderer.dispose();
  }
  geometries.forEach(g => scene.remove(g));
  geometries = [];
}
`;
    fs.writeFileSync(path.join(outputDir, 'js', 'three-hero.js'), threeJSCode);
    console.log('Generated: js/three-hero.js');

    // Package.json update for Premium with Three.js
    const pkgPath = path.join(outputDir, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    pkg.dependencies.three = '^0.157.0';
    pkg.dependencies.gsap = '^3.12.2';
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  }

  async _generateGSAPAnimations(outputDir) {
    // Enhanced GSAP animations
    const gsapCode = `
// GSAP animations for Premium experience
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

export function initGSAP() {
  // Hero section animations
  if (document.querySelector('.hero')) {
    gsap.from('.hero__title', {
      duration: 1.5,
      opacity: 0,
      y: 50,
      ease: 'power3.out'
    });

    gsap.from('.hero__subtitle', {
      duration: 1.5,
      opacity: 0,
      y: 30,
      delay: 0.3,
      ease: 'power3.out'
    });
  }

  // Scroll-triggered fade-ins
  gsap.utils.toArray('.animate-on-scroll').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power2.out'
    });
  });

  // Staggered section reveals
  gsap.utils.toArray('.feature, .service-card, .project-card').forEach((cards, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%'
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      delay: i * 0.1,
      ease: 'power2.out'
    });
  });

  // Parallax background
  ScrollTrigger.create({
    start: 'top bottom',
    end: 'bottom bottom',
    onUpdate: self => {
      const progress = self.progress;
      document.querySelectorAll('.parallax-layer').forEach(layer => {
        const speed = layer.dataset.speed || 0.5;
        gsap.set(layer, { y: -progress * 100 * speed });
      });
    }
  });

  // Smooth scroll for anchored links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        gsap.to(window, {
          duration: 0.8,
          scrollTo: { y: target, autoKill: false },
          ease: 'power2.inOut'
        });
      }
    });
  });

  console.log('GSAP animations initialized');
}
`;
    fs.writeFileSync(path.join(outputDir, 'js', 'gsap-animations.js'), gsapCode);
    console.log('Generated: js/gsap-animations.js');
  }

  async _generateContactFormBackend(outputDir) {
    // Form backend configuration
    const formHandler = `
// Contact form submission handler
export async function submitContactForm(formData) {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date().toISOString(),
        // Honeypot field (bot trap)
        website: formData.website || ''
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Form submission error:', error);
    throw error;
  }
}

// Form validation and submission
export function setupContactForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      await submitContactForm(data);
      
      // Success feedback
      form.innerHTML = \`
        <div class="form-success">
          <h3>Thank you!</h3>
          <p>Your message has been sent. We'll get back to you shortly.</p>
        </div>
      \`;
    } catch (error) {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      alert('Sorry, there was an error sending your message. Please try again.');
    }
  });
}
`;
    fs.writeFileSync(path.join(outputDir, 'js', 'form-handler.js'), formHandler);
    console.log('Generated: js/form-handler.js');
  }

  async _generateStagingConfig(outputDir) {
    // Staging configuration
    const stagingConfig = {
      staging: {
        url: 'https://staging.kortek.co.ke/qura-premium',
        branch: 'staging-qura-premium',
        deployHook: 'GitHub Actions workflow: deploy-staging.yml',
        previewPeriod: '7 days before production',
        access: 'Founder + approved stakeholders only'
      }
    };
    this.stagingUrl = stagingConfig.staging.url;

    // Create deployment instructions
    const deployInstructions = `# QURA Premium - Staging Deployment

## Staging URL
${this.stagingUrl}

## Deployment Process
1. Push to \`staging-qura-premium\` branch
2. GitHub Actions workflow triggers
3. Verify deployment at staging URL
4. QA verification with stakeholder
5. Proceed to production (requires approval)

## Features Live in Staging
- 13-page Premium website
- Three.js 3D hero with interactive geometry
- GSAP scroll-triggered animations
- Contact form with backend API
- Fully responsive design

## QA Checklist (Staging)
- [ ] 3D hero performs smoothly on desktop
- [ ] 3D hero responsive on mobile
- [ ] All GSAP animations trigger correctly
- [ ] Contact form submits successfully
- [ ] All internal links work
- [ ] Images load correctly
- [ ] SEO meta tags present

## Production Migration
After approval:
1. Merge staging-qura-premium to main
2. Deploy to quratech.co.ke
3. Update DNS if needed
4. Verify production deployment

---
*Generated by MR DEVELOPER Agent - Stage 3*
`;
    fs.writeFileSync(path.join(outputDir, 'STAGING-DEPLOYMENT.md'), deployInstructions);
    console.log('Generated: STAGING-DEPLOYMENT.md');
  }
}

module.exports = { QuraPremiumGenerator };

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.log('Usage: generate-qura-premium.js <blueprint.json> <output-dir>');
    process.exit(1);
  }

  const { QuraPremiumGenerator } = require('./generate-qura-premium.js');
  (async () => {
    const gen = new QuraPremiumGenerator();
    const result = await gen.generateFullPremium(args[0], args[1]);
    console.log(JSON.stringify(result, null, 2));
  })().catch(e => {
    console.error(e);
    process.exit(1);
  });
}