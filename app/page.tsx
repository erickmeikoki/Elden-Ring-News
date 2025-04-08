"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Toaster, toast } from "react-hot-toast";
import NewsFeed from "@/components/NewsFeed";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	const [searchQuery, setSearchQuery] = useState("");
	const [showUnread, setShowUnread] = useState(false);
	const { theme, setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const toggleTheme = () => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	};

	if (!mounted) {
		return null;
	}

	return (
		<main className="min-h-screen bg-white dark:bg-gray-900">
			<Toaster position="top-right" />
			<header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-4">
						<div className="flex items-center gap-4">
							<div className="relative w-12 h-12">
								<Image
									src="/images/EldenringLogo.jpg"
									alt="Elden Ring Logo"
									fill
									className="object-contain"
									priority
								/>
							</div>
							<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
								Elden Ring News
							</h1>
						</div>
						<div className="flex items-center gap-4">
							<Link
								href="/bookmarks"
								className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
							>
								Bookmarks
							</Link>
							<Link
								href="/builds"
								className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
							>
								Build Calculator
							</Link>
							<Link
								href="/r-eldenring"
								className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
							>
								r/Eldenring
							</Link>
							<input
								type="text"
								placeholder="Search news..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<button
								onClick={() => setShowUnread(!showUnread)}
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
									showUnread
										? "bg-blue-500 text-white"
										: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
								}`}
							>
								Unread Only
							</button>
							<button
								onClick={toggleTheme}
								className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
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
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<NewsFeed searchQuery={searchQuery} showUnread={showUnread} />
			</div>
		</main>
	);
}
