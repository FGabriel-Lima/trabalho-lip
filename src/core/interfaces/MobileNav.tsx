import { Home, Calendar, BookOpen, BarChart3 } from 'lucide-react';

interface MobileNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function MobileNav({ currentView, onNavigate }: MobileNavProps) {
  const navItems = [
    { id: 'dashboard', icon: Home },
    { id: 'schedule', icon: Calendar },
    { id: 'subjects', icon: BookOpen },
    { id: 'analytics', icon: BarChart3 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
                isActive ? 'text-[#2563EB]' : 'text-gray-400'
              }`}
            >
              <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
