// Dashboard.tsx
import { Bell } from 'lucide-react';
import { WeeklySchedule } from './WeeklySchedule';
import { MetricsCard } from './MetricsCard';
import { TodayRevisions } from './TodayRevisions';
import { AddStudyButton } from './AddStudyButton';
import { Revision } from '../../../App';

interface DashboardProps {
  onOpenStudyModal: () => void;
  revisions: Revision[];
  onToggleCompletion: (id: string) => void;
}

export function Dashboard({ onOpenStudyModal, revisions, onToggleCompletion }: DashboardProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Olá, Estudante
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {new Date().toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <button className="relative p-2 hover:bg-slate-50 rounded-full transition-colors">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#2563EB] rounded-full"></span>
        </button>
      </div>

      {/* Weekly Schedule Widget */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Agenda Semanal</h2>
        <WeeklySchedule />
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <MetricsCard 
          title="Sequência de Estudos" 
          value="12 dias" 
          subtitle="Continue assim!" 
          color="#2563EB"
        />
        <MetricsCard 
          title="Revisões Concluídas Hoje" 
          value={`${revisions.filter(r => r.completed).length} / ${revisions.length}`}
          subtitle={`Faltam ${revisions.filter(r => !r.completed).length}`}
          color="#10B981"
        />
      </div>

      {/* Today's Revisions */}
      <TodayRevisions revisions={revisions} onToggleCompletion={onToggleCompletion} />

      {/* Floating Action Button */}
      <AddStudyButton onClick={onOpenStudyModal} />
    </div>
  );
}