"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

interface RedditPost {
	id: string;
	title: string;
	author: string;
	score: number;
	num_comments: number;
	created_utc: number;
	url: string;
	thumbnail: string;
	permalink: string;
}

interface YouTubeVideo {
	id: string;
	title: string;
	thumbnail: string;
	publishedAt: string;
	viewCount: string;
}

export default function RedditPage() {
	const [posts, setPosts] = useState<RedditPost[]>([]);
	const [videos, setVideos] = useState<YouTubeVideo[]>([]);
	const [loading, setLoading] = useState(true);
	const [youtubeLoading, setYoutubeLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [youtubeError, setYoutubeError] = useState<string | null>(null);
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const sliderRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setMounted(true);
		fetchRedditPosts();
		fetchYouTubeVideos();
	}, []);

	const fetchYouTubeVideos = async () => {
		try {
			setYoutubeLoading(true);
			setYoutubeError(null);
			const response = await fetch("/api/youtube");
			if (!response.ok) throw new Error("Failed to fetch YouTube videos");
			const data = await response.json();
			if (data.error) throw new Error(data.error);
			setVideos(data.videos);
		} catch (err) {
			console.error("Error fetching YouTube videos:", err);
			setYoutubeError(
				err instanceof Error ? err.message : "Failed to load videos"
			);
		} finally {
			setYoutubeLoading(false);
		}
	};

	const fetchRedditPosts = async () => {
		try {
			const response = await fetch(
				"https://www.reddit.com/r/Eldenring/hot.json?limit=25"
			);
			if (!response.ok) throw new Error("Failed to fetch Reddit posts");
			const data = await response.json();
			setPosts(data.data.children.map((child: any) => child.data));
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	const formatDate = (timestamp: number) => {
		const date = new Date(timestamp * 1000);
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric"
		});
	};

	const slideLeft = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({
				left: -sliderRef.current.offsetWidth,
				behavior: "smooth"
			});
		}
	};

	const slideRight = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({
				left: sliderRef.current.offsetWidth,
				behavior: "smooth"
			});
		}
	};

	const toggleTheme = () => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	};

	if (!mounted) return null;

	return (
		<main className="min-h-screen bg-white dark:bg-gray-900 font-garamond">
			<Toaster position="top-right" />
			<header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
				<div className="max-w-7xl mx-auto px-4">
					<div className="flex items-center justify-between h-14">
						<Link href="/" className="flex items-center gap-2">
							<div className="relative w-8 h-8">
								<Image
									src="/images/EldenringLogo.jpg"
									alt="Elden Ring Logo"
									fill
									className="object-contain"
									priority
								/>
							</div>
							<h1 className="text-xl font-bold text-gray-900 dark:text-white">
								r/Eldenring
							</h1>
						</Link>
						<button
							onClick={toggleTheme}
							className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
							aria-label="Toggle theme"
						>
							{resolvedTheme === "dark" ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" />
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
								</svg>
							)}
						</button>
					</div>
				</div>
			</header>

			<div className="max-w-7xl mx-auto px-4 py-4">
				{/* YouTube Videos Section */}
				<div className="mb-6">
					<div className="flex items-center justify-between mb-3">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
							Latest Elden Ring Videos
						</h2>
						<div className="flex gap-2">
							<button
								onClick={slideLeft}
								className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
								aria-label="Previous videos"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
							<button
								onClick={slideRight}
								className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
								aria-label="Next videos"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
						</div>
					</div>
					{youtubeLoading ? (
						<div className="flex justify-center items-center h-32 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
							<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
						</div>
					) : youtubeError ? (
						<div className="p-4 text-center text-red-500 dark:text-red-400 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
							{youtubeError}
							<button
								onClick={() => fetchYouTubeVideos()}
								className="mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
							>
								Retry
							</button>
						</div>
					) : (
						<div className="relative">
							<div
								ref={sliderRef}
								className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
								style={{
									scrollbarWidth: "none",
									msOverflowStyle: "none",
									WebkitOverflowScrolling: "touch"
								}}
							>
								{videos.map((video, index) => (
									<a
										key={video.id}
										href={`https://www.youtube.com/watch?v=${video.id}`}
										target="_blank"
										rel="noopener noreferrer"
										className="flex-none w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] snap-start bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors overflow-hidden"
									>
										<div className="aspect-video relative">
											<Image
												src={video.thumbnail}
												alt={video.title}
												fill
												priority={index < 3}
												className="object-cover"
											/>
										</div>
										<div className="p-3">
											<h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
												{video.title}
											</h3>
											<div className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
												<span>{video.viewCount} views</span>
												<span>•</span>
												<span>
													{new Date(video.publishedAt).toLocaleDateString()}
												</span>
											</div>
										</div>
									</a>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Reddit Posts Section */}
				{loading ? (
					<div className="flex justify-center items-center h-32">
						<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
					</div>
				) : error ? (
					<div className="text-center text-red-500 dark:text-red-400">
						{error}
					</div>
				) : (
					<div className="grid gap-2">
						{posts.map((post) => (
							<div
								key={post.id}
								className="bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
							>
								<div className="p-3">
									<div className="flex items-start gap-3">
										<div className="flex flex-col items-center gap-1 pt-1">
											<span className="text-xs text-gray-500 dark:text-gray-400">
												▲
											</span>
											<span className="text-sm font-medium text-gray-900 dark:text-white">
												{post.score}
											</span>
										</div>
										<div className="min-w-0">
											<a
												href={`https://reddit.com${post.permalink}`}
												target="_blank"
												rel="noopener noreferrer"
												className="text-base font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2"
											>
												{post.title}
											</a>
											<div className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
												<span>u/{post.author}</span>
												<span>•</span>
												<span>{formatDate(post.created_utc)}</span>
												<span>•</span>
												<span>{post.num_comments} comments</span>
											</div>
											{post.thumbnail && post.thumbnail !== "self" && (
												<div className="mt-2">
													<img
														src={post.thumbnail}
														alt={post.title}
														className="max-h-32 rounded"
													/>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</main>
	);
}
