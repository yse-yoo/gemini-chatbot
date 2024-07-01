// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, Content, TextPart } from '@google/generative-ai';
import { Message } from '@/app/interfaces/Message';

var history: Content[] = [];

export async function POST(req: NextRequest) {
    const message = await req.json();
    if (!message) return;

    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) return;
    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // コンテンツ生成
        const result = await model.generateContent(message.content);

        const botContent = result.response.text();
        const botMessage: Message = { role: "bot", content: botContent };

        return NextResponse.json(botMessage);
    } catch (error) {
        return NextResponse.json({ error: 'GoogleGenerativeAI error' }, { status: 500 });
    }
}
