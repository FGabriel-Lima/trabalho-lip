'use client'; // Adicionar no topo pois é um Client Component

import { ReactNode, useState } from 'react';
import { Dashboard } from './src/core/interfaces/Dashboard';
import { Schedule } from './src/core/interfaces/Schedule';
import { Sidebar } from './src/core/interfaces/Sidebar';
import { MobileNav } from './src/core/interfaces/MobileNav';
import { StudyModal } from './src/core/interfaces/StudyModal';
import { Subjects } from './src/core/interfaces/Subjects';
import { Analytics } from './src/core/interfaces/Analytics';
import './styles/globals.css';

export interface Revision {
  [x: string]: ReactNode;
  id: string;
  title: string;
  subject: string;
  subjectColor: string;
  completed: boolean;
}

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);
  const [revisions, setRevisions] = useState<Revision[]>([
    {
      id: '1',
      title: 'Banco de Dados - Normalização',
      subject: 'Ciência da Computação',
      subjectColor: '#2563EB',
      completed: false,
    },
    {
      id: '2',
      title: 'Cálculo - Técnicas de Integração',
      subject: 'Matemática',
      subjectColor: '#10B981',
      completed: false,
    },
    {
      id: '3',
      title: 'React Hooks - useEffect',
      subject: 'Desenvolvimento Web',
      subjectColor: '#8B5CF6',
      completed: true,
    },
    {
      id: '4',
      title: 'Estruturas de Dados - Árvores Binárias',
      subject: 'Ciência da Computação',
      subjectColor: '#2563EB',
      completed: false,
    },
    {
      id: '5',
      title: 'Álgebra Linear - Operações com Matrizes',
      subject: 'Matemática',
      subjectColor: '#10B981',
      completed: false,
    },
    {
      id: '6',
      title: 'CSS Grid Layout',
      subject: 'Desenvolvimento Web',
      subjectColor: '#8B5CF6',
      completed: false,
    },
    {
      id: '7',
      title: 'Análise de Algoritmos - Big O',
      subject: 'Ciência da Computação',
      subjectColor: '#2563EB',
      completed: true,
    },
    {
      id: '8',
      title: 'Física - Termodinâmica',
      subject: 'Física',
      subjectColor: '#F59E0B',
      completed: false,
    },
  ]);

  const handleAddStudy = (study: { subject: string; topic: string; color: string }) => {
    const newRevision: Revision = {
      id: Date.now().toString(),
      title: `${study.subject} - ${study.topic}`,
      subject: study.subject,
      subjectColor: study.color,
      completed: false,
    };
    
    setRevisions([newRevision, ...revisions]);
    setIsStudyModalOpen(false);
  };

  const toggleCompletion = (id: string) => {
    setRevisions(prevRevisions =>
      prevRevisions.map(revision =>
        revision.id === id
          ? { ...revision, completed: !revision.completed }
          : revision
      )
    );
  };

  const renderView = () => {
    switch (currentView) {
      case 'schedule':
        return <Schedule revisions={revisions} onOpenStudyModal={() => setIsStudyModalOpen(true)} />;
      case 'subjects':
        return <Subjects />;
      case 'analytics':
        return <Analytics />;
      case 'dashboard':
      default:
        return (
          <Dashboard 
            onOpenStudyModal={() => setIsStudyModalOpen(true)}
            revisions={revisions}
            onToggleCompletion={toggleCompletion}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Desktop Layout */}
      <div className="hidden md:flex h-screen">
        <Sidebar currentView={currentView} onNavigate={setCurrentView} />
        <main className="flex-1 overflow-y-auto">
          {renderView()}
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden min-h-screen pb-20">
        {renderView()}
        <MobileNav currentView={currentView} onNavigate={setCurrentView} />
      </div>

      {/* Study Modal */}
      <StudyModal 
        isOpen={isStudyModalOpen} 
        onClose={() => setIsStudyModalOpen(false)}
        onSubmit={handleAddStudy}
      />
    </div>
  );
}