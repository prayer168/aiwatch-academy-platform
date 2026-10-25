import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PublicPageView } from "../_components/public-page-view";
import { getPublicPage, publicPages } from "../_content/public-pages";
import { siteUrl } from "../../lib/site-url";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publicPages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPublicPage(slug);
  if (!page) return {};

  return {
    title: page.navLabel,
    description: page.description,
    alternates: { canonical: `/${page.slug}` },
    robots: page.indexable ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      type: "website",
      locale: "zh_TW",
      url: new URL(`/${page.slug}`, siteUrl).toString(),
      title: `${page.navLabel}｜AI Watch Academy`,
      description: page.description,
      siteName: "AI Watch Academy｜熊掌智境",
    },
    twitter: { card: "summary", title: `${page.navLabel}｜AI Watch Academy`, description: page.description },
  };
}

export default async function PublicContentPage({ params }: Props) {
  const { slug } = await params;
  const page = getPublicPage(slug);
  if (!page) notFound();
  return <PublicPageView page={page} />;
}
