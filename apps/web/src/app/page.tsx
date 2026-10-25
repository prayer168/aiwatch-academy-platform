import Link from "next/link";

const pathways = [
  { number: "01", title: "AI 影片學院", description: "從企劃、製作到發布，練習完整的 AI 影片工作流。", href: "/video-academy" },
  { number: "02", title: "AI Coding 實驗室", description: "用 Codex 與開發工具，逐步完成可以運行的作品。", href: "/coding-lab" },
  { number: "03", title: "AI 教育與自然探究", description: "把 AI、自然觀察與 STEAM 探究帶進真實教學。", href: "/education-nature" },
];

export default function Home() {
  return (
    <main>
      <section className="hero wrap" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> AI 實戰 × 自然教育</p>
          <h1>以自然啟發智慧，<br /><em>用 AI 連結未來。</em></h1>
          <p className="hero-text">從一個好奇的問題開始，透過 AI 工具、動手實作與自然探究，做出真正屬於你的作品。</p>
          <div className="hero-actions"><Link className="button button-dark" href="/start-here">從這裡開始 <span aria-hidden="true">→</span></Link><a className="text-link" href="#learn">看看學習路徑 <span aria-hidden="true">↓</span></a></div>
          <div className="hero-note"><span className="note-line" /> 學會工具，更學會創造</div>
        </div>
        <div className="hero-art" role="img" aria-label="森林與山海交會的自然學習景色">
          <div className="sun" /><div className="mountain mountain-back" /><div className="mountain mountain-front" />
          <div className="forest forest-left">♣　♣　♣</div><div className="forest forest-right">♣　♣　♣</div>
          <div className="art-caption"><span>FIELD NOTES · 001</span><strong>觀察世界<br />從此刻開始</strong><i>AI WATCH / NATURE</i></div>
          <div className="art-stamp">自然<br />×<br />AI</div>
        </div>
        <div className="hero-bottom"><span>01 / 05</span><span className="scroll-track"><i /></span><span>SCROLL TO EXPLORE</span></div>
      </section>

      <section className="pathways" id="learn">
        <div className="wrap">
          <div className="section-heading"><div><p className="eyebrow">LEARN BY MAKING</p><h2>把好奇心，變成作品。</h2></div><p>清楚的路徑，實際的練習，<br />每一步都看得見自己的成長。</p></div>
          <div className="path-grid">{pathways.map((item) => <article className="path-card" key={item.number}><span className="card-number">{item.number}</span><div className="card-icon" aria-hidden="true">{item.number === "01" ? "◉" : item.number === "02" ? "⌘" : "✳"}</div><h3>{item.title}</h3><p>{item.description}</p><Link href={item.href} aria-label={`了解${item.title}`}>探索路徑 <span aria-hidden="true">↗</span></Link></article>)}</div>
        </div>
      </section>

      <section className="manifesto wrap" id="about"><span className="manifesto-mark" aria-hidden="true">✳</span><p>Curiosity is a way forward.</p><h2>看見自然的細節，<br />也看見科技的可能。</h2><Link className="text-link" href="/education-nature">認識自然探究路徑 <span aria-hidden="true">→</span></Link></section>

      <section className="join" id="join"><div className="wrap join-inner"><div><p className="eyebrow">YOUR NEXT STEP STARTS HERE</p><h2>從公開內容開始，<br />找到自己的學習節奏。</h2></div><Link className="button button-light" href="/articles-newsletter">瀏覽文章與電子報資訊 <span aria-hidden="true">↗</span></Link></div></section>
    </main>
  );
}
