'use client';

import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useEffect, useState } from "react";
import * as THREE from 'three';
import { shaderMaterial } from "@react-three/drei";
import { renderFragmentShader, renderVertexShader, simulationFragmentShader, simulationVertexShader } from "./shaders";

// Add font-face declaration for text rendering
const fontFaceStyle = `
  @font-face {
    font-family: 'Talesha';
    src: url('/talesha-cond-02-slant.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }
`;

// Create custom shader materials using drei's shaderMaterial
const SimulationMaterial = shaderMaterial(
  {
    textureA: null,
    mouse: new THREE.Vector2(0, 0),
    resolution: new THREE.Vector2(0, 0),
    time: 0,
    frame: 0
  },
  simulationVertexShader,
  simulationFragmentShader
);

const RenderMaterial = shaderMaterial(
  {
    textureA: null,
    textureB: null,
    backgroundTexture: null,
    time: 0
  },
  renderVertexShader,
  renderFragmentShader
);

// Register our custom materials with Three
extend({ SimulationMaterial, RenderMaterial });

// TypeScript declarations for our custom materials
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'simulationMaterial': any;
      'renderMaterial': any;
    }
  }
}

// Fix TypeScript with proper types for our materials
type SimulationMaterialImpl = {
  new (): THREE.ShaderMaterial & {
    uniforms: {
      textureA: { value: THREE.Texture | null };
      mouse: { value: THREE.Vector2 };
      resolution: { value: THREE.Vector2 };
      time: { value: number };
      frame: { value: number };
    }
  }
}

type RenderMaterialImpl = {
  new (): THREE.ShaderMaterial & {
    uniforms: {
      textureA: { value: THREE.Texture | null };
      textureB: { value: THREE.Texture | null };
      backgroundTexture: { value: THREE.Texture | null };
      time: { value: number };
    }
  }
}

// Add proper types
SimulationMaterial as unknown as SimulationMaterialImpl;
RenderMaterial as unknown as RenderMaterialImpl;

// Swarm component
function Swarm({ count = 150 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const light = useRef<THREE.PointLight>(null);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const mouse = useRef<[number, number]>([0, 0]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = [e.clientX - window.innerWidth / 2, e.clientY - window.innerHeight / 2];
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Generate random particle data
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);
  
  // Animation loop
  useFrame(() => {
    // Update light to follow mouse
    if (light.current) {
      light.current.position.set(mouse.current[0] / aspect, -mouse.current[1] / aspect, 0);
    }
    
    // Update each particle
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      
      particle.mx += (mouse.current[0] - particle.mx) * 0.01;
      particle.my += (mouse.current[1] * -1 - particle.my) * 0.01;
      
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      
      if (mesh.current) {
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
    });
    
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });
  
  return (
    <>
      <pointLight ref={light} distance={40} intensity={8} color="lightblue" />
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <dodecahedronGeometry args={[0.2, 0]} />
        <meshPhongMaterial color="#050505" />
      </instancedMesh>
    </>
  );
}

