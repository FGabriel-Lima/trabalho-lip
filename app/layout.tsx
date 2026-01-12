import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppSidebar } from '../components/app-sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StudySpace',
  description: 'Seu gerenciador de estudos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-50 flex min-h-screen`}>
        <AppSidebar />
        <main className="flex-1 p-6 md:p-8 pt-20 md:pt-8 overflow-y-auto h-screen scroll-smooth">
          {children}
        </main>
      </body>
    </html>
  );
}