import Link from 'next/link'
import { requestPasswordReset } from '@/app/auth/actions'
import { AuthMessage } from '@/app/_components/auth-message'

export default async function ForgotPasswordPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams
  return <main className="auth-page wrap">
    <p className="eyebrow">ACCOUNT RECOVERY</p><h1>忘記密碼</h1>
    <p>輸入註冊電子郵件，我們會寄送密碼重設連結。</p><AuthMessage searchParams={params} />
    <form action={requestPasswordReset} className="auth-form">
      <label>電子郵件<input name="email" type="email" required autoComplete="email" /></label>
      <button className="button button-dark" type="submit">寄送重設連結</button>
    </form><p><Link href="/login">返回登入</Link></p>
  </main>
}
