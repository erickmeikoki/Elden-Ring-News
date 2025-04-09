"use client";

import { format, formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

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

interface NewsCardProps {
	article: NewsArticle;
	priority?: boolean;
	onRead?: () => void;
	onReadChange?: (isRead: boolean) => void;
}

const categoryColors = {
	updates: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
	dlc: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
	community:
		"bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
	guides:
		"bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
	all: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
};

export default function NewsCard({
	article,
	priority = false,
	onRead,
	onReadChange
}: NewsCardProps) {
	const [isBookmarked, setIsBookmarked] = useState(false);
	const [showSummary, setShowSummary] = useState(false);
	const [summary, setSummary] = useState<string | null>(null);
	const [isLoadingSummary, setIsLoadingSummary] = useState(false);
	const viewCount = Math.floor(Math.random() * 100);

	const publishedDate = new Date(article.publishedAt);
	const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true });
	const formattedDate = format(publishedDate, "MMM d, yyyy");

	useEffect(() => {
		const savedBookmarks = localStorage.getItem("elden-ring-bookmarks");
		if (savedBookmarks) {
			const bookmarks = JSON.parse(savedBookmarks);
			setIsBookmarked(
				bookmarks.some((bookmark: any) => bookmark.url === article.url)
			);
		}
	}, [article.url]);

	const toggleBookmark = () => {
		const savedBookmarks = localStorage.getItem("elden-ring-bookmarks");
		let bookmarks = savedBookmarks ? JSON.parse(savedBookmarks) : [];

		if (isBookmarked) {
			bookmarks = bookmarks.filter(
				(bookmark: any) => bookmark.url !== article.url
			);
			toast.success("Removed from bookmarks");
		} else {
			bookmarks.push({
				id: Date.now().toString(),
				title: article.title,
				url: article.url,
				date: new Date(article.publishedAt).toLocaleDateString(),
				source: article.source.name,
				thumbnail: article.urlToImage
			});
			toast.success("Added to bookmarks");
		}

		localStorage.setItem("elden-ring-bookmarks", JSON.stringify(bookmarks));
		setIsBookmarked(!isBookmarked);
	};

	const handleClick = () => {
		if (onRead) {
			onRead();
		}
	};

	const handleShare = async () => {
		try {
			if (navigator.share) {
				await navigator.share({
					title: article.title,
					text: article.description,
					url: article.url
				});
				toast.success("Article shared");
			} else {
				await navigator.clipboard.writeText(article.url);
				toast.success("Link copied to clipboard");
			}
		} catch (error) {
			toast.error("Failed to share article");
		}
	};

	const generateSummary = async () => {
		try {
			setIsLoadingSummary(true);
			const response = await fetch("/api/summarize", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ content: article.description })
			});

			const data = await response.json();

			if (!response.ok) {
				console.error("API Error Response:", data);
				throw new Error(data.error || "Failed to generate summary");
			}

			if (data.summary) {
				setSummary(data.summary);
				setShowSummary(true);
			} else {
				console.error("No summary in response:", data);
				throw new Error("No summary generated");
			}
		} catch (error) {
			console.error("Error generating summary:", error);
			toast.error(
				error instanceof Error ? error.message : "Failed to generate summary"
			);
		} finally {
			setIsLoadingSummary(false);
		}
	};

	return (
		<div
			className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300 ${
				article.isRead ? "opacity-75" : ""
			}`}
		>
			{article.urlToImage && (
				<div className="relative w-full aspect-[4/3]">
					<Image
						src={article.urlToImage}
						alt={article.title}
						fill
						priority={priority}
						unoptimized
						className="object-cover"
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
					/>
					{article.category && article.category !== "all" && (
						<span
							className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${
								categoryColors[article.category as keyof typeof categoryColors]
							}`}
						>
							{article.category}
						</span>
					)}
					{article.isRead && (
						<span className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
							Read
						</span>
					)}
				</div>
			)}
			<div className="p-4 flex flex-col flex-grow">
				<div className="flex items-center justify-between mb-2">
					<div className="flex items-center gap-1">
						<span className="text-sm font-medium text-gray-900 dark:text-white">
							{article.source.name}
						</span>
						<span className="text-gray-400 mx-1">·</span>
						<div className="flex items-center gap-1">
							<svg
								className="w-4 h-4 text-gray-500 dark:text-gray-400"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<span className="text-sm text-gray-600 dark:text-gray-300">
								{viewCount}
							</span>
						</div>
					</div>
				</div>

				<a
					href={article.url}
					target="_blank"
					rel="noopener noreferrer"
					className="group"
					onClick={handleClick}
				>
					<h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-2 line-clamp-2">
						{article.title}
					</h3>
					<p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
						{article.description}
					</p>
				</a>

				{showSummary && (
					<div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
						<h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
							AI Summary
						</h3>
						<p className="text-gray-600 dark:text-gray-300 text-sm">
							{summary}
						</p>
					</div>
				)}

				<div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-700">
					<div className="flex flex-col">
						<span className="text-sm text-gray-500 dark:text-gray-400">
							{timeAgo}
						</span>
						<span className="text-xs text-gray-400 dark:text-gray-500">
							{formattedDate}
						</span>
					</div>
					<div className="flex items-center gap-3">
						<button
							onClick={generateSummary}
							disabled={isLoadingSummary}
							className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
								isLoadingSummary
									? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
									: "bg-blue-500 text-white hover:bg-blue-600"
							}`}
							title="Generate AI Summary"
						>
							{isLoadingSummary ? "Generating..." : "Summary"}
						</button>
						<button
							onClick={toggleBookmark}
							className={`transition-colors ${
								isBookmarked
									? "text-blue-500"
									: "text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
							}`}
							title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
						>
							<svg
								className="w-5 h-5"
								fill={isBookmarked ? "currentColor" : "none"}
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
								/>
							</svg>
						</button>
						<button
							className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
							title="Share"
							onClick={handleShare}
						>
							<svg
								className="w-5 h-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
