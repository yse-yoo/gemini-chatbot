import { getLanguageName } from "@/app/components/lang";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const API_KEY = process.env.GEMINI_API_KEY;
    if (API_KEY) {
        const requestData = await req.json();
        if (!requestData) {
            return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
        }

        console.log(requestData); // デバッグ用

        const { fromLangCode, toLangCode, userMessage } = requestData;
        if (!fromLangCode || !toLangCode || !userMessage) {
            return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
        }

        const fromLang = getLanguageName(fromLangCode)
        const toLang = getLanguageName(toLangCode)

        const prompt = `Please translate from ${fromLang} to ${toLang}. \n ${userMessage}`;
        console.log(prompt)
        // return NextResponse.json({ translate: prompt});

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
        const result = await model.generateContent(prompt);
        const response = { 
            original: userMessage,
            translate: result.response.text(),
        };
        return NextResponse.json(response);
    }
}