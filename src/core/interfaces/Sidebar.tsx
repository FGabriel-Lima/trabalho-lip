import { Home, Calendar, BookOpen, BarChart3 } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Painel', icon: Home },
    { id: 'schedule', label: 'Agenda', icon: Calendar },
    { id: 'subjects', label: 'Matérias', icon: BookOpen },
    { id: 'analytics', label: 'Estatísticas', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-[#2563EB]">EstudoEspaço</h1>
        <p className="text-xs text-gray-500 mt-1">Repetição Espaçada</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl mb-2 transition-all ${
                isActive
                  ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-500/30'
                  : 'text-gray-600 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50">
          <div className="w-10 h-10 rounded-full bg-[#2563EB] flex items-center justify-center text-white font-semibold">
            E
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Estudante</p>
            <p className="text-xs text-gray-500">Plano Premium</p>
          </div>
        </div>
      </div>
    </aside>
  );
}