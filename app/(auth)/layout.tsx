"use client";

import Image from "next/image";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="flex min-h-screen w-full justify-between font-inter">
			{children}
			<div className="auth-asset">
				<Image
					src="/icons/logo.svg"
					height={54}
					width={54}
					alt="BankEase Logo"
					className="bg-white"
				/>
				<h1
					id="bank-ease"
					className="text-6xl font-ibm-plex-serif font-bold text-black-1 ml-4 mr-10"
				>
					BankEase
				</h1>
			</div>
		</main>
	);
}
