import type { Metadata } from 'next';
import Script from 'next/script';
import '../index.css';
import '../App.css';

export const metadata: Metadata = {
  title: 'Nicholas Realty | Specialized Probate & Trust Brokerage',
  description:
    'Providing specialized guidance for Probate & Trust real estate transactions.',
  icons: {
    icon: '/NICHOLAS-REALTY-Loggo-copy-e1756205083214.webp',
    apple: '/NICHOLAS-REALTY-Loggo-copy-e1756205083214.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
        <Script
          src="https://code.tidio.co/dntt3ypzxjixj8h834iue6yybp2ofqtc.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

