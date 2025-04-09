/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			"images.unsplash.com",
			"via.placeholder.com",
			"www.ign.com",
			"assets.reedpopcdn.com",
			"i.ytimg.com",
			"newsapi.org"
		],
		unoptimized: true
	},
	output: "standalone",
	env: {
		NEWS_API_KEY: process.env.NEWS_API_KEY
	}
};

module.exports = nextConfig;
