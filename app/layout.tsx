import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "@/components/Home/Navbar/Navbar";
import Footer from "@/components/Home/footer/footer";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { AccessibilityProvider } from "@/components/Home/accessibility/AccessibilityContext";
import { AccessibilityGlobalStyles } from "@/components/Home/accessibility/AccessibilityGlobalStyles";
import { AccessibilityPanel } from "@/components/Home/accessibility/AccessibilityPanel";

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400','700']
});

export const metadata: Metadata = {
  title: "lactisa",
  description: "Laikipia county tertialy institutions student association",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <head>
          <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <meta name="apple-mobile-web-app-title" content="lactisa" />
          <link rel="manifest" href="/site.webmanifest" />
        </head>
          <body
            className={`${nunito.className} ${process.env.NODE_ENV === "development" ? "debug-screens" : ""} antialiased mt- bg-gray-50 text-black`}
          >
            <AccessibilityProvider>
              <AccessibilityGlobalStyles/>
                <AccessibilityPanel />
                <Navbar />
                    {children}
                    <Toaster toastOptions={{className: "mt-14"}} />
                <Footer />
            </AccessibilityProvider>
          </body>
      </html>
    </SessionProvider>

  );
}
