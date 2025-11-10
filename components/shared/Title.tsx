
import React from 'react';
import { useSettings } from '../../context/SettingsContext';

interface TitleProps {
    children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
    const { settings } = useSettings();
    return (
        <h1 className={`text-6xl md:text-7xl font-black uppercase tracking-widest font-orbitron ${settings.theme.text}`}
            style={{ textShadow: `0 0 10px currentColor, 0 0 25px currentColor` }}>
            {children}
        </h1>
    );
};

export default Title;