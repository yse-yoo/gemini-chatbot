// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, Content, TextPart } from '@google/generative-ai';

var history: Content[] = [];

export async function POST(req: NextRequest) {
    //TODO リクエスト
    // const data = await req.json();
    // if (!data) return;

    const place = "北海道";
    const budget = "100000円";
    const start_at = "2024/07/16";
    const end_at = "2024/07/20";
    const interests = "歴史, 文化, グルメ";

    const requestSchema = `
        '場所': ${place}
        '出発日': ${start_at}
        '終了日': ${end_at}
        '予算': ${budget}
        'フリーワード': ${interests}
    `;

    const resultSchema = `
        { 
            "destination": "xxxx", 
            "duration": "x泊x日", 
            "accommodation": "xxxx", 
            "transportation": "xxxx", 
            "schedule": [ 
            {
                "day": "1", 
                "activities": [ 
                    {"name": "xxxx", "time": "xxxx"}, 
                    {"name": "xxxx", "time": "xxxx"}, 
                    {"name": "xxxx", "time": "xxxx"}, 
                ] 
            }, 
            {
                "day": "2", 
                "activities": [
                    {"name": "xxxx", "time": "xxxx"}, 
                    {"name": "xxxx", "time": "xxxx"}, 
                    {"name": "xxxx", "time": "xxxx"}, 
            ] },
            {
                "day": "3", 
                "activities": [ 
                    {"name": "xxxx", "time": "xxxx"}, 
                    {"name": "xxxx", "time": "xxxx"}, 
                    {"name": "xxxx", "time": "xxxx"}, 
                ]
            }
            ]
        }
        `

    const prompt = `
        ${requestSchema}
        から、旅行プランをJSONスキーマで作成して
        `;

    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) return;
    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
        const result = await model.generateContent(prompt);
        const response = { 
            original: prompt,
            translate: result.response.text(),
        };
        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ error: 'GoogleGenerativeAI error' }, { status: 500 });
    }
}
