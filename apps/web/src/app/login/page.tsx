import Link from 'next/link'
import { signIn } from '@/app/auth/actions'
import { AuthMessage } from '@/app/_components/auth-message'

export default async function LoginPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams
  return <main className="auth-page wrap">
    <p className="eyebrow">MEMBERSHIP</p><h1>會員登入</h1>
    <AuthMessage searchParams={params} />
    <form action={signIn} className="auth-form">
      <label>電子郵件<input name="email" type="email" required autoComplete="email" /></label>
      <label>密碼<input name="password" type="password" required autoComplete="current-password" /></label>
      <button className="button button-dark" type="submit">登入</button>
    </form>
    <p><Link href="/forgot-password">忘記密碼</Link>　<Link href="/register">建立免費會員</Link></p>
  </main>
}
