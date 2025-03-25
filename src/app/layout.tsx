import type { Metadata } from 'next';
import './globals.css';
import TanstackQueryProvider from '@/providers/TanstackQueryProvider';
import MswInitializer from '@/providers/MswInitializer';
import { Providers } from '@/app/providers';
export const metadata: Metadata = {
  title: '빵잇나우',
  description: '빵잇나우',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MswInitializer />
        <TanstackQueryProvider>
          <Providers>{children}</Providers>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
