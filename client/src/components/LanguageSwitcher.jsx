import { Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './LanguageSwitcher.css';

function LanguageSwitcher() {
    const { language, toggleLanguage } = useLanguage();

    return (
        <button
            className="language-switcher"
            onClick={toggleLanguage}
            aria-label="Toggle language"
        >
            <Languages size={18} />
            <span className="language-label">{language === 'en' ? '日本語' : 'English'}</span>
        </button>
    );
}

export default LanguageSwitcher;
