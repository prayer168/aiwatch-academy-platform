export function AuthMessage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const error = typeof searchParams.error === 'string' ? searchParams.error : ''
  const success = typeof searchParams.success === 'string' ? searchParams.success : ''
  const messages: Record<string, string> = {
    'supabase-not-configured': '尚未設定 Supabase。請依本機設定文件填入 URL 與公開金鑰後重試。',
    'terms-required': '請先勾選服務條款同意。條款全文尚待公告。',
    'password-length': '密碼至少需要 10 個字元。',
    'sign-in-required': '請先登入。',
    'invalid-redirect': '驗證連結的導向位置無效。',
    'auth-callback-failed': '驗證連結無效或已過期，請重新操作。',
  }
  const successMessages: Record<string, string> = {
    'check-email': '請查看電子郵件並完成驗證或密碼重設。',
    'signed-out': '已登出。',
    'profile-updated': '會員資料已更新。',
    'password-updated': '密碼已更新。',
  }
  return <>
    {error && <p className="auth-alert" role="alert">{messages[error] ?? decodeURIComponent(error)}</p>}
    {success && <p className="auth-success" role="status">{successMessages[success] ?? '操作完成。'}</p>}
  </>
}
