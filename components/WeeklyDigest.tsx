"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

export default function WeeklyDigest() {
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email.trim()) return;

		try {
			setIsSubmitting(true);
			// In a real app, this would send to your backend
			await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
			toast.success("Successfully subscribed to weekly digest!");
			setEmail("");
		} catch (error) {
			toast.error("Failed to subscribe. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
			<h2 className="text-xl font-semibold mb-4">Weekly Digest</h2>
			<p className="text-gray-600 dark:text-gray-300 mb-4">
				Get the latest Elden Ring news delivered to your inbox every week.
			</p>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700 dark:text-gray-300"
					>
						Email address
					</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
						placeholder="your@email.com"
						required
					/>
				</div>
				<button
					type="submit"
					disabled={isSubmitting}
					className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
				>
					{isSubmitting ? "Subscribing..." : "Subscribe"}
				</button>
			</form>
			<p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
				We respect your privacy. Unsubscribe at any time.
			</p>
		</div>
	);
}
