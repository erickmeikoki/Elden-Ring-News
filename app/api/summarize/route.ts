import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
	try {
		const { content } = await request.json();

		if (!content) {
			return NextResponse.json(
				{ error: "Content is required" },
				{ status: 400 }
			);
		}

		const completion = await openai.chat.completions.create({
			messages: [
				{
					role: "system",
					content:
						"You are a helpful assistant that summarizes Elden Ring news articles. Keep summaries concise and informative, focusing on the key points and implications for players."
				},
				{
					role: "user",
					content: `Please summarize this Elden Ring article in 2-3 sentences: ${content}`
				}
			],
			model: "gpt-3.5-turbo",
			temperature: 0.7,
			max_tokens: 150
		});

		return NextResponse.json({
			summary: completion.choices[0].message.content
		});
	} catch (error) {
		console.error("Error generating summary:", error);
		return NextResponse.json(
			{ error: "Failed to generate summary" },
			{ status: 500 }
		);
	}
}
