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

		// Always include "Elden Ring" in the search query
		const baseQuery = "Elden Ring";
		const fullQuery = searchQuery
			? `(${baseQuery}) AND (${searchQuery})`
			: baseQuery;

		if (!process.env.NEWS_API_KEY) {
			throw new Error("NewsAPI key is not configured");
		}

		const response = await axios.get("https://newsapi.org/v2/everything", {
			params: {
				q: fullQuery,
				pageSize,
				page,
				sortBy: "publishedAt",
				language: "en",
				apiKey: process.env.NEWS_API_KEY
			},
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"X-Api-Key": process.env.NEWS_API_KEY
			}
		});

		// Filter results to ensure they're actually about Elden Ring
		const filteredArticles = response.data.articles.filter((article: any) => {
			const title = article.title?.toLowerCase() || "";
			const description = article.description?.toLowerCase() || "";
			return title.includes("elden ring") || description.includes("elden ring");
		});

		return NextResponse.json({
			...response.data,
			articles: filteredArticles,
			totalResults: filteredArticles.length
		});
	} catch (error: any) {
		console.error("Error fetching news:", error);

		// Return a more detailed error response
		return NextResponse.json(
			{
				error: "Failed to fetch news",
				details: error.response?.data?.message || error.message,
				status: error.response?.status || 500
			},
			{ status: error.response?.status || 500 }
		);
	}
}
