import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const API_KEY = process.env.GEMINI_API_KEY;
    if (API_KEY) {
        const message = await req.json();
        if (!message) return;

        const prompt = `Please translate from japanese to english. \n ${message.userMessage}`;
        console.log(prompt);

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
        const result = await model.generateContent(prompt);
        const response = { 
            original: message.userMessage,
            translate: result.response.text(),
        };
        return NextResponse.json(response);
    }
}