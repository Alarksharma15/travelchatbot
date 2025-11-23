import { MapPin, Shirt, ShoppingBag, Camera } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './Dashboard.css';

function Dashboard({ city, onAskAI }) {
  const { t } = useLanguage();

  if (!city) return null; // Don't show anything if no city is selected

  // Categories for the dashboard
  const places = [
    { title: t('topLandmarks'), icon: <Camera size={20} />, prompt: `What are the top 3 must-visit landmarks in ${city} and why?` },
    { title: t('hiddenGems'), icon: <MapPin size={20} />, prompt: `Tell me about some hidden gems or non-touristy places in ${city}.` },
    { title: t('localCuisine'), icon: <ShoppingBag size={20} />, prompt: `What are the famous local foods in ${city} that I must try?` },
  ];

  const styles = [
    { title: t('walkingTour'), desc: t('walkingTourDesc'), prompt: `What should I wear for a full day of walking in ${city} right now?` },
    { title: t('fineDining'), desc: t('fineDiningDesc'), prompt: `What is the appropriate dress code for fine dining restaurants in ${city}?` },
    { title: t('weatherReady'), desc: t('weatherReadyDesc'), prompt: `Based on the current weather in ${city}, what specific gear (umbrella, coat, etc.) should I pack?` },
  ];

  return (
    <div className="dashboard-container fade-in">
      {/* Section 1: Places to Visit */}
      <div className="dashboard-section">
        <h3 className="section-title">
          <MapPin size={18} /> {t('exploreCityPrefix')} {city}
        </h3>
        <div className="cards-grid">
          {places.map((item, index) => (
            <div
              key={index}
              className="dashboard-card place-card"
              onClick={() => onAskAI(item.prompt)}
            >
              <div className="card-icon">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{t('clickForDetails')}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Clothing Styles */}
      <div className="dashboard-section">
        <h3 className="section-title">
          <Shirt size={18} /> {t('whatToWear')}
        </h3>
        <div className="cards-grid">
          {styles.map((item, index) => (
            <div
              key={index}
              className="dashboard-card style-card"
              onClick={() => onAskAI(item.prompt)}
            >
              <div className="card-header">
                <h4>{item.title}</h4>
                <span className="arrow">→</span>
              </div>
              <p className="card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;