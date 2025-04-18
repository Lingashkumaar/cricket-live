import  { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './styles/globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cricket Live Scores',
  description: 'Get live cricket scores, match updates, and more',
  metadataBase: new URL('https://cricket-live.example.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}