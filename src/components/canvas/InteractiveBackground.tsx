import React, { useEffect, useRef, useState } from 'react';
import { BackgroundTheme } from '../../types';
import { useTheme } from '../../context/ThemeContext';

// Developer code tokens for orchid and matrix
const CODE_GLYPHS = ['</>', '{ }', '//', '=>', 'λ', '01', 'async', 'git', '&&', 'React', 'TypeScript', '★'];
const MATRIX_CHARS = '0123456789ABCDEF<>/{};:=+*~λµπΔΩ#$_@&0101';

type BackgroundMode = 'all' | 'aurora' | 'grid' | 'particles';

// Generic particle used in Orchid & Cosmos
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  alpha: number;
  glyph?: string;
  isGlyph: boolean;
  color: string;
  layer: number;
}

// Spark trails on mouse move
interface SparkTrail {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

// Shockwave ripple on click
interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

// Matrix Falling Stream Column
interface MatrixStream {
  x: number;
  y: number;
  speed: number;
  length: number;
  chars: string[];
  headChar: string;
  updateCounter: number;
}

// Cosmos Star & Comet
interface CosmosStar {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: string;
  vx: number;
  vy: number;
}

interface Comet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  alpha: number;
  active: boolean;
  radius: number;
}

// Sunset Rising Ember
interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  pulseSpeed: number;
  color: string;
}

// Minimal Mesh Vertex
interface MeshNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  originX: number;
  originY: number;
  hasCrosshair: boolean;
}

interface InteractiveBackgroundProps {
  className?: string;
  initialMode?: BackgroundMode;
  showHud?: boolean;
  theme?: BackgroundTheme;
}

const getBaseBgColor = (t: BackgroundTheme): string => {
  switch (t) {
    case 'cyber-matrix':
      return '#010905';
    case 'deep-cosmos':
      return '#020514';
    case 'sunset-aurora':
      return '#0e0407';
    case 'minimal-mesh':
      return '#070a10';
    case 'midnight-orchid':
    default:
      return '#07020b';
  }
};

