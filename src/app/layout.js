import './globals.css';

export const metadata = {
  title: 'NEXASOUL BuildSprint | Jujutsu Frontend Challenge 2026',
  description:
    'NEXASOUL BuildSprint: Frontend Product Challenge — An anime-themed front-end challenge testing creativity, collaboration, and development skills. September 30, 2026 | B1 & B2 Seminar Hall.',
  keywords: [
    'NexaSoul',
    'BuildSprint',
    'Jujutsu Kaisen',
    'Frontend Challenge',
    'Hackathon',
    'Anime',
    'Web Development',
  ],
  openGraph: {
    title: 'NEXASOUL BuildSprint | Jujutsu Frontend Challenge',
    description:
      'An anime-themed front-end product challenge. Channel your cursed energy and build something epic. September 30, 2026.',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#050508',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
