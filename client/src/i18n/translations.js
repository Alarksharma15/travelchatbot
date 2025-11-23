// Translation files for English and Japanese
export const translations = {
    en: {
        // Header
        appTitle: 'TravelMate',
        appSubtitle: 'Your AI Travel Companion',
        poweredByAI: 'Powered by AI',

        // Chat Interface
        chatTitle: 'Travel Assistant',
        chatStatus: 'Online',
        chatPlaceholder: 'Ask me about travel destinations...',
        chatHint: '💡 Try asking: "Weather in Tokyo?" or "Plan a trip to Paris"',
        chatWelcome: 'Hello! 👋 I\'m your AI travel assistant. I can help you plan trips, find destinations, and provide travel advice. Ask me anything about your next adventure!',
        chatError: '❌ Sorry, I encountered an error. Please make sure the server is running and try again.',

        // Weather Panel
        weatherTitle: 'Weather Forecast',
        weatherPlaceholder: 'Enter city name...',
        weatherSearchPlaceholder: 'Search for a city to see weather information',
        feelsLike: 'Feels Like',
        humidity: 'Humidity',
        windSpeed: 'Wind Speed',
        forecast7Day: '7-Day Forecast',
        today: 'Today',

        // Dashboard
        exploreCityPrefix: 'Explore',
        whatToWear: 'What to Wear',
        topLandmarks: 'Top Landmarks',
        hiddenGems: 'Hidden Gems',
        localCuisine: 'Local Cuisine',
        clickForDetails: 'Click for details',
        walkingTour: 'Walking Tour',
        walkingTourDesc: 'Comfortable & Casual',
        fineDining: 'Fine Dining',
        fineDiningDesc: 'Elegant Evening',
        weatherReady: 'Weather Ready',
        weatherReadyDesc: 'Practical Gear',

        // Weather descriptions
        weather: {
            clearSky: 'Clear sky',
            mainlyClear: 'Mainly clear',
            partlyCloudy: 'Partly cloudy',
            overcast: 'Overcast',
            foggy: 'Foggy',
            lightDrizzle: 'Light drizzle',
            drizzle: 'Drizzle',
            heavyDrizzle: 'Heavy drizzle',
            lightRain: 'Light rain',
            rain: 'Rain',
            heavyRain: 'Heavy rain',
            lightSnow: 'Light snow',
            snow: 'Snow',
            heavySnow: 'Heavy snow',
            snowGrains: 'Snow grains',
            lightShowers: 'Light showers',
            showers: 'Showers',
            heavyShowers: 'Heavy showers',
            lightSnowShowers: 'Light snow showers',
            snowShowers: 'Snow showers',
            thunderstorm: 'Thunderstorm',
            thunderstormHail: 'Thunderstorm with hail',
            unknown: 'Unknown'
        }
    },

    ja: {
        // Header
        appTitle: 'トラベルメイト',
        appSubtitle: 'あなたのAI旅行コンパニオン',
        poweredByAI: 'AI搭載',

        // Chat Interface
        chatTitle: '旅行アシスタント',
        chatStatus: 'オンライン',
        chatPlaceholder: '旅行先について質問してください...',
        chatHint: '💡 例: 「東京の天気は？」または「パリ旅行を計画して」',
        chatWelcome: 'こんにちは！👋 私はあなたのAI旅行アシスタントです。旅行の計画、目的地の検索、旅行のアドバイスをお手伝いします。次の冒険について何でも聞いてください！',
        chatError: '❌ 申し訳ございません。エラーが発生しました。サーバーが実行されていることを確認して、もう一度お試しください。',

        // Weather Panel
        weatherTitle: '天気予報',
        weatherPlaceholder: '都市名を入力...',
        weatherSearchPlaceholder: '都市を検索して天気情報を表示',
        feelsLike: '体感温度',
        humidity: '湿度',
        windSpeed: '風速',
        forecast7Day: '7日間の予報',
        today: '今日',

        // Dashboard
        exploreCityPrefix: '探索',
        whatToWear: '服装',
        topLandmarks: '主要観光地',
        hiddenGems: '隠れた名所',
        localCuisine: '地元料理',
        clickForDetails: '詳細はクリック',
        walkingTour: 'ウォーキングツアー',
        walkingTourDesc: '快適でカジュアル',
        fineDining: '高級レストラン',
        fineDiningDesc: 'エレガントな夜',
        weatherReady: '天気対応',
        weatherReadyDesc: '実用的な装備',

        // Weather descriptions
        weather: {
            clearSky: '快晴',
            mainlyClear: '概ね晴れ',
            partlyCloudy: '部分的に曇り',
            overcast: '曇り',
            foggy: '霧',
            lightDrizzle: '小雨',
            drizzle: '霧雨',
            heavyDrizzle: '強い霧雨',
            lightRain: '弱い雨',
            rain: '雨',
            heavyRain: '大雨',
            lightSnow: '小雪',
            snow: '雪',
            heavySnow: '大雪',
            snowGrains: '霰',
            lightShowers: '弱いにわか雨',
            showers: 'にわか雨',
            heavyShowers: '強いにわか雨',
            lightSnowShowers: '弱いにわか雪',
            snowShowers: 'にわか雪',
            thunderstorm: '雷雨',
            thunderstormHail: '雹を伴う雷雨',
            unknown: '不明'
        }
    }
};

// Weather code to translation key mapping
export const weatherCodeToKey = {
    0: 'clearSky',
    1: 'mainlyClear',
    2: 'partlyCloudy',
    3: 'overcast',
    45: 'foggy',
    48: 'foggy',
    51: 'lightDrizzle',
    53: 'drizzle',
    55: 'heavyDrizzle',
    61: 'lightRain',
    63: 'rain',
    65: 'heavyRain',
    71: 'lightSnow',
    73: 'snow',
    75: 'heavySnow',
    77: 'snowGrains',
    80: 'lightShowers',
    81: 'showers',
    82: 'heavyShowers',
    85: 'lightSnowShowers',
    86: 'snowShowers',
    95: 'thunderstorm',
    96: 'thunderstormHail',
    99: 'thunderstormHail'
};
