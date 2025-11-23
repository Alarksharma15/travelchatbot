# Audio Transcription Troubleshooting Guide

## Error: "Failed to transcribe audio. Please try again."

This error occurs when the speech-to-text feature fails. Follow these steps to diagnose and fix the issue.

---

## Step 1: Check Server Logs

1. Open your server terminal where you're running `npm start` or `node index.js`
2. Try recording audio again
3. Look for detailed error messages in the console

The enhanced logging will now show:
- Error message and stack trace
- File information (size, path)
- API response details
- HTTP status codes

---

## Step 2: Verify Groq API Key

### Option A: Use the Test Endpoint

1. Open your browser and navigate to: `http://localhost:5000/api/speech/test`
2. You should see one of these responses:

**✅ Success:**
```json
{
  "status": "ok",
  "message": "Groq API key is configured",
  "keyPrefix": "gsk_xxxx..."
}
```

**❌ Missing API Key:**
```json
{
  "status": "error",
  "message": "GROQ_API_KEY is not set in environment variables"
}
```

**⚠️ Invalid Format:**
```json
{
  "status": "warning",
  "message": "GROQ_API_KEY format may be invalid (should start with gsk_)"
}
```

### Option B: Check .env File Manually

1. Navigate to `server/.env`
2. Verify it contains: `GROQ_API_KEY=gsk_...`
3. Make sure there are no extra spaces or quotes
4. Restart your server after making changes

### Get a Groq API Key

If you don't have a key:
1. Go to https://console.groq.com/
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy it to your `server/.env` file

---

## Step 3: Check Browser Console

1. Open browser DevTools (F12)
2. Go to the Console tab
3. Try recording audio again
4. Look for logs showing:
   - Audio blob size and type
   - Network request details
   - Error responses from server

---

## Step 4: Verify Audio Recording

Check the console logs for:

```javascript
Transcribing audio blob: {
  size: 12345,  // Should be > 0
  type: "audio/webm"  // Or audio/mp4
}
```

**Common Issues:**
- **Size is 0 or very small**: Recording didn't capture audio
- **Size is too large**: Recording might be too long (25MB limit)
- **Wrong type**: Browser might not support webm format

---

## Step 5: Test Microphone Permissions

1. Click the microphone button
2. Browser should ask for permission
3. Allow microphone access
4. Check if the button shows the recording state (red/active)

**If permission is denied:**
- Click the lock icon in the address bar
- Reset permissions for microphone
- Refresh the page and try again

---

## Step 6: Check Network Connectivity

1. Open DevTools → Network tab
2. Filter by "transcribe"
3. Try recording again
4. Check the request:
   - **Status 200**: Success
   - **Status 400**: Bad request (check audio format)
   - **Status 500**: Server error (check API key)
   - **Failed/CORS**: Network or CORS issue

---

## Common Solutions

### Solution 1: Missing or Invalid API Key
```bash
# In server/.env
GROQ_API_KEY=gsk_your_actual_api_key_here
```
Then restart the server.

### Solution 2: Audio Too Short
Record for at least 1-2 seconds before stopping.

### Solution 3: Browser Compatibility
Try a different browser (Chrome, Edge, or Firefox recommended).

### Solution 4: File Upload Issues
Check if the `server/uploads/` directory exists and has write permissions.

### Solution 5: CORS Issues
Verify your server's CORS configuration allows requests from your frontend URL.

---

## Advanced Debugging

### Check Uploaded Files
Temporarily comment out the file deletion in `server/routes/speech.js` (lines 55-57 and 68-73) to inspect the uploaded audio files in `server/uploads/`.

### Test with curl
```bash
# Record a test audio file, then:
curl -X POST http://localhost:5000/api/speech/transcribe \
  -F "audio=@test-audio.webm" \
  -F "language=en"
```

### Enable Verbose Logging
Add this to the top of `server/routes/speech.js`:
```javascript
import debug from 'debug';
const log = debug('app:speech');
```

---

## Still Having Issues?

1. Check the detailed error message in the browser alert (now shows server error details)
2. Look at the server console for the full error stack trace
3. Verify all dependencies are installed: `npm install` in both client and server
4. Make sure both frontend and backend are running
5. Try with a different language setting (English vs Japanese)

---

## Quick Checklist

- [ ] Server is running on port 5000
- [ ] Client is running on port 5173
- [ ] GROQ_API_KEY is set in server/.env
- [ ] API key starts with "gsk_"
- [ ] Microphone permission granted in browser
- [ ] Browser supports MediaRecorder API
- [ ] Network tab shows request reaching server
- [ ] Server console shows detailed error logs
- [ ] Test endpoint returns "ok" status
