import express from 'express';
import speechRoutes from './speech.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Mount the speech router under /api/speech
app.use('/speech', speechRoutes);

export default app;
