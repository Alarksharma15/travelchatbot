import 'dotenv/config'; // Load environment variables immediately
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import chatRoutes from './routes/chat.js';
import weatherRoutes from './routes/weather.js';
import speechRoutes from './routes/speech.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Create uploads directory if it doesn't exist
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/chat', chatRoutes);       // Access via http://localhost:3000/chat
app.use('/weather', weatherRoutes); // Access via http://localhost:3000/weather
app.use('/speech', speechRoutes);   // Access via http://localhost:3000/speech

// Basic Health Check
app.get('/', (req, res) => {
  res.send('Travel Helper Server is running! 🚀');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});