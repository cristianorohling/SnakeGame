
import React from 'react';
import { useSettings } from '../../context/SettingsContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
    const { settings } = useSettings();
    const { theme } = settings;

    return (
        <button
            className={`w-full px-6 py-3 text-lg font-semibold border-2 rounded-lg transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${theme.text} ${theme.buttonBg} ${theme.buttonHoverBg} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
