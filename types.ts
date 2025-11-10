export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface Coordinate {
    x: number;
    y: number;
}

export type Locale = 'en' | 'pt' | 'es' | 'it' | 'ja';

export interface GameSettings {
    speed: number;
    gridSize: number;
    borders: boolean; // true for classic (walls kill), false for wrap-around
    theme: Theme;
}

export interface Theme {
    name: string;
    background: string;
    grid: string;
    snakeHead: string;
    snakeBody: string;
    food: string;
    powerUp: string;
    text: string;
    buttonBg: string;
    buttonHoverBg: string;
}
