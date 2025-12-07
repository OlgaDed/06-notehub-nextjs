import './globals.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import TanStackProvider from '../components/TanStackProvider/TanStackProvider';

export const metadata = {
  title: 'NoteHub',
  description: 'NoteHub – note manager built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
