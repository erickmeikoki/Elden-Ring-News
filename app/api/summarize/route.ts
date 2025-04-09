import { NextResponse } from "next/server";
import OpenAI from "openai";

// Validate OpenAI API key
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
	console.error("OpenAI API key is not configured in environment variables");
}

const openai = new OpenAI({
	apiKey: apiKey
});

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { content } = body;

		if (!content) {
			console.error("No content provided in request");
			return NextResponse.json(
				{ error: "Content is required" },
				{ status: 400 }
			);
		}

		if (!apiKey) {
			console.error("OpenAI API key is not configured");
			return NextResponse.json(
				{ error: "OpenAI API key is not configured" },
				{ status: 500 }
			);
		}

		console.log(
			"Generating summary for content:",
			content.substring(0, 100) + "..."
		);

		try {
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

			const summary = completion.choices[0]?.message?.content;

			if (!summary) {
				console.error("No summary generated from OpenAI");
				return NextResponse.json(
					{ error: "Failed to generate summary" },
					{ status: 500 }
				);
			}

			console.log("Generated summary:", summary);
			return NextResponse.json({ summary });
		} catch (openaiError) {
			console.error("OpenAI API Error:", openaiError);
			return NextResponse.json(
				{
					error: "OpenAI API error",
					details:
						openaiError instanceof Error
							? openaiError.message
							: "Unknown OpenAI error"
				},
				{ status: 500 }
			);
		}
	} catch (error) {
		console.error("Error in summarize API:", error);
		return NextResponse.json(
			{
				error: "Failed to generate summary",
				details: error instanceof Error ? error.message : "Unknown error",
				stack: error instanceof Error ? error.stack : undefined
			},
			{ status: 500 }
		);
	}
}
