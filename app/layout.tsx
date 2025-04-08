import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/ThemeProvider";

export const metadata: Metadata = {
	title: "News Feed",
	description: "Latest news and updates"
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
