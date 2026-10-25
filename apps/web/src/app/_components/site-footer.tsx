import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true">熊</span>
          <span>AI WATCH <small>ACADEMY</small></span>
        </Link>
        <p>以自然啟發智慧，用 AI 連結未來。</p>
        <nav aria-label="頁尾導覽"><Link href="/articles-newsletter">文章／電子報</Link><Link href="/help-legal">幫助／政策</Link><Link href="/member-center">會員中心</Link></nav>
        <small>© 2026 AI Watch Academy</small>
      </div>
    </footer>
  );
}
