import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/providers/theme-provider"
import AuthProvider from "@/providers/auth-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "sonner"

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "FitPortal - Ваш персональный фитнес-портал",
  description: "Персональный фитнес-портал для достижения ваших целей",
  manifest: "/manifest.json",
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={jetbrainsMono.className}>
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(function(registration) {
                  console.log('SW registered: ', registration);
                }, function(err) {
                  console.log('SW registration failed: ', err);
                });
              });
            }
          `,
        }} />
        <script dangerouslySetInnerHTML={{
          __html: `
            // Workbox window registration
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                // Проверяем обновления service worker каждые 10 минут
                setInterval(() => {
                  navigator.serviceWorker.ready.then(registration => {
                    registration.update();
                  });
                }, 1000 * 60 * 10);
              });
            }
          `,
        }} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col px-2 sm:px-4 md:px-8" style={{paddingBottom: 'env(safe-area-inset-bottom)', paddingTop: 'env(safe-area-inset-top)'}}>
              <Header />
              <main className="flex-1 text-base leading-snug">{children}</main>
              <Footer />
            </div>

            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}