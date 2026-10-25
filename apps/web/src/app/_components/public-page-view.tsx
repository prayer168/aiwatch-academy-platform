import Link from "next/link";
import type { PublicPage } from "../_content/public-pages";

export function PublicPageView({ page }: { page: PublicPage }) {
  return (
    <main className="public-page wrap">
      <nav className="breadcrumbs" aria-label="麵包屑"><Link href="/">首頁</Link><span aria-hidden="true">/</span><span>{page.navLabel}</span></nav>
      <section className="public-page-hero">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p className="page-intro">{page.intro}</p>
      </section>
      <div className="public-page-layout">
        <div className="page-sections">
          {page.sections.map((section, index) => (
            <section className="info-section" key={section.heading}>
              <span className="section-index">0{index + 1}</span>
              <div><h2>{section.heading}</h2><p>{section.body}</p>{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</div>
            </section>
          ))}
        </div>
        <aside className="page-aside">
          <span className="aside-mark" aria-hidden="true">✳</span>
          <p>AI WATCH / FIELD GUIDE</p>
          <h2>把每一次好奇，變成下一個好問題。</h2>
          <Link className="button button-dark" href={page.ctaHref}>{page.ctaLabel}<span aria-hidden="true">→</span></Link>
        </aside>
      </div>
      <div className="page-bottom-note"><span>熊掌智境</span><span>以自然啟發智慧，用 AI 連結未來。</span></div>
    </main>
  );
}
