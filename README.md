# 🌍 TravelMate - AI Travel Assistant

A modern, full-stack travel chatbot application with real-time weather forecasts and AI-powered travel recommendations.

![TravelMate](https://img.shields.io/badge/React-18.3-blue) ![Express](https://img.shields.io/badge/Express-5.1-green) ![Node](https://img.shields.io/badge/Node-18+-brightgreen)

## ✨ Features

- 🤖 **AI-Powered Chat**: Intelligent travel assistant using Groq's LLaMA 3.1 70B model
- 🌤️ **Real-Time Weather**: Live weather data and 7-day forecasts from Open-Meteo API
- 🎨 **Modern UI**: Beautiful glassmorphism design with smooth animations
- 💬 **Contextual Responses**: Chat integrates weather data for better recommendations
- 🔍 **Smart City Detection**: Automatically detects city mentions in conversations
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## 🛠️ Tech Stack

### Backend
- **Express.js** - Fast, minimalist web framework
- **Groq SDK** - AI language model integration
- **Axios** - HTTP client for API requests
- **Open-Meteo API** - Free weather data (no API key required)

### Frontend
- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Lucide React** - Beautiful icon library
- **CSS3** - Custom design system with animations

## 📋 Prerequisites

- Node.js 18+ installed
- Groq API key (get it free at [console.groq.com](https://console.groq.com))

## 🚀 Quick Start

### 1. Clone or Navigate to Project
```bash
cd chatbotproject
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies (already done)
npm install

# Configure environment variables
# Edit .env file and add your Groq API key:
# GROQ_API_KEY=your_actual_groq_api_key_here
# PORT=5000

# Start the server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to client directory
cd client

# Install dependencies (already done)
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔑 Getting Your Groq API Key

1. Visit [console.groq.com](https://console.groq.com)
2. Sign up for a free account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and paste it in `server/.env` file

## 📁 Project Structure

```
chatbotproject/
├── server/                 # Backend (Express.js)
│   ├── routes/
│   │   ├── chat.js        # Groq AI chat endpoint
│   │   └── weather.js     # Weather API endpoint
│   ├── index.js           # Server entry point
│   ├── package.json
│   └── .env               # Environment variables
│
└── client/                # Frontend (React)
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx
    │   │   ├── ChatInterface.jsx
    │   │   └── WeatherPanel.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css      # Design system
    ├── index.html
    └── package.json
```

## 🎯 Usage

1. **Start a Conversation**: Type any travel-related question in the chat
2. **Get Weather Info**: Mention a city name (e.g., "What's the weather in Paris?")
3. **View Forecasts**: The weather panel automatically updates with 7-day forecasts
4. **Get Recommendations**: Ask for travel tips, best times to visit, or destination suggestions

### Example Queries

- "What's the best time to visit Tokyo?"
- "Tell me about things to do in Paris"
- "What's the weather like in London?"
- "I'm planning a trip to Bali, any recommendations?"
- "Best beaches in Thailand?"

## 🎨 Design Features

- **Glassmorphism Effects**: Modern frosted glass aesthetic
- **Gradient Accents**: Beautiful color transitions
- **Smooth Animations**: Fade-ins, slides, and micro-interactions
- **Dark Theme**: Easy on the eyes with vibrant accents
- **Responsive Grid**: Adapts to any screen size

## 🔧 API Endpoints

### Backend Routes

#### Chat
- **POST** `/api/chat`
  - Body: `{ message: string, conversationHistory: array }`
  - Returns: `{ reply: string, conversationHistory: array }`

#### Weather
- **GET** `/api/weather?city=CityName`
  - Returns: Current weather + 7-day forecast

#### Health Check
- **GET** `/api/health`
  - Returns: `{ status: 'ok', message: string }`

## 🌐 Environment Variables

### Server (.env)
```env
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
```

### Client (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting

### Backend won't start
- Ensure you've added your Groq API key to `server/.env`
- Check if port 5000 is available
- Run `npm install` in the server directory

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check `client/.env` has correct API URL
- Clear browser cache and reload

### Weather not loading
- Check internet connection
- Verify city name spelling
- Open browser console for error messages

## 📝 License

MIT License - feel free to use this project for learning or personal use!

## 🤝 Contributing

This is a learning project, but suggestions and improvements are welcome!

## 🙏 Acknowledgments

- **Groq** - For providing fast AI inference
- **Open-Meteo** - For free weather data
- **Lucide** - For beautiful icons
- **Vite** - For amazing developer experience

---

Built with ❤️ using React, Express, and AI
