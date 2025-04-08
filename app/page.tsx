"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";
import NewsFeed from "@/components/NewsFeed";
import TrendingTopics from "@/components/TrendingTopics";
import WeeklyDigest from "@/components/WeeklyDigest";

export default function Home() {
	const [searchQuery, setSearchQuery] = useState("");
	const [showUnread, setShowUnread] = useState(false);
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	if (!mounted) {
		return null;
	}

	return (
		<main className="min-h-screen bg-gray-50 dark:bg-gray-900">
			<Toaster position="top-right" />

			{/* Header */}
			<header className="bg-white dark:bg-gray-800 shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<Image
								src="/images/EldenringLogo.jpg"
								alt="Elden Ring Logo"
								width={40}
								height={40}
								className="rounded-full"
							/>
							<h1 className="text-xl font-bold text-gray-900 dark:text-white">
								Elden Ring News
							</h1>
						</div>
						<div className="flex items-center space-x-4">
							<input
								type="text"
								placeholder="Search articles..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
							/>
							<button
								onClick={() => setShowUnread(!showUnread)}
								className={`px-4 py-2 rounded-lg ${
									showUnread
										? "bg-blue-500 text-white"
										: "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
								}`}
							>
								{showUnread ? "Show All" : "Show Unread"}
							</button>
							<button
								onClick={toggleTheme}
								className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
								aria-label="Toggle theme"
							>
								{theme === "dark" ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 text-gray-800 dark:text-gray-200"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
											clipRule="evenodd"
										/>
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 text-gray-800 dark:text-gray-200"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
									</svg>
								)}
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-3">
						<NewsFeed searchQuery={searchQuery} showUnread={showUnread} />
					</div>

					{/* Sidebar */}
					<div className="space-y-8">
						<TrendingTopics />
						<WeeklyDigest />
					</div>
				</div>
			</div>
		</main>
	);
}
