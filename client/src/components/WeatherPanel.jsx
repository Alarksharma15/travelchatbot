import { useState, useEffect } from 'react';
import { MapPin, Search, Cloud, Droplets, Wind, Thermometer, Calendar, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import { weatherCodeToKey } from '../i18n/translations';
import './WeatherPanel.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Weather code to emoji mapping
const weatherEmojis = {
    0: '☀️',
    1: '🌤️',
    2: '⛅',
    3: '☁️',
    45: '🌫️',
    48: '🌫️',
    51: '🌦️',
    53: '🌦️',
    55: '🌧️',
    61: '🌧️',
    63: '🌧️',
    65: '⛈️',
    71: '🌨️',
    73: '❄️',
    75: '❄️',
    77: '❄️',
    80: '🌦️',
    81: '🌧️',
    82: '⛈️',
    85: '🌨️',
    86: '❄️',
    95: '⛈️',
    96: '⛈️',
    99: '⛈️'
};

function WeatherPanel({ selectedCity, onWeatherData }) {
    const { t, language } = useLanguage();
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (selectedCity && selectedCity !== city) {
            setCity(selectedCity);
            fetchWeather(selectedCity);
        }
    }, [selectedCity]);

    const fetchWeather = async (searchCity) => {
        if (!searchCity.trim()) return;

        setIsLoading(true);
        setError('');

        try {
            const response = await axios.get(`${API_URL}/weather`, {
                params: { city: searchCity }
            });

            setWeather(response.data);
            onWeatherData(response.data);
        } catch (err) {
            console.error('Weather fetch error:', err);
            setError(err.response?.data?.error || 'Failed to fetch weather data');
            setWeather(null);
            onWeatherData(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = () => {
        fetchWeather(city);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const locale = language === 'ja' ? 'ja-JP' : 'en-US';
        return date.toLocaleDateString(locale, { weekday: 'short', month: 'short', day: 'numeric' });
    };

    const getWeatherDescription = (weatherCode) => {
        const key = weatherCodeToKey[weatherCode] || 'unknown';
        return t(`weather.${key}`);
    };

    return (
        <div className="weather-panel">
            <div className="weather-search glass-card">
                <h3 className="weather-title">
                    <Cloud size={24} />
                    {t('weatherTitle')}
                </h3>

                <div className="search-input-wrapper">
                    <MapPin size={18} className="search-icon" />
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={t('weatherPlaceholder')}
                        className="weather-input"
                    />
                    <button
                        onClick={handleSearch}
                        disabled={!city.trim() || isLoading}
                        className="search-button"
                    >
                        {isLoading ? <Loader2 size={18} className="spin-animation" /> : <Search size={18} />}
                    </button>
                </div>

                {error && (
                    <div className="error-message fade-in">
                        ❌ {error}
                    </div>
                )}
            </div>

            {weather && (
                <div className="weather-content fade-in">
                    {/* Current Weather */}
                    <div className="current-weather glass-card">
                        <div className="location-info">
                            <h3>{weather.location.name}</h3>
                            {weather.location.country && <p>{weather.location.country}</p>}
                        </div>

                        <div className="current-temp">
                            <div className="temp-display">
                                <span className="weather-emoji">
                                    {weatherEmojis[weather.current.weatherCode] || '🌡️'}
                                </span>
                                <span className="temp-value">{Math.round(weather.current.temperature)}°</span>
                            </div>
                            <p className="weather-description">
                                {getWeatherDescription(weather.current.weatherCode)}
                            </p>
                        </div>

                        <div className="weather-details">
                            <div className="detail-item">
                                <Thermometer size={18} />
                                <div>
                                    <p className="detail-label">{t('feelsLike')}</p>
                                    <p className="detail-value">{Math.round(weather.current.feelsLike)}°C</p>
                                </div>
                            </div>

                            <div className="detail-item">
                                <Droplets size={18} />
                                <div>
                                    <p className="detail-label">{t('humidity')}</p>
                                    <p className="detail-value">{weather.current.humidity}%</p>
                                </div>
                            </div>

                            <div className="detail-item">
                                <Wind size={18} />
                                <div>
                                    <p className="detail-label">{t('windSpeed')}</p>
                                    <p className="detail-value">{Math.round(weather.current.windSpeed)} km/h</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 7-Day Forecast */}
                    <div className="forecast-section glass-card">
                        <h4 className="forecast-title">
                            <Calendar size={20} />
                            {t('forecast7Day')}
                        </h4>

                        <div className="forecast-list">
                            {weather.daily.slice(0, 7).map((day, index) => (
                                <div key={index} className="forecast-item">
                                    <p className="forecast-date">
                                        {index === 0 ? t('today') : formatDate(day.date)}
                                    </p>
                                    <span className="forecast-emoji">
                                        {weatherEmojis[day.weatherCode] || '🌡️'}
                                    </span>
                                    <div className="forecast-temps">
                                        <span className="temp-max">{Math.round(day.tempMax)}°</span>
                                        <span className="temp-min">{Math.round(day.tempMin)}°</span>
                                    </div>
                                    {day.precipitationProbability > 0 && (
                                        <span className="precipitation">
                                            💧 {day.precipitationProbability}%
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {!weather && !isLoading && !error && (
                <div className="weather-placeholder glass-card">
                    <Cloud size={64} className="placeholder-icon" />
                    <p>{t('weatherSearchPlaceholder')}</p>
                </div>
            )}
        </div>
    );
}

export default WeatherPanel;
