import { cookies } from "next/headers"

export interface UserSession {
  id: string
  email: string
  name: string | null
}

const SESSION_COOKIE = "academic_session"
const SESSION_DURATION = 60 * 60 * 24 * 7 // 7 dias

export async function createSession(user: UserSession): Promise<void> {
  const cookieStore = await cookies()
  const expires = new Date(Date.now() + SESSION_DURATION * 1000)
  
  cookieStore.set(SESSION_COOKIE, JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires,
    path: "/",
  })
}

export async function getSession(): Promise<UserSession | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE)?.value
  
  if (!session) return null
  
  try {
    return JSON.parse(session) as UserSession
  } catch {
    return null
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function requireAuth(): Promise<UserSession> {
  const session = await getSession()
  if (!session) {
    throw new Error("Unauthorized")
  }
  return session
}

