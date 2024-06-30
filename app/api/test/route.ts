import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const API_KEY = process.env.GEMINI_API_KEY;
    if (API_KEY) {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
        const result = await model.generateContent("hello");
        const data = result.response.text();

        // const data = { message: "test" };
        return NextResponse.json(data);
    }
}