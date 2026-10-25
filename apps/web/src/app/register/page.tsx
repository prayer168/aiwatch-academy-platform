import Link from 'next/link'
import { signUp } from '@/app/auth/actions'
import { AuthMessage } from '@/app/_components/auth-message'

export default async function RegisterPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams
  return <main className="auth-page wrap">
    <p className="eyebrow">MEMBERSHIP · FREE</p><h1>建立免費會員</h1>
    <p>註冊後請先驗證電子郵件。電子報同意是選擇性項目，預設不勾選。</p>
    <AuthMessage searchParams={params} />
    <form action={signUp} className="auth-form">
      <label>稱呼<input name="display_name" maxLength={100} autoComplete="name" /></label>
      <label>電子郵件<input name="email" type="email" required autoComplete="email" /></label>
      <label>密碼（至少 10 個字元）<input name="password" type="password" minLength={10} required autoComplete="new-password" /></label>
      <label className="auth-check"><input type="checkbox" name="terms" required />我已閱讀並同意服務條款（正式條款待公告）</label>
      <label className="auth-check"><input type="checkbox" name="marketing_email" />我願意收到 AI Watch 電子報與行銷資訊（可隨時取消）</label>
      <button className="button button-dark" type="submit">註冊並寄送驗證信</button>
    </form>
    <p className="auth-footnote">服務條款全文尚待公告，目前不代表已核定或發布正式法律文字。</p>
    <p>已有帳號？ <Link href="/login">登入</Link></p>
  </main>
}
