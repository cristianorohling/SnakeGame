import React, { useEffect, useRef, useCallback } from 'react';
import useSnakeGame from '../hooks/useSnakeGame';
import GameBoard from './GameBoard';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';
import Button from './shared/Button';
import HeartIcon from './icons/HeartIcon';
import type { Direction } from '../types';

interface GameScreenProps {
    onGameOver: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onGameOver: showMenu }) => {
    const { snake, food, powerUp, score, highScore, lives, isPaused, gridSize, showPowerUpEffect, changeDirection, togglePause } = useSnakeGame(showMenu);
    const { settings } = useSettings();
    const { t } = useLanguage();

    const isGameOver = lives <= 0;
    const isTouchDevice = 'ontouchstart' in window;

    const gameBoardRef = useRef<HTMLDivElement>(null);
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key;
            let newDirection: Direction | null = null;
            if (e.repeat) return;

            if ((key === 'ArrowUp' || key.toLowerCase() === 'w')) newDirection = 'UP';
            else if ((key === 'ArrowDown' || key.toLowerCase() === 's')) newDirection = 'DOWN';
            else if ((key === 'ArrowLeft' || key.toLowerCase() === 'a')) newDirection = 'LEFT';
            else if ((key === 'ArrowRight' || key.toLowerCase() === 'd')) newDirection = 'RIGHT';
            
            if (newDirection) {
                e.preventDefault();
                changeDirection(newDirection);
            }

            if (key === ' ' || key === 'Escape') {
                e.preventDefault();
                togglePause();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [changeDirection, togglePause]);

    // Touch controls
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, []);

    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
        if (!touchStartRef.current) return;

        const touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
        const deltaX = touchEnd.x - touchStartRef.current.x;
        const deltaY = touchEnd.y - touchStartRef.current.y;
        const minSwipeDistance = 30;

        if (Math.abs(deltaX) > Math.abs(deltaY)) { // Horizontal swipe
            if (Math.abs(deltaX) > minSwipeDistance) {
                changeDirection(deltaX > 0 ? 'RIGHT' : 'LEFT');
            }
        } else { // Vertical swipe
            if (Math.abs(deltaY) > minSwipeDistance) {
                changeDirection(deltaY > 0 ? 'DOWN' : 'UP');
            }
        }

        touchStartRef.current = null;
    }, [changeDirection]);

    return (
        <div className="w-full h-full flex flex-col gap-2 sm:gap-4 animate-fadeIn">
            {/* Row 1: Score Header */}
            <div className={`flex-shrink-0 w-full max-w-4xl mx-auto flex justify-between items-center px-2 font-bold ${settings.theme.text}`}>
                <div className='text-xl'>{t('scoreLabel')}: <span className="text-2xl font-black">{score}</span></div>
                <div className="flex items-center gap-1">
                    {Array.from({ length: lives }).map((_, i) => (
                       <HeartIcon key={i} className="w-6 h-6 text-red-500" style={{filter: 'drop-shadow(0 0 3px #ef4444)'}} />
                    ))}
                </div>
                <div className='text-xl'>{t('highScoreLabel')}: <span className="text-2xl font-black">{highScore}</span></div>
            </div>

            {/* Row 2: Game Board Area */}
            <div className="relative w-full flex-grow grid place-items-center min-h-0">
                <div
                    ref={gameBoardRef}
                    className="relative aspect-square w-full max-w-full max-h-full sm:w-auto sm:h-full"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <GameBoard snake={snake} food={food} powerUp={powerUp} gridSize={gridSize} />
                    
                    {showPowerUpEffect && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                            <h2 className={`font-orbitron font-black text-5xl sm:text-7xl text-yellow-300 animate-powerup-effect`}
                                style={{ WebkitTextStroke: '2px black' }}
                            >
                                +1 VIDA!
                            </h2>
                        </div>
                    )}

                    {(isGameOver || isPaused) && (
                        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-lg backdrop-blur-sm animate-fadeIn z-10">
                            <h2 className={`text-5xl font-extrabold uppercase ${settings.theme.text}`}>{isGameOver ? t('gameOver') : t('paused')}</h2>
                            {isGameOver && <p className={`mt-2 text-xl ${settings.theme.text}`}>{t('yourScore')}: {score}</p>}
                            <div className="mt-8 w-full max-w-xs">
                               {(isPaused || isGameOver) && <Button onClick={showMenu}>{t('backToMenu')}</Button>}
                            </div>
                        </div>
                    )}
                </div>
            </div>

             {/* Row 3: Controls Text */}
             <p className={`flex-shrink-0 text-sm text-center text-gray-400 ${settings.theme.text}`}>
                {isTouchDevice ? t('controlsTouch') : t('controlsKeyboard')}
             </p>
        </div>
    );
};

export default GameScreen;