"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { login } from "@/app/actions/auth"
import { useFormState, useFormStatus } from "react-dom"
import { Mail, LockKeyhole } from "lucide-react"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-6 rounded-xl shadow-md transition-all"
      disabled={pending}
    >
      {pending ? "Entrando..." : "Entrar"}
    </Button>
  )
}

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [state, formAction] = useFormState(
    login as unknown as (...args: any[]) => Promise<{ error: string } | null>,
    null
  )

  return (
    <div className={cn("w-full max-w-[450px]", className)} {...props}>
      <Card className="border-none shadow-2xl rounded-[32px] p-4">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-semibold text-slate-800">Fazer Login</CardTitle>
          <CardDescription className="text-slate-500">
            Acesse sua conta para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Mail size={16} className="text-slate-500" /> Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                required
                className="bg-slate-50 border-slate-200 rounded-xl h-12 focus-visible:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <LockKeyhole size={16} className="text-slate-500" /> Senha
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="........"
                required
                className="bg-slate-50 border-slate-200 rounded-xl h-12 focus-visible:ring-blue-500"
              />
            </div>

            {state?.error && (
              <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
                {state.error}
              </div>
            )}

            <div className="pt-2">
              <SubmitButton />
            </div>

            <div className="text-center text-sm text-slate-600">
              Não tem uma conta?{" "}
              <a href="/register" className="text-blue-600 font-semibold hover:underline">
                Cadastre-se
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
