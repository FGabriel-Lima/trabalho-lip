'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar as CalendarIcon, BookOpen, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function AppSidebar() {
  const pathname = usePathname(); // Pega a URL atual para marcar o botão ativo
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Agenda', icon: CalendarIcon, path: '/agenda' },
    { name: 'Disciplinas', icon: BookOpen, path: '/disciplinas' },
  ];

  return (
    <>
      {/* Mobile Header Trigger */}
      <div className="md:hidden fixed top-0 w-full bg-white z-30 px-6 py-4 border-b flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold text-gray-800">
          <BookOpen className="text-blue-600" /> StudySpace
        </div>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="text-gray-600">
          <Menu />
        </button>
      </div>

      {/* Sidebar Desktop & Mobile */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:h-screen
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex items-center justify-between md:justify-start gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-800">StudySpace</span>
          </div>
          <button onClick={() => setIsMobileOpen(false)} className="md:hidden text-gray-400">
            <X />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all font-medium ${isActive(item.path)
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                : 'text-gray-500 hover:bg-gray-50'
                }`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <Link href="/perfil" onClick={() => setIsMobileOpen(false)}> {/* Adicionado Link aqui */}
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-blue-200 transition-all">
                {/* Usando o mesmo avatar da página de perfil para consistência */}
                <span className="text-xl">👨‍🎓</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Estudante</p>
                <p className="text-xs text-gray-500">Ver Perfil</p>
              </div>
            </div>
          </Link>
        </div>
      </aside>

      {/* Overlay para Mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}