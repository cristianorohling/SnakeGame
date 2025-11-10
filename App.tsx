import React, { useState, useCallback } from 'react';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { LanguageProvider } from './context/LanguageContext';
import GameScreen from './components/GameScreen';
import MainMenu from './components/MainMenu';
import OptionsScreen from './components/OptionsScreen';
import CreditsScreen from './components/CreditsScreen';

type GameState = 'MENU' | 'PLAYING' | 'OPTIONS' | 'CREDITS';

const AppContent: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>('MENU');
    const { settings } = useSettings();

    const startGame = useCallback(() => setGameState('PLAYING'), []);
    const showMenu = useCallback(() => setGameState('MENU'), []);
    const showOptions = useCallback(() => setGameState('OPTIONS'), []);
    const showCredits = useCallback(() => setGameState('CREDITS'), []);

    const renderGameState = () => {
        switch (gameState) {
            case 'PLAYING':
                return <GameScreen onGameOver={showMenu} />;
            case 'OPTIONS':
                return <OptionsScreen onBack={showMenu} />;
            case 'CREDITS':
                return <CreditsScreen onBack={showMenu} />;
            case 'MENU':
            default:
                return <MainMenu onPlay={startGame} onOptions={showOptions} onCredits={showCredits} />;
        }
    };

    return (
        <div className={`w-full h-full bg-gray-900 text-white overflow-hidden transition-colors duration-500 ${settings.theme.background}`}>
            <div className="w-full h-full p-2 sm:p-4">
                {renderGameState()}
            </div>
        </div>
    );
};

const App: React.FC = () => (
    <SettingsProvider>
        <LanguageProvider>
            <AppContent />
        </LanguageProvider>
    </SettingsProvider>
);

export default App;