// Water ripple effect using a simpler approach
function WaterRipple() {
  const { size, gl } = useThree();
  const simMaterialRef = useRef<any>(null);
  const renderMaterialRef = useRef<any>(null);
  const textTexture = useRef<THREE.CanvasTexture | null>(null);
  const backgroundTexture = useRef<THREE.Texture | null>(null);
  const renderTarget1 = useRef<THREE.WebGLRenderTarget | null>(null);
  const renderTarget2 = useRef<THREE.WebGLRenderTarget | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const frameCount = useRef(0);
  const mouse = useRef(new THREE.Vector2(0, 0));
  
  // Setup everything in one effect
  useEffect(() => {
    // Create render targets
    renderTarget1.current = new THREE.WebGLRenderTarget(size.width, size.height, {
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
    });
    
    renderTarget2.current = new THREE.WebGLRenderTarget(size.width, size.height, {
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
    });
    
    // Initialize render targets
    gl.setRenderTarget(renderTarget1.current);
    gl.clear();
    gl.setRenderTarget(renderTarget2.current);
    gl.clear();
    gl.setRenderTarget(null);
    
    // Create text texture
    const canvas = document.createElement('canvas');
    canvas.width = size.width;
    canvas.height = size.height;
    const ctx = canvas.getContext('2d', { alpha: true })!;
    
    // Draw text
    const fontSize = Math.round(80 * window.devicePixelRatio);
    const titleFontSize = Math.round(20 * window.devicePixelRatio);
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw CORALIS
    ctx.font = `${titleFontSize}px 'Montserrat', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#2E3F3C';
    
    const coralText = 'CORALIS';
    const letterSpacing = titleFontSize * 0.2;
    
    // Calculate text width
    let totalWidth = 0;
    for (let i = 0; i < coralText.length; i++) {
      totalWidth += ctx.measureText(coralText[i]).width;
    }
    totalWidth += letterSpacing * (coralText.length - 1);
    
    // Draw text with letter spacing
    const startX = size.width/2 - totalWidth/2;
    let currentX = startX;
    
    for (let i = 0; i < coralText.length; i++) {
      ctx.fillText(
        coralText[i], 
        currentX + ctx.measureText(coralText[i]).width/2, 
        size.height/2 - fontSize
      );
      currentX += ctx.measureText(coralText[i]).width + letterSpacing;
    }
    
    // Draw the tagline
    ctx.font = `400 ${fontSize}px 'Talesha', serif`;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
    ctx.fillText('Explore the', size.width/2, size.height/2);
    
    // Draw "Magnificent" with gradient
    const magnificentFontSize = Math.round(fontSize * 1.1);
    ctx.font = `italic ${magnificentFontSize}px 'Talesha', serif`;
    
    // Create gradient
    const gradient = ctx.createLinearGradient(
      size.width/2 - 300, size.height/2 + fontSize, 
      size.width/2 + 300, size.height/2 + fontSize
    );
    gradient.addColorStop(0, '#873A3B');
    gradient.addColorStop(0.5, '#BF495F');
    
    ctx.fillStyle = gradient;
    ctx.fillText('Magnificent', size.width/2, size.height/2 + fontSize);
    
    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    textTexture.current = texture;
    
    // Load background texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/water3.jpg', (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      backgroundTexture.current = texture;
      setIsInitialized(true);
    });
    
    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = size.height - e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (textTexture.current) textTexture.current.dispose();
      if (backgroundTexture.current) backgroundTexture.current.dispose();
      if (renderTarget1.current) renderTarget1.current.dispose();
      if (renderTarget2.current) renderTarget2.current.dispose();
    };
  }, [size, gl]);
  
  // Animation loop
  useFrame((state) => {
    if (
      !isInitialized || 
      !renderTarget1.current || 
      !renderTarget2.current || 
      !simMaterialRef.current || 
      !renderMaterialRef.current || 
      !textTexture.current ||
      !backgroundTexture.current
    ) return;
    
    const currentTime = state.clock.elapsedTime;
    frameCount.current++;
    
    // Update simulation material uniforms
    simMaterialRef.current.uniforms.frame.value = frameCount.current;
    simMaterialRef.current.uniforms.time.value = currentTime;
    simMaterialRef.current.uniforms.mouse.value = mouse.current;
    simMaterialRef.current.uniforms.resolution.value.set(size.width, size.height);
    simMaterialRef.current.uniforms.textureA.value = renderTarget1.current.texture;
    
    // Render simulation to renderTarget2
    const currentScene = state.scene;
    const currentCamera = state.camera;
    gl.setRenderTarget(renderTarget2.current);
    gl.render(currentScene, currentCamera);
    
    // Update render material uniforms
    renderMaterialRef.current.uniforms.textureA.value = renderTarget2.current.texture;
    renderMaterialRef.current.uniforms.textureB.value = textTexture.current;
    renderMaterialRef.current.uniforms.backgroundTexture.value = backgroundTexture.current;
    renderMaterialRef.current.uniforms.time.value = currentTime;
    
    // Reset render target
    gl.setRenderTarget(null);
    
    // Swap render targets for next frame
    const temp = renderTarget1.current;
    renderTarget1.current = renderTarget2.current;
    renderTarget2.current = temp;
  });
  
  return (
    <group>
      <mesh>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          ref={simMaterialRef}
          vertexShader={simulationVertexShader}
          fragmentShader={simulationFragmentShader}
          uniforms={{
            textureA: { value: null },
            mouse: { value: new THREE.Vector2(0, 0) },
            resolution: { value: new THREE.Vector2(size.width, size.height) },
            time: { value: 0 },
            frame: { value: 0 }
          }}
        />
      </mesh>
      <mesh>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          ref={renderMaterialRef}
          vertexShader={renderVertexShader}
          fragmentShader={renderFragmentShader}
          uniforms={{
            textureA: { value: null },
            textureB: { value: null },
            backgroundTexture: { value: null },
            time: { value: 0 }
          }}
          transparent
        />
      </mesh>
    </group>
  );
}

// Main scene component that combines both effects
export function NewScene() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fontFaceStyle }} />
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 5
      }}>
        <Canvas
          gl={{
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
          }}
          camera={{
            position: [0, 0, 30],
            fov: 75,
            near: 0.1,
            far: 1000
          }}
        >
          <WaterRipple />
          <Swarm count={150} />
        </Canvas>
      </div>
    </>
  );
} 