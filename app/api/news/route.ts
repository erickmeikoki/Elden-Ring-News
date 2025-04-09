export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const page = searchParams.get("page") || "1";
		const pageSize = searchParams.get("pageSize") || "9";
		const category = searchParams.get("category") || "elden ring";
		const searchQuery = searchParams.get("search") || "";

		const response = await axios.get("https://newsapi.org/v2/everything", {
			params: {
				q: searchQuery || category,
				pageSize,
				page,
				sortBy: "publishedAt",
				language: "en",
				apiKey: process.env.NEWS_API_KEY
			}
		});

		return NextResponse.json(response.data);
	} catch (error) {
		console.error("Error fetching news:", error);
		return NextResponse.json(
			{ error: "Failed to fetch news" },
			{ status: 500 }
		);
	}
}
