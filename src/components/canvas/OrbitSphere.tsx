import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { getThemeStyles } from '../../utils/themeStyles';

export const OrbitSphere: React.FC = () => {
  const { bgTheme } = useTheme();
  const styles = getThemeStyles(bgTheme);

  return (
    <div className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 flex items-center justify-center select-none pointer-events-auto">
      {/* Dynamic Themed Ambient Glow */}
      <div
        className={`absolute inset-0 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none ${styles.orbitAmbient}`}
      />

      {/* 3D Concentric Orbit Rings */}
      <div className="relative w-full h-full flex items-center justify-center [perspective:1000px]">
        
        {/* Ring 1 - Outer Ellipse (Tilt 68deg X, -20deg Y) */}
        <div
          className="absolute w-64 h-64 sm:w-80 sm:h-80 [transform-style:preserve-3d]"
          style={{ transform: 'rotateX(68deg) rotateY(-20deg)' }}
        >
          <div
            className={`w-full h-full rounded-full border border-dashed transition-all duration-700 animate-[spin_24s_linear_infinite] ${styles.orbitRing1}`}
          >
            {/* Orbital Satellite 1 */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-tr from-white/90 via-white/50 to-white/20 shadow-md flex items-center justify-center text-[8px] font-bold text-black border border-white/60">
              JS
            </div>
            {/* Orbital Satellite 2 */}
            <div className="absolute -bottom-2 left-1/4 w-4 h-4 rounded-full bg-gradient-to-tr from-white via-slate-300 to-white/40 shadow-md" />
          </div>
        </div>

        {/* Ring 2 - Middle Ellipse */}
        <div
          className="absolute w-56 h-56 sm:w-72 sm:h-72 [transform-style:preserve-3d]"
          style={{ transform: 'rotateX(-62deg) rotateY(35deg)' }}
        >
          <div
            className={`w-full h-full rounded-full border transition-all duration-700 animate-[spin_18s_linear_infinite_reverse] ${styles.orbitRing2}`}
          >
            {/* Orbital Satellite 3 */}
            <div className="absolute top-1/4 -right-2 w-4 h-4 rounded-full bg-white/70 shadow-sm" />
            {/* Orbital Tech Badge (React) */}
            <div className="absolute bottom-2 right-1/4 px-2 py-0.5 rounded-full bg-black/80 text-white border border-white/20 text-[9px] font-mono shadow-lg">
              React
            </div>
          </div>
        </div>

        {/* Ring 3 - Inner Steep Ellipse */}
        <div
          className="absolute w-44 h-44 sm:w-60 sm:h-60 [transform-style:preserve-3d]"
          style={{ transform: 'rotateX(25deg) rotateY(70deg)' }}
        >
          <div
            className={`w-full h-full rounded-full border border-dotted transition-all duration-700 animate-[spin_14s_linear_infinite] ${styles.orbitRing3}`}
          >
            <div className="absolute top-0 left-1/3 px-1.5 py-0.5 rounded-full bg-black/80 text-white border border-white/20 text-[8px] font-mono shadow-md">
              Node
            </div>
          </div>
        </div>

        {/* Center Metallic Core Sphere Styled per Visual Theme */}
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center transition-transform hover:scale-105 duration-300">
          <div
            className={`w-full h-full rounded-full shadow-2xl relative overflow-hidden transition-all duration-700 ${styles.orbitCore}`}
          >
            {/* Top specular highlight */}
            <div className="absolute top-2 left-3 w-10 h-6 sm:w-14 sm:h-8 rounded-full bg-white/60 blur-[3px] -rotate-45 pointer-events-none" />
            
            {/* Inner Emblem Badge */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-black text-lg sm:text-2xl tracking-tighter backdrop-blur-sm border transition-colors ${styles.orbitBadge}`}
              >
                ▲
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
