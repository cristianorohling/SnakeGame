import React from 'react';
import type { Coordinate } from '../types';
import { useSettings } from '../context/SettingsContext';
import HeartIcon from './icons/HeartIcon';

interface GameBoardProps {
    snake: Coordinate[];
    food: Coordinate;
    powerUp: Coordinate | null;
    gridSize: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ snake, food, powerUp, gridSize }) => {
    const { settings } = useSettings();
    const { theme } = settings;

    const cells = Array.from({ length: gridSize * gridSize }, (_, i) => {
        const x = i % gridSize;
        const y = Math.floor(i / gridSize);

        const isSnakeHead = snake.length > 0 && snake[0].x === x && snake[0].y === y;
        const isSnakeBody = snake.slice(1).some(segment => segment.x === x && segment.y === y);
        const isFood = food.x === x && food.y === y;
        const isPowerUp = powerUp && powerUp.x === x && powerUp.y === y;

        let cellContent = null;
        if (isSnakeHead) {
            cellContent = <div className={`w-full h-full rounded-sm ${theme.snakeHead}`} />;
        } else if (isSnakeBody) {
            cellContent = <div className={`w-full h-full rounded-sm ${theme.snakeBody}`} />;
        } else if (isFood) {
            cellContent = <div className={`w-full h-full rounded-full animate-pulse ${theme.food}`} />;
        } else if (isPowerUp) {
            cellContent = <div className={`w-full h-full flex items-center justify-center`}>
                <HeartIcon className={`w-full h-full p-0.5 text-red-400 animate-bounce ${theme.powerUp}`} />
            </div>;
        }
        
        const cellBg = (theme.name === 'Matrix' || theme.name === 'Tron') ? 'bg-black/80' : 'bg-transparent';

        return <div key={i} className={`w-full h-full ${cellBg}`}>{cellContent}</div>;
    });

    return (
        <div 
            className={`w-full h-full grid rounded-lg overflow-hidden border ${theme.grid}`}
            style={{ 
                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                gap: '1px',
                backgroundColor: 'currentColor'
            }}
        >
            {cells}
        </div>
    );
};

export default GameBoard;