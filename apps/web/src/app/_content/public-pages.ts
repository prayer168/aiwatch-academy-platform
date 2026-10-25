export type PublicPageSection = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type PublicPage = {
  slug: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  sections: PublicPageSection[];
  ctaLabel: string;
  ctaHref: string;
  indexable: boolean;
  includeInSitemap: boolean;
};

export const publicPages: PublicPage[] = [
  {
    slug: "start-here",
    navLabel: "開始這裡",
    eyebrow: "START HERE",
    title: "從好奇開始，找到你的學習路徑。",
    description: "認識 AI Watch Academy 的學習方式，從免費內容、實作練習到自然探究，挑選適合自己的第一步。",
    intro: "這裡把 AI 工具實作和自然教育放在同一個學習生態裡。先看懂一個概念，再跟著步驟動手，最後把成果帶回自己的工作或教學情境。",
    sections: [
      { heading: "先選一個想解決的問題", body: "想完成一支教學短片、做出一個小型網站，或設計一場探究活動？從手邊真實的問題開始，讓工具服務於成果。" },
      { heading: "用公開內容建立基礎", body: "先閱讀公開文章與工具說明，確認需要的軟體、版本和先備知識，再決定是否進入完整課程或專案練習。" },
      { heading: "把學習變成可檢視的作品", body: "每條路徑都以可重現的流程和清楚的完成條件為目標。內容會標註適用環境、更新時間與限制。" },
    ],
    ctaLabel: "瀏覽學習路徑",
    ctaHref: "/#learn",
    indexable: true,
    includeInSitemap: true,
  },
  {
    slug: "tools",
    navLabel: "AI 工具庫",
    eyebrow: "TOOLS & FIELD TESTS",
    title: "先看清楚工具能做什麼，再決定怎麼用。",
    description: "AI Watch 工具庫聚焦 AI 工具比較、實測與常見錯誤，說明版本、使用情境、限制和可重現步驟。",
    intro: "工具介紹以實際任務為起點：它適合誰、能完成什麼、需要哪些前提，以及哪些情況仍要人工判斷。尚未完成實測的工具會清楚標示待更新。",
    sections: [
      { heading: "比較與實測", body: "依任務整理生成式 AI、開源工具與創作軟體，記錄測試日期、版本、輸入條件和觀察結果。" },
      { heading: "不只看功能清單", body: "每篇工具內容應說明成本、資料處理考量、輸出品質、著作權或授權限制，以及可能失敗的情況。" },
      { heading: "從工具走到工作流", body: "工具頁會連到可操作的影片製作、Coding 或教學案例，讓讀者能從單一功能繼續完成一件作品。" },
    ],
    ctaLabel: "前往 AI 影片學院",
    ctaHref: "/video-academy",
    indexable: true,
    includeInSitemap: true,
  },
  {
    slug: "video-academy",
    navLabel: "AI 影片學院",
    eyebrow: "AI VIDEO STUDIO",
    title: "從一個清楚的承諾，完成一支好影片。",
    description: "AI 影片學院規劃從選題、腳本、素材、錄製、剪輯到發布的實作學習路徑。",
    intro: "一支影片先說清楚要幫觀眾做到什麼，再用可重現的操作、成果展示與檢查步驟完成。工具版本與素材來源會隨內容一併記錄。",
    sections: [
      { heading: "企劃與腳本", body: "確認受眾、核心成果、前提與唯一行動，再安排 Hook、操作段落、錯誤排除和成果展示。" },
      { heading: "製作與品質檢查", body: "從桌面錄影、旁白、字幕、剪輯到縮圖，使用明確清單檢查畫面、聲音、繁體中文字幕和授權。" },
      { heading: "長片延伸成短內容", body: "短片需有獨立脈絡與完整資訊，再連回相關教學或資源頁；不要求觀眾先看長片才看得懂。" },
    ],
    ctaLabel: "查看 AI Coding 實驗室",
    ctaHref: "/coding-lab",
    indexable: true,
    includeInSitemap: true,
  },
  {
    slug: "coding-lab",
    navLabel: "AI Coding 實驗室",
    eyebrow: "BUILD & LEARN",
    title: "把想法拆成步驟，一步一步做成作品。",
    description: "AI Coding 實驗室整理 Codex、Claude Code、GitHub 與自動化工作流的實作教學和排錯方法。",
    intro: "Coding 教學以可重現的專案為核心，交代環境版本、目錄結構、指令、檢查結果和失敗排除方式。AI 協作產出的內容仍須人工檢視與驗證。",
    sections: [
      { heading: "從可執行的小任務開始", body: "先定義輸入、預期輸出與驗收條件，再讓 AI 協助規劃、修改和檢查程式。" },
      { heading: "每一步都能重現", body: "教學記錄必要的版本、命令與設定。密鑰以環境變數保存，範例檔只放變數名稱，不放真實憑證。" },
      { heading: "驗收程式行為", body: "除了畫面，也要檢查 lint、型別、建置、錯誤狀態和權限邊界，並清楚說明尚未涵蓋的情境。" },
    ],
    ctaLabel: "探索 AI 教育與自然探究",
    ctaHref: "/education-nature",
    indexable: true,
    includeInSitemap: true,
  },
  {
    slug: "education-nature",
    navLabel: "AI 教育／自然探究",
    eyebrow: "NATURE × LEARNING",
    title: "從觀察與提問，設計有證據的學習。",
    description: "結合自然科、STEAM、AI 教學與探究實作，分享可調整的課程案例、工具和教學反思。",
    intro: "自然教育與 AI 學習各自保有清楚脈絡，再透過探究方法連結。教學案例說明適用年段、材料、安全注意事項和成果評量方式。",
    sections: [
      { heading: "從真實現象提出問題", body: "觀察自然或生活中的現象，提出可以蒐集資料、比較證據並討論的問題。" },
      { heading: "讓 AI 成為學習工具", body: "AI 可協助整理想法、產生初步草稿或比較方案；重要事實、來源和學生作品仍需由師生檢核。" },
      { heading: "保護學生與教學資料", body: "公開案例不應揭露學生姓名、影像、學校或可識別資訊。使用作品、照片或素材前，需先確認授權和必要同意。" },
    ],
    ctaLabel: "返回新手導覽",
    ctaHref: "/start-here",
    indexable: true,
    includeInSitemap: true,
  },
  {
    slug: "articles-newsletter",
    navLabel: "文章／電子報",
    eyebrow: "ARTICLES & LETTERS",
    title: "每一份內容，都從查證與實作開始。",
    description: "AI Watch 文章與電子報將整理工具實測、AI 影片工作流、Coding 專案和 AI 教學案例。訂閱功能尚未開放。",
    intro: "公開文章會標示更新日期、作者、實測環境、步驟、引用來源與限制。電子報訂閱與會員註冊是不同選擇，未來會分開徵求同意。",
    sections: [
      { heading: "文章內容規格", body: "文章先回答核心問題，再交代適用對象、環境版本、實作步驟、常見錯誤、驗收結果和參考來源。" },
      { heading: "電子報訂閱狀態", body: "免費週報與會員專屬內容仍在規劃；目前沒有收集 Email 的表單，也不會把任何人加入寄送名單。" },
      { heading: "內容更新", body: "工具與平台規則會變動。文章應保留更新日期及適用版本，失效內容會修訂或標示不再適用。" },
    ],
    ctaLabel: "先瀏覽公開學習路徑",
    ctaHref: "/start-here",
    indexable: false,
    includeInSitemap: false,
  },
  {
    slug: "member-center",
    navLabel: "會員中心",
    eyebrow: "MEMBER CENTER",
    title: "共同帳號與分級資源，正在建置中。",
    description: "AI Watch Academy 會員中心尚未開放註冊或收費。未來將提供帳號、方案、學習資源與溝通偏好管理。",
    intro: "會員中心會讓免費、入門與進階會員使用同一個帳號。實際方案價格、付款、取消與退款規則確認並完成測試前，不會開放收費。",
    sections: [
      { heading: "免費會員", body: "規劃提供公開文章、週報選擇和入門資源。註冊與電子報行銷同意將分開處理。" },
      { heading: "分級內容權限", body: "未來付費內容由伺服器端授權；僅隱藏頁面或下載按鈕不會被當成存取控制。" },
      { heading: "尚未開放", body: "目前沒有登入、註冊、付款或下載功能。此頁僅說明規劃，不構成服務或付費承諾。" },
    ],
    ctaLabel: "返回公開首頁",
    ctaHref: "/",
    indexable: false,
    includeInSitemap: false,
  },
  {
    slug: "help-legal",
    navLabel: "幫助／法務",
    eyebrow: "HELP & POLICIES",
    title: "服務說明與政策，會在功能開放前清楚公告。",
    description: "常見問題與正式服務政策入口。會員、電子報與付費功能尚未開放，相關條款仍待確認。",
    intro: "本頁目前提供平台狀態說明，不是正式服務條款、隱私權政策或退款政策。正式提供帳號、行銷或付費功能前，會完成政策內容與聯絡方式確認。",
    sections: [
      { heading: "現在可以註冊或付費嗎？", body: "不可以。註冊、付款、付費內容下載和電子報訂閱目前都尚未開放。" },
      { heading: "電子報會寄給我嗎？", body: "目前沒有電子報收集表單或寄送名單，因此不會透過本網站新增收件人。" },
      { heading: "正式政策何時提供？", body: "服務條款、隱私權、退款、客服聯絡方式與資料處理說明，會在相應功能上線前由營運方核定並公告。" },
    ],
    ctaLabel: "查看會員中心建置狀態",
    ctaHref: "/member-center",
    indexable: false,
    includeInSitemap: false,
  },
];

export const sitemapPages = publicPages.filter((page) => page.includeInSitemap);
export const navigationPages = publicPages.filter((page) => !["member-center", "help-legal"].includes(page.slug));

export function getPublicPage(slug: string): PublicPage | undefined {
  return publicPages.find((page) => page.slug === slug);
}

