// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
    const { message } = await req.json();
    if (!message) return;

    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) return;

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
        const result = await model.generateContent(message);
        const data = result.response.text();
        return NextResponse.json({ reply: data });
    } catch (error) {
        return NextResponse.json({ error: 'GoogleGenerativeAI error' }, { status: 500 });
    }
}
