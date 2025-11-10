import { useState, useEffect, useCallback, useRef } from 'react';
import type { Direction, Coordinate } from '../types';
import { useSettings } from '../context/SettingsContext';

const useSnakeGame = (onGameOver: () => void) => {
    const { settings } = useSettings();
    const { gridSize, speed, borders } = settings;

    const createInitialSnake = (): Coordinate[] => {
        const center = Math.floor(gridSize / 2);
        return [
            { x: center, y: center },
            { x: center - 1, y: center },
            { x: center - 2, y: center },
        ];
    };
    
    const [snake, setSnake] = useState<Coordinate[]>(createInitialSnake);
    const [food, setFood] = useState<Coordinate>(() => generateFood(gridSize, snake));
    const [powerUp, setPowerUp] = useState<Coordinate | null>(null);
    const [direction, setDirection] = useState<Direction>('RIGHT');
    const [isPaused, setIsPaused] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('snakeHighScore') || 0));
    const [lives, setLives] = useState(3);
    const [showPowerUpEffect, setShowPowerUpEffect] = useState(false);
    
    const directionRef = useRef(direction);
    directionRef.current = direction;

    const powerUpTimerRef = useRef<number | null>(null);

    const resetFullGame = useCallback(() => {
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('snakeHighScore', score.toString());
        }
        setSnake(createInitialSnake());
        setFood(generateFood(gridSize, createInitialSnake()));
        setDirection('RIGHT');
        setScore(0);
        setLives(3);
        setPowerUp(null);
        if (powerUpTimerRef.current) clearTimeout(powerUpTimerRef.current);
    }, [score, highScore, gridSize]);

    const handleCrash = useCallback(() => {
        const newLives = lives - 1;
        setLives(newLives);

        if (newLives <= 0) {
            onGameOver();
            resetFullGame();
        } else {
            // Soft reset: reset snake position but keep score
            setSnake(createInitialSnake());
            setDirection('RIGHT');
            setIsPaused(true);
            setTimeout(() => setIsPaused(false), 500);
        }
    }, [lives, onGameOver, resetFullGame]);

    const changeDirection = useCallback((newDirection: Direction) => {
        const currentDirection = directionRef.current;
        if (
            (newDirection === 'UP' && currentDirection !== 'DOWN') ||
            (newDirection === 'DOWN' && currentDirection !== 'UP') ||
            (newDirection === 'LEFT' && currentDirection !== 'RIGHT') ||
            (newDirection === 'RIGHT' && currentDirection !== 'LEFT')
        ) {
            setDirection(newDirection);
            if(isPaused) setIsPaused(false);
        }
    }, [isPaused]);

    const togglePause = useCallback(() => {
        setIsPaused(p => !p);
    }, []);
    
    const spawnPowerUp = (currentSnake: Coordinate[]) => {
        setPowerUp(generateFood(gridSize, currentSnake));
        if (powerUpTimerRef.current) clearTimeout(powerUpTimerRef.current);
        powerUpTimerRef.current = window.setTimeout(() => setPowerUp(null), 8000);
    };

    useEffect(() => {
        if (isPaused) return;

        const gameInterval = setInterval(() => {
            setSnake(prevSnake => {
                const newSnake = [...prevSnake];
                let head = { ...newSnake[0] };

                switch (direction) {
                    case 'UP': head.y -= 1; break;
                    case 'DOWN': head.y += 1; break;
                    case 'LEFT': head.x -= 1; break;
                    case 'RIGHT': head.x += 1; break;
                }
                
                if (!borders) {
                    if (head.x < 0) head.x = gridSize - 1;
                    if (head.x >= gridSize) head.x = 0;
                    if (head.y < 0) head.y = gridSize - 1;
                    if (head.y >= gridSize) head.y = 0;
                }

                if ((borders && (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize)) ||
                    newSnake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
                    clearInterval(gameInterval);
                    handleCrash();
                    return prevSnake;
                }

                newSnake.unshift(head);

                if (powerUp && head.x === powerUp.x && head.y === powerUp.y) {
                    setLives(l => l + 1);
                    setPowerUp(null);
                    if (powerUpTimerRef.current) clearTimeout(powerUpTimerRef.current);
                    setShowPowerUpEffect(true);
                    setTimeout(() => setShowPowerUpEffect(false), 1500);
                }

                if (head.x === food.x && head.y === food.y) {
                    const newScore = score + 10;
                    setScore(newScore);
                    if (newScore > 0 && newScore % 100 === 0) {
                       spawnPowerUp(newSnake);
                    }
                    setFood(generateFood(gridSize, newSnake));
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        }, speed);

        return () => clearInterval(gameInterval);
    }, [snake, direction, food, powerUp, isPaused, speed, gridSize, borders, handleCrash, score]);
    
    useEffect(() => {
        resetFullGame();
    }, [gridSize]);

    return { snake, food, powerUp, score, highScore, lives, isPaused, gridSize, showPowerUpEffect, changeDirection, togglePause };
};

function generateFood(gridSize: number, snake: Coordinate[]): Coordinate {
    while (true) {
        const newFood = {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize),
        };
        if (!snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
            return newFood;
        }
    }
}


export default useSnakeGame;