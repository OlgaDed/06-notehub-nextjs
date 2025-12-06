import './globals.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ReactQueryProvider from '../lib/react-query';

export const metadata = {
  title: 'NoteHub',
  description: 'NoteHub Next.js App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <Header />
          {children}
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
