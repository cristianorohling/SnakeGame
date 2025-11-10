import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { useLanguage } from '../context/LanguageContext';
import { THEMES, SPEEDS, GRID_SIZES } from '../constants';
import Button from './shared/Button';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import type { Locale } from '../types';

import FlagPTIcon from './icons/flags/FlagPTIcon';
import FlagENIcon from './icons/flags/FlagENIcon';
import FlagESIcon from './icons/flags/FlagESIcon';
import FlagITIcon from './icons/flags/FlagITIcon';
import FlagJPIcon from './icons/flags/FlagJPIcon';

const LANGUAGES: { code: Locale; Icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
    { code: 'pt', Icon: FlagPTIcon },
    { code: 'en', Icon: FlagENIcon },
    { code: 'es', Icon: FlagESIcon },
    { code: 'it', Icon: FlagITIcon },
    { code: 'ja', Icon: FlagJPIcon },
];

interface OptionsScreenProps {
    onBack: () => void;
}

const OptionsScreen: React.FC<OptionsScreenProps> = ({ onBack }) => {
    const { settings, saveSettings } = useSettings();
    const { locale, setLocale, t } = useLanguage();

    const handleSettingChange = <T extends keyof typeof settings>(key: T, value: (typeof settings)[T]) => {
        saveSettings({ ...settings, [key]: value });
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center animate-fadeIn p-2 sm:p-4">
            <div className="w-full max-w-md lg:max-w-2xl flex flex-col items-center text-center">
                <div className="relative w-full flex justify-center items-center mb-4">
                    <button onClick={onBack} className={`absolute left-0 p-2 rounded-full transition-colors ${settings.theme.buttonHoverBg}`}>
                        <ArrowLeftIcon className={`w-8 h-8 ${settings.theme.text}`} />
                    </button>
                    <h1 className={`text-4xl sm:text-5xl font-black uppercase font-orbitron ${settings.theme.text}`}
                        style={{ textShadow: `0 0 8px currentColor` }}>
                        {t('optionsTitle')}
                    </h1>
                </div>
                
                <div className="w-full space-y-3">
                     <OptionItem label={t('language')}>
                        {LANGUAGES.map(({ code, Icon }) => (
                            <button key={code} onClick={() => setLocale(code)}
                                className={`w-12 h-8 p-0.5 rounded-md transition-all transform hover:scale-110 focus:outline-none ring-2 ring-offset-2 ring-offset-black/20 ${locale === code ? `${settings.theme.buttonBg} ring-current` : 'bg-white/10 hover:bg-white/20 ring-transparent'}`}>
                                <Icon className="w-full h-full object-cover rounded-sm" />
                            </button>
                        ))}
                    </OptionItem>
                    <OptionItem label={t('speed')}>
                        {SPEEDS.map(speed => (
                            <button key={speed.value} onClick={() => handleSettingChange('speed', speed.value)}
                                className={`px-3 py-1.5 rounded-md transition-colors text-xs sm:text-sm ${settings.speed === speed.value ? `${settings.theme.buttonBg} ${settings.theme.text}` : 'bg-white/10 hover:bg-white/20'}`}>
                                {t(speed.label.toLowerCase())}
                            </button>
                        ))}
                    </OptionItem>
                    <OptionItem label={t('gridSize')}>
                        {GRID_SIZES.map(size => (
                            <button key={size.value} onClick={() => handleSettingChange('gridSize', size.value)}
                                className={`px-3 py-1.5 rounded-md transition-colors text-xs sm:text-sm ${settings.gridSize === size.value ? `${settings.theme.buttonBg} ${settings.theme.text}` : 'bg-white/10 hover:bg-white/20'}`}>
                                {t(size.label.toLowerCase())}
                            </button>
                        ))}
                    </OptionItem>
                    <OptionItem label={t('borders')}>
                        <button onClick={() => handleSettingChange('borders', !settings.borders)}
                            className={`px-4 py-2 rounded-md transition-all ${settings.theme.buttonBg} text-sm`}>
                            {settings.borders ? t('bordersOn') : t('bordersOff')}
                        </button>
                    </OptionItem>
                    <OptionItem label={t('theme')}>
                        {Object.values(THEMES).map(theme => (
                            <button key={theme.name} onClick={() => handleSettingChange('theme', theme)}
                                className={`px-3 py-1.5 rounded-md transition-colors text-xs sm:text-sm ${settings.theme.name === theme.name ? `${settings.theme.buttonBg} ${settings.theme.text}` : 'bg-white/10 hover:bg-white/20'}`}>
                                {theme.name}
                            </button>
                        ))}
                    </OptionItem>
                </div>

                <div className="mt-6 w-full">
                    <Button onClick={onBack}>{t('backToMenu')}</Button>
                </div>
            </div>
        </div>
    );
};

const OptionItem: React.FC<{label: string, children: React.ReactNode}> = ({label, children}) => {
    const { settings } = useSettings();
    return (
         <div className={`flex flex-row items-center justify-between w-full p-2 sm:p-3 rounded-lg bg-black/20 border border-white/10 ${settings.theme.text}`}>
            <span className="text-sm sm:text-base font-semibold mr-2 sm:mr-4 whitespace-nowrap">{label}</span>
            <div className="flex items-center flex-wrap justify-end gap-1 sm:gap-2">
                {children}
            </div>
        </div>
    );
}

export default OptionsScreen;