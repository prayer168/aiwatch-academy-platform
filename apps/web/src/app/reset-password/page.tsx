import Link from 'next/link'
import { updatePassword } from '@/app/auth/actions'
import { AuthMessage } from '@/app/_components/auth-message'

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams
  return <main className="auth-page wrap">
    <p className="eyebrow">ACCOUNT RECOVERY</p><h1>設定新密碼</h1>
    <AuthMessage searchParams={params} />
    <form action={updatePassword} className="auth-form">
      <label>新密碼（至少 10 個字元）<input name="password" type="password" minLength={10} required autoComplete="new-password" /></label>
      <button className="button button-dark" type="submit">更新密碼</button>
    </form><p><Link href="/login">返回登入</Link></p>
  </main>
}
