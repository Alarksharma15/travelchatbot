# Internationalization (i18n) Feature

## Overview
The TravelMate chatbot now supports both **English** and **Japanese** languages. Users can seamlessly switch between languages using the language switcher in the header.

## Features

### 1. **Language Switcher**
- Located in the header next to the "Powered by AI" badge
- Click to toggle between English (EN) and Japanese (JA)
- Language preference is saved in localStorage

### 2. **Translated Components**
All UI components are fully translated:
- **Header**: App title, subtitle, and badges
- **Chat Interface**: Welcome message, placeholders, hints, and error messages
- **Weather Panel**: All labels, weather descriptions, and date formats
- **Dashboard**: Section titles and card labels

### 3. **Backend Language Support**
- AI responses are generated in the selected language
- System prompts are customized for each language
- Error messages are localized

### 4. **Weather Descriptions**
Weather conditions are translated into Japanese:
- Clear sky → 快晴
- Rain → 雨
- Snow → 雪
- And many more...

### 5. **Date Formatting**
Dates are formatted according to the selected locale:
- English: "Mon, Nov 24"
- Japanese: "11月24日(月)"

## How It Works

### Frontend
1. **LanguageContext**: Manages global language state
2. **Translation Files**: Contains all text strings in both languages
3. **useLanguage Hook**: Provides translation function `t()` to components

### Backend
- Receives language preference from frontend
- Selects appropriate system prompt
- Generates responses in the requested language

## Usage

### For Users
1. Click the language switcher button in the header
2. The entire interface updates immediately
3. AI responses will be in the selected language

### For Developers

#### Adding New Translations
Edit `client/src/i18n/translations.js`:

```javascript
export const translations = {
  en: {
    newKey: 'English text',
    // ...
  },
  ja: {
    newKey: '日本語テキスト',
    // ...
  }
};
```

#### Using Translations in Components
```javascript
import { useLanguage } from '../contexts/LanguageContext';

function MyComponent() {
  const { t, language } = useLanguage();
  
  return <div>{t('newKey')}</div>;
}
```

## File Structure

```
client/src/
├── contexts/
│   └── LanguageContext.jsx      # Language state management
├── i18n/
│   └── translations.js           # Translation strings
├── components/
│   ├── LanguageSwitcher.jsx     # Language toggle button
│   ├── LanguageSwitcher.css     # Switcher styles
│   └── ...                       # Updated components

server/routes/
└── chat.js                       # Language-aware AI responses
```

## Supported Languages
- 🇬🇧 English (en)
- 🇯🇵 Japanese (ja)

## Future Enhancements
- Add more languages (Spanish, French, Chinese, etc.)
- Auto-detect user's browser language
- Translate dashboard prompts
- Add language-specific formatting for numbers and currencies
