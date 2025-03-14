import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request) {

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    // Grabbin the users input
    const params = await request.json();

    // Concatenate predefined text with params.prompt to create full prompt
    const whiteListPrompt = `Here are examples of things the user likes to receive: ${params.whiteListprompt}
                        Output a list of 10 good gift ideas as bullet points. Begin the list with "Good ideas:"
                        `;
    const blackListPrompt = `Here are examples of things the user doesn't like to receive: ${params.blackListPrompt}
                        Output a list of 10 bad gift ideas as bullet points. Begin the list with "Bad ideas:"
                        `;
                        


    // Passing it to GPT
    const response = await openai.chat.completions.create({

        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a friendly assistant that helps others to find perfect gifts.",
            },
            {
                role: "user",
                content: whiteListPrompt, // String that user passes to the system
            },
            {
                role: "user",
                content: blackListPrompt, // String that user passes to the system
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