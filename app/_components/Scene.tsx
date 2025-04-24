'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { renderFragmentShader, renderVertexShader, simulationFragmentShader, simulationVertexShader } from './shaders';

// Add font-face declaration
const fontFaceStyle = `
  @font-face {
    font-family: 'Talesha';
    src: url('/talesha-cond-02-slant.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }
`;

declare global {
  interface Window {
    updateMagnificentGradient: (time: number) => void;
  }
}

export function WaterRippleEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // console.log("Effect running");
    let simScene: THREE.Scene;
    let scene: THREE.Scene;
    let camera: THREE.OrthographicCamera;
    let renderer: THREE.WebGLRenderer;
    let backgroundTexture: THREE.Texture;
    let textTexture: THREE.CanvasTexture;
    let rtA: THREE.WebGLRenderTarget;
    let rtB: THREE.WebGLRenderTarget;
    let animationFrameId: number;

    const init = () => {
      // console.log("Init running");
      scene = new THREE.Scene();
      simScene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);

      if (containerRef.current) {
        containerRef.current.innerHTML = ''; // Clear previous content
        containerRef.current.appendChild(renderer.domElement);
        // console.log("Renderer attached to DOM");
      } else {
        // console.error("Container ref is null");
        return;
      }

      const mouse = new THREE.Vector2();
      let frame = 0;

      // Text canvas as texture
      const width = window.innerWidth * window.devicePixelRatio;
      const height = window.innerHeight * window.devicePixelRatio;
      const options = {
          format: THREE.RGBAFormat,
          type: THREE.FloatType,
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          stencilBuffer: false,
          depthBuffer: false,
      }
     
      rtA = new THREE.WebGLRenderTarget(width, height, options);
      rtB = new THREE.WebGLRenderTarget(width, height, options);

      // Load background image
      const textureLoader = new THREE.TextureLoader();
      backgroundTexture = textureLoader.load(
        '/water3.jpg',
        (texture) => {
          // console.log("Background texture loaded");
          // Use linear filtering for smoother rendering
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          // Use repeat wrapping to handle edge cases with distortion
          texture.wrapS = THREE.ClampToEdgeWrapping;
          texture.wrapT = THREE.ClampToEdgeWrapping;
          // Ensure texture is updated
          texture.needsUpdate = true;
        },
        undefined,
        (error) => console.error("Error loading background texture:", error)
      );

      // Create transparent canvas for text
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d', {alpha: true})!;

      // Clear with transparent color
      ctx.clearRect(0, 0, width, height);

      // Determine if we're on mobile for responsive text sizing
      const isMobile = window.innerWidth < 768;
      const responsiveScale = isMobile ? 0.9 : 1.0; // Reduce text size on mobile

      // Draw the tagline with responsive font sizes
      const fontSize = Math.round(80 * window.devicePixelRatio * responsiveScale);
      const titleFontSize = Math.round(20 * window.devicePixelRatio * responsiveScale);
      
      // Draw CORALIS
      ctx.font = `${titleFontSize}px 'Monsterrat', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(93, 93, 93, 1)';  // Changed to a grayer color
      
      // Draw CORALIS with increased letter spacing
      const coralText = 'CORALIS';
      const letterSpacing = titleFontSize * 0.2; // 20% of font size for spacing
      
      // Calculate total width with spacing
      let totalWidth = 0;
      for (let i = 0; i < coralText.length; i++) {
        totalWidth += ctx.measureText(coralText[i]).width;
      }
      totalWidth += letterSpacing * (coralText.length - 1); // Add spacing between letters
      
      // Calculate starting position to center the text
      const startX = width/2 - totalWidth/2;
      
      // Draw each letter with spacing
      let currentX = startX;
      for (let i = 0; i < coralText.length; i++) {
        ctx.fillText(coralText[i], currentX + ctx.measureText(coralText[i]).width/2, height/2 - fontSize);
        currentX += ctx.measureText(coralText[i]).width + letterSpacing;
      }

      // Draw the tagline
      ctx.font = `1000 ${fontSize}px 'Talesha', serif`;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';  // Reset to original color for the tagline
      ctx.fillText('Sea it', width/2, height/2);
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.07)';
      ctx.shadowOffsetX = 20;
      ctx.shadowOffsetY = 20;
      
      // Draw "Magnificent" with animated gradient
      const magnificentFontSize = Math.round(fontSize * 1.1);
      ctx.font = `${magnificentFontSize}px 'Talesha', serif`;
      
      // Create gradient for "Magnificent"
      const createGradient = () => {
        const gradient = ctx.createLinearGradient(
          width/2 - 300, height/2 + fontSize, 
          width/2 + 300, height/2 + fontSize
        );
        
        // Use specific brand colors with animated positions
        // const pos = (Math.sin(time * 0.001) + 1) / 2; // Oscillates between 0 and 1
        gradient.addColorStop(0, '#873A3B');
        gradient.addColorStop(0.5, '#EE4D6B');
        
        return gradient;
      };
      
      // Initial gradient (will be updated in animation loop)
      ctx.fillStyle = createGradient();
      ctx.fillText('Be it', width/2, height/2 + fontSize);
      
      // Store the gradient creation function for animation
      // This will be used in the animation loop elsewhere
      window.updateMagnificentGradient = () => {
        ctx.clearRect(0, 0, width, height);
        
        // Redraw CORALIS
        ctx.font = `${titleFontSize}px 'Montserrat', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#2E3F3C';
        
        let currentX = startX;
        for (let i = 0; i < coralText.length; i++) {
          ctx.fillText(coralText[i], currentX + ctx.measureText(coralText[i]).width/2, height/2 - fontSize);
          currentX += ctx.measureText(coralText[i]).width + letterSpacing;
        }
        
        // Redraw "Explore the"
        ctx.font = `1000 ${fontSize}px 'Talesha', serif`;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.90)';
        ctx.fillText('Sea it', width/2, height/2);
        
        // Update and redraw "Magnificent" with animated gradient
        ctx.font = `italic ${magnificentFontSize}px 'Talesha', serif`;
        ctx.fillStyle = createGradient();
        ctx.fillText('Be it', width/2, height/2 + fontSize);
        
        // Update texture
        textTexture.needsUpdate = true;
      };

      // console.log("Canvas text drawn");

      textTexture = new THREE.CanvasTexture(canvas);
      textTexture.minFilter = THREE.LinearFilter;
      textTexture.magFilter = THREE.LinearFilter;
      textTexture.format = THREE.RGBAFormat;
      textTexture.needsUpdate = true;
      // console.log("Text texture created");

      const material = new THREE.ShaderMaterial({
        uniforms: {
            textureA: { value: null },
            mouse: { value: mouse },
            resolution: { value: new THREE.Vector2(width, height) },
            time: { value: 0.0 },
            frame: { value: 0 },
        },
        vertexShader: simulationVertexShader,
        fragmentShader: simulationFragmentShader,
      });

      const renderMaterial = new THREE.ShaderMaterial({
        uniforms: {
            textureA: { value: null },
            textureB: { value: textTexture },
            backgroundTexture: { value: backgroundTexture },
            time: { value: 0.0 },
            aspectRatio: { value: window.innerWidth / window.innerHeight },
            screenRatio: { value: width / height }
        },
        vertexShader: renderVertexShader,
        fragmentShader: renderFragmentShader,
        transparent: true,
      });

      const plane = new THREE.PlaneGeometry(2, 2);
      const simQuad = new THREE.Mesh(plane, material);
      const renderQuad = new THREE.Mesh(plane, renderMaterial);

      simScene.add(simQuad);
      scene.add(renderQuad);

      // Handle window resize
      const handleResize = () => {
        const newWidth = window.innerWidth * window.devicePixelRatio;
        const newHeight = window.innerHeight * window.devicePixelRatio;

        renderer.setSize(window.innerWidth, window.innerHeight);
        rtA.setSize(newWidth, newHeight);
        rtB.setSize(newWidth, newHeight);
        material.uniforms.resolution.value.set(newWidth, newHeight);
        
        // Update aspect ratio in render material
        renderMaterial.uniforms.aspectRatio.value = window.innerWidth / window.innerHeight;
        renderMaterial.uniforms.screenRatio.value = newWidth / newHeight;

        // Determine if we're on mobile for responsive text sizing
        const isMobile = window.innerWidth < 768;
        
        // Redraw text canvas with responsive font sizes
        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.clearRect(0, 0, newWidth, newHeight);

        // Calculate responsive font sizes based on screen width
        const responsiveScale = isMobile ? 0.9 : 1.0; // Reduce text size on mobile
        const newFontSize = Math.round(80 * window.devicePixelRatio * responsiveScale);
        const newTitleFontSize = Math.round(20 * window.devicePixelRatio * responsiveScale);
        const newMagnificentFontSize = Math.round(newFontSize * 1.1);

        // Redraw CORALIS
        ctx.font = `${newTitleFontSize}px 'Montserrat', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#2E3F3C';
        
        // Calculate letter spacing
        const letterSpacing = newTitleFontSize * 0.2;
        
        // Calculate total width with spacing
        let totalWidth = 0;
        const coralText = 'CORALIS';
        for (let i = 0; i < coralText.length; i++) {
          totalWidth += ctx.measureText(coralText[i]).width;
        }
        totalWidth += letterSpacing * (coralText.length - 1);
        
        // Calculate starting position to center the text
        const startX = newWidth/2 - totalWidth/2;
        
        // Draw each letter with spacing
        let currentX = startX;
        for (let i = 0; i < coralText.length; i++) {
          ctx.fillText(coralText[i], currentX + ctx.measureText(coralText[i]).width/2, newHeight/2 - newFontSize);
          currentX += ctx.measureText(coralText[i]).width + letterSpacing;
        }
        
        // Draw "Explore the"
        ctx.font = `1000 ${newFontSize}px 'Talesha', serif`;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.90)';
        ctx.fillText('Sea it', newWidth/2, newHeight/2);
        
        // Create gradient for "Magnificent"
        const gradient = ctx.createLinearGradient(
          newWidth/2 - 300, newHeight/2 + newFontSize, 
          newWidth/2 + 300, newHeight/2 + newFontSize
        );
        gradient.addColorStop(0, '#873A3B');
        gradient.addColorStop(0.5, '#EE4D6B');
        
        // Draw "Magnificent"
        ctx.font = `italic ${newMagnificentFontSize}px 'Talesha', serif`;
        ctx.fillStyle = gradient;
        ctx.fillText('Be it', newWidth/2, newHeight/2 + newFontSize);
        
        textTexture.needsUpdate = true;
        // console.log("Resized");
      };
      
      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', () => {
        // Small delay to ensure orientation change is complete
        setTimeout(handleResize, 100);
      });

      renderer.domElement.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX * window.devicePixelRatio;
        mouse.y = (window.innerHeight - e.clientY) * window.devicePixelRatio;
      });
      renderer.domElement.addEventListener('touchmove', (e) => {
        mouse.x = e.touches[0].clientX * window.devicePixelRatio;
        mouse.y = (window.innerHeight - e.touches[0].clientY) * window.devicePixelRatio;
      });

      renderer.domElement.addEventListener('mouseleave', () => {
        mouse.set(0,0);
      });

      const animate = () => {
        material.uniforms.frame.value = frame++;
        material.uniforms.time.value = performance.now() / 1000;
        material.uniforms.mouse.value = mouse;

        // Update magnificent gradient
        window.updateMagnificentGradient(performance.now());

        // Update time for wave animation
        renderMaterial.uniforms.time.value = performance.now() / 1000;

        material.uniforms.textureA.value = rtA.texture;
        renderer.setRenderTarget(rtB);
        renderer.render(simScene, camera);

        renderMaterial.uniforms.textureA.value = rtB.texture;
        renderMaterial.uniforms.textureB.value = textTexture;
        renderer.setRenderTarget(null);
        renderer.render(scene, camera)

        const temp = rtA;
        rtA = rtB;
        rtB = temp;

        animationFrameId = requestAnimationFrame(animate);
      };

      // Initial render targets clear
      renderer.setRenderTarget(rtA);
      renderer.clear();
      renderer.setRenderTarget(rtB);
      renderer.clear();
      renderer.setRenderTarget(null);

      // console.log("Starting animation loop");
      animate();
      
      // Store handleResize for cleanup
      const cleanup = () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', () => {});
        if (rtA) rtA.dispose();
        if (rtB) rtB.dispose();
        if (textTexture) textTexture.dispose();
        if (backgroundTexture) backgroundTexture.dispose();
        if (renderer) renderer.dispose();
        if (containerRef.current) containerRef.current.innerHTML = '';
        // console.log("Cleanup complete");
      };
      
      // Return cleanup function
      return cleanup;
    };
    
    const cleanup = init();
    
    // Cleanup
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fontFaceStyle }} />
      <div 
        ref={containerRef} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1
        }}
      />
    </>
  );
}
