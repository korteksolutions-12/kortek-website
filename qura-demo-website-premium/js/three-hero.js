// Three.js 3D Hero Scene - Uses global THREE from CDN
// No module imports - works with CDN-loaded Three.js

(function(){'use strict';
let scene, camera, renderer, controls;
let animationFrameId;
let geometries = [];

function initThreeHero() {
  const container = document.getElementById('threejs-container');
  if (!container) return;

  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.id = 'threejs-hero-canvas';
  canvas.style.width = '100%';
  canvas.style.height = '480px';
  container.appendChild(canvas);

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

  // Controls - check if available
  if (typeof THREE.OrbitControls !== 'undefined') {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 3;
    controls.maxDistance = 10;
  }

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

window.initThreeHero = function() {
  if (typeof THREE === 'undefined') {
    console.warn('Three.js not loaded');
    return;
  }
  initThreeHero();
};

window.destroyThreeHero = function() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  if (renderer) {
    renderer.dispose();
  }
  geometries.forEach(g => scene.remove(g));
  geometries = [];
};

})();