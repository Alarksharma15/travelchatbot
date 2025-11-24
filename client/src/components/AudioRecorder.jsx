import { useState, useRef } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import './AudioRecorder.css';

const API_URL = import.meta.env.VITE_API_URL || '/api';

function AudioRecorder({ onTranscription, disabled }) {
    const { language } = useLanguage();
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    channelCount: 1, // Mono audio
                    sampleRate: 16000, // 16kHz is optimal for speech
                    echoCancellation: true,
                    noiseSuppression: true
                }
            });

            // Choose a supported mime type without codec parameters (Groq rejects codecs in mime)
            let mimeType;
            let fileExtension;
            if (MediaRecorder.isTypeSupported('audio/webm')) {
                mimeType = 'audio/webm';
                fileExtension = 'webm';
            } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
                mimeType = 'audio/mp4';
                fileExtension = 'mp4';
            } else if (MediaRecorder.isTypeSupported('audio/mpeg')) {
                mimeType = 'audio/mpeg';
                fileExtension = 'mp3';
            } else if (MediaRecorder.isTypeSupported('audio/mpeg')) {
                mimeType = 'audio/mpeg';
                fileExtension = 'mp3';
            } else if (MediaRecorder.isTypeSupported('audio/mpeg')) {
                mimeType = 'audio/mpeg';
                fileExtension = 'mp3';
            } else {
                // Fallback to webm
                mimeType = 'audio/webm';
                fileExtension = 'webm';
            }

            console.log('Using audio format:', mimeType);

            const mediaRecorder = new MediaRecorder(stream, { mimeType });
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
                await transcribeAudio(audioBlob, fileExtension);

                // Stop all tracks to release microphone
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Could not access microphone. Please grant permission and try again.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const transcribeAudio = async (audioBlob, fileExtension = 'webm') => {
        setIsProcessing(true);

        try {
            console.log('Transcribing audio blob:', {
                size: audioBlob.size,
                type: audioBlob.type,
                extension: fileExtension
            });

            // Check if blob has data
            if (audioBlob.size === 0) {
                throw new Error('Audio recording is empty. Please try recording again.');
            }

            const formData = new FormData();
            const filename = `recording.${fileExtension}`;
            formData.append('audio', audioBlob, filename);
            formData.append('language', language);

            console.log('Sending transcription request with filename:', filename);

            const response = await axios.post(`${API_URL}/speech/transcribe`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.text) {
                onTranscription(response.data.text);
            } else {
                console.warn('No text in transcription response:', response.data);
            }
        } catch (error) {
            console.error('Transcription error:', error);
            console.error('Error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });

            const errorMessage = error.response?.data?.error?.message
                || error.response?.data?.details
                || error.response?.data?.error
                || error.message
                || 'Failed to transcribe audio. Please try again.';

            alert(errorMessage);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleClick = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    return (
        <button
            className={`audio-recorder-button ${isRecording ? 'recording' : ''} ${isProcessing ? 'processing' : ''}`}
            onClick={handleClick}
            disabled={disabled || isProcessing}
            title={isRecording ? 'Stop recording' : 'Start voice input'}
        >
            {isProcessing ? (
                <Loader2 size={20} className="spin-animation" />
            ) : isRecording ? (
                <MicOff size={20} />
            ) : (
                <Mic size={20} />
            )}
        </button>
    );
}

export default AudioRecorder;
