import Link from "next/link";
import { navigationPages } from "../_content/public-pages";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner wrap">
        <Link className="brand" href="/" aria-label="AI Watch Academy 首頁">
          <span className="brand-mark" aria-hidden="true">熊</span>
          <span>AI WATCH <small>ACADEMY</small></span>
        </Link>
        <nav className="nav-links" aria-label="主要導覽">
          {navigationPages.map((page) => <Link key={page.slug} href={`/${page.slug}`}>{page.navLabel}</Link>)}
          <Link className="nav-cta" href="/member-center">會員中心 <span aria-hidden="true">↗</span></Link>
        </nav>
      </div>
    </header>
  );
}
