import express from 'express';
import Groq from 'groq-sdk';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const uploadDir = '/tmp/uploads';

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Derive extension from MIME type (e.g., audio/webm -> webm)
        const mimeParts = file.mimetype.split('/');
        const ext = mimeParts[1] ? mimeParts[1].split(';')[0] : 'webm';
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 25 * 1024 * 1024 // 25MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['audio/webm', 'audio/wav', 'audio/mp3', 'audio/mpeg', 'audio/ogg', 'audio/mp4', 'audio/m4a', 'audio/aac'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only audio files are allowed.'));
        }
    }
});

// Speech-to-text endpoint
router.post('/transcribe', upload.single('audio'), async (req, res) => {
    let filePath = null;

    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No audio file provided' });
        }

        filePath = req.file.path;
        const { language = 'en' } = req.body;

        // Initialize Groq
        const groq = new Groq({
            apiKey: process.env.GROQ_API_KEY
        });

        // Read the audio file
        const audioFile = fs.createReadStream(filePath);

        // Transcribe using Whisper
        const transcription = await groq.audio.transcriptions.create({
            file: audioFile,
            model: 'whisper-large-v3-turbo',
            language: language === 'ja' ? 'ja' : 'en', // Specify language for better accuracy
            response_format: 'json',
            temperature: 0.0
        });

        // Clean up the uploaded file
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        res.json({
            text: transcription.text,
            language: language
        });

    } catch (error) {
        console.error('Transcription error:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            response: error.response?.data,
            status: error.response?.status
        });

        // Log file information for debugging
        if (filePath && fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath);
            console.error('File info:', {
                path: filePath,
                size: stats.size,
                exists: true
            });
        } else {
            console.error('File does not exist:', filePath);
        }

        // Clean up file on error
        if (filePath && fs.existsSync(filePath)) {
            try {
                fs.unlinkSync(filePath);
            } catch (unlinkError) {
                console.error('Error deleting file:', unlinkError);
            }
        }

        res.status(500).json({
            error: 'Failed to transcribe audio',
            details: error.message,
            errorType: error.name
        });
    }
});

// Test endpoint to verify Groq API configuration
router.get('/test', async (req, res) => {
    try {
        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            return res.status(500).json({
                status: 'error',
                message: 'GROQ_API_KEY is not set in environment variables'
            });
        }

        // Check if API key format is valid (starts with gsk_)
        if (!apiKey.startsWith('gsk_')) {
            return res.status(500).json({
                status: 'warning',
                message: 'GROQ_API_KEY format may be invalid (should start with gsk_)'
            });
        }

        res.json({
            status: 'ok',
            message: 'Groq API key is configured',
            keyPrefix: apiKey.substring(0, 8) + '...'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

export default router;
