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
import { register } from "@/app/actions/auth"
import { useFormState, useFormStatus } from "react-dom"
import { User, Mail, LockKeyhole, BookOpen, Building, Calendar } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-6 rounded-xl shadow-md transition-all"
      disabled={pending}
    >
      {pending ? "Cadastrando..." : "Cadastrar"}
    </Button>
  )
}

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const [state, formAction] = useFormState(
    register as unknown as (...args: any[]) => Promise<{ error: string } | null>,
    null
  )

  return (
    <div className={cn("w-full max-w-[450px]", className)} {...props}>
      <Card className="border-none shadow-2xl rounded-[32px] p-4">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-semibold text-slate-800">Criar Conta</CardTitle>
          <CardDescription className="text-slate-500">
            Preencha os dados para se cadastrar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <User size={16} className="text-slate-500" /> Nome Completo
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Seu nome completo"
                required
                className="bg-slate-50 border-slate-200 rounded-xl h-12 focus-visible:ring-blue-500"
              />
            </div>

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
              <label htmlFor="course" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <BookOpen size={16} className="text-slate-500" /> Curso
              </label>
              <Input
                id="course"
                name="course"
                type="text"
                placeholder="Seu curso"
                required
                className="bg-slate-50 border-slate-200 rounded-xl h-12 focus-visible:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="institution" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Building size={16} className="text-slate-500" /> Instituição
              </label>
              <Input
                id="institution"
                name="institution"
                type="text"
                placeholder="Sua instituição de ensino"
                required
                className="bg-slate-50 border-slate-200 rounded-xl h-12 focus-visible:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="semester" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Calendar size={16} className="text-slate-500" /> Semestre
              </label>
              <Select name="semester" required defaultValue="1">
                <SelectTrigger className="bg-slate-50 border-slate-200 rounded-xl h-12 focus-visible:ring-blue-500">
                  <SelectValue placeholder="Selecione seu semestre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1º Semestre</SelectItem>
                  <SelectItem value="2">2º Semestre</SelectItem>
                  <SelectItem value="3">3º Semestre</SelectItem>
                  <SelectItem value="4">4º Semestre</SelectItem>
                  <SelectItem value="5">5º Semestre</SelectItem>
                  <SelectItem value="6">6º Semestre</SelectItem>
                  <SelectItem value="7">7º Semestre</SelectItem>
                  <SelectItem value="8">8º Semestre</SelectItem>
                  <SelectItem value="9">9º Semestre</SelectItem>
                  <SelectItem value="10">10º Semestre</SelectItem>
                  <SelectItem value="11">11º Semestre</SelectItem>
                  <SelectItem value="12">12º Semestre</SelectItem>
                </SelectContent>
              </Select>
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
                minLength={6}
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
              Já tem uma conta?{" "}
              <a href="/login" className="text-blue-600 font-semibold hover:underline">
                Fazer Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
