import { Plane, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import './Header.css';

function Header() {
    const { t } = useLanguage();

    return (
        <header className="header">
            <div className="header-content">
                <div className="logo-section">
                    <div className="logo-icon">
                        <Plane size={32} />
                    </div>
                    <div className="logo-text">
                        <h1 className="logo-title">{t('appTitle')}</h1>
                        <p className="logo-subtitle">{t('appSubtitle')}</p>
                    </div>
                </div>

                <div className="header-actions">
                    <LanguageSwitcher />
                    <div className="header-badge">
                        <Sparkles size={16} />
                        <span>{t('poweredByAI')}</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;

