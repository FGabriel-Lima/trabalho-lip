import { LayoutDashboard, Calendar, BookOpen, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Calendar, label: "Agenda", active: false },
  { icon: BookOpen, label: "Disciplinas", active: false },
];

export function AppSidebar() {
  return (
    <aside className="w-64 border-r bg-white flex flex-col h-screen p-6">
      <div className="flex items-center gap-2 mb-10">
        <div className="bg-blue-600 p-1.5 rounded-lg text-white">
          <BookOpen size={20} />
        </div>
        <span className="font-bold text-xl text-blue-900">StudySpace</span>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.label}
            variant={item.active ? "default" : "ghost"}
            className={`w-full justify-start gap-3 ${item.active ? 'bg-blue-600 hover:bg-blue-700' : 'text-gray-500'}`}
          >
            <item.icon size={20} />
            {item.label}
          </Button>
        ))}
      </nav>

      <div className="border-t pt-6 flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>E</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Estudante</span>
          <button className="text-xs text-blue-600 hover:underline">Ver Perfil</button>
        </div>
      </div>
    </aside>
  );
}