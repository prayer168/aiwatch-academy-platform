import type { Metadata } from "next";
import { SiteFooter } from "./_components/site-footer";
import { SiteHeader } from "./_components/site-header";
import { siteUrl } from "../lib/site-url";
import "./globals.css";

const description = "以自然啟發智慧，用 AI 連結未來。AI Watch Academy 提供 AI 實作學習、影片製作、Coding 與自然探究內容。";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: "AI Watch Academy｜熊掌智境", template: "%s｜AI Watch Academy" },
  description,
  applicationName: "AI Watch Academy",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: siteUrl.toString(),
    siteName: "AI Watch Academy｜熊掌智境",
    title: "AI Watch Academy｜熊掌智境",
    description,
  },
  twitter: { card: "summary", title: "AI Watch Academy｜熊掌智境", description },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body><SiteHeader />{children}<SiteFooter /></body>
    </html>
  );
}
