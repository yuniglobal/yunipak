// src/components/Aboutus/aboutus-sec.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Mathutils = {
  normalize: (value: number, min: number, max: number) => (value - min) / (max - min),
  interpolate: (normValue: number, min: number, max: number) => min + (max - min) * normValue,
  map: (value: number, min1: number, max1: number, min2: number, max2: number) => {
    let v = value;
    if (v < min1) v = min1;
    if (v > max1) v = max1;
    return Mathutils.interpolate(Mathutils.normalize(v, min1, max1), min2, max2);
  },
};

const TUBE_END_PROGRESS = 0.96;

// Helper for mobile rainbow background (same as Events/Courses)
const generateRainbowCSS = (): string => {
  const black = "var(--bg-primary)";
  const darkGreen = "var(--bg-secondary)";
  const tealGreen = "var(--pk-green-dark)";

  const permutations = [
    [black, darkGreen, tealGreen],
    [black, tealGreen, darkGreen],
    [darkGreen, black, tealGreen],
    [darkGreen, tealGreen, black],
    [tealGreen, black, darkGreen],
    [tealGreen, darkGreen, black],
  ];

  let css = "";
  const length = 25;
  const animationTime = 45;

  for (let i = 1; i <= length; i++) {
    const colors = permutations[(i - 1) % permutations.length];
    const delay = -(i / length) * animationTime;
    const duration = animationTime - (animationTime / length / 2) * i;

    css += `
      .rainbow-mobile:nth-child(${i}) {
        box-shadow: -130px 0 80px 40px var(--bg-primary),
                    -50px 0 50px 25px ${colors[0]},
                    0 0 50px 25px ${colors[1]},
                    50px 0 50px 25px ${colors[2]},
                    130px 0 80px 40px var(--bg-primary);
        animation: slide-mobile ${duration}s linear infinite;
        animation-delay: ${delay}s;
      }
    `;
  }
  return css;
};


