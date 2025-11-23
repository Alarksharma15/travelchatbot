# TravelMate Quick Start Guide

## Step 1: Get Your Groq API Key

1. Visit https://console.groq.com
2. Sign up for a free account
3. Go to "API Keys" section
4. Click "Create API Key"
5. Copy the generated key

## Step 2: Configure Backend

1. Open the file: `server/.env`
2. Replace `your_groq_api_key_here` with your actual Groq API key
3. Save the file

## Step 3: Start the Backend Server

Open a terminal and run:
```bash
cd server
npm run dev
```

You should see: "🚀 Server is running on port 5000"

## Step 4: Start the Frontend

Open a NEW terminal (keep the backend running) and run:
```bash
cd client
npm run dev
```

You should see a local URL like: http://localhost:5173

## Step 5: Open in Browser

Click the URL or open your browser to: http://localhost:5173

## ✅ You're Ready!

Try asking:
- "What's the weather in Paris?"
- "Best time to visit Tokyo?"
- "Tell me about beaches in Bali"

## 🐛 Issues?

- **Backend Error**: Make sure you added your Groq API key to `server/.env`
- **Can't Connect**: Ensure both servers are running
- **Port Conflict**: Change PORT in `server/.env` if 5000 is busy

Enjoy your AI travel assistant! 🌍✈️
