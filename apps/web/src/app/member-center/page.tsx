import { redirect } from 'next/navigation'
import { AuthMessage } from '@/app/_components/auth-message'
import { signOut, updateProfile } from '@/app/auth/actions'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function MemberCenterPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams
  const supabase = await createClient()
  if (!supabase) return <main className="auth-page wrap"><p className="eyebrow">MEMBER CENTER</p><h1>會員中心</h1><p className="auth-alert">Supabase 尚未設定，目前無法登入或讀取會員資料。請參閱 docs/local-development.md。</p></main>
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile, error } = await supabase.from('profiles').select('display_name, marketing_email_opt_in, terms_version').eq('id', user.id).single()
  return <main className="auth-page wrap">
    <p className="eyebrow">MEMBER CENTER</p><h1>會員基本資料</h1><AuthMessage searchParams={params} />
    {error ? <p className="auth-alert">讀取會員資料失敗：{error.message}</p> : <>
      <p>登入帳號：{user.email}</p><p>目前方案：免費會員（FREE）</p><p>服務條款狀態：{profile?.terms_version === 'pending-announcement' ? '條款待公告' : '已記錄'}</p>
      <form action={updateProfile} className="auth-form">
        <label>稱呼<input name="display_name" maxLength={100} defaultValue={profile?.display_name ?? ''} /></label>
        <label className="auth-check"><input type="checkbox" name="marketing_email" defaultChecked={profile?.marketing_email_opt_in ?? false} />接收 AI Watch 電子報與行銷資訊</label>
        <button className="button button-dark" type="submit">儲存資料</button>
      </form>
    </>}
    <form action={signOut}><button className="button button-light" type="submit">登出</button></form>
  </main>
}
