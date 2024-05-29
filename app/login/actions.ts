'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Provider } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/server'
import { getURL } from '@/utils/helpers'

export async function emaillogin(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?message=Could not athenticate user')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/login?message=Error signing up')
  }

  revalidatePath('/', 'layout')
  redirect('/login')
}
export async function signOut() { 
  const supabase = createClient(); 
  const { error } = await supabase.auth.signOut();
  if (error) {
      console.error('Error signing out:', error);
  } 
  document.cookie.split(";").forEach((cookie) => {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  });
  
  redirect('/login')
}
export async function oAuthSignIn(provider: Provider) {
  if (!provider) {
      return redirect('/login?message=No provider selected')
  }

  const supabase = createClient();
  // Sign out before signing in
  await supabase.auth.signOut();
  
  const redirectUrl = getURL("/auth/callback")
  const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
          redirectTo: redirectUrl,
      }
  })

  if (error) {
      redirect('/login?message=Could not authenticate user')
  }

  return redirect(data.url)
}