import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Review Matrix", description: "A review matrix for AI-authored pull requests" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
