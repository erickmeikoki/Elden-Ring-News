import Link from "next/link";

export default function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
			<div className="text-center">
				<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
					404 - Page Not Found
				</h1>
				<p className="text-gray-600 dark:text-gray-400 mb-8">
					The page you are looking for does not exist.
				</p>
				<Link
					href="/"
					className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
				>
					Return Home
				</Link>
			</div>
		</div>
	);
}
