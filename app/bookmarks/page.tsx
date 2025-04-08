"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

interface BookmarkedArticle {
	id: string;
	title: string;
	url: string;
	date: string;
	source: string;
	thumbnail?: string;
}

export default function BookmarksPage() {
	const [bookmarks, setBookmarks] = useState<BookmarkedArticle[]>([]);
	const [mounted, setMounted] = useState(false);
	const { resolvedTheme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
		const savedBookmarks = localStorage.getItem("elden-ring-bookmarks");
		if (savedBookmarks) {
			setBookmarks(JSON.parse(savedBookmarks));
		}
	}, []);

	const removeBookmark = (id: string) => {
		const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
		setBookmarks(updatedBookmarks);
		localStorage.setItem(
			"elden-ring-bookmarks",
			JSON.stringify(updatedBookmarks)
		);
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
						<div className="flex items-center gap-4">
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
									Bookmarks
								</h1>
							</Link>
						</div>
						<div className="flex items-center gap-4">
							<Link href="/r-eldenring" className="btn-secondary">
								r/Eldenring
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
				</div>
			</header>

			<div className="max-w-7xl mx-auto px-4 py-8">
				{bookmarks.length === 0 ? (
					<div className="text-center py-12">
						<h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
							No bookmarks yet
						</h2>
						<p className="text-gray-500 dark:text-gray-400">
							Articles you bookmark will appear here
						</p>
					</div>
				) : (
					<div className="grid gap-4">
						{bookmarks.map((bookmark) => (
							<div
								key={bookmark.id}
								className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
							>
								<div className="flex items-start gap-4">
									{bookmark.thumbnail && (
										<div className="flex-shrink-0">
											<img
												src={bookmark.thumbnail}
												alt={bookmark.title}
												className="w-24 h-24 object-cover rounded"
											/>
										</div>
									)}
									<div className="flex-grow">
										<div className="flex justify-between items-start">
											<a
												href={bookmark.url}
												target="_blank"
												rel="noopener noreferrer"
												className="text-lg font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
											>
												{bookmark.title}
											</a>
											<button
												onClick={() => removeBookmark(bookmark.id)}
												className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
												aria-label="Remove bookmark"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-5 w-5"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path
														fillRule="evenodd"
														d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
														clipRule="evenodd"
													/>
												</svg>
											</button>
										</div>
										<div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
											<span>{bookmark.source}</span>
											<span className="mx-2">•</span>
											<span>{bookmark.date}</span>
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
