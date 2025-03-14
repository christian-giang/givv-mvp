import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request) {

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    // Grabbin the users input
    const params = await request.json();

    // Passing it to GPT
    const response = await openai.chat.completions.create({

        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a very grumpy assistant.",
            },
            {
                role: "user",
                content:     params.prompt, // String that user passes to the system
            },
        ],
        temperature: 0,
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    return NextResponse.json(response);    
}