export const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({
  className = '',
  initialMode = 'all',
  showHud = true,
  theme: propTheme,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { bgTheme: contextTheme } = useTheme();
  const activeTheme = propTheme || contextTheme || 'midnight-orchid';

  const [activeMode, setActiveMode] = useState<BackgroundMode>(initialMode);
  const [hudOpen, setHudOpen] = useState(false);
  const [fps, setFps] = useState(60);

  // Keep live references for requestAnimationFrame
  const themeRef = useRef<BackgroundTheme>(activeTheme);
  const modeRef = useRef<BackgroundMode>(activeMode);

  useEffect(() => {
    themeRef.current = activeTheme;
  }, [activeTheme]);

  useEffect(() => {
    modeRef.current = activeMode;
  }, [activeMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isVisible = true;

    // Mouse coordinates with lerp
    const targetMouse = { x: -9999, y: -9999, active: false };
    const currentMouse = { x: -9999, y: -9999 };
    let mouseSpeed = 0;
    let prevMouseX = 0;
    let prevMouseY = 0;

    // Common effects
    const sparks: SparkTrail[] = [];
    const shockwaves: Shockwave[] = [];

    // Theme 1: Cyber Matrix State
    let matrixStreams: MatrixStream[] = [];
    let matrixScanlineY = 0;

    // Theme 2: Deep Cosmos State
    let cosmosStars: CosmosStar[] = [];
    let comets: Comet[] = [];
    let cometTimer = 0;

    // Theme 3: Sunset Aurora State
    let embers: Ember[] = [];

    // Theme 4: Minimal Mesh State
    let meshNodes: MeshNode[] = [];

    // Theme 5: Midnight Orchid State
    let orchidParticles: Particle[] = [];

    // -------------------------------------------------------------
    // SEEDING FUNCTIONS FOR EACH OF THE 5 RADICALLY UNIQUE THEMES
    // -------------------------------------------------------------
    const seedMatrix = () => {
      matrixStreams = [];
      const colWidth = 20;
      const numCols = Math.floor(width / colWidth);
      for (let i = 0; i < numCols; i++) {
        const streamLength = Math.floor(Math.random() * 16) + 10;
        const chars: string[] = [];
        for (let j = 0; j < streamLength; j++) {
          chars.push(MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]);
        }
        matrixStreams.push({
          x: i * colWidth + 10,
          y: Math.random() * height - height,
          speed: Math.random() * 2.8 + 1.8,
          length: streamLength,
          chars,
          headChar: MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
          updateCounter: 0,
        });
      }
    };

    const seedCosmos = () => {
      cosmosStars = [];
      comets = [];
      const count = width < 640 ? 90 : 160;
      const starColors = ['#ffffff', '#93c5fd', '#c4b5fd', '#67e8f9', '#e0e7ff', '#38bdf8'];
      for (let i = 0; i < count; i++) {
        cosmosStars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.8 + 0.5,
          alpha: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinkleOffset: Math.random() * Math.PI * 2,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
        });
      }
    };

    const seedSunset = () => {
      embers = [];
      const count = width < 640 ? 45 : 85;
      const emberColors = ['#fbbf24', '#f59e0b', '#fb923c', '#f97316', '#f43f5e', '#fef08a', '#fda4af'];
      for (let i = 0; i < count; i++) {
        embers.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -(Math.random() * 0.7 + 0.3), // Drifting upward
          radius: Math.random() * 2.2 + 0.8,
          alpha: Math.random() * 0.6 + 0.4,
          pulseSpeed: Math.random() * 0.03 + 0.015,
          color: emberColors[Math.floor(Math.random() * emberColors.length)],
        });
      }
    };

    const seedMesh = () => {
      meshNodes = [];
      const count = width < 640 ? 35 : 65;
      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        meshNodes.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1.5,
          originX: x,
          originY: y,
          hasCrosshair: i % 4 === 0,
        });
      }
    };

    const seedOrchid = () => {
      orchidParticles = [];
      const count = width < 640 ? 40 : 85;
      const colors = ['#fb7185', '#f472b6', '#e879f9', '#c084fc', '#fce7f3', '#fda4af', '#f43f5e'];
      for (let i = 0; i < count; i++) {
        const isGlyph = i % 5 === 0;
        const layer = Math.random() > 0.4 ? 1 : 0;
        const baseRadius = isGlyph ? 10 : layer === 1 ? Math.random() * 1.8 + 1.2 : Math.random() * 1.2 + 0.6;
        orchidParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (layer === 1 ? 0.65 : 0.35),
          vy: (Math.random() - 0.5) * (layer === 1 ? 0.65 : 0.35),
          baseRadius,
          radius: baseRadius,
          alpha: Math.random() * 0.4 + (layer === 1 ? 0.4 : 0.2),
          glyph: isGlyph ? CODE_GLYPHS[Math.floor(Math.random() * CODE_GLYPHS.length)] : undefined,
          isGlyph,
          color: colors[Math.floor(Math.random() * colors.length)],
          layer,
        });
      }
    };

    const reseedAll = () => {
      seedMatrix();
      seedCosmos();
      seedSunset();
      seedMesh();
      seedOrchid();
    };

    // Resize Handler
    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      reseedAll();
    };

    handleResize();

    // Mouse & Touch Tracking
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
      targetMouse.active = true;

      const dx = targetMouse.x - prevMouseX;
      const dy = targetMouse.y - prevMouseY;
      mouseSpeed = Math.sqrt(dx * dx + dy * dy);
      prevMouseX = targetMouse.x;
      prevMouseY = targetMouse.y;

      // Theme-specific spark colors
      if (mouseSpeed > 3 && sparks.length < 45) {
        let sparkColor = '#f472b6';
        const currentT = themeRef.current;
        if (currentT === 'cyber-matrix') sparkColor = '#34d399';
        else if (currentT === 'deep-cosmos') sparkColor = '#38bdf8';
        else if (currentT === 'sunset-aurora') sparkColor = '#fb923c';
        else if (currentT === 'minimal-mesh') sparkColor = '#cbd5e1';

        sparks.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 2 - dx * 0.08,
          vy: (Math.random() - 0.5) * 2 - dy * 0.08,
          radius: Math.random() * 2 + 1,
          alpha: 0.85,
          color: sparkColor,
        });
      }
    };

    const handleMouseLeave = () => {
      targetMouse.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetMouse.x = e.touches[0].clientX;
        targetMouse.y = e.touches[0].clientY;
        targetMouse.active = true;
      }
    };

    const handleTouchEnd = () => {
      targetMouse.active = false;
    };

    const handleClick = (e: MouseEvent | TouchEvent) => {
      const clientX = 'clientX' in e ? e.clientX : e.touches[0]?.clientX;
      const clientY = 'clientY' in e ? e.clientY : e.touches[0]?.clientY;
      if (clientX === undefined || clientY === undefined) return;

      const currentT = themeRef.current;
      let shockColor = '#f43f5e';
      if (currentT === 'cyber-matrix') shockColor = '#10b981';
      else if (currentT === 'deep-cosmos') shockColor = '#60a5fa';
      else if (currentT === 'sunset-aurora') shockColor = '#f59e0b';
      else if (currentT === 'minimal-mesh') shockColor = '#94a3b8';

      shockwaves.push({
        x: clientX,
        y: clientY,
        radius: 12,
        maxRadius: Math.min(width, height) * 0.45,
        alpha: 0.9,
        color: shockColor,
      });

      // Scatter nearby particles for Orchid & Cosmos
      const pushRadiusSq = 220 * 220;
      if (currentT === 'midnight-orchid') {
        orchidParticles.forEach((p) => {
          const dx = p.x - clientX;
          const dy = p.y - clientY;
          const distSq = dx * dx + dy * dy;
          if (distSq < pushRadiusSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / 220) * 5.5;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        });
      } else if (currentT === 'deep-cosmos') {
        cosmosStars.forEach((s) => {
          const dx = s.x - clientX;
          const dy = s.y - clientY;
          const distSq = dx * dx + dy * dy;
          if (distSq < pushRadiusSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / 220) * 4.0;
            s.vx += (dx / dist) * force;
            s.vy += (dy / dist) * force;
          }
        });
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('click', handleClick);

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) lastTime = performance.now();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Frame Rate Counter & Loop
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTime = performance.now();
    let gridOffset = 0;

    // -------------------------------------------------------------
    // MAIN 60 FPS ANIMATION LOOP WITH 5 DEDICATED THEME ENGINES
    // -------------------------------------------------------------
    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      frameCount++;
      if (time - fpsTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (time - fpsTime)));
        frameCount = 0;
        fpsTime = time;
      }

      // Smooth cursor lerp
      if (targetMouse.active) {
        currentMouse.x += (targetMouse.x - currentMouse.x) * 0.1;
        currentMouse.y += (targetMouse.y - currentMouse.y) * 0.1;
      } else {
        currentMouse.x += (-9999 - currentMouse.x) * 0.05;
        currentMouse.y += (-9999 - currentMouse.y) * 0.05;
      }

      const currentTheme = themeRef.current;
      const currentMode = modeRef.current;

      // 1. CLEAR CANVAS WITH THEME'S TRUE BASE COLOR
      const baseBg = getBaseBgColor(currentTheme);
      ctx.fillStyle = baseBg;
      ctx.fillRect(0, 0, width, height);

      // =========================================================
      // THEME ENGINE 1: CYBER MATRIX
      // =========================================================
      if (currentTheme === 'cyber-matrix') {
        // A. 3D Perspective Green Cyber Grid Floor
        if (currentMode === 'all' || currentMode === 'grid') {
          const horizonY = height * 0.58;
          const vanishX = width * 0.5;
          gridOffset = (gridOffset + 28 * dt) % 36;

          ctx.save();
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.22)';
          ctx.lineWidth = 1;

          // Longitudinal perspective lines
          const numLines = Math.floor(width / 55) + 6;
          for (let i = -numLines; i <= numLines; i++) {
            const bottomX = vanishX + i * 90;
            ctx.beginPath();
            ctx.moveTo(vanishX, horizonY);
            ctx.lineTo(bottomX, height + 40);
            ctx.stroke();
          }

          // Transverse grid lines
          const numTrans = 14;
          for (let j = 0; j < numTrans; j++) {
            const progress = (j + gridOffset / 36) / numTrans;
            const y = horizonY + Math.pow(progress, 2.2) * (height - horizonY);

            ctx.beginPath();
            for (let x = 0; x <= width; x += 30) {
              let dy = 0;
              if (targetMouse.active) {
                const distToMouse = Math.hypot(x - currentMouse.x, y - currentMouse.y);
                if (distToMouse < 220) {
                  dy = -Math.cos((distToMouse / 220) * (Math.PI / 2)) * 18;
                }
              }
              if (x === 0) ctx.moveTo(x, y + dy);
              else ctx.lineTo(x, y + dy);
            }
            ctx.stroke();
          }

          // Glowing neon horizon laser
          const horizonGrad = ctx.createLinearGradient(0, 0, width, 0);
          horizonGrad.addColorStop(0, 'rgba(0,0,0,0)');
          horizonGrad.addColorStop(0.5, 'rgba(52, 211, 153, 0.7)');
          horizonGrad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.strokeStyle = horizonGrad;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(0, horizonY);
          ctx.lineTo(width, horizonY);
          ctx.stroke();

          ctx.restore();
        }

        // B. Matrix Falling Digital Code Rain
        if (currentMode === 'all' || currentMode === 'particles') {
          ctx.save();
          ctx.font = 'bold 12px "JetBrains Mono", monospace';
          const fontSize = 14;

          matrixStreams.forEach((stream) => {
            stream.y += stream.speed * 60 * dt;
            stream.updateCounter++;

            // Random character flicker
            if (stream.updateCounter % 8 === 0) {
              stream.headChar = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
              const randIdx = Math.floor(Math.random() * stream.chars.length);
              stream.chars[randIdx] = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
            }

            // Loop back to top
            if (stream.y - stream.length * fontSize > height) {
              stream.y = -Math.random() * 200;
              stream.speed = Math.random() * 2.8 + 1.8;
            }

            // Check proximity to cursor for distortion / electric illumination
            let mouseInfluence = false;
            if (targetMouse.active) {
              const dist = Math.hypot(stream.x - currentMouse.x, stream.y - currentMouse.y);
              if (dist < 180) mouseInfluence = true;
            }

            // Draw stream characters
            for (let i = 0; i < stream.length; i++) {
              const charY = stream.y - i * fontSize;
              if (charY < -20 || charY > height + 20) continue;

              if (i === 0) {
                // Bright glowing head character
                ctx.fillStyle = mouseInfluence ? '#ffffff' : '#a7f3d0';
                ctx.shadowColor = '#34d399';
                ctx.shadowBlur = 10;
                ctx.fillText(stream.headChar, stream.x, charY);
                ctx.shadowBlur = 0;
              } else {
                // Cascading fading tail
                const alpha = Math.max(0, 1 - i / stream.length) * (mouseInfluence ? 0.95 : 0.65);
                ctx.fillStyle = `rgba(16, 185, 129, ${alpha})`;
                const char = stream.chars[i % stream.chars.length];
                ctx.fillText(char, stream.x, charY);
              }
            }
          });
          ctx.restore();

          // Horizontal CRT Scanline
          matrixScanlineY = (matrixScanlineY + 120 * dt) % height;
          ctx.fillStyle = 'rgba(52, 211, 153, 0.04)';
          ctx.fillRect(0, matrixScanlineY, width, 3);
        }
      }

      // =========================================================
      // THEME ENGINE 2: DEEP COSMOS
      // =========================================================
      else if (currentTheme === 'deep-cosmos') {
        // A. Swirling Cosmic Nebulae
        if (currentMode === 'all' || currentMode === 'aurora') {
          const t = time * 0.0003;
          const neb1X = width * 0.3 + Math.sin(t) * 80;
          const neb1Y = height * 0.4 + Math.cos(t) * 60;
          const grad1 = ctx.createRadialGradient(neb1X, neb1Y, 0, neb1X, neb1Y, 380);
          grad1.addColorStop(0, 'rgba(59, 130, 246, 0.18)');
          grad1.addColorStop(0.5, 'rgba(79, 70, 229, 0.08)');
          grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = grad1;
          ctx.fillRect(0, 0, width, height);

          const neb2X = width * 0.75 + Math.cos(t * 1.3) * 70;
          const neb2Y = height * 0.65 + Math.sin(t * 1.3) * 50;
          const grad2 = ctx.createRadialGradient(neb2X, neb2Y, 0, neb2X, neb2Y, 340);
          grad2.addColorStop(0, 'rgba(147, 51, 234, 0.16)');
          grad2.addColorStop(0.6, 'rgba(30, 58, 138, 0.06)');
          grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = grad2;
          ctx.fillRect(0, 0, width, height);
        }

        // B. Constellations & Starfield
        if (currentMode === 'all' || currentMode === 'particles') {
          const starLen = cosmosStars.length;
          const connectDist = 110;
          const connectDistSq = connectDist * connectDist;

          // Physical updates & twinkling
          for (let i = 0; i < starLen; i++) {
            const s = cosmosStars[i];
            s.x += s.vx * 60 * dt;
            s.y += s.vy * 60 * dt;

            // Gravitational pull toward mouse
            if (targetMouse.active) {
              const dx = currentMouse.x - s.x;
              const dy = currentMouse.y - s.y;
              const distSq = dx * dx + dy * dy;
              if (distSq < 220 * 220 && distSq > 400) {
                const dist = Math.sqrt(distSq);
                s.x += (dx / dist) * 0.8;
                s.y += (dy / dist) * 0.8;
              }
            }

            // Wrap around
            if (s.x < 0) s.x = width;
            else if (s.x > width) s.x = 0;
            if (s.y < 0) s.y = height;
            else if (s.y > height) s.y = 0;

            // Twinkle
            const twinkle = Math.sin(time * s.twinkleSpeed + s.twinkleOffset);
            const currentAlpha = Math.max(0.15, s.alpha + twinkle * 0.3);

            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            ctx.fillStyle = s.color;
            ctx.globalAlpha = currentAlpha;
            ctx.fill();
            ctx.globalAlpha = 1;
          }

          // Draw Geometric Constellation Lines
          ctx.lineWidth = 0.65;
          for (let i = 0; i < starLen; i++) {
            const s1 = cosmosStars[i];
            for (let j = i + 1; j < starLen; j++) {
              const s2 = cosmosStars[j];
              const dx = s1.x - s2.x;
              const dy = s1.y - s2.y;
              const distSq = dx * dx + dy * dy;
              if (distSq < connectDistSq) {
                const dist = Math.sqrt(distSq);
                const lineAlpha = (1 - dist / connectDist) * 0.28;
                ctx.beginPath();
                ctx.moveTo(s1.x, s1.y);
                ctx.lineTo(s2.x, s2.y);
                ctx.strokeStyle = `rgba(129, 140, 248, ${lineAlpha})`;
                ctx.stroke();
              }
            }
          }

          // C. Blazing Comets / Shooting Stars
          cometTimer += dt;
          if (cometTimer > 3.5 && Math.random() < 0.4) {
            cometTimer = 0;
            comets.push({
              x: Math.random() * width * 0.8,
              y: Math.random() * height * 0.3,
              vx: Math.random() * 5 + 7,
              vy: Math.random() * 3 + 4,
              length: Math.random() * 60 + 80,
              alpha: 1,
              active: true,
              radius: Math.random() * 1.5 + 1.2,
            });
          }

          for (let i = comets.length - 1; i >= 0; i--) {
            const c = comets[i];
            c.x += c.vx * 60 * dt;
            c.y += c.vy * 60 * dt;
            c.alpha -= 0.016;

            if (c.alpha <= 0 || c.x > width + 100 || c.y > height + 100) {
              comets.splice(i, 1);
              continue;
            }

            const tailX = c.x - c.vx * 7;
            const tailY = c.y - c.vy * 7;

            const cometGrad = ctx.createLinearGradient(c.x, c.y, tailX, tailY);
            cometGrad.addColorStop(0, `rgba(255, 255, 255, ${c.alpha})`);
            cometGrad.addColorStop(0.2, `rgba(56, 189, 248, ${c.alpha * 0.8})`);
            cometGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');

            ctx.lineWidth = c.radius;
            ctx.beginPath();
            ctx.moveTo(c.x, c.y);
            ctx.lineTo(tailX, tailY);
            ctx.strokeStyle = cometGrad;
            ctx.stroke();

            // Comet Head Glow
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.radius * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${c.alpha})`;
            ctx.shadowColor = '#38bdf8';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      // =========================================================
      // THEME ENGINE 3: SUNSET AURORA
      // =========================================================
      else if (currentTheme === 'sunset-aurora') {
        const t = time * 0.0006;

        // A. Flowing Warm Aurora Ribbons
        if (currentMode === 'all' || currentMode === 'aurora') {
          const drawSunsetWave = (
            baseY: number,
            amp: number,
            freq: number,
            colStart: string,
            colEnd: string,
            speed: number
          ) => {
            ctx.beginPath();
            ctx.moveTo(0, height);
            const step = 22;
            for (let x = 0; x <= width + step; x += step) {
              const y =
                baseY +
                Math.sin(x * freq + t * speed) * amp +
                Math.cos(x * freq * 1.4 - t * speed * 0.7) * (amp * 0.45);
              ctx.lineTo(x, y);
            }
            ctx.lineTo(width, height);
            ctx.closePath();

            const grad = ctx.createLinearGradient(0, baseY - amp, 0, height);
            grad.addColorStop(0, colStart);
            grad.addColorStop(1, colEnd);
            ctx.fillStyle = grad;
            ctx.fill();
          };

          // 3 rich warm tiers: Crimson, Amber Gold, and Rose Sunset
          drawSunsetWave(height * 0.52, 65, 0.002, 'rgba(225, 29, 72, 0.24)', 'rgba(30, 4, 10, 0)', 1.0);
          drawSunsetWave(height * 0.65, 80, 0.0028, 'rgba(245, 158, 11, 0.20)', 'rgba(25, 10, 5, 0)', -0.8);
          drawSunsetWave(height * 0.78, 55, 0.0035, 'rgba(251, 113, 133, 0.16)', 'rgba(15, 5, 10, 0)', 1.3);
        }

        // B. Rising Campfire Embers & Floating Fireflies
        if (currentMode === 'all' || currentMode === 'particles') {
          embers.forEach((emb) => {
            emb.y += emb.vy * 60 * dt;
            emb.x += Math.sin(time * 0.002 + emb.pulseSpeed * 10) * 0.45;

            // Mouse thermal deflection
            if (targetMouse.active) {
              const dx = emb.x - currentMouse.x;
              const dy = emb.y - currentMouse.y;
              const distSq = dx * dx + dy * dy;
              if (distSq < 180 * 180 && distSq > 0) {
                const dist = Math.sqrt(distSq);
                const push = (1 - dist / 180) * 2.2;
                emb.x += (dx / dist) * push;
                emb.y -= push * 0.5; // Upward thermal lift
              }
            }

            // Loop to bottom
            if (emb.y < -20) {
              emb.y = height + 10;
              emb.x = Math.random() * width;
            }

            const currentAlpha = emb.alpha * (0.8 + Math.sin(time * emb.pulseSpeed) * 0.2);

            ctx.beginPath();
            ctx.arc(emb.x, emb.y, emb.radius, 0, Math.PI * 2);
            ctx.fillStyle = emb.color;
            ctx.globalAlpha = currentAlpha;
            ctx.shadowColor = emb.color;
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
          });
        }
      }

      // =========================================================
      // THEME ENGINE 4: MINIMAL MESH (TITANIUM GRAPHITE)
      // =========================================================
      else if (currentTheme === 'minimal-mesh') {
        const nodeLen = meshNodes.length;
        const connectDist = 145;
        const connectDistSq = connectDist * connectDist;

        // Move mesh nodes
        for (let i = 0; i < nodeLen; i++) {
          const n = meshNodes[i];
          n.x += n.vx * 60 * dt;
          n.y += n.vy * 60 * dt;

          // Elastic mouse avoidance
          if (targetMouse.active) {
            const dx = n.x - currentMouse.x;
            const dy = n.y - currentMouse.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < 160 * 160 && distSq > 0) {
              const dist = Math.sqrt(distSq);
              const force = (1 - dist / 160) * 3.5;
              n.x += (dx / dist) * force;
              n.y += (dy / dist) * force;
            }
          }

          // Bounce off walls
          if (n.x < 20 || n.x > width - 20) n.vx *= -1;
          if (n.y < 20 || n.y > height - 20) n.vy *= -1;
        }

        // Draw Interconnected Architectural Triangular Wireframe
        for (let i = 0; i < nodeLen; i++) {
          const n1 = meshNodes[i];
          for (let j = i + 1; j < nodeLen; j++) {
            const n2 = meshNodes[j];
            const dx = n1.x - n2.x;
            const dy = n1.y - n2.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < connectDistSq) {
              const dist = Math.sqrt(distSq);
              const alpha = (1 - dist / connectDist) * 0.22;

              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();

              // Translucent triangle fills for triplets
              for (let k = j + 1; k < nodeLen; k++) {
                const n3 = meshNodes[k];
                const d2 = Math.hypot(n2.x - n3.x, n2.y - n3.y);
                const d3 = Math.hypot(n1.x - n3.x, n1.y - n3.y);
                if (d2 < connectDist && d3 < connectDist) {
                  ctx.beginPath();
                  ctx.moveTo(n1.x, n1.y);
                  ctx.lineTo(n2.x, n2.y);
                  ctx.lineTo(n3.x, n3.y);
                  ctx.closePath();
                  ctx.fillStyle = 'rgba(56, 189, 248, 0.025)';
                  ctx.fill();
                  break;
                }
              }
            }
          }

          // Draw Nodes and Precision HUD Crosshairs
          ctx.beginPath();
          ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#94a3b8';
          ctx.globalAlpha = 0.8;
          ctx.fill();
          ctx.globalAlpha = 1;

          if (n1.hasCrosshair) {
            ctx.strokeStyle = 'rgba(148, 163, 184, 0.5)';
            ctx.lineWidth = 1;
            const arm = 6;
            ctx.beginPath();
            ctx.moveTo(n1.x - arm, n1.y);
            ctx.lineTo(n1.x + arm, n1.y);
            ctx.moveTo(n1.x, n1.y - arm);
            ctx.lineTo(n1.x, n1.y + arm);
            ctx.stroke();
          }
        }
      }

      // =========================================================
      // THEME ENGINE 5: MIDNIGHT ORCHID (SIGNATURE LUXURY)
      // =========================================================
      else {
        // A. Harmonic Silk Aurora Waves
        if (currentMode === 'all' || currentMode === 'aurora') {
          const t = time * 0.0008;
          const drawOrchidWave = (
            baseY: number,
            amp: number,
            freq: number,
            colStart: string,
            colEnd: string,
            speed: number
          ) => {
            ctx.beginPath();
            ctx.moveTo(0, height);
            const step = 20;
            for (let x = 0; x <= width + step; x += step) {
              const y =
                baseY +
                Math.sin(x * freq + t * speed) * amp +
                Math.cos(x * freq * 1.5 - t * speed * 0.8) * (amp * 0.5);
              ctx.lineTo(x, y);
            }
            ctx.lineTo(width, height);
            ctx.closePath();

            const grad = ctx.createLinearGradient(0, baseY - amp, 0, height);
            grad.addColorStop(0, colStart);
            grad.addColorStop(1, colEnd);
            ctx.fillStyle = grad;
            ctx.fill();
          };

          drawOrchidWave(height * 0.55, 60, 0.0022, 'rgba(159, 18, 57, 0.26)', 'rgba(30, 4, 15, 0)', 1.2);
          drawOrchidWave(height * 0.68, 75, 0.0031, 'rgba(112, 26, 117, 0.22)', 'rgba(20, 5, 26, 0)', -0.9);
          drawOrchidWave(height * 0.80, 50, 0.004, 'rgba(88, 28, 135, 0.18)', 'rgba(12, 3, 16, 0)', 1.5);
        }

        // B. Particles & Floating Code Glyphs
        if (currentMode === 'all' || currentMode === 'particles') {
          const pLen = orchidParticles.length;
          const connectDist = 135;
          const connectDistSq = connectDist * connectDist;

          for (let i = 0; i < pLen; i++) {
            const p = orchidParticles[i];
            p.x += p.vx * 60 * dt;
            p.y += p.vy * 60 * dt;

            if (p.x < -30) p.x = width + 30;
            else if (p.x > width + 30) p.x = -30;
            if (p.y < -30) p.y = height + 30;
            else if (p.y > height + 30) p.y = -30;

            // Draw lines
            for (let j = i + 1; j < pLen; j++) {
              const p2 = orchidParticles[j];
              const distSq = (p.x - p2.x) ** 2 + (p.y - p2.y) ** 2;
              if (distSq < connectDistSq) {
                const dist = Math.sqrt(distSq);
                const lineAlpha = (1 - dist / connectDist) * 0.24;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(244, 114, 182, ${lineAlpha})`;
                ctx.stroke();
              }
            }

            // Draw glyph or particle
            if (p.isGlyph && p.glyph) {
              ctx.save();
              ctx.font = 'bold 11px "JetBrains Mono", monospace';
              ctx.fillStyle = '#fde68a';
              ctx.globalAlpha = p.alpha * 0.85;
              ctx.shadowColor = p.color;
              ctx.shadowBlur = 8;
              ctx.fillText(p.glyph, p.x - 8, p.y + 4);
              ctx.restore();
            } else {
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
              ctx.fillStyle = p.color;
              ctx.globalAlpha = p.alpha;
              ctx.fill();
              ctx.globalAlpha = 1;
            }
          }
        }
      }

      // =========================================================
      // COMMON INTERACTIVE LAYERS: MOUSE SPOTLIGHT, SPARKS & RIPPLES
      // =========================================================

      // Mouse Spotlight Glow
      if (targetMouse.active && currentMouse.x > -100 && currentMouse.x < width + 100) {
        let spotCore = 'rgba(244, 63, 94, 0.22)';
        let spotOuter = 'rgba(126, 34, 206, 0.08)';
        let ringColor = '244, 114, 182';

        if (currentTheme === 'cyber-matrix') {
          spotCore = 'rgba(16, 185, 129, 0.25)';
          spotOuter = 'rgba(20, 184, 166, 0.08)';
          ringColor = '52, 211, 153';
        } else if (currentTheme === 'deep-cosmos') {
          spotCore = 'rgba(99, 102, 241, 0.26)';
          spotOuter = 'rgba(59, 130, 246, 0.08)';
          ringColor = '129, 140, 248';
        } else if (currentTheme === 'sunset-aurora') {
          spotCore = 'rgba(244, 63, 94, 0.24)';
          spotOuter = 'rgba(245, 158, 11, 0.10)';
          ringColor = '251, 146, 60';
        } else if (currentTheme === 'minimal-mesh') {
          spotCore = 'rgba(148, 163, 184, 0.18)';
          spotOuter = 'rgba(71, 85, 105, 0.06)';
          ringColor = '148, 163, 184';
        }

        const glowRadius = 260;
        const radialGrad = ctx.createRadialGradient(
          currentMouse.x,
          currentMouse.y,
          0,
          currentMouse.x,
          currentMouse.y,
          glowRadius
        );
        radialGrad.addColorStop(0, spotCore);
        radialGrad.addColorStop(0.45, spotOuter);
        radialGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = radialGrad;
        ctx.beginPath();
        ctx.arc(currentMouse.x, currentMouse.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Sleek Targeting Ring
        ctx.strokeStyle = `rgba(${ringColor}, 0.25)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(currentMouse.x, currentMouse.y, 28, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Supernova Click Shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const rip = shockwaves[i];
        rip.radius += (rip.maxRadius - rip.radius) * 0.07 + 1.2;
        rip.alpha -= 0.015;

        if (rip.alpha <= 0 || rip.radius >= rip.maxRadius) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = rip.color;
        ctx.globalAlpha = rip.alpha * 0.7;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Cursor Spark Trails
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.alpha -= 0.025;
        sp.radius *= 0.96;

        if (sp.alpha <= 0 || sp.radius < 0.3) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sp.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        role="presentation"
        aria-hidden="true"
        className={`fixed inset-0 pointer-events-none z-0 w-full h-full transition-opacity duration-700 ${className}`}
      />

      {/* Floating HUD Controller */}
      {showHud && (
        <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2 select-none">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-xl border border-white/15 shadow-xl text-[11px] font-mono text-slate-200">
            <span className="flex items-center gap-1 font-bold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {fps} FPS
            </span>

            <span className="text-white/20">|</span>

            <button
              type="button"
              onClick={() => setHudOpen(!hudOpen)}
              className="hover:text-pink-400 transition-colors flex items-center gap-1"
              title="Changer le mode du background"
            >
              <span className="text-slate-400">Mode:</span>
              <span className="font-bold text-white uppercase">
                {activeMode === 'all'
                  ? 'Cinématique'
                  : activeMode === 'aurora'
                  ? 'Nébuleuse'
                  : activeMode === 'grid'
                  ? 'Grille 3D'
                  : 'Particules'}
              </span>
              <span className="text-[9px]">▾</span>
            </button>
          </div>

          {hudOpen && (
            <div className="absolute bottom-10 left-0 flex flex-col gap-1 p-2 rounded-2xl bg-black/90 backdrop-blur-2xl border border-white/20 shadow-2xl min-w-[170px] text-xs">
              <div className="px-2 py-1 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Mode d'arrière-plan
              </div>
              {(
                [
                  { id: 'all', label: '✨ Tout (Cinématique)' },
                  { id: 'aurora', label: '🌊 Ondes Nébuleuse' },
                  { id: 'grid', label: '🌐 Grille Cyber 3D' },
                  { id: 'particles', label: '⚡ Particules & Code' },
                ] as { id: BackgroundMode; label: string }[]
              ).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setActiveMode(m.id);
                    setHudOpen(false);
                  }}
                  className={`text-left px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                    activeMode === m.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm'
                      : 'text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default InteractiveBackground;
