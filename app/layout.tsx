import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import QueryProvider from "@/components/query-provider";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Comments Auth App",
    default: "Comments Auth App",
  },
  description: "Comments Auth App With Next.js, Drizzle, and Zod",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "h-svh flex flex-col items-center justify-center",
          inter.className
        )}
      >
        <Link href="/" className="text-3xl font-bold my-6 drop-shadow-md">
          💬 Comments Auth App 💬
        </Link>
        <main className=" shadow flex-col max-h-[700px] h-full p-4 border rounded-xl max-w-md w-full divide-y flex">
          <QueryProvider>{children}</QueryProvider>
        </main>
      </body>
    </html>
  );
}
