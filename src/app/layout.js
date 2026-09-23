import './globals.css';

export const metadata = {
  title: 'NexaSoul BuildSprint | Loading Soon',
  description: 'The Next-Gen Engineering & Architecture BuildSprint is loading soon. Stay tuned for protocol initialization.',
  keywords: ['NexaSoul', 'BuildSprint', 'Hackathon', 'Engineering', 'Next.js', 'AI', 'Developer'],
  openGraph: {
    title: 'NexaSoul BuildSprint | Loading Soon',
    description: 'Protocol initialization in progress. Join the next evolution of building.',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#05070d',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="cyber-grid" />
        {children}
      </body>
    </html>
  );
}
