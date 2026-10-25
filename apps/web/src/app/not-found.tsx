import Link from "next/link";

export default function NotFound() {
  return (
    <main className="public-page wrap">
      <section className="public-page-hero">
        <p className="eyebrow">404 / PAGE NOT FOUND</p>
        <h1>這條學習路徑暫時找不到。</h1>
        <p className="page-intro">請檢查網址，或回到公開首頁重新探索 AI Watch Academy 的學習內容。</p>
        <Link className="button button-dark" href="/">回到首頁 <span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}