// ==================== DESKTOP 3D EXPERIENCE ====================
const DesktopExperience: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);
  const blurOverlayRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const cameraGroupRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const tubeRef = useRef<THREE.Mesh | null>(null);
  const wireframeRef = useRef<THREE.LineSegments | null>(null);
  const lightRef = useRef<THREE.PointLight | null>(null);
  const particleSystemsRef = useRef<THREE.Points[]>([]);
  const pathRef = useRef<THREE.CatmullRomCurve3 | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const cameraTargetPercent = useRef(0);
  const cameraCurrentPercent = useRef(0);
  const cameraRotationProxy = useRef({ x: 3.14159, y: 0 });

  useEffect(() => {
    if (!canvasRef.current || !scrollTargetRef.current || !containerRef.current) return;

    const ww = window.innerWidth;
    const wh = window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x118c4f, 0, 100); // Pakistan Green
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, ww / wh, 0.001, 200);
    camera.rotation.y = cameraRotationProxy.current.x;
    camera.rotation.z = cameraRotationProxy.current.y;
    cameraRef.current = camera;

    const cameraGroup = new THREE.Group();
    cameraGroup.position.z = 400;
    cameraGroup.add(camera);
    cameraGroupRef.current = cameraGroup;
    scene.add(cameraGroup);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(ww, wh);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(ww, wh), 1.5, 0.4, 0.85);
    bloomPass.renderToScreen = true;
    bloomPass.threshold = 0;
    bloomPass.strength = 0.9;
    bloomPass.radius = 0;
    const composer = new EffectComposer(renderer);
    composer.setSize(ww, wh);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);
    composerRef.current = composer;

    const pointsData = [
      [10, 89, 0], [50, 88, 10], [76, 139, 20], [126, 141, 12],
      [150, 112, 8], [157, 73, 0], [180, 44, 5], [207, 35, 10], [232, 36, 0]
    ];
    const points = pointsData.map(p => new THREE.Vector3(p[0], p[2], p[1]));
    const path = new THREE.CatmullRomCurve3(points);
    path.tension = 0.5;
    pathRef.current = path;

    const tubeGeometry = new THREE.TubeGeometry(path, 300, 4, 32, false);
    // Use a darker green texture or a techy one
    const texture = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/68819/3d_space_5.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(15, 2);

    const bumpMap = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/68819/waveform-bump3.jpg');
    bumpMap.wrapS = bumpMap.wrapT = THREE.RepeatWrapping;
    bumpMap.repeat.set(15, 2);

    const tubeMaterial = new THREE.MeshPhongMaterial({
      side: THREE.BackSide,
      map: texture,
      shininess: 20,
      bumpMap: bumpMap,
      bumpScale: -0.03,
      specular: 0x0b2349,
      transparent: true,
      opacity: 1,
    });
    const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(tube);
    tubeRef.current = tube;

    const innerGeo = new THREE.TubeGeometry(path, 150, 3.4, 32, false);
    const edgesGeo = new THREE.EdgesGeometry(innerGeo);
    const wireMat = new THREE.LineBasicMaterial({ linewidth: 2, opacity: 0.2, transparent: true });
    const wireframe = new THREE.LineSegments(edgesGeo, wireMat);
    scene.add(wireframe);
    wireframeRef.current = wireframe;

    const light = new THREE.PointLight(0xffffff, 0.35, 4, 0);
    light.castShadow = true;
    scene.add(light);
    lightRef.current = light;

    const spikeyTexture = new THREE.TextureLoader().load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/68819/spikey.png');
    const particleCount = 6800;
    const pMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      map: spikeyTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 1,
    });

    const createParticleSystem = (range: { x: number; y: number; z: number }) => {
      const geom = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * range.x;
        positions[i * 3 + 1] = (Math.random() - 0.5) * range.y;
        positions[i * 3 + 2] = (Math.random() - 0.5) * range.z;
      }
      geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      return new THREE.Points(geom, pMaterial);
    };

    const sys1 = createParticleSystem({ x: 500, y: 50, z: 500 });
    const sys2 = createParticleSystem({ x: 500, y: 20, z: 500 });
    const sys3 = createParticleSystem({ x: 500, y: 20, z: 500 });
    scene.add(sys1, sys2, sys3);
    particleSystemsRef.current = [sys1, sys2, sys3];

    const updateCameraAndScene = (rawProgress: number) => {
      if (!pathRef.current || !cameraGroupRef.current || !lightRef.current) return;

      const tubeEnd = TUBE_END_PROGRESS;

      if (rawProgress <= tubeEnd) {
        const p = rawProgress;
        const p1 = pathRef.current.getPointAt(p);
        const p2 = pathRef.current.getPointAt(Math.min(p + 0.03, 1));
        cameraGroupRef.current.position.set(p1.x, p1.y, p1.z);
        cameraGroupRef.current.lookAt(p2);
        lightRef.current.position.set(p2.x, p2.y, p2.z);

        const fade = 1;
        if (tubeRef.current) (tubeRef.current.material as THREE.MeshPhongMaterial).opacity = fade;
        if (wireframeRef.current) (wireframeRef.current.material as THREE.LineBasicMaterial).opacity = 0.2 * fade;
        particleSystemsRef.current.forEach(sys => {
          (sys.material as THREE.PointsMaterial).opacity = fade;
        });
        lightRef.current.intensity = 0.35 * fade;
      } else {
        const extra = (rawProgress - tubeEnd) / (1 - tubeEnd);
        const endPos = pathRef.current.getPointAt(1);
        const tangent = pathRef.current.getTangent(1).normalize();
        const zoomDistance = 30 * extra;
        const newPos = endPos.clone().add(tangent.multiplyScalar(zoomDistance));
        cameraGroupRef.current.position.copy(newPos);
        const lookAhead = newPos.clone().add(tangent.clone().multiplyScalar(10));
        cameraGroupRef.current.lookAt(lookAhead);
        lightRef.current.position.copy(lookAhead);

        const fade = Math.max(0, 1 - extra * 1.5);
        if (tubeRef.current) (tubeRef.current.material as THREE.MeshPhongMaterial).opacity = fade;
        if (wireframeRef.current) (wireframeRef.current.material as THREE.LineBasicMaterial).opacity = 0.2 * fade;
        particleSystemsRef.current.forEach(sys => {
          (sys.material as THREE.PointsMaterial).opacity = fade;
        });
        lightRef.current.intensity = 0.35 * fade;

        if (scene.fog && scene.fog instanceof THREE.Fog) {
          scene.fog.far = 100 - extra * 80;
        }
      }
    };

    const updateUI = (rawProgress: number) => {
      const normalized = rawProgress / TUBE_END_PROGRESS;

      if (scrollPromptRef.current) {
        const opacityValue = rawProgress < 0.05 ? 1 - rawProgress / 0.05 : 0;
        scrollPromptRef.current.style.opacity = String(opacityValue);
        scrollPromptRef.current.style.pointerEvents = rawProgress < 0.05 ? 'auto' : 'none';
      }

      const sections = [
        { el: sectionRefs.current[0], in: [0.00, 0.05], out: [0.12, 0.18] },
        { el: sectionRefs.current[1], in: [0.18, 0.24], out: [0.32, 0.38] },
        { el: sectionRefs.current[2], in: [0.38, 0.44], out: [0.52, 0.58] },
        { el: sectionRefs.current[3], in: [0.58, 0.64], out: [0.72, 0.78] },
        { el: sectionRefs.current[4], in: [0.78, 0.84], out: [0.94, 1.00] },
      ];

      let maxTextOpacity = 0;
      sections.forEach(({ el, in: [in0, in1], out: [out0, out1] }) => {
        if (!el) return;
        let opacity = 0;
        const p = normalized;
        if (p >= in0 && p < in1) opacity = (p - in0) / (in1 - in0);
        else if (p >= in1 && p < out0) opacity = 1;
        else if (p >= out0 && p < out1) opacity = 1 - (p - out0) / (out1 - out0);
        el.style.opacity = String(opacity);
        el.style.pointerEvents = 'none';
        if (opacity > maxTextOpacity) maxTextOpacity = opacity;
      });

      const finalSection = sectionRefs.current[5];
      if (finalSection) {
        const extra = (rawProgress - TUBE_END_PROGRESS) / (1 - TUBE_END_PROGRESS);
        let opacity = 0;
        if (rawProgress >= TUBE_END_PROGRESS) {
          opacity = Math.min(1, extra * 2);
        }
        finalSection.style.opacity = String(opacity);
        finalSection.style.pointerEvents = 'none';
        if (opacity > maxTextOpacity) maxTextOpacity = opacity;
      }

      if (blurOverlayRef.current) {
        blurOverlayRef.current.style.opacity = String(maxTextOpacity);
        blurOverlayRef.current.style.pointerEvents = 'none';
      }
    };

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: scrollTargetRef.current,
      start: 'top top',
      end: 'bottom 100%',
      scrub: false,
      onUpdate: (self) => {
        const rawProgress = self.progress;
        cameraTargetPercent.current = rawProgress;
        updateUI(rawProgress);
      },
    });

    const handleScroll = () => {
      if (scrollTriggerRef.current) {
        const progress = scrollTriggerRef.current.progress;
        cameraTargetPercent.current = progress;
        updateUI(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);

    const handleMouseMove = (evt: MouseEvent) => {
      cameraRotationProxy.current.x = Mathutils.map(evt.clientX, 0, window.innerWidth, 3.24, 3.04);
      cameraRotationProxy.current.y = Mathutils.map(evt.clientY, 0, window.innerHeight, -0.1, 0.1);
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (cameraRef.current) {
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
      }
      if (rendererRef.current) rendererRef.current.setSize(width, height);
      if (composerRef.current) composerRef.current.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      cameraCurrentPercent.current += (cameraTargetPercent.current - cameraCurrentPercent.current) * 0.08;
      updateCameraAndScene(cameraCurrentPercent.current);

      if (cameraRef.current) {
        cameraRef.current.rotation.y += (cameraRotationProxy.current.x - cameraRef.current.rotation.y) / 15;
        cameraRef.current.rotation.x += (cameraRotationProxy.current.y - cameraRef.current.rotation.x) / 15;
      }

      particleSystemsRef.current.forEach((sys, idx) => {
        if (idx === 0) sys.rotation.y += 0.00002;
        if (idx === 1) sys.rotation.x += 0.00005;
        if (idx === 2) sys.rotation.z += 0.00001;
      });

      if (composerRef.current) composerRef.current.render();
      animationIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      if (scrollTriggerRef.current) scrollTriggerRef.current.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (tubeRef.current) {
        tubeRef.current.geometry.dispose();
        (tubeRef.current.material as THREE.Material).dispose();
      }
      if (wireframeRef.current) {
        wireframeRef.current.geometry.dispose();
        (wireframeRef.current.material as THREE.Material).dispose();
      }
      particleSystemsRef.current.forEach(sys => {
        sys.geometry.dispose();
        (sys.material as THREE.Material).dispose();
      });
      if (rendererRef.current) rendererRef.current.dispose();
      if (composerRef.current) composerRef.current = null;
      if (sceneRef.current) sceneRef.current.clear();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
    const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  };

  const textContainerStyle: React.CSSProperties = {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'min(92vw, 860px)',
    maxHeight: '85vh',
    overflowY: 'auto',
    color: 'var(--text-primary)',
    fontFamily: "'Montserrat', 'Segoe UI', sans-serif",
    textAlign: 'left',
    zIndex: 20,
    opacity: 0,
    transition: 'opacity 0.3s cubic-bezier(0.2, 0.9, 0.4, 1)',
    pointerEvents: 'none',
    padding: '2.8rem 3rem',
    borderRadius: '32px',
    background: 'var(--glass-bg)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid var(--glass-border)',
    boxShadow: `
      0 25px 50px -12px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(17, 140, 79, 0.1) inset,
      0 8px 20px rgba(0, 0, 0, 0.2) inset
    `,
    scrollbarWidth: 'thin',
    scrollbarColor: 'var(--pk-green) var(--bg-primary)',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
    fontWeight: 800,
    marginBottom: '0.8rem',
    letterSpacing: '-0.02em',
    lineHeight: 1.1,
    textTransform: 'uppercase',
    background: 'linear-gradient(135deg, var(--text-primary) 0%, #d4f0d4 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    borderBottom: '2px solid rgba(180, 240, 180, 0.25)',
    paddingBottom: '0.6rem',
  };

  const subheadingStyle: React.CSSProperties = {
    fontSize: 'clamp(1.2rem, 3.5vw, 1.8rem)',
    fontWeight: 500,
    marginBottom: '2rem',
    letterSpacing: '0.12em',
    opacity: 0.9,
    color: 'var(--pk-green-light)',
    textTransform: 'uppercase',
    textShadow: '0 2px 8px rgba(0,0,0,0.2)',
  };
  void subheadingStyle; // ✅ Fixes TS6133: declared but never read

  const paragraphStyle: React.CSSProperties = {
    fontSize: 'clamp(1rem, 3vw, 1.25rem)',
    lineHeight: 1.7,
    fontWeight: 400,
    marginBottom: '1.2rem',
    textShadow: '0 2px 6px rgba(0,0,0,0.25)',
    color: 'var(--text-secondary)',
  };

  const strongStyle: React.CSSProperties = {
    fontWeight: 700,
    color: 'var(--pk-green)',
    textShadow: '0 0 10px var(--pk-green-glow)',
  };

  const scrollPromptStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    color: 'var(--text-primary)',
    fontFamily: "'Montserrat', 'Segoe UI', sans-serif",
    fontSize: '0.9rem',
    fontWeight: 500,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    zIndex: 30,
    opacity: 1,
    transition: 'opacity 0.3s ease-out',
    pointerEvents: 'none',
    textShadow: '0 0 20px rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  };

  const blurOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    zIndex: 15,
    pointerEvents: 'none',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    backgroundColor: 'rgba(0, 10, 5, 0.25)',
    opacity: 0,
    transition: 'opacity 0.4s ease-out',
  };

  return (
    <>
      {/* Background Light Orbs */}
      <div className="gradient-orb" style={{ top: '10%', left: '5%', width: '400px', height: '400px' }}></div>
      <div className="gradient-orb" style={{ bottom: '15%', right: '5%', background: 'radial-gradient(circle, var(--pk-green-bright) 0%, transparent 70%)', width: '500px', height: '500px' }}></div>

      <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;800&display=swap');
          body { margin: 0; overflow-x: hidden; background: var(--bg-primary); }
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
          .scroll-arrow { animation: bounce 2s infinite; }
          .text-card::-webkit-scrollbar { width: 5px; }
          .text-card::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.15); border-radius: 10px; }
          .text-card::-webkit-scrollbar-thumb { background: rgba(180, 240, 180, 0.5); border-radius: 10px; }
          
          .text-card-premium {
            background: var(--glass-bg);
            backdrop-filter: blur(20px) saturate(180%);
            border: 1px solid var(--glass-border);
            border-radius: 3rem;
            padding: 4rem;
            box-shadow: 0 40px 100px var(--glass-shadow);
            transition: all 0.6s var(--transition-smooth);
            position: relative;
            z-index: 20;
          }

          .text-card-premium::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 230, 118, 0.1) 0%, transparent 60%);
            opacity: 0;
            transition: opacity 0.4s;
            pointer-events: none;
            border-radius: inherit;
          }

          .text-card-premium:hover::before { opacity: 1; }
        `}</style>

        <canvas ref={canvasRef} className="experience" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 2 }} />
        <div ref={scrollTargetRef} className="scrollTarget" style={{ position: 'absolute', height: '1000vh', width: '100%', top: 0, zIndex: 0, pointerEvents: 'none' }} />

        <div ref={blurOverlayRef} style={blurOverlayStyle} />

        <div ref={scrollPromptRef} style={scrollPromptStyle}>
          <span>Initiate Journey</span>
          <svg className="scroll-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 10px var(--pk-green-glow))' }}>
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        {/* Sections */}
        <div ref={(el) => { sectionRefs.current[0] = el; }} style={textContainerStyle} className="text-card-premium card-glow-border" onMouseMove={handleMouseMove}>
          <h1 style={headingStyle}>Yuni Intelligence</h1>
          <div style={subheadingStyle}>Re‑Building The 21st Century Shaheen 🦅</div>
          <p style={paragraphStyle}>
            Yuni exists to <span style={strongStyle}>awaken the youth</span> of Pakistan, 
            transforming raw data into operational power, and building a nation of sovereign thinkers.
          </p>
          <p style={paragraphStyle}>
            Inspired by the meta-philosophies of <span style={strongStyle}>Dr. Allama Iqbal</span>, 
            we provide a 360° tactical ecosystem empowering students to transcend their limits.
          </p>
        </div>

        <div ref={(el) => { sectionRefs.current[1] = el; }} style={textContainerStyle} className="text-card-premium card-glow-border" onMouseMove={handleMouseMove}>
          <h2 style={headingStyle}>Core Ideology</h2>
          <p style={paragraphStyle}>
            <span style={strongStyle}>Khudi (Self‑Realization)</span> — Every Pakistani student carries an infinite signal. Through education and discipline, they become agents of evolution.
          </p>
          <p style={paragraphStyle}>
            <span style={strongStyle}>Knowledge as Power</span> — Intellectual sovereignty is the foundation of a strong state. We specialize in deep-tech, leadership, and economic strategy.
          </p>
          <p style={paragraphStyle}>
            <span style={strongStyle}>Economic Autonomy</span> — Financial independence is a national security priority. Yuni fosters global earning through advanced digital proficiencies.
          </p>
        </div>

        <div ref={(el) => { sectionRefs.current[2] = el; }} style={textContainerStyle} className="text-card-premium card-glow-border" onMouseMove={handleMouseMove}>
          <h2 style={headingStyle}>The Ecosystem</h2>
          <p style={paragraphStyle}>
            <span style={strongStyle}>Yuni-Buddy</span> (Parwaaz‑e‑Uqabi) — Neural network of connectivity, high-value internships, and global resource access.
          </p>
          <p style={paragraphStyle}>
            <span style={strongStyle}>Yuni-Courses</span> (Umeed‑e‑Sahar) — Intensive, project-driven training modules taught by industry commanders.
          </p>
          <p style={paragraphStyle}>
            <span style={strongStyle}>Yuni-Coworking</span> (Yuni‑Anjuman) — Physical hubs for collaboration and strategic innovation at NASTP.
          </p>
          <p style={paragraphStyle}>
            <span style={strongStyle}>Tech & Marketing</span> (Taqat‑e‑Parwaaz) — Advanced AI automation and digital scaling protocols.
          </p>
        </div>

        <div ref={(el) => { sectionRefs.current[3] = el; }} style={textContainerStyle} className="text-card-premium card-glow-border" onMouseMove={handleMouseMove}>
          <h2 style={headingStyle}>Operational Nodes</h2>
          <p style={paragraphStyle}>
            <span style={strongStyle}>Parwaaz‑e‑Uqabi</span> — "Sitaron se aage jahan aur bhi hain"<br/>
            Nationwide connectivity, inter-city hubs, and global scholarship pathways.
          </p>
          <p style={paragraphStyle}>
            <span style={strongStyle}>Umeed‑e‑Sahar</span> — "Khudi ko kar buland itna…"<br/>
            Real-world project implementation. We don't just issue certificates; we validate expertise through results.
          </p>
        </div>

        <div ref={(el) => { sectionRefs.current[4] = el; }} style={textContainerStyle} className="text-card-premium card-glow-border" onMouseMove={handleMouseMove}>
          <h2 style={headingStyle}>Strategic Hubs</h2>
          <p style={paragraphStyle}>
            <span style={strongStyle}>Taqat‑e‑Parwaaz</span> — Elevating Pakistan's digital footprint via high-tech AI infrastructure and international e-commerce standards.
          </p>
          <p style={paragraphStyle}>
            <span style={strongStyle}>Yuni‑Anjuman</span> — Premium coworking environments designed for peak focus and collaborative breakthroughs.
          </p>
          <p style={{ ...paragraphStyle, marginTop: '2rem', fontStyle: 'italic', color: 'var(--pk-green)' }}>
            "Yaqeen Muhkam, Amal Paiham, Mohabbat Fateh‑e‑Alam"
          </p>
        </div>

        <div ref={(el) => { sectionRefs.current[5] = el; }} style={textContainerStyle} className="text-card-premium card-glow-border" onMouseMove={handleMouseMove}>
          <h2 style={headingStyle}>Future Horizon</h2>
          <div style={subheadingStyle}>The Signal Continues</div>
          <p style={paragraphStyle}>
            You have witnessed the architecture of our vision. The void ahead is not empty—it is <span style={strongStyle}>latency</span>.
          </p>
          <p style={paragraphStyle}>
            It represents the unwritten future of Pakistan's digital age, waiting for those with the courage to initialize.
          </p>
          <p style={paragraphStyle}>
            <span style={strongStyle}>Deploy your potential.</span> Evolve into a Shaheen.
          </p>
          <p style={{ ...paragraphStyle, marginTop: '2rem', textAlign: 'center' }}>
            <span className="premium-tag">System Ready</span>
          </p>
        </div>

        <div className="vignette-radial" style={{ position: 'fixed', zIndex: 11, top: 0, left: 0, height: '100vh', width: '100%', pointerEvents: 'none' }}>
          <style>{`
            .vignette-radial:after {
              pointer-events: none;
              content: ' ';
              position: absolute;
              top: 0; left: 0; bottom: 0; right: 0;
              background: radial-gradient(circle, transparent 60%, black 150%);
            }
            .premium-tag {
              display: inline-block;
              padding: 0.8rem 2.5rem;
              background: rgba(0, 230, 118, 0.1);
              border: 1px solid var(--pk-green);
              border-radius: 50px;
              font-weight: 800;
              letter-spacing: 0.2em;
              color: var(--pk-green);
              text-transform: uppercase;
              box-shadow: 0 0 20px var(--pk-green-glow);
            }
          `}</style>
        </div>
      </div>
    </>
  );
};

// ==================== MOBILE ABOUT (CARDS + RAINBOW) ====================
const MobileAbout: React.FC = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
    const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  };

  const rainbowDivs = Array.from({ length: 25 }, (_, i) => (
    <div key={i} className="rainbow-mobile" />
  ));

  const cardStyle: React.CSSProperties = {
    background: 'var(--glass-bg)',
    backdropFilter: 'blur(15px)',
    borderRadius: '2.5rem',
    border: '1px solid var(--glass-border)',
    padding: '2.5rem',
    color: 'var(--text-primary)',
    fontFamily: "'Inter', sans-serif",
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
    marginBottom: '2.5rem',
    position: 'relative',
    overflow: 'hidden',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: '1.8rem',
    fontWeight: 900,
    marginBottom: '1.5rem',
    color: 'var(--pk-green)',
    letterSpacing: '-0.02em',
    textTransform: 'uppercase',
  };

  const paragraphStyle: React.CSSProperties = {
    fontSize: '1.05rem',
    lineHeight: 1.8,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: '1.2rem',
  };

  const strongStyle: React.CSSProperties = {
    color: 'var(--pk-green-bright)',
    fontWeight: 800,
  };

  return (
    <>
      {/* Background Light Orbs */}
      <div className="gradient-orb" style={{ top: '5%', left: '10%' }}></div>
      <div className="gradient-orb" style={{ bottom: '10%', right: '5%', background: 'radial-gradient(circle, var(--pk-green-bright) 0%, transparent 70%)' }}></div>

      {/* Rainbow Background */}
      <div className="rainbow-background-mobile">
        {rainbowDivs}
        <div className="h-mobile" />
        <div className="v-mobile" />
      </div>

      {/* Content */}
      <section style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '10rem 1.5rem 6rem',
      }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 10vw, 4.5rem)',
          fontWeight: 900,
          color: 'var(--text-primary)',
          marginBottom: '0.8rem',
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}>YUNI</h1>
        <p style={{
          fontSize: '1.4rem',
          color: 'var(--pk-green)',
          marginBottom: '4rem',
          fontWeight: 700,
          opacity: 0.9,
        }}>Establish Dominance. 🦅</p>

        <div style={cardStyle} className="card-glow-border" onMouseMove={handleMouseMove}>
          <h2 style={headingStyle}>Ideology</h2>
          <p style={paragraphStyle}>
            <span style={strongStyle}>Khudi</span> — Self-realization is the ignition.
          </p>
          <p style={paragraphStyle}>
            <span style={strongStyle}>Knowledge</span> — Information is the ammunition.
          </p>
          <p style={paragraphStyle}>
            <span style={strongStyle}>Independence</span> — Economic sovereignty is the objective.
          </p>
        </div>

        <div style={cardStyle} className="card-glow-border" onMouseMove={handleMouseMove}>
          <h2 style={headingStyle}>Ecosystem</h2>
          <p style={paragraphStyle}><span style={strongStyle}>Yuni-Buddy</span> — Elite connectivity nodes.</p>
          <p style={paragraphStyle}><span style={strongStyle}>Yuni-Courses</span> — Tactical skill acquisition.</p>
          <p style={paragraphStyle}><span style={strongStyle}>Yuni-Coworking</span> — Innovation strongholds.</p>
        </div>

        <div style={cardStyle} className="card-glow-border" onMouseMove={handleMouseMove}>
          <h2 style={headingStyle}>Future State</h2>
          <p style={paragraphStyle}>
            The current system is obsolete. Yuni is the upgrade.
          </p>
          <p style={paragraphStyle}>
            <span style={strongStyle}>Initialize deployment.</span> Rise as a Shaheen.
          </p>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <span className="premium-tag">Coming Soon</span>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        .premium-tag {
          display: inline-block;
          padding: 0.8rem 2rem;
          background: rgba(0, 230, 118, 0.1);
          border: 1px solid var(--pk-green);
          border-radius: 50px;
          font-weight: 800;
          color: var(--pk-green);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        
        .rainbow-background-mobile {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
          background-color: #000000;
        }
        .rainbow-mobile {
          height: 100vh;
          width: 0;
          top: 0;
          position: absolute;
          transform: rotate(10deg);
          transform-origin: top right;
        }
        .h-mobile {
          box-shadow: 0 0 50vh 40vh #0a0a0a;
          width: 100vw;
          height: 0;
          bottom: 0;
          left: 0;
          position: absolute;
        }
        .v-mobile {
          box-shadow: 0 0 35vw 25vw #0a0a0a;
          width: 0;
          height: 100vh;
          bottom: 0;
          left: 0;
          position: absolute;
        }
        @keyframes slide-mobile {
          from { right: -25vw; }
          to { right: 125vw; }
        }
        ${generateRainbowCSS()}
      `}</style>
    </>
  );
};

// ==================== MAIN COMPONENT ====================
const Experience3D: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  return isMobile ? <MobileAbout /> : <DesktopExperience />;
};

export default Experience3D;