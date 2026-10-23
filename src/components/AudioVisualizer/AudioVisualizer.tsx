'use client';

import { useEffect, useRef } from 'react';
import { motionAllowed } from '@/components/motion';

const BAR = 2;
const GAP = 4;

interface AudioVisualizerProps {
  isPlaying: boolean;
}

/**
 * A hairline waveform along the foot of the hero, drawn in the theme's text and accent colors.
 * It rests as a still, quiet shape and only moves while a project is playing.
 */
export default function AudioVisualizer({ isPlaying }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playingRef = useRef(isPlaying);
  const wakeRef = useRef<() => void>(() => {});

  useEffect(() => {
    playingRef.current = isPlaying;
    wakeRef.current();
  }, [isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    const root = document.documentElement;

    let colors = { base: '', accent: '' };
    const readColors = () => {
      const styles = getComputedStyle(root);
      colors = { base: styles.getPropertyValue('--text').trim(), accent: styles.getPropertyValue('--waveform').trim() };
    };

    let width = 0;
    let height = 0;
    let count = 0;
    let heights: number[] = [];
    let energy = playingRef.current ? 1 : 0;

    // The resting shape: a soft swell toward the middle with a little texture
    const rest = (i: number) => {
      const t = i / Math.max(1, count - 1);
      return 0.07 + 0.16 * Math.sin(Math.PI * t) * Math.abs(Math.sin(t * 9.4 + 0.6)) + 0.04 * Math.abs(Math.sin(t * 37));
    };
    const live = (i: number, seconds: number) => {
      const t = i / Math.max(1, count - 1);
      const swell = 0.35 + 0.65 * Math.sin(Math.PI * t);
      const noise =
        Math.abs(Math.sin(seconds * (0.9 + (i % 7) * 0.21) + i * 0.23)) * 0.5 +
        Math.abs(Math.sin(seconds * (1.4 + (i % 5) * 0.33) + i * 0.41)) * 0.3 +
        Math.abs(Math.sin(seconds * (0.5 + (i % 3) * 0.17) + i * 0.13)) * 0.2;
      return 0.1 + 0.82 * noise * swell;
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const offset = (width - (count * (BAR + GAP) - GAP)) / 2;
      const bar = (i: number) => {
        const h = Math.max(2, heights[i] * height);
        context.beginPath();
        context.roundRect(offset + i * (BAR + GAP), height - h, BAR, h, 1);
        context.fill();
      };
      context.fillStyle = colors.base;
      for (let i = 0; i < count; i++) {
        const envelope = Math.sin((Math.PI * i) / Math.max(1, count - 1));
        context.globalAlpha = 0.1 + 0.12 * envelope;
        bar(i);
      }
      context.fillStyle = colors.accent;
      for (let i = 0; i < count; i++) {
        const envelope = Math.sin((Math.PI * i) / Math.max(1, count - 1));
        context.globalAlpha = envelope * envelope * (0.28 + 0.6 * energy);
        bar(i);
      }
      context.globalAlpha = 1;
    };

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      const ratio = Math.min(devicePixelRatio, 2);
      width = box.width;
      height = box.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      count = Math.max(0, Math.floor((width + GAP) / (BAR + GAP)));
      heights = Array.from({ length: count }, (_, i) => heights[i] ?? rest(i));
    };

    let frame = 0;
    let visible = true;
    const step = (now: number) => {
      const seconds = now / 1000;
      energy += ((playingRef.current ? 1 : 0) - energy) * 0.045;
      for (let i = 0; i < count; i++) heights[i] = rest(i) * (1 - energy) + live(i, seconds) * energy;
      draw();
      const settled = !playingRef.current && energy < 0.002;
      frame = visible && !settled && !document.hidden ? requestAnimationFrame(step) : 0;
    };

    const wake = () => {
      if (!motionAllowed()) {
        // Still frames only: a taller shape while playing, the resting shape otherwise
        energy = playingRef.current ? 1 : 0;
        heights = Array.from({ length: count }, (_, i) => rest(i) * (1 - energy) + live(i, i * 0.37) * energy);
        draw();
        return;
      }
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(step);
    };
    wakeRef.current = wake;

    readColors();
    resize();
    draw();
    wake();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    resizeObserver.observe(canvas);

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
    });
    visibility.observe(canvas);

    // Repaint in the new colors when the theme or season changes
    const themeObserver = new MutationObserver(() => {
      readColors();
      draw();
    });
    themeObserver.observe(root, { attributes: true, attributeFilter: ['data-theme', 'data-season', 'data-season-style'] });

    const onVisibilityChange = () => !document.hidden && wake();
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      cancelAnimationFrame(frame);
      wakeRef.current = () => {};
      resizeObserver.disconnect();
      visibility.disconnect();
      themeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-visualizer" aria-hidden="true" />;
}
