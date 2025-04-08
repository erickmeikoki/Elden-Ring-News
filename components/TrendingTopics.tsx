"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

interface TrendingTopic {
	id: string;
	title: string;
	count: number;
	url: string;
}

export default function TrendingTopics() {
	const [topics, setTopics] = useState<TrendingTopic[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchTrendingTopics();
	}, []);

	const fetchTrendingTopics = async () => {
		try {
			setIsLoading(true);
			// In a real app, this would fetch from your backend
			const mockTopics: TrendingTopic[] = [
				{
					id: "1",
					title: "Shadow of the Erdtree DLC",
					count: 156,
					url: "#"
				},
				{
					id: "2",
					title: "New Patch Notes",
					count: 98,
					url: "#"
				},
				{
					id: "3",
					title: "Speedrun Records",
					count: 75,
					url: "#"
				}
			];
			setTopics(mockTopics);
		} catch (error) {
			toast.error("Failed to load trending topics");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
			<h2 className="text-xl font-semibold mb-4">Trending Topics</h2>
			{isLoading ? (
				<div className="space-y-4">
					{[1, 2, 3].map((i) => (
						<div key={i} className="animate-pulse">
							<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
							<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
						</div>
					))}
				</div>
			) : (
				<div className="space-y-4">
					{topics.map((topic) => (
						<a
							key={topic.id}
							href={topic.url}
							className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
						>
							<div className="flex justify-between items-center">
								<span className="font-medium">{topic.title}</span>
								<span className="text-sm text-gray-500">
									{topic.count} posts
								</span>
							</div>
						</a>
					))}
				</div>
			)}
		</div>
	);
}
