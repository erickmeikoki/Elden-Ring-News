export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const page = searchParams.get("page") || "1";
	const pageSize = searchParams.get("pageSize") || "9";

	try {
		const response = await fetch(
			`https://newsapi.org/v2/everything?q="Elden Ring"&language=en&sortBy=publishedAt&page=${page}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API_KEY}`,
			{
				headers: {
					"Content-Type": "application/json"
				}
			}
		);

		if (!response.ok) {
			throw new Error(`NewsAPI responded with status: ${response.status}`);
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error("Error fetching news:", error);
		return NextResponse.json(
			{ error: "Failed to fetch news" },
			{ status: 500 }
		);
	}
}
