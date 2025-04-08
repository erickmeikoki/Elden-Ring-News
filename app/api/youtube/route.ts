import { NextResponse } from "next/server";

// Mock data for development - remove this when you have the actual YouTube API key
const MOCK_VIDEOS = [
	{
		id: "R8K0FS5YTW4",
		title: "ELDEN RING - Official Gameplay Reveal",
		thumbnail: "https://i.ytimg.com/vi/R8K0FS5YTW4/maxresdefault.jpg",
		publishedAt: "2023-12-01T10:00:00Z",
		viewCount: "1.2M"
	},
	{
		id: "K_03kFqWfqs",
		title: "ELDEN RING - Launch Trailer",
		thumbnail: "https://i.ytimg.com/vi/K_03kFqWfqs/maxresdefault.jpg",
		publishedAt: "2023-11-15T14:00:00Z",
		viewCount: "892K"
	},
	{
		id: "JldMvQMO_5U",
		title: "ELDEN RING - Story Trailer",
		thumbnail: "https://i.ytimg.com/vi/JldMvQMO_5U/maxresdefault.jpg",
		publishedAt: "2023-10-28T18:00:00Z",
		viewCount: "654K"
	}
];

export async function GET() {
	try {
		// For now, return mock data
		// When you have the YouTube API key, uncomment the following code:
		/*
		const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
		const CHANNEL_ID = 'UC9QkMNXLuL41VVIM0xHWynQ'; // Bandai Namco America

		const searchResponse = await fetch(
			`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&q=Elden Ring&type=video&order=date&maxResults=6&key=${YOUTUBE_API_KEY}`
		);
		
		if (!searchResponse.ok) {
			throw new Error('Failed to fetch videos from YouTube');
		}

		const searchData = await searchResponse.json();
		const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');

		const videosResponse = await fetch(
			`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`
		);

		if (!videosResponse.ok) {
			throw new Error('Failed to fetch video details from YouTube');
		}

		const videosData = await videosResponse.json();

		const videos = videosData.items.map((item: any) => ({
			id: item.id,
			title: item.snippet.title,
			thumbnail: item.snippet.thumbnails.high.url,
			publishedAt: item.snippet.publishedAt,
			viewCount: new Intl.NumberFormat('en-US', { notation: 'compact' }).format(
				parseInt(item.statistics.viewCount)
			),
		}));
		*/

		return NextResponse.json({ videos: MOCK_VIDEOS });
	} catch (error) {
		console.error("Error in YouTube API route:", error);
		return NextResponse.json(
			{ error: "Failed to fetch YouTube videos" },
			{ status: 500 }
		);
	}
}
