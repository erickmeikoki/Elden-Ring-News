"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import NewsCard from "./NewsCard";

interface NewsArticle {
	title: string;
	description: string;
	url: string;
	urlToImage: string;
	publishedAt: string;
	source: {
		name: string;
	};
	category?: string;
	isRead?: boolean;
}

interface NewsFeedProps {
	searchQuery: string;
	showUnread: boolean;
}

const SkeletonCard = () => (
	<div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden flex flex-col shadow-sm">
		<div className="relative w-full aspect-[4/3] bg-gray-200 dark:bg-gray-700 animate-pulse" />
		<div className="p-4 flex flex-col flex-grow">
			<div className="flex items-center justify-between mb-2">
				<div className="flex items-center gap-1">
					<div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
					<span className="text-gray-400 mx-1">·</span>
					<div className="flex items-center gap-1">
						<div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
						<div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
					</div>
				</div>
			</div>
			<div className="space-y-2">
				<div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
				<div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
			</div>
			<div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-700">
				<div className="flex flex-col gap-1">
					<div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
					<div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
				</div>
				<div className="flex items-center gap-3">
					<div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
					<div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
				</div>
			</div>
		</div>
	</div>
);

export default function NewsFeed({ searchQuery, showUnread }: NewsFeedProps) {
	const [articles, setArticles] = useState<NewsArticle[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<string>("all");
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalResults, setTotalResults] = useState(0);
	const articlesPerPage = 9;

	const categories = [
		{ id: "all", name: "All News" },
		{ id: "updates", name: "Game Updates" },
		{ id: "dlc", name: "DLC News" },
		{ id: "community", name: "Community" },
		{ id: "guides", name: "Guides & Tips" }
	];

	const categorizeArticle = (article: NewsArticle): NewsArticle => {
		const title = article.title.toLowerCase();
		const description = article.description?.toLowerCase() || "";

		if (title.includes("update") || title.includes("patch")) {
			return { ...article, category: "updates" };
		} else if (title.includes("dlc") || title.includes("expansion")) {
			return { ...article, category: "dlc" };
		} else if (title.includes("guide") || title.includes("how to")) {
			return { ...article, category: "guides" };
		} else if (title.includes("community") || title.includes("player")) {
			return { ...article, category: "community" };
		}
		return { ...article, category: "all" };
	};

	const fetchNews = async (page: number) => {
		try {
			setLoading(true);
			setError(null);
			const response = await axios.get(
				`https://newsapi.org/v2/everything?q="Elden Ring"&language=en&sortBy=publishedAt&page=${page}&pageSize=${articlesPerPage}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
			);

			if (response.data.articles && Array.isArray(response.data.articles)) {
				const newArticles = response.data.articles.map((article: any) => ({
					...categorizeArticle(article),
					isRead: false
				}));

				setArticles(newArticles);
				setTotalResults(response.data.totalResults);
				setTotalPages(Math.ceil(response.data.totalResults / articlesPerPage));
			} else {
				throw new Error("Invalid response format");
			}
		} catch (err) {
			console.error("Error fetching news:", err);
			setError(err instanceof Error ? err.message : "Failed to fetch news");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchNews(currentPage);
	}, [currentPage]);

	const markAsRead = (url: string) => {
		setArticles((prevArticles) =>
			prevArticles.map((article) =>
				article.url === url ? { ...article, isRead: true } : article
			)
		);
	};

	const markAllAsRead = () => {
		setArticles((prevArticles) =>
			prevArticles.map((article) => ({ ...article, isRead: true }))
		);
		toast.success("All articles marked as read");
	};

	const filteredArticles = articles.filter((article) => {
		const matchesCategory =
			selectedCategory === "all" || article.category === selectedCategory;
		const matchesSearch =
			searchQuery === "" ||
			article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			article.description?.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesUnread = !showUnread || !article.isRead;

		return matchesCategory && matchesSearch && matchesUnread;
	});

	if (error) {
		return (
			<div className="text-center text-red-500 p-4">
				<p>{error}</p>
				<button
					onClick={() => window.location.reload()}
					className="text-gray-900 dark:text-white mt-2 hover:text-gray-600 dark:hover:text-gray-300"
				>
					Try again
				</button>
			</div>
		);
	}

	return (
		<>
			<div className="flex items-center justify-between mb-6">
				<div className="flex gap-4 overflow-x-auto pb-2">
					{categories.map((category) => (
						<button
							key={category.id}
							onClick={() => setSelectedCategory(category.id)}
							className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
								${
									selectedCategory === category.id
										? "bg-gray-900 dark:bg-gray-700 text-white"
										: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
								}`}
						>
							{category.name}
						</button>
					))}
				</div>
				<button
					onClick={markAllAsRead}
					className="px-4 py-2 rounded-full text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors whitespace-nowrap"
				>
					Mark all as read
				</button>
			</div>

			{!filteredArticles.length && !loading ? (
				<div className="text-center text-gray-500 dark:text-gray-400 p-4">
					<p>No articles found</p>
				</div>
			) : (
				<>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{loading ? (
							<>
								<SkeletonCard />
								<SkeletonCard />
								<SkeletonCard />
							</>
						) : (
							filteredArticles.map((article, index) => (
								<NewsCard
									key={`${article.url}-${index}`}
									article={article}
									priority={index < 6}
									onRead={() => markAsRead(article.url)}
								/>
							))
						)}
					</div>

					{!loading && totalPages > 1 && (
						<div className="flex justify-center items-center gap-2 mt-8">
							<button
								onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
								disabled={currentPage === 1}
								className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Previous
							</button>
							<span className="text-sm text-gray-600 dark:text-gray-300">
								Page {currentPage} of {totalPages}
							</span>
							<button
								onClick={() =>
									setCurrentPage((prev) => Math.min(totalPages, prev + 1))
								}
								disabled={currentPage === totalPages}
								className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Next
							</button>
						</div>
					)}
				</>
			)}
		</>
	);
}
