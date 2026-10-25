# 本機 Supabase 開發

此專案使用 Supabase CLI 的本機 stack；此流程不需要也不會連接遠端專案。

## 必要工具

- Node.js 24+、npm 11+
- Docker Desktop 已啟動
- Supabase CLI（建議以官方 Windows 安裝指引安裝並確認 `supabase --version`）

## 啟動

1. 複製根目錄 `.env.example` 為 `apps/web/.env.local`，本機 URL 與公開 key 初期可在本機 Supabase 啟動後按 CLI 輸出設定。僅填本機值；不要填遠端憑證。
2. 在 repository root 執行：

```powershell
supabase start
supabase db reset
```

本機 Studio 預設位於 `http://localhost:54323`，本機 API URL/anon key 以 `supabase status` 輸出為準。
本機 Auth 確認信會由 Inbucket 收集，使用 `supabase status` 顯示的郵件測試介面查看。
設定 `NEXT_PUBLIC_SUPABASE_URL`、`NEXT_PUBLIC_SUPABASE_ANON_KEY`、`NEXT_PUBLIC_SITE_URL=http://localhost:3000` 後執行 `npm run dev`。

## Migration 與 RLS 驗收

Schema 位於 `supabase/migrations/20261025000100_member_core.sql`（Supabase CLI 預設 migrations 目錄）。因 CLI 尚未安裝，該檔依 Supabase migration 的時間戳與描述格式手動建立；CLI 恢復後請確認 `supabase migration list --local` 可辨識，再以 `supabase db reset` 套用。

執行 `supabase test db` 跑 pgTAP RLS 驗收：匿名讀取拒絕、本人可讀、跨會員不可讀、條款紀錄不可修改、方案不可自行升級、權益/付款不可自行新增、稽核資料不可讀。應全部通過。

## Auth 設定

`supabase/config.toml` 啟用註冊 Email 確認，並設定本機 redirect allowlist。部署前必須在實際 Supabase Auth URL Configuration 設定正式 callback/密碼重設 redirect URL，並設定核定的信件寄件服務。此專案沒有提交真實 URL、key 或密鑰。`.env.example` 僅保留所需公開變數名稱。

服務條款目前使用 `pending-announcement` 版本狀態與明確待公告文字。發布前需完成正式條款核定，更新版本號與文案；不要將佔位狀態當作正式法律同意書。
