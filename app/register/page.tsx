import { RegisterForm } from "@/components/register-form"
import { BookOpen } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-blue-600 px-4 py-8">

      {/* Header / Logo Section */}
      <div className="flex flex-col items-center mb-8 text-white">
        <div className="bg-white p-4 rounded-[20px] shadow-lg mb-4">
          <BookOpen size={42} className="text-blue-600" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">StudySpace</h1>
        <p className="text-blue-100 text-sm opacity-90">Crie sua conta para começar</p>
      </div>

      {/* Register Card */}
      <RegisterForm />

      {/* Footer Section */}
      <footer className="mt-12 text-blue-100/70 text-[11px] uppercase tracking-wider text-center">
        StudySpace &copy; 2024 - Sistema de Gerenciamento de Estudos
      </footer>
    </div>
  )
}

