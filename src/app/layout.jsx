import { Providers } from './store/provider';
import './globals.css';

export const metadata = {
  title: 'Cricket Scorecard',
  description: 'Live cricket scores and match details',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <Providers>
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}