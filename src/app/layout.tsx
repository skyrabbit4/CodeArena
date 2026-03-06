import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "CodeArena",
  description: "Battle other developers in real-time coding quizzes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-bg antialiased">
        <Navbar />
        <main className="pb-20 sm:pb-0 sm:pt-14">{children}</main>
      </body>
    </html>
  );
}
