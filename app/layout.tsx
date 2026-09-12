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
  title: "Expense Manager",
  description: "Manage your categories and expenses",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <div className="flex min-h-screen flex-col md:flex-row">

          {/* Sidebar */}
          <aside className="w-full shrink-0 bg-zinc-900 text-white md:w-60">
            <div className="p-4">

              {/* Logo / App Name */}
              <h1 className="px-2 text-lg font-semibold sm:px-4">
                Expense Manager
              </h1>

              {/* Navigation */}
              <nav className="mt-4 md:mt-8">
                <ul className="flex gap-2 overflow-x-auto md:flex-col">

                  <li className="shrink-0">
                    <a
                      href="/categories"
                      className="block rounded-lg px-4 py-2.5 text-sm font-medium transition hover:bg-zinc-800 md:py-3"
                    >
                      Categories
                    </a>
                  </li>

                  <li className="shrink-0">
                    <a
                      href="/expenses"
                      className="block rounded-lg px-4 py-2.5 text-sm font-medium transition hover:bg-zinc-800 md:py-3"
                    >
                      Expenses
                    </a>
                  </li>

                </ul>
              </nav>

            </div>
          </aside>

          {/* Main Content */}
          <main className="min-w-0 flex-1">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}
