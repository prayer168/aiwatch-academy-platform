# AI Watch Academy Platform

熊掌智境／AI Watch Academy 會員平台。專案依據 V1.0 營運藍圖與 V1.1 Codex 開發任務包，逐階段建立可測試、可驗收、可部署的會員服務。

## 版本與狀態

**文件／骨架版本：0.3.0**  
**目前階段：階段 2 免費會員與 Supabase 資料權限已完成程式建置；本機資料庫及 Auth 驗收受 CLI/Docker 缺失阻擋**  
這不是正式產品版，也尚未建立 Git tag。

版本號採 `MAJOR.MINOR.PATCH`：重大不相容變更提升 MAJOR；完整功能階段提升 MINOR；文件或相容修正提升 PATCH。只有階段驗收完成才提升 MINOR。

## 本機啟動

需求：Node.js 24 或更新版本、npm 11 或更新版本。

```bash
npm ci
npm run dev
```

開啟 `http://localhost:3000`。會員頁面包含註冊、登入、驗證 callback、登出、密碼重設與基本資料；需設定 Supabase 本機 URL/key 才能使用，空白設定時會明確提示，不會假裝登入成功。啟動 Supabase 的本機步驟見 `docs/local-development.md`。目前尚未接金流、LINE 或電子報寄送。

驗證指令：

```bash
npm run lint
npm run typecheck
npm run build
```

## 公開頁面

- `/`：品牌首頁與學習路徑入口。
- `/start-here`：新手導覽。
- `/tools`：AI 工具比較與實測內容入口。
- `/video-academy`：AI 影片學院。
- `/coding-lab`：AI Coding 實驗室。
- `/education-nature`：AI 教育與自然探究。
- `/articles-newsletter`：文章與電子報資訊；訂閱尚未開放。
- `/register`、`/login`、`/forgot-password`、`/reset-password`：免費會員註冊、登入與密碼復原（需設定 Supabase）。
- `/member-center`：需登入的會員基本資料頁；收費尚未開放。
- `/help-legal`：常見問題與政策發布狀態；不是正式法律條款。
- `/sitemap.xml`、`/robots.txt`：僅列公開且可索引的頁面；建置中的會員、政策和空文章入口不列入 sitemap，並設為 noindex。

全站具繁體中文頁面標題、description、canonical、Open Graph/Twitter 標題與描述中繼資料，以及自訂 404 頁。分享圖片尚未設定。

## UTM 與隱私

`apps/web/src/lib/utm.ts` 僅從查詢字串擷取 `utm_source`、`utm_medium`、`utm_campaign`，不儲存或傳送資料。資料庫歸因欄位尚未接通；會員註冊開發前需先核定隱私告知、保留期與同意方式，設計記錄見 `docs/attribution.md`。

## 專案結構

- `apps/web/`：Next.js App Router 公開網站與後續會員中心。
- `supabase/migrations/`：Supabase CLI 預設載入的版本化 migration。
- `packages/billing/`：金流 Adapter 預留位置。
- `packages/messaging/`：LINE 與電子報 Adapter 預留位置。
- `content/`：文章與課程內容。
- `workflows/`：事件與排程工作。
- `tests/`：後續測試套件。
- `.github/workflows/ci.yml`：GitHub Actions 驗證流程。
- `.env.example`：環境變數名稱範例，沒有真實密鑰。
- `supabase/config.toml`、`supabase/migrations/`：本機 Supabase 設定與版本化資料庫 migration。
- `supabase/tests/database/`：資料庫 RLS pgTAP 驗收。
- `docs/local-development.md`：本機 Supabase/Auth 啟動與測試方式。
- 階段 2 的本機 RLS/Auth 實測尚未完成：目前環境沒有 Supabase CLI 與 Docker，詳見 `history.md`。
- `history.md`：建置與決策歷程。
- `docs/V1.1-CODEX-IMPLEMENTATION-BACKLOG.md`：Issues 規格。

## 產品目標與尚未決策事項

Facebook、YouTube、官網、LINE 與電子報導流至共同會員中心；資源權限由伺服器端與資料庫控制。建置順序為公開網站、免費會員和 RLS、付費生命週期、溝通整合、管理與試營運。

供應商、主網域、部署平台與正式政策尚待決策。不得將範例環境變數視為已設定的服務。

## GitHub 提案

GitHub repository：[`prayer168/aiwatch-academy-platform`](https://github.com/prayer168/aiwatch-academy-platform)，目前為 **Public**，`main` 已推送初始 commit。後續建議以 feature branch + Pull Request，CI 通過及人工驗收後合併 `main`；禁止提交密鑰/個資與 force push。

## 部署建議

建議先用 Vercel Preview 部署 Next.js 網站，適合檢視公開頁和 UI，且可為分支/PR 產生獨立預覽網址；目前 Vercel 尚未連結此 repository，因 Vercel team 尚未安裝 GitHub Integration，部署未建立。即使預覽成功，Supabase 未設定時會員流程仍會明確顯示未設定。Supabase/RLS/Auth 本機驗收完成、正式環境變數與條款核定前，不建議將其視為正式會員服務上線。

