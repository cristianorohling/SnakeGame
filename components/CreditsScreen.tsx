import React from 'react';
import Button from './shared/Button';
import Title from './shared/Title';
import { useLanguage } from '../context/LanguageContext';

interface CreditsScreenProps {
    onBack: () => void;
}

const CreditsScreen: React.FC<CreditsScreenProps> = ({ onBack }) => {
    const { t } = useLanguage();
    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center animate-fadeIn space-y-8">
            <div className="max-w-lg lg:max-w-2xl">
                <Title>{t('creditsTitle')}</Title>
                <div className="text-lg space-y-3 leading-relaxed mt-8">
                    <p>
                        <span className="font-semibold">{t('developedBy')}:</span> Cristiano Rohling
                    </p>
                    <p>
                        {t('assistedBy')}{' '}
                        <span className="font-semibold">Google AI Studio</span>.
                    </p>
                    <p className="text-sm text-gray-400 pt-2">
                        {t('builtWith')}
                    </p>
                </div>
                <div className="w-full max-w-xs mx-auto mt-8">
                    <Button onClick={onBack}>{t('backToMenu')}</Button>
                </div>
            </div>
        </div>
    );
};

export default CreditsScreen;