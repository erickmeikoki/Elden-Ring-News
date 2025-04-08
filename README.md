# Elden Ring News App

A modern, responsive news application dedicated to Elden Ring content, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 📰 Real-time news feed from Reddit's r/EldenRing
- 🔍 Advanced search functionality
- 🌓 Dark mode support
- 📱 Responsive design
- 📑 Read/unread article tracking
- 🔖 Bookmarking system
- 📤 Share functionality
- 🎮 Builds section
- 📺 YouTube integration
- 🔄 Pagination
- 💬 Toast notifications
- ⌨️ Keyboard shortcuts

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Theme Management**: next-themes
- **Notifications**: react-hot-toast
- **API Integration**: Reddit API, YouTube API

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone [your-repo-url]
cd news
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your API keys:

```env
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
YOUTUBE_API_KEY=your_youtube_api_key
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
news/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── bookmarks/         # Bookmarks page
│   ├── builds/            # Builds page
│   ├── r-eldenring/       # Reddit news page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── NewsCard.tsx      # Article card component
│   ├── NewsFeed.tsx      # News feed component
│   └── ThemeProvider.tsx # Theme management
├── public/               # Static assets
│   └── images/          # Image files
└── ...                  # Configuration files
```

## Features in Detail

### News Feed

- Real-time updates from r/EldenRing
- Category-based filtering
- Search functionality
- Read/unread status tracking
- Bookmarking system

### Dark Mode

- System preference detection
- Manual toggle
- Smooth transitions
- Persistent theme selection

### User Experience

- Responsive design for all devices
- Loading states and skeletons
- Toast notifications for actions
- Keyboard shortcuts for navigation
- Share functionality for articles

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Reddit API](https://www.reddit.com/dev/api)
- [YouTube API](https://developers.google.com/youtube/v3)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [react-hot-toast](https://react-hot-toast.com/)
