/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			"images.unsplash.com",
			"via.placeholder.com",
			"www.ign.com",
			"assets.reedpopcdn.com",
			"i.ytimg.com"
		],
		unoptimized: true
	},
	output: "standalone"
};

module.exports = nextConfig;
