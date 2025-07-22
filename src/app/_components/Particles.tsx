'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function Particles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // transparent background
    containerRef.current.appendChild(renderer.domElement);

    // Create particles
    const particlesCount = 120; // Small number for subtlety
    const positions = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    const alphas = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      // Random positions covering the entire screen
      positions[i * 3] = (Math.random() - 0.5) * 50; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
      
      // Varying particle sizes - increased range
      sizes[i] = Math.random() * 0.8 + 0.3; // Increased from 0.15 + 0.05
      // Smaller alpha for bigger particles to create blur effect
      alphas[i] = 1.0 - (sizes[i] - 0.15) / 0.3 * 0.7; // Adjusted range mapping
    }

    // Create a circular texture for particles
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    
    // Create radial gradient
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(245, 190, 173, 0.8)');
    gradient.addColorStop(1, 'rgba(245, 190, 173, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(64, 64, 64, 0, Math.PI * 2);
    ctx.fill();

    const particleTexture = new THREE.CanvasTexture(canvas);

    // Particle material
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      map: particleTexture,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      depthWrite: false,
    });

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    particleGeometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

    // Custom shader material for size-dependent blur
    const customMaterial = new THREE.ShaderMaterial({
      uniforms: {
        particleTexture: { value: particleTexture },
      },
      vertexShader: `
        attribute float size;
        attribute float alpha;
        varying float vAlpha;
        
        void main() {
          vAlpha = alpha;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (500.0 / -mvPosition.z); // Increased from 300.0
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D particleTexture;
        varying float vAlpha;
        
        void main() {
          vec4 texColor = texture2D(particleTexture, gl_PointCoord);
          gl_FragColor = vec4(texColor.rgb, texColor.a * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, customMaterial);
    scene.add(particles);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Subtle particle movement
      particles.rotation.y += 0.0005;
      particles.rotation.x += 0.0002;
      
      // Gentle "breathing" effect
      const time = Date.now() * 0.0005;
      particles.scale.set(
        1 + Math.sin(time) * 0.02,
        1 + Math.sin(time) * 0.02,
        1
      );

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      particleGeometry.dispose();
      particleMaterial.dispose();
      customMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 5,
        pointerEvents: 'none'
      }}
    />
  );
} 