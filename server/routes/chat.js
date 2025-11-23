import express from 'express';
import Groq from 'groq-sdk';

const router = express.Router();

// System prompts for travel helper chatbot
const SYSTEM_PROMPTS = {
    en: `You are a helpful and friendly travel assistant. Your role is to:
- Help users plan their trips and provide travel recommendations
- Answer questions about destinations, attractions, and activities
- Provide practical travel advice and tips
- Suggest itineraries based on user preferences
- Be enthusiastic and encouraging about travel
- When weather information is mentioned, acknowledge it and incorporate it into your advice
- Keep responses concise but informative (2-4 sentences usually)
- Use a warm, conversational tone

Remember: You're helping people have amazing travel experiences!`,

    ja: `あなたは親切でフレンドリーな旅行アシスタントです。あなたの役割は：
- ユーザーの旅行計画を支援し、旅行の推奨事項を提供する
- 目的地、観光スポット、アクティビティに関する質問に答える
- 実用的な旅行のアドバイスとヒントを提供する
- ユーザーの好みに基づいて旅程を提案する
- 旅行について熱心で励ましの言葉をかける
- 天気情報が言及された場合は、それを認識してアドバイスに組み込む
- 簡潔だが有益な回答を心がける（通常2〜4文）
- 温かく会話的なトーンを使用する

覚えておいてください：あなたは人々が素晴らしい旅行体験をするのを助けています！`
};

router.post('/', async (req, res) => {
    try {
        // Initialize Groq inside the request to guarantee env vars are loaded
        const groq = new Groq({
            apiKey: process.env.GROQ_API_KEY
        });

        const { message, conversationHistory = [], language = 'en' } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Select appropriate system prompt based on language
        const systemPrompt = SYSTEM_PROMPTS[language] || SYSTEM_PROMPTS.en;

        // Build messages array
        const messages = [
            { role: 'system', content: systemPrompt },
            ...conversationHistory,
            { role: 'user', content: message }
        ];

        // Call Groq API
        const completion = await groq.chat.completions.create({
            messages: messages,
            model: 'meta-llama/llama-4-scout-17b-16e-instruct',
            temperature: 0.7,
            max_tokens: 1024,
            top_p: 1,
            stream: false
        });

        const reply = completion.choices[0]?.message?.content ||
            (language === 'ja' ? '申し訳ございませんが、応答を生成できませんでした。' : 'I apologize, but I couldn\'t generate a response.');

        res.json({
            reply,
            conversationHistory: [
                ...conversationHistory,
                { role: 'user', content: message },
                { role: 'assistant', content: reply }
            ]
        });

    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({
            error: 'Failed to get response from chatbot',
            details: error.message
        });
    }
});

export default router;