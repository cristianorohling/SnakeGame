import React from 'react';
import Button from './shared/Button';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';

interface MainMenuProps {
    onPlay: () => void;
    onOptions: () => void;
    onCredits: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onPlay, onOptions, onCredits }) => {
    const { settings } = useSettings();
    const { t } = useLanguage();

    const getLogoStyle = () => {
        let strokeColor = 'rgba(255, 255, 255, 0.1)';
        switch(settings.theme.name) {
            case 'Tron':
                strokeColor = 'rgba(0, 200, 255, 0.2)';
                break;
            case 'Matrix':
                strokeColor = 'rgba(0, 255, 0, 0.2)';
                break;
            case 'Neon':
                strokeColor = 'rgba(103, 232, 249, 0.2)';
                break;
            case 'Retro':
                strokeColor = 'rgba(74, 222, 128, 0.2)';
                break;
        }

        return {
            WebkitTextStroke: `2px ${strokeColor}`,
            textShadow: `0 0 20px ${strokeColor}, 0 0 40px ${strokeColor}`
        }
    }

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center animate-fadeIn">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                 <h1 className={`font-orbitron font-black text-transparent bg-clip-text text-[30vw] md:text-[25vw] leading-none select-none uppercase`}
                    style={getLogoStyle()}
                 >
                    SNAKE
                </h1>
            </div>
            <div className="w-full max-w-sm md:max-w-md space-y-6 z-10">
                <Button onClick={onPlay}>{t('play')}</Button>
                <Button onClick={onOptions}>{t('options')}</Button>
                <Button onClick={onCredits}>{t('credits')}</Button>
            </div>
        </div>
    );
};

export default MainMenu;