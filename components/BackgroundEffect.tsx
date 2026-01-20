
import React, { useEffect, useRef } from 'react';
import { HER_NAME } from '../constants.tsx';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  targetX: number;
  targetY: number;
  size: number;
  vx: number;
  vy: number;
  accX: number;
  accY: number;
  friction: number;
  stiffness: number;
  color: string;
}

const BackgroundEffect: React.FC<{ stage: string }> = ({ stage }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    const initial = HER_NAME.charAt(0).toUpperCase();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = 897; // As requested in the prompt

      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d')!;
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempCtx.fillStyle = 'white';
      tempCtx.font = `bold ${Math.min(canvas.width, canvas.height) * 0.6}px "Playfair Display"`;
      tempCtx.textAlign = 'center';
      tempCtx.textBaseline = 'middle';
      tempCtx.fillText(initial, canvas.width / 2, canvas.height / 2);

      const imageData = tempCtx.getImageData(0, 0, canvas.width, canvas.height).data;
      const points: { x: number; y: number }[] = [];

      const step = canvas.width < 768 ? 6 : 8;
      for (let y = 0; y < canvas.height; y += step) {
        for (let x = 0; x < canvas.width; x += step) {
          const index = (y * canvas.width + x) * 4;
          if (imageData[index + 3] > 128) {
            points.push({ x, y });
          }
        }
      }

      for (let i = 0; i < particleCount; i++) {
        const p = points[i % points.length] || { x: Math.random() * canvas.width, y: Math.random() * canvas.height };
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          originX: Math.random() * canvas.width,
          originY: Math.random() * canvas.height,
          targetX: p.x,
          targetY: p.y,
          size: Math.random() * 2 + 0.5,
          vx: 0,
          vy: 0,
          accX: 0,
          accY: 0,
          friction: 0.95,
          stiffness: 0.03,
          color: `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.1})`,
        });
      }
    };

    const animate = () => {
      ctx.fillStyle = stage === 'closure' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(5, 5, 5, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        let tx, ty;

        if (stage === 'veil') {
          tx = p.targetX;
          ty = p.targetY;
        } else if (stage === 'closure') {
          tx = canvas.width / 2 + (Math.random() - 0.5) * 50;
          ty = canvas.height / 2 + (Math.random() - 0.5) * 50;
          p.color = `rgba(0, 0, 0, ${Math.random() * 0.2})`;
        } else {
          tx = p.originX;
          ty = p.originY;
        }

        const dx = tx - p.x;
        const dy = ty - p.y;
        p.accX = dx * p.stiffness;
        p.accY = dy * p.stiffness;
        p.vx = (p.vx + p.accX) * p.friction;
        p.vy = (p.vy + p.accY) * p.friction;
        p.x += p.vx;
        p.y += p.vy;

        // Organic Perlin-like noise
        p.x += Math.sin(Date.now() * 0.001 + p.originX) * 0.4;
        p.y += Math.cos(Date.now() * 0.001 + p.originY) * 0.4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [stage]);

  return <canvas ref={canvasRef} className="canvas-container" />;
};

export default BackgroundEffect;
