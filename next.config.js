/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	images: {
		domains: ["newsapi.org"],
		unoptimized: true
	},
	trailingSlash: true
};

module.exports = nextConfig;
