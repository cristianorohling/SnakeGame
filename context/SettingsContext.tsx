
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { GameSettings } from '../types';
import { DEFAULT_SETTINGS, THEMES } from '../constants';

interface SettingsContextType {
    settings: GameSettings;
    setSettings: React.Dispatch<React.SetStateAction<GameSettings>>;
    saveSettings: (newSettings: GameSettings) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<GameSettings>(() => {
        try {
            const savedSettings = localStorage.getItem('snakeGameSettings');
            if (savedSettings) {
                const parsed = JSON.parse(savedSettings);
                // Ensure theme object is updated from constants if name matches
                const themeName = parsed.theme?.name || DEFAULT_SETTINGS.theme.name;
                const theme = Object.values(THEMES).find(t => t.name === themeName) || DEFAULT_SETTINGS.theme;
                return { ...DEFAULT_SETTINGS, ...parsed, theme };
            }
        } catch (error) {
            console.error('Failed to load settings from localStorage', error);
        }
        return DEFAULT_SETTINGS;
    });

    const saveSettings = useCallback((newSettings: GameSettings) => {
        setSettings(newSettings);
        try {
            // Only store name of theme, not the whole object
            const storableSettings = { ...newSettings, theme: { name: newSettings.theme.name } };
            localStorage.setItem('snakeGameSettings', JSON.stringify(storableSettings));
        } catch (error) {
            console.error('Failed to save settings to localStorage', error);
        }
    }, []);
    
    useEffect(() => {
        saveSettings(settings);
    }, [settings, saveSettings]);

    return (
        <SettingsContext.Provider value={{ settings, setSettings: saveSettings, saveSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = (): SettingsContextType => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
