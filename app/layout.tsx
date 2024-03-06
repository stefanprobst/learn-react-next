import "tailwindcss/tailwind.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Learn React",
};

interface RootLayoutProps {
	children: ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
	const { children } = props;

	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
