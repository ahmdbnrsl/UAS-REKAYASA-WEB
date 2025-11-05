import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import Container from './container';
import './globals.css';

const geistSans = Outfit({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'SIAKAD',
	description: 'Sistem Informasi Akademik',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} antialiased`}>
				<Container>{children}</Container>
			</body>
		</html>
	);
}
