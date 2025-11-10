import type { GameSettings, Theme } from './types';

export const THEMES: Record<string, Theme> = {
    MATRIX: {
        name: 'Matrix',
        background: 'matrix-bg',
        grid: 'border-green-500/20',
        snakeHead: 'bg-green-300 shadow-[0_0_10px_#86efac]',
        snakeBody: 'bg-green-500',
        food: 'bg-red-500 shadow-[0_0_10px_#ef4444]',
        powerUp: 'bg-white shadow-[0_0_20px_#fff,0_0_10px_#fff]',
        text: 'text-green-400',
        buttonBg: 'bg-green-900/50 border-green-400',
        buttonHoverBg: 'hover:bg-green-800/60',
    },
    TRON: {
        name: 'Tron',
        background: 'tron-bg',
        grid: 'border-cyan-400/30',
        snakeHead: 'bg-cyan-200 shadow-[0_0_15px_#67e8f9,0_0_5px_#fff]',
        snakeBody: 'bg-cyan-400',
        food: 'bg-orange-400 shadow-[0_0_15px_#f97316,0_0_5px_#fff]',
        powerUp: 'bg-yellow-300 shadow-[0_0_20px_#facc15,0_0_10px_#fff]',
        text: 'text-cyan-300',
        buttonBg: 'bg-black/50 border-cyan-400',
        buttonHoverBg: 'hover:bg-cyan-400/20 hover:shadow-[0_0_15px_#67e8f9]',
    },
    NEON: {
        name: 'Neon',
        background: 'bg-gray-900',
        grid: 'border-gray-800',
        snakeHead: 'bg-cyan-300 shadow-[0_0_8px_#67e8f9]',
        snakeBody: 'bg-cyan-500',
        food: 'bg-fuchsia-500 shadow-[0_0_8px_#d946ef]',
        powerUp: 'bg-yellow-300 shadow-[0_0_15px_#facc15]',
        text: 'text-cyan-300',
        buttonBg: 'bg-cyan-500/20 border-cyan-400',
        buttonHoverBg: 'hover:bg-cyan-500/40',
    },
    RETRO: {
        name: 'Retro',
        background: 'bg-[#1F222B]',
        grid: 'border-gray-700',
        snakeHead: 'bg-green-400',
        snakeBody: 'bg-green-500',
        food: 'bg-red-500',
        powerUp: 'bg-blue-400',
        text: 'text-gray-200',
        buttonBg: 'bg-green-600/80 border-green-500',
        buttonHoverBg: 'hover:bg-green-600',
    },
};

export const DEFAULT_SETTINGS: GameSettings = {
    speed: 150, // ms per tick
    gridSize: 20,
    borders: true,
    theme: THEMES.TRON,
};

export const SPEEDS = [
    { label: 'Slow', value: 200 },
    { label: 'Normal', value: 150 },
    { label: 'Fast', value: 100 },
    { label: 'Insane', value: 50 },
];

export const GRID_SIZES = [
    { label: 'Small', value: 15 },
    { label: 'Medium', value: 20 },
    { label: 'Large', value: 25 },
    { label: 'Huge', value: 30 },
];