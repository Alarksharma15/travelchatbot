# Audio Input Feature Documentation

## Overview
The TravelMate chatbot now supports **voice input** using Groq's Whisper-large-v3-turbo model for speech-to-text transcription. Users can speak in **Japanese or English** and the system will automatically transcribe their speech and process it.

## Features

### 🎤 **Voice Input**
- Click the microphone button to start recording
- Speak your question or message
- Click again to stop recording
- Audio is automatically transcribed and placed in the input field
- Press send or edit the transcription before sending

### 🌐 **Language Support**
- **English**: Transcribes English speech accurately
- **Japanese**: Full support for Japanese speech recognition (日本語音声認識)
- Language is automatically detected based on your current UI language setting

### 🔊 **Audio Processing**
- Uses Groq Whisper-large-v3-turbo model
- Supports multiple audio formats (WebM, WAV, MP3, OGG)
- Maximum file size: 25MB
- Real-time transcription

## How It Works

### User Flow
1. **Click Microphone Button** 🎤
   - Browser requests microphone permission (first time only)
   - Button turns red and pulses while recording
   
2. **Speak Your Message** 🗣️
   - Speak clearly in English or Japanese
   - Recording indicator shows active state
   
3. **Stop Recording** ⏹️
   - Click the microphone button again
   - Audio is sent to server for transcription
   - Loading indicator appears during processing
   
4. **Review & Send** ✅
   - Transcribed text appears in input field
   - Edit if needed
   - Press send button to submit

### Technical Flow

```
User clicks mic → Browser records audio → Stop recording →
Audio blob created → Sent to backend → Groq Whisper API →
Transcription returned → Text in input field → User sends
```

## Backend Implementation

### New Endpoint: `/speech/transcribe`

**Method**: POST  
**Content-Type**: multipart/form-data

**Request Parameters**:
- `audio` (file): Audio file to transcribe
- `language` (string): 'en' or 'ja'

**Response**:
```json
{
  "text": "Transcribed text here",
  "language": "ja"
}
```

**Error Response**:
```json
{
  "error": "Failed to transcribe audio",
  "details": "Error message"
}
```

### Groq Whisper Configuration

```javascript
const transcription = await groq.audio.transcriptions.create({
    file: audioFile,
    model: 'whisper-large-v3-turbo',
    language: language === 'ja' ? 'ja' : 'en',
    response_format: 'json',
    temperature: 0.0
});
```

## Frontend Implementation

### AudioRecorder Component

**Props**:
- `onTranscription(text)`: Callback when transcription completes
- `disabled`: Boolean to disable recording

**States**:
- `isRecording`: Currently recording
- `isProcessing`: Transcription in progress

**Features**:
- Microphone access management
- Audio recording using MediaRecorder API
- File upload to backend
- Visual feedback (pulsing red button while recording)

### Integration in ChatInterface

```javascript
<AudioRecorder 
    onTranscription={handleTranscription}
    disabled={isLoading}
/>
```

## File Structure

### New Files Created

```
server/
├── routes/
│   └── speech.js              # Speech-to-text endpoint
└── uploads/                    # Temporary audio file storage

client/src/components/
├── AudioRecorder.jsx           # Voice input component
└── AudioRecorder.css           # Styling
```

### Modified Files

```
server/
├── index.js                    # Added speech routes
└── package.json                # Added multer dependency

client/src/components/
└── ChatInterface.jsx           # Integrated AudioRecorder
```

## Usage Examples

### English Example
1. Switch to English language
2. Click microphone button
3. Say: "What's the weather in Tokyo?"
4. Stop recording
5. Review transcription: "What's the weather in Tokyo?"
6. Send message

### Japanese Example (日本語)
1. Switch to Japanese language (日本語に切り替え)
2. Click microphone button (マイクボタンをクリック)
3. Say: "東京の天気はどうですか？"
4. Stop recording (録音を停止)
5. Review transcription: "東京の天気はどうですか？"
6. Send message (メッセージを送信)

## Browser Compatibility

### Supported Browsers
- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari (macOS/iOS)
- ✅ Opera

### Required Permissions
- **Microphone Access**: Required for recording
- User will be prompted on first use
- Can be managed in browser settings

## Security & Privacy

### Audio File Handling
- Files stored temporarily in `server/uploads/`
- Automatically deleted after transcription
- No permanent storage of audio data

### Data Flow
- Audio sent securely to backend
- Processed by Groq Whisper API
- Transcription returned to client
- Original audio file deleted

## Troubleshooting

### Common Issues

**1. Microphone not working**
- Check browser permissions
- Ensure microphone is connected
- Try refreshing the page

**2. Transcription errors**
- Speak clearly and at moderate pace
- Reduce background noise
- Ensure correct language is selected

**3. "Failed to transcribe" error**
- Check server is running
- Verify GROQ_API_KEY is set
- Check network connection

### Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "Could not access microphone" | Permission denied | Grant microphone permission in browser |
| "No audio file provided" | Upload failed | Try recording again |
| "Invalid file type" | Wrong format | Use supported audio format |
| "Failed to transcribe audio" | API error | Check server logs, verify API key |

## API Rate Limits

Groq Whisper API has rate limits:
- Check your Groq account for specific limits
- Implement retry logic if needed
- Monitor usage in Groq dashboard

## Future Enhancements

### Planned Features
- [ ] Auto-send after transcription (optional)
- [ ] Voice activity detection (auto-stop)
- [ ] Real-time streaming transcription
- [ ] Support for more languages
- [ ] Audio playback before sending
- [ ] Noise cancellation
- [ ] Voice commands (e.g., "send", "cancel")

### Possible Improvements
- Add waveform visualization during recording
- Show transcription confidence score
- Support for longer recordings
- Offline transcription fallback
- Custom wake words

## Testing Checklist

- [ ] Microphone permission prompt works
- [ ] Recording starts/stops correctly
- [ ] Visual feedback (red pulsing button)
- [ ] Transcription appears in input field
- [ ] Works in both English and Japanese
- [ ] Error handling for failed transcriptions
- [ ] Audio files are cleaned up
- [ ] Works on mobile devices
- [ ] No memory leaks during recording
- [ ] Proper loading states

## Dependencies

### Backend
- `multer@^1.4.5-lts.1`: File upload handling
- `groq-sdk@^0.36.0`: Groq API client

### Frontend
- `lucide-react`: Icons (Mic, MicOff, Loader2)
- Browser MediaRecorder API

## Performance Considerations

### Audio File Size
- WebM format typically 100-500KB per minute
- Compressed efficiently for upload
- Fast transcription (usually < 3 seconds)

### Network Usage
- Audio upload: ~100-500KB per recording
- Transcription response: < 1KB
- Minimal bandwidth impact

## Accessibility

- Keyboard accessible (Tab navigation)
- Screen reader friendly
- Clear visual feedback
- Alternative text input always available

## Conclusion

The audio input feature provides a seamless voice interaction experience for the TravelMate chatbot, supporting both English and Japanese languages with high accuracy using Groq's Whisper model.
