import type { Metadata } from 'next';
import { Jost } from 'next/font/google';
import Container from './container';
import './globals.css';

const jost = Jost({
	subsets: ['latin'],
	variable: '--font-jost',
});

export const metadata: Metadata = {
  title: "SIAKAD | UNIKMA",
  description: "Sistem Informasi Akademik",
  metadataBase: new URL("https://beni-basisdata-uts.ab-rust.xyz"),

  openGraph: {
    title: "SIAKAD | UNIKMA",
    description: "Sistem Informasi Akademik | Universitas Komputama",
    url: "https://beni-basisdata-uts.ab-rust.xyz",
    siteName: "SIAKAD | UNIKMA",
    images: [
      {
        url: "https://cdn.ab-rust.xyz/file/1762501538955.png",
        width: 1200,
        height: 630,
        alt: "SIAKAD Thumbnail",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SIAKAD | UNIKMA",
    description: "Sistem Informasi Akademik | Universitas Komputama",
    images: ["https://cdn.ab-rust.xyz/file/1762501538955.png"],
  },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<meta name="theme-color" content="#0f172a" />
			</head>
			<body className={`${jost.variable} font-jost antialiased`}>
				<Container>{children}</Container>
			</body>
		</html>
	);
}
