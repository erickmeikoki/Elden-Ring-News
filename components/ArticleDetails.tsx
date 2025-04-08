"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

interface Comment {
	id: string;
	author: string;
	content: string;
	timestamp: string;
}

interface ArticleDetailsProps {
	articleId: string;
	title: string;
	content: string;
}

export default function ArticleDetails({
	articleId,
	title,
	content
}: ArticleDetailsProps) {
	const [comments, setComments] = useState<Comment[]>([]);
	const [newComment, setNewComment] = useState("");
	const [summary, setSummary] = useState<string | null>(null);
	const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		fetchComments();
		fetchRelatedArticles();
		generateSummary();
	}, [articleId]);

	const fetchComments = async () => {
		try {
			// In a real app, this would fetch from your backend
			const mockComments: Comment[] = [
				{
					id: "1",
					author: "Tarnished1",
					content: "Great article! Thanks for sharing.",
					timestamp: new Date().toISOString()
				}
			];
			setComments(mockComments);
		} catch (error) {
			toast.error("Failed to load comments");
		}
	};

	const fetchRelatedArticles = async () => {
		try {
			// In a real app, this would fetch from your backend
			const mockRelated = [
				{
					id: "related1",
					title: "Related Article 1",
					url: "#"
				}
			];
			setRelatedArticles(mockRelated);
		} catch (error) {
			toast.error("Failed to load related articles");
		}
	};

	const generateSummary = async () => {
		try {
			setIsLoading(true);
			const response = await fetch("/api/summarize", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ content })
			});

			const data = await response.json();
			if (data.summary) {
				setSummary(data.summary);
			}
		} catch (error) {
			toast.error("Failed to generate summary");
		} finally {
			setIsLoading(false);
		}
	};

	const handleCommentSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newComment.trim()) return;

		try {
			// In a real app, this would post to your backend
			const newCommentObj: Comment = {
				id: Date.now().toString(),
				author: "Current User", // Replace with actual user
				content: newComment,
				timestamp: new Date().toISOString()
			};

			setComments([...comments, newCommentObj]);
			setNewComment("");
			toast.success("Comment added successfully");
		} catch (error) {
			toast.error("Failed to add comment");
		}
	};

	return (
		<div className="space-y-8">
			{/* AI Summary Section */}
			<div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
				<h3 className="text-lg font-semibold mb-2">AI Summary</h3>
				{isLoading ? (
					<div className="animate-pulse">
						<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
						<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
					</div>
				) : (
					<p className="text-gray-700 dark:text-gray-300">{summary}</p>
				)}
			</div>

			{/* Comments Section */}
			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Comments</h3>
				<form onSubmit={handleCommentSubmit} className="space-y-2">
					<textarea
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
						placeholder="Add a comment..."
						className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
						rows={3}
					/>
					<button
						type="submit"
						className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
					>
						Post Comment
					</button>
				</form>

				<div className="space-y-4">
					{comments.map((comment) => (
						<div
							key={comment.id}
							className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
						>
							<div className="flex justify-between items-start">
								<span className="font-semibold">{comment.author}</span>
								<span className="text-sm text-gray-500">
									{new Date(comment.timestamp).toLocaleDateString()}
								</span>
							</div>
							<p className="mt-2 text-gray-700 dark:text-gray-300">
								{comment.content}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* Related Articles Section */}
			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Related Articles</h3>
				<div className="grid gap-4">
					{relatedArticles.map((article) => (
						<a
							key={article.id}
							href={article.url}
							className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
						>
							<h4 className="font-medium">{article.title}</h4>
						</a>
					))}
				</div>
			</div>
		</div>
	);
}
