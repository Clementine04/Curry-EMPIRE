import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import { Suspense } from 'react'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans-app',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif-app',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Curry Empire — Cauayan | A Tour Around the World Through Food',
  description:
    'Browse the Curry Empire Cauayan menu, build your dine-in or take-out order inquiry, and explore premium catering and event services.',
  generator: 'v0.app',
  openGraph: {
    title: 'Curry Empire — Cauayan',
    description: 'A Tour Around the World Through Food',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#fbf6ec',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} bg-background`}
      suppressHydrationWarning
    >
      <body
        className="font-sans antialiased"
        suppressHydrationWarning
        data-gramm="false"
        data-gramm_editor="false"
        data-enable-grammarly="false"
      >
        <Script id="extension-attribute-cleanup" strategy="beforeInteractive">
          {`
            (() => {
              const attrs = [
                'bis_skin_checked',
                'fdprocessedid',
                'data-auth-ext-processed',
                'data-new-gr-c-s-check-loaded',
                'data-gr-ext-installed'
              ];

              const clean = (root = document) => {
                const nodes = root.querySelectorAll ? root.querySelectorAll('*') : [];
                for (const node of nodes) {
                  for (const attr of attrs) {
                    if (node.hasAttribute(attr)) node.removeAttribute(attr);
                  }
                }
              };

              clean();
              new MutationObserver((records) => {
                for (const record of records) {
                  if (record.type === 'attributes' && attrs.includes(record.attributeName)) {
                    record.target.removeAttribute(record.attributeName);
                  }
                  for (const node of record.addedNodes) {
                    if (node.nodeType === 1) clean(node);
                  }
                }
              }).observe(document.documentElement, {
                attributes: true,
                childList: true,
                subtree: true,
                attributeFilter: attrs
              });
            })();
          `}
        </Script>
        <Suspense fallback={null}>{children}</Suspense>
        <Toaster
          position="top-center"
          toastOptions={{
            classNames: {
              toast:
                'glass-card !rounded-2xl !border-foreground/10 !text-foreground',
            },
          }}
        />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
