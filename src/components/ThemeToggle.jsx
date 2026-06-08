import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`
                p-2 rounded-full transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-DEFAULT
                ${theme === 'light'
                    ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    : 'bg-dark-card text-gold hover:bg-gray-800'}
            `}
            aria-label="Toggle Dark Mode"
            title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
            {theme === 'light' ? (
                <FiMoon className="w-5 h-5" />
            ) : (
                <FiSun className="w-5 h-5" />
            )}
        </button>
    );
};

export default ThemeToggle;
