"use server"

import { prisma } from "@/lib/prisma"
import { createSession, destroySession, getSession } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"

export async function login(prevState: { error: string } | null, payload: FormData | unknown) {
  // Handle case when useFormState passes the payload directly
  const formData = payload instanceof FormData ? payload : (payload as FormData)
  
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email e senha são obrigatórios" }
  }

  const user = await (prisma as any).user.findUnique({
    where: { email }
  })

  if (!user) {
    return { error: "Email ou senha incorretos" }
  }

  const isValid = await bcrypt.compare(password, user.password)

  if (!isValid) {
    return { error: "Email ou senha incorretos" }
  }

  await createSession({
    id: user.id,
    email: user.email,
    name: user.name,
  })

  revalidatePath("/", "layout")
  redirect("/dashboard")
}

export async function register(prevState: { error: string } | null, payload: FormData | unknown) {
  // Handle case when useFormState passes the payload directly
  const formData = payload instanceof FormData ? payload : (payload as FormData)
  
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const course = formData.get("course") as string
  const institution = formData.get("institution") as string
  const semesterStr = formData.get("semester") as string

  if (!name || !email || !password || !course || !institution || !semesterStr) {
    return { error: "Todos os campos são obrigatórios" }
  }

  const semester = parseInt(semesterStr, 10)

  if (password.length < 6) {
    return { error: "A senha deve ter pelo menos 6 caracteres" }
  }

  const existingUser = await (prisma as any).user.findUnique({
    where: { email }
  })

  if (existingUser) {
    return { error: "Este email já está cadastrado" }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await (prisma as any).user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      course,
      institution,
      semester,
    }
  })

  revalidatePath("/", "layout")
  redirect("/login?registered=true")
  return null
}

export async function logout() {
  await destroySession()
  revalidatePath("/", "layout")
  redirect("/login")
}

export async function getCurrentUser() {
  return await getSession()
}

