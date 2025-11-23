import { useState, useRef } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import ChatInterface from './components/ChatInterface';
import WeatherPanel from './components/WeatherPanel';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  // Create a ref to control the chat interface
  const chatRef = useRef(null);

  // Function to handle clicks from Dashboard cards
  const handleDashboardClick = (prompt) => {
    if (chatRef.current) {
      chatRef.current.sendMessage(prompt);
    }
  };

  return (
    <LanguageProvider>
      <div className="app">
        <Header />
        <main className="main-container">
          <div className="content-grid">
            {/* Left Side: Chat */}
            <div className="left-panel">
              <ChatInterface
                ref={chatRef}
                onCityMention={setSelectedCity}
                weatherData={weatherData}
              />
            </div>

            {/* Right Side: Weather + Dashboard */}
            <div className="right-panel">
              <WeatherPanel
                selectedCity={selectedCity}
                onWeatherData={setWeatherData}
              />
              {/* Dashboard appears when a city is selected */}
              <Dashboard
                city={selectedCity}
                onAskAI={handleDashboardClick}
              />
            </div>
          </div>
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;