import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Review Matrix | AI-Powered Pull Request Risk Intelligence", description: "AI-Powered Pull Request Risk Intelligence for agent-authored changes." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
