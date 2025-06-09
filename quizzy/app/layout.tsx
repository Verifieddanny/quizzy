import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "QuizCrypto - Test Your Crypto Knowledge & Earn NFT Rewards",
  description:
    "Challenge yourself with exciting crypto quizzes, climb the leaderboard, and earn exclusive NFT rewards. The ultimate mobile-first crypto learning platform.",
  keywords: "crypto quiz, blockchain quiz, NFT rewards, crypto learning, DeFi quiz, Web3 education",
  authors: [{ name: "QuizCrypto Team" }],
  openGraph: {
    title: "QuizCrypto - Test Your Crypto Knowledge & Earn NFT Rewards",
    description:
      "Challenge yourself with exciting crypto quizzes, climb the leaderboard, and earn exclusive NFT rewards.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuizCrypto - Test Your Crypto Knowledge & Earn NFT Rewards",
    description:
      "Challenge yourself with exciting crypto quizzes, climb the leaderboard, and earn exclusive NFT rewards.",
  },
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
