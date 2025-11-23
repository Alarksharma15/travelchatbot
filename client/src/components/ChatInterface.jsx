import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import AudioRecorder from './AudioRecorder';
import './ChatInterface.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Wrap component in forwardRef
const ChatInterface = forwardRef(({ onCityMention, weatherData }, ref) => {
    const { t, language } = useLanguage();

    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: t('chatWelcome')
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [conversationHistory, setConversationHistory] = useState([]);
    const messagesEndRef = useRef(null);

    // Update welcome message when language changes
    useEffect(() => {
        setMessages(prev => {
            if (prev.length === 1 && prev[0].role === 'assistant') {
                return [{ role: 'assistant', content: t('chatWelcome') }];
            }
            return prev;
        });
    }, [language, t]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const detectCity = (text) => {
        const cityPatterns = [
            /(?:in|to|visit|weather in|going to|traveling to|trip to)\s+([A-Z][a-zA-Z\s]+?)(?:\s|,|\.|\?|$)/i,
            /([A-Z][a-zA-Z\s]{2,}?)(?:\s+weather|\s+forecast)/i
        ];

        for (const pattern of cityPatterns) {
            const match = text.match(pattern);
            if (match && match[1]) {
                const city = match[1].trim();
                if (city.length > 2 && city.length < 30) {
                    return city;
                }
            }
        }
        return null;
    };

    // Extract core sending logic to a reusable function
    const processMessage = async (messageText) => {
        if (!messageText.trim() || isLoading) return;

        // Add user message to chat
        const newMessages = [...messages, { role: 'user', content: messageText }];
        setMessages(newMessages);

        const detectedCity = detectCity(messageText);
        if (detectedCity) {
            onCityMention(detectedCity);
        }

        setIsLoading(true);

        try {
            let contextMessage = messageText;
            if (weatherData && weatherData.location) {
                contextMessage += `\n\n[Current weather in ${weatherData.location.name}: ${weatherData.current.temperature}°C, ${weatherData.current.humidity}% humidity]`;
            }

            const response = await axios.post(`${API_URL}/chat`, {
                message: contextMessage,
                conversationHistory: conversationHistory,
                language: language // Send language preference to backend
            });

            const assistantMessage = {
                role: 'assistant',
                content: response.data.reply
            };

            setMessages([...newMessages, assistantMessage]);
            setConversationHistory(response.data.conversationHistory || []);

        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage = {
                role: 'assistant',
                content: t('chatError')
            };
            setMessages([...newMessages, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    // Expose the processMessage function to the parent
    useImperativeHandle(ref, () => ({
        sendMessage: (text) => {
            processMessage(text);
        }
    }));

    // Standard handler for the input box
    const handleSend = () => {
        processMessage(input);
        setInput('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Handler for audio transcription
    const handleTranscription = (transcribedText) => {
        setInput(transcribedText);
        // Optionally auto-send after transcription
        // processMessage(transcribedText);
    };

    return (
        <div className="chat-interface glass-card">
            <div className="chat-header">
                <div className="chat-header-content">
                    <Bot className="chat-icon" size={24} />
                    <div>
                        <h2>{t('chatTitle')}</h2>
                        <p className="chat-status">
                            <span className="status-dot"></span>
                            {t('chatStatus')}
                        </p>
                    </div>
                </div>
            </div>

            <div className="messages-container">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.role === 'user' ? 'message-user' : 'message-assistant'} fade-in`}
                    >
                        <div className="message-avatar">
                            {message.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                        </div>
                        <div className="message-content">
                            <p>{message.content}</p>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="message message-assistant fade-in">
                        <div className="message-avatar"><Bot size={20} /></div>
                        <div className="message-content">
                            <div className="typing-indicator"><span></span><span></span><span></span></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-container">
                <div className="chat-input-wrapper">
                    <AudioRecorder
                        onTranscription={handleTranscription}
                        disabled={isLoading}
                    />
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={t('chatPlaceholder')}
                        className="chat-input"
                        disabled={isLoading}
                    />
                    <button onClick={handleSend} disabled={!input.trim() || isLoading} className="send-button">
                        {isLoading ? <Loader2 size={20} className="spin-animation" /> : <Send size={20} />}
                    </button>
                </div>
                <p className="input-hint">{t('chatHint')}</p>
            </div>
        </div>
    );
});

export default ChatInterface;