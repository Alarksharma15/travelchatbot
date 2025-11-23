import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    // Get initial language from localStorage or default to 'en'
    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem('preferredLanguage');
        return savedLanguage || 'en';
    });

    // Save language preference to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('preferredLanguage', language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'ja' : 'en');
    };

    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];

        for (const k of keys) {
            value = value?.[k];
            if (value === undefined) {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }

        return value;
    };

    const value = {
        language,
        setLanguage,
        toggleLanguage,
        t,
        isJapanese: language === 'ja'
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
