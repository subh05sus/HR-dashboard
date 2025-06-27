import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/session-provider";
import { SearchProvider } from "@/contexts/search-context";
import { Navbar } from "@/components/navbar";
import { Suspense } from "react";
import AuthGuard from "@/components/auth-guard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HR Dashboard",
  description: "A modern HR management dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SearchProvider>
              <Suspense fallback={<div>Loading...</div>}>
                <AuthGuard>
                  <div className="min-h-screen bg-background">
                    <Navbar />
                    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                      {children}
                    </main>
                  </div>
                </AuthGuard>
              </Suspense>
            </SearchProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
