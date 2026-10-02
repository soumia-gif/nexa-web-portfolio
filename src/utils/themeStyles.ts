import { BackgroundTheme } from '../types';

export interface ThemeStyles {
  pageBg: string;
  pageText: string;
  heroGradient: string;
  primaryButton: string;
  secondaryButton: string;
  badge: string;
  badgeDot: string;
  orbitAmbient: string;
  orbitRing1: string;
  orbitRing2: string;
  orbitRing3: string;
  orbitCore: string;
  orbitBadge: string;
  cardBg: string;
  cardBorder: string;
}

export const getThemeStyles = (theme: BackgroundTheme = 'midnight-orchid'): ThemeStyles => {
  switch (theme) {
    case 'cyber-matrix':
      return {
        pageBg: 'bg-[#010905]',
        pageText: 'text-[#ecfdf5]',
        heroGradient: 'from-emerald-400 via-teal-300 to-green-300 drop-shadow-[0_2px_20px_rgba(16,185,129,0.5)]',
        primaryButton: 'bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 hover:from-emerald-400 hover:via-teal-400 hover:to-green-500 text-black font-extrabold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50',
        secondaryButton: 'border-emerald-700/60 bg-[#041a12]/85 text-[#ecfdf5] hover:bg-emerald-950/60 hover:border-emerald-400/80 shadow-md',
        badge: 'text-emerald-300 bg-emerald-950/70 border-emerald-700/50 shadow-lg shadow-emerald-950/40',
        badgeDot: 'text-emerald-400',
        orbitAmbient: 'bg-emerald-500/20',
        orbitRing1: 'border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.35)]',
        orbitRing2: 'border-teal-400/40 shadow-[0_0_15px_rgba(20,184,166,0.3)]',
        orbitRing3: 'border-green-400/50',
        orbitCore: 'bg-gradient-to-br from-emerald-200 via-teal-600 to-[#021a11] shadow-[inset_-8px_-8px_20px_rgba(0,0,0,0.9),inset_8px_8px_20px_rgba(167,243,208,0.5),0_10px_40px_rgba(16,185,129,0.45)]',
        orbitBadge: 'bg-[#021a11]/90 text-emerald-300 border-emerald-400/60 shadow-[0_0_15px_rgba(16,185,129,0.6)]',
        cardBg: 'bg-[#041a12]/85',
        cardBorder: 'border-emerald-900/50',
      };

    case 'deep-cosmos':
      return {
        pageBg: 'bg-[#020514]',
        pageText: 'text-[#f0f9ff]',
        heroGradient: 'from-blue-400 via-cyan-300 to-indigo-300 drop-shadow-[0_2px_20px_rgba(59,130,246,0.5)]',
        primaryButton: 'bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 hover:from-blue-500 hover:via-indigo-400 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50',
        secondaryButton: 'border-blue-700/60 bg-[#060e28]/85 text-[#f0f9ff] hover:bg-blue-950/60 hover:border-blue-400/80 shadow-md',
        badge: 'text-blue-300 bg-blue-950/70 border-blue-700/50 shadow-lg shadow-blue-950/40',
        badgeDot: 'text-blue-400',
        orbitAmbient: 'bg-blue-600/20',
        orbitRing1: 'border-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.35)]',
        orbitRing2: 'border-indigo-400/40 shadow-[0_0_15px_rgba(99,102,241,0.3)]',
        orbitRing3: 'border-cyan-400/50',
        orbitCore: 'bg-gradient-to-br from-blue-200 via-indigo-600 to-[#030b26] shadow-[inset_-8px_-8px_20px_rgba(0,0,0,0.9),inset_8px_8px_20px_rgba(191,219,254,0.5),0_10px_40px_rgba(59,130,246,0.45)]',
        orbitBadge: 'bg-[#040c2e]/90 text-blue-300 border-blue-400/60 shadow-[0_0_15px_rgba(59,130,246,0.6)]',
        cardBg: 'bg-[#050f29]/85',
        cardBorder: 'border-blue-900/50',
      };

    case 'sunset-aurora':
      return {
        pageBg: 'bg-[#0e0407]',
        pageText: 'text-[#fff7ed]',
        heroGradient: 'from-amber-400 via-orange-300 to-rose-400 drop-shadow-[0_2px_20px_rgba(245,158,11,0.5)]',
        primaryButton: 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 hover:from-amber-400 hover:via-orange-400 hover:to-rose-500 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50',
        secondaryButton: 'border-amber-700/60 bg-[#1c090e]/85 text-[#fff7ed] hover:bg-amber-950/60 hover:border-amber-400/80 shadow-md',
        badge: 'text-amber-300 bg-amber-950/70 border-amber-700/50 shadow-lg shadow-amber-950/40',
        badgeDot: 'text-amber-400',
        orbitAmbient: 'bg-amber-600/20',
        orbitRing1: 'border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.35)]',
        orbitRing2: 'border-orange-400/40 shadow-[0_0_15px_rgba(249,115,22,0.3)]',
        orbitRing3: 'border-rose-400/50',
        orbitCore: 'bg-gradient-to-br from-amber-200 via-orange-600 to-[#1f0904] shadow-[inset_-8px_-8px_20px_rgba(0,0,0,0.9),inset_8px_8px_20px_rgba(254,215,170,0.5),0_10px_40px_rgba(245,158,11,0.45)]',
        orbitBadge: 'bg-[#1a0705]/90 text-amber-300 border-amber-400/60 shadow-[0_0_15px_rgba(245,158,11,0.6)]',
        cardBg: 'bg-[#18080c]/85',
        cardBorder: 'border-amber-900/50',
      };

    case 'minimal-mesh':
      return {
        pageBg: 'bg-[#070a10]',
        pageText: 'text-[#f8fafc]',
        heroGradient: 'from-slate-100 via-slate-300 to-cyan-200 drop-shadow-[0_2px_20px_rgba(148,163,184,0.3)]',
        primaryButton: 'bg-gradient-to-r from-slate-700 via-slate-600 to-zinc-700 hover:from-slate-600 hover:to-zinc-600 text-white border border-slate-500 shadow-md shadow-slate-500/20',
        secondaryButton: 'border-slate-700/60 bg-[#0e1422]/85 text-[#f8fafc] hover:bg-slate-900/60 hover:border-slate-400/80 shadow-md',
        badge: 'text-slate-300 bg-slate-900/70 border-slate-700/50 shadow-lg shadow-slate-950/40',
        badgeDot: 'text-slate-400',
        orbitAmbient: 'bg-slate-500/20',
        orbitRing1: 'border-slate-400/50 shadow-[0_0_15px_rgba(148,163,184,0.3)]',
        orbitRing2: 'border-zinc-400/40 shadow-[0_0_15px_rgba(161,161,170,0.3)]',
        orbitRing3: 'border-cyan-400/40',
        orbitCore: 'bg-gradient-to-br from-slate-200 via-slate-600 to-[#0b0f19] shadow-[inset_-8px_-8px_20px_rgba(0,0,0,0.9),inset_8px_8px_20px_rgba(226,232,240,0.5),0_10px_40px_rgba(148,163,184,0.35)]',
        orbitBadge: 'bg-[#0d1320]/90 text-slate-200 border-slate-400/60 shadow-[0_0_15px_rgba(148,163,184,0.5)]',
        cardBg: 'bg-[#0d1320]/85',
        cardBorder: 'border-slate-800/60',
      };

    case 'midnight-orchid':
    default:
      return {
        pageBg: 'bg-[#07020b]',
        pageText: 'text-[#fdf4f8]',
        heroGradient: 'from-fuchsia-400 via-pink-300 to-rose-300 drop-shadow-[0_2px_20px_rgba(244,114,182,0.4)]',
        primaryButton: 'bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:via-rose-400 hover:to-purple-500 text-white shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50',
        secondaryButton: 'border-pink-700/60 bg-[#160a22]/85 text-[#fdf4f8] hover:bg-pink-950/60 hover:border-pink-500/80 shadow-md',
        badge: 'text-pink-300 bg-pink-950/60 border-pink-800/50 shadow-lg shadow-pink-950/30',
        badgeDot: 'text-pink-400',
        orbitAmbient: 'bg-pink-600/20',
        orbitRing1: 'border-pink-400/40 shadow-[0_0_15px_rgba(244,114,182,0.2)]',
        orbitRing2: 'border-fuchsia-400/40 shadow-[0_0_15px_rgba(232,121,249,0.2)]',
        orbitRing3: 'border-rose-400/50',
        orbitCore: 'bg-gradient-to-br from-rose-200 via-pink-600 to-[#12051a] shadow-[inset_-8px_-8px_20px_rgba(0,0,0,0.9),inset_8px_8px_20px_rgba(255,220,230,0.5),0_10px_40px_rgba(236,72,153,0.35)]',
        orbitBadge: 'bg-[#160722]/85 text-pink-300 border-pink-400/50 shadow-[0_0_15px_rgba(236,72,153,0.6)]',
        cardBg: 'bg-[#12071a]/90',
        cardBorder: 'border-pink-900/50',
      };
  }
};
