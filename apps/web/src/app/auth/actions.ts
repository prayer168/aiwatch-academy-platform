'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? '').trim()
}

export async function signUp(formData: FormData) {
  const email = value(formData, 'email')
  const password = value(formData, 'password')
  const displayName = value(formData, 'display_name')
  if (formData.get('terms') !== 'on') redirect('/register?error=terms-required')
  if (password.length < 10) redirect('/register?error=password-length')
  const supabase = await createClient()
  if (!supabase) redirect('/register?error=supabase-not-configured')
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/auth/callback?next=/member-center`,
      data: {
        display_name: displayName,
        terms_accepted_at: new Date().toISOString(),
        marketing_email_opt_in: formData.get('marketing_email') === 'on',
      },
    },
  })
  if (error) redirect(`/register?error=${encodeURIComponent(error.message)}`)
  redirect('/register?success=check-email')
}

export async function signIn(formData: FormData) {
  const supabase = await createClient()
  if (!supabase) redirect('/login?error=supabase-not-configured')
  const { error } = await supabase.auth.signInWithPassword({ email: value(formData, 'email'), password: value(formData, 'password') })
  if (error) redirect(`/login?error=${encodeURIComponent(error.message)}`)
  redirect('/member-center')
}

export async function signOut() {
  const supabase = await createClient()
  if (supabase) await supabase.auth.signOut()
  redirect('/login?success=signed-out')
}

export async function requestPasswordReset(formData: FormData) {
  const supabase = await createClient()
  if (!supabase) redirect('/forgot-password?error=supabase-not-configured')
  const { error } = await supabase.auth.resetPasswordForEmail(value(formData, 'email'), {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/auth/callback?next=/reset-password`,
  })
  if (error) redirect(`/forgot-password?error=${encodeURIComponent(error.message)}`)
  redirect('/forgot-password?success=check-email')
}

export async function updatePassword(formData: FormData) {
  const password = value(formData, 'password')
  if (password.length < 10) redirect('/reset-password?error=password-length')
  const supabase = await createClient()
  if (!supabase) redirect('/reset-password?error=supabase-not-configured')
  const { error } = await supabase.auth.updateUser({ password })
  if (error) redirect(`/reset-password?error=${encodeURIComponent(error.message)}`)
  redirect('/member-center?success=password-updated')
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  if (!supabase) redirect('/member-center?error=supabase-not-configured')
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?error=sign-in-required')
  const { error } = await supabase.from('profiles').update({
    display_name: value(formData, 'display_name'),
    marketing_email_opt_in: formData.get('marketing_email') === 'on',
    marketing_email_updated_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }).eq('id', user.id)
  if (error) redirect(`/member-center?error=${encodeURIComponent(error.message)}`)
  redirect('/member-center?success=profile-updated')
}
