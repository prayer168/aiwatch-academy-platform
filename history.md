# 建置歷程

此檔記錄 AI Watch Academy Platform 從營運藍圖轉為可實作會員平台的決策與建置過程。每完成一個階段，追加日期、變更、驗收與版本，不覆寫過往紀錄。

## 2026-10-25 — 建立 V1.1 開發任務包與專案工作區

- **來源**：熊掌智境 AI Watch V1.0 營運與技術計畫書。
- **完成**：整理網站、會員、Supabase、RLS、金流、LINE、電子報、管理與上線工作，拆成 8 個 Epic 與具驗收條件的 Issues。
- **新增檔案**：V1.1 backlog、README、history、下一步提示詞。
- **專案資料夾**：`aiwatch-academy-platform`。
- **狀態**：尚未初始化 Git；尚未連結 GitHub repository。
- **版本**：文件版本 `0.1.0`。

## 2026-10-25 — 階段 0 技術骨架

- **目標**：建立本機可啟動、CI 可驗證的 Next.js/TypeScript 單體式專案骨架。
- **變更**：以 Next.js 16.4.3、React 19.3.0、TypeScript、ESLint 與 Tailwind CSS 建立 `apps/web`；加入繁體中文品牌首頁原型、root npm workspaces、模組預留目錄、`.gitignore`、空白 `.env.example`、GitHub Actions CI 與本機操作文件。
- **決策**：使用 Node 24/npm 11；未選定部署平台、GitHub remote、網域、Supabase 專案、金流、ESP 或 LINE 供應商；未開始登入/付費整合。CI 僅在 `main` push 與 Pull Request 執行。
- **驗收**：`npm install` 成功，npm audit 顯示 0 vulnerabilities；`npm run lint` 通過；`npm run typecheck` 通過；`npm run build` 通過並產生首頁與 not-found 靜態路由。
- **限制/待辦**：首頁是前端原型，CTA 尚未連會員註冊；Supabase、政策與所有第三方服務均未設定；Git 尚未初始化，CI workflow 尚未由 GitHub 執行。
- **版本**：文件/骨架版本由 `0.1.0` 提升至 `0.2.0`；不是正式產品版本或 Git tag。
- **Git**：未執行 init、commit、push。
## 2026-10-25 — 階段 0 骨架驗收補充

- **介面收尾**：將 starter 範例首頁換為 AI Watch Academy 繁中入口原型，新增熊掌 SVG favicon，CTA 指向現有學習路徑；移除未使用的 Next/Vercel 範例素材。
- **驗收**：修改後再次通過 lint、typecheck、production build；本機 `npm run dev` 啟動成功，首頁 HTTP 200，回應包含品牌標題與主標。
- **狀態**：階段 0 技術骨架可驗收，供應商/部署/GitHub 遠端仍待決策；下一階段提示詞已更新為階段 1。
- **乾淨安裝驗收**：`npm ci` 成功，npm audit 為 0 vulnerabilities；安裝輸出顯示目前 ESLint 9 套件有停止維護警告，後續升級前需確認 `eslint-config-next` 相容性。

## 2026-10-25 — 階段 1 公開網站資訊架構與 SEO

- **目標**：把品牌首頁擴充為 V1.0 公開資訊架構，補齊內容導覽、頁面 metadata、sitemap/robots 與 UTM 安全處理方式。
- **變更**：新增開始這裡、AI 工具庫、AI 影片學院、AI Coding 實驗室、AI 教育／自然探究、文章／電子報、會員中心、幫助／政策等八個內容路徑；共用導覽列、頁尾、麵包屑、內容區塊與自訂 404；新增每頁繁中標題/描述/canonical/Open Graph/Twitter metadata、可配置 `NEXT_PUBLIC_SITE_URL`、sitemap、robots 與 UTM allowlist helper/設計說明。
- **待發布狀態**：會員中心、電子報、政策頁明確標示未開放或待核定，使用 noindex 且未放入 sitemap；尚無真實文章或課程資料。
- **決策/限制**：沒有正式網域，預設 metadata base 為 localhost，部署前必須設定 `NEXT_PUBLIC_SITE_URL`。分享圖片尚未設定；曾測試動態 OG 圖，但 Next.js ImageResponse 在此 Windows 建置環境無法穩定產出，因此移除圖片生成，保留 OG/Twitter 文字中繼資料。UTM helper 只讀取及清理 allowlist 欄位，不持久化、不傳送。
- **驗收**：lint、typecheck、production build 全通過；build 產生首頁、八個靜態內容頁、robots.txt、sitemap.xml；production smoke check 確認首頁與所有八個路徑 HTTP 200、都有 title/canonical；會員中心、幫助政策、文章／電子報資訊頁均 noindex，且三者不在 sitemap；sitemap 與 robots 回應 200，導覽能進入 AI 工具庫頁。
- **版本**：文件/骨架版本由 `0.2.0` 提升至 `0.3.0`；不是正式產品版或 Git tag。
- **Git**：尚未 init、commit、push。

