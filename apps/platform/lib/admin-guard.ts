import { getAuthClient } from '@/lib/supabase-auth'
import { isAdminEmail } from '@/lib/admin'

/** True when the current request carries a valid session for an allowlisted admin. */
export async function isRequestFromAdmin(): Promise<boolean> {
  const auth = await getAuthClient()
  const { data: { user } } = await auth.auth.getUser()
  return isAdminEmail(user?.email, process.env.ADMIN_EMAILS)
}
