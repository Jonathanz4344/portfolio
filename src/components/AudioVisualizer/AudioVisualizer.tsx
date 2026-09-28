'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const NUM_BARS = 52;
const BAR_SPACING = 0.36;

interface AudioVisualizerProps {
  isPlaying: boolean;
}

export default function AudioVisualizer({ isPlaying }: AudioVisualizerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const isPlayingRef = useRef(isPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const w = mount.clientWidth;
    const h = mount.clientHeight;
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
    camera.position.set(0, 3, 11);
    camera.lookAt(0, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    interface BarPair {
      core: THREE.Mesh;
      glow: THREE.Mesh;
      freq1: number;
      freq2: number;
      freq3: number;
      phase: number;
    }

    const totalWidth = (NUM_BARS - 1) * BAR_SPACING;
    const barPairs: BarPair[] = [];
    const coreGeo = new THREE.BoxGeometry(0.13, 1, 0.13);
    const glowGeo = new THREE.BoxGeometry(0.6, 1, 0.6);
    const materials: THREE.Material[] = [];

    for (let i = 0; i < NUM_BARS; i++) {
      const t = i / (NUM_BARS - 1);

      // Color: blue-navy → spotify-green → deep-purple
      const color = new THREE.Color();
      if (t < 0.5) {
        color.lerpColors(new THREE.Color('#1e3264'), new THREE.Color('#1DB954'), t * 2);
      } else {
        color.lerpColors(new THREE.Color('#1DB954'), new THREE.Color('#4a1d8a'), (t - 0.5) * 2);
      }

      // Subtle z-arc so center bars are slightly closer to camera
      const zArc = -((i - NUM_BARS / 2) ** 2) * 0.003;
      const xPos = i * BAR_SPACING - totalWidth / 2;

      const coreMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.88 });
      const core = new THREE.Mesh(coreGeo, coreMat);
      core.position.set(xPos, 0, zArc);
      scene.add(core);

      const glowMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.13,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      glow.position.set(xPos, 0, zArc);
      scene.add(glow);
      materials.push(coreMat, glowMat);

      barPairs.push({
        core,
        glow,
        freq1: 0.35 + (i % 7) * 0.14,
        freq2: 0.55 + (i % 5) * 0.22,
        freq3: 0.18 + (i % 3) * 0.08,
        phase: i * 0.23,
      });
    }

    let currentIntensity = 0.1;
    let fadeIn = 0;
    let animId: number | null = null;
    let isVisible = true;
    const clock = new THREE.Clock();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = () => {
      const t = clock.getElapsedTime();

      fadeIn = reducedMotion ? 1 : Math.min(1, fadeIn + 0.016);
      const target = isPlayingRef.current ? 1.0 : 0.18;
      currentIntensity += (target - currentIntensity) * 0.035;

      const speed = 0.45 + currentIntensity * 1.6;
      const amplitude = 0.25 + currentIntensity * 2.4;

      barPairs.forEach(({ core, glow, freq1, freq2, freq3, phase }) => {
        const noise =
          Math.sin(t * speed * freq1 + phase) * 0.5 +
          Math.sin(t * speed * freq2 + phase * 1.7) * 0.3 +
          Math.sin(t * speed * freq3 + phase * 0.6) * 0.2;

        const height = Math.max(0.04, (0.1 + Math.abs(noise) * amplitude) * fadeIn);
        core.scale.y = height;
        core.position.y = height / 2;
        glow.scale.y = height;
        glow.position.y = height / 2;
      });

      renderer.render(scene, camera);
      animId = reducedMotion ? null : requestAnimationFrame(animate);
    };

    // Only run the render loop while the hero is on screen and the tab is visible
    const start = () => {
      if (animId === null && isVisible && !document.hidden) {
        clock.getDelta();
        animate();
      }
    };
    const stop = () => {
      if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) start();
      else stop();
    });
    observer.observe(mount);

    const handleVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', handleVisibility);

    start();

    const handleResize = () => {
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
      if (reducedMotion) renderer.render(scene, camera);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', handleResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      coreGeo.dispose();
      glowGeo.dispose();
      materials.forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