## 2026-10-25 — 階段 2 免費會員與 Supabase 資料權限（實作，待本機 DB 驗收）

- **目標**：依 E2/E3 初期範圍建立免費會員 Auth、會員 profile 與資料庫預設拒絕權限。
- **變更**：新增本機 `supabase/config.toml`、Email 驗證/密碼重設模板、會員核心 migration（FREE/STARTER/PRO 方案基礎資料、profiles、subscriptions、entitlements、payment_records、audit_events）、索引/約束、RLS policies、權限欄位 SQL grants，以及 pgTAP RLS 驗收案例。新增 Supabase SSR browser/server client、Next.js 16 Proxy session refresh、Auth server actions/callback、註冊/登入/忘記密碼/重設密碼/會員資料頁。註冊強制條款同意，行銷同意另列且預設 false；條款標記為 `pending-announcement`，未撰寫法律條文。`.env.example` 僅留 URL/key/site URL 空白名稱，移除尚未使用的付款、LINE、Email secret 欄位。Migration 放在 Supabase CLI 預設的 `supabase/migrations/`。
- **安全決策**：不使用 user metadata 做授權；方案、訂閱、權益、付款和稽核表不開放會員寫入，稽核表無 client grant/policy；profile 僅能更新名稱、行銷偏好等明確欄位。會員頁由 Auth server 確認身分，空白 Supabase 設定顯示未設定狀態。
- **依據**：已讀 Supabase skill、官方 Supabase Next.js SSR/Auth 文件與專案安裝的 Next.js 16 元件/Route Handler/Proxy 文件。新增並鎖定 `@supabase/ssr` 0.12.7、`@supabase/supabase-js` 2.118.0。
- **環境盤點**：Windows 環境未找到 Supabase CLI、Docker 命令；無法執行 `supabase start`、`supabase db reset`、pgTAP 或 Auth Email 實際流程。未連接遠端 Supabase，未讀取或使用遠端憑證。因 CLI 缺失，migration 依 Supabase timestamp-description 格式人工建立，待 CLI 可用時驗證辨識及套用。
- **驗收狀態**：`npm run lint` 與 `npm run typecheck` 通過。`npm run build` 首次與後續重跑均遇到 Next.js 回報另一個 build process 正在執行（第一個命令逾時後留下建置鎖）；因此 production build 尚未確認成功。RLS pgTAP 案例已納入，但因無本機 Postgres stack 尚未執行。故階段 2 尚未完成驗收，版本維持 `0.3.0`，不提升至 `0.4.0`。
- **待辦**：安裝 Docker Desktop 與 Supabase CLI，確認 migration list、套用 migration、執行 RLS pgTAP；使用 Inbucket 驗證 Email 註冊、確認、登入、復原；核定正式服務條款/隱私告知及部署 redirect/寄件設定。
- **Git**：未執行 init、commit、push；保留目前工作樹供檢視。

## 2026-10-25 — 階段 2 驗收重試

- **工作樹與程序**：確認工作目錄仍非 Git repository（未初始化）。開始驗收時沒有殘留的 `next build`、Supabase CLI 或 Docker 操作程序，故沒有刪除鎖檔或中止程序。
- **工具盤點**：PowerShell `Get-Command supabase,docker` 無結果，兩個命令均不可用；沒有啟動遠端/本機 Supabase，也沒有遠端憑證可用。
- **應用程式驗收**：按序執行 `npm run lint`、`npm run typecheck`、`npm run build`，三者全部通過。production build 產生會員 Auth 頁面、callback、動態會員中心及公開頁靜態路由。
- **路徑修正**：將 migration 移入 `supabase/migrations/`（CLI 預設路徑），更新本機開發文件與 README；避免 CLI reset 忽略資料庫 schema。
- **資料庫/Auth 驗收阻塞**：缺少 Supabase CLI、Docker，故 migration 未能套用，RLS pgTAP 未能執行；Auth/Inbucket 註冊確認、登入、登出、忘記/重設密碼尚無可連線的本機服務，不能宣稱端對端驗收通過。
- **版本與狀態**：程式建置完成，但資料庫/RLS/Auth 驗收尚未完成；版本維持 `0.3.0`，不提升至 `0.4.0`。
- **Git**：依要求未執行 init、commit、push。
