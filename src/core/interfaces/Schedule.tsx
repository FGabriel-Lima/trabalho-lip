import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus, Clock } from 'lucide-react';
import { Revision } from '../../../App';

interface ScheduleProps {
  revisions: Revision[];
  onOpenStudyModal: () => void;
}

interface ScheduledStudy {
  id: string;
  title: string;
  subject: string;
  subjectColor: string;
  time: string;
  duration: string;
  completed: boolean;
}

export function Schedule({ revisions, onOpenStudyModal }: ScheduleProps) {
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  // Gerar semana atual
  const getWeekDays = (offset: number = 0) => {
    const today = new Date();
    const currentDay = today.getDay();
    const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Ajustar para segunda-feira
    
    const monday = new Date(today.setDate(diff));
    monday.setDate(monday.getDate() + (offset * 7));
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const weekDays = getWeekDays(currentWeekOffset);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Dados mockados de estudos agendados
  const scheduledStudies: Record<string, ScheduledStudy[]> = {
    '0': [ // Domingo
      {
        id: 's1',
        title: 'Revisão Geral da Semana',
        subject: 'Geral',
        subjectColor: '#6366F1',
        time: '14:00',
        duration: '2h',
        completed: false,
      },
    ],
    '1': [ // Segunda
      {
        id: 's2',
        title: 'Banco de Dados - SQL Avançado',
        subject: 'Ciência da Computação',
        subjectColor: '#2563EB',
        time: '09:00',
        duration: '1h 30m',
        completed: false,
      },
      {
        id: 's3',
        title: 'Cálculo Integral',
        subject: 'Matemática',
        subjectColor: '#10B981',
        time: '14:00',
        duration: '2h',
        completed: false,
      },
    ],
    '2': [ // Terça
      {
        id: 's4',
        title: 'React Avançado',
        subject: 'Desenvolvimento Web',
        subjectColor: '#8B5CF6',
        time: '10:00',
        duration: '1h 30m',
        completed: false,
      },
      {
        id: 's5',
        title: 'Física Quântica',
        subject: 'Física',
        subjectColor: '#F59E0B',
        time: '15:00',
        duration: '1h',
        completed: false,
      },
    ],
    '3': [ // Quarta
      {
        id: 's6',
        title: 'Estruturas de Dados',
        subject: 'Ciência da Computação',
        subjectColor: '#2563EB',
        time: '09:00',
        duration: '2h',
        completed: false,
      },
      {
        id: 's7',
        title: 'Álgebra Linear',
        subject: 'Matemática',
        subjectColor: '#10B981',
        time: '16:00',
        duration: '1h 30m',
        completed: false,
      },
    ],
    '4': [ // Quinta (hoje)
      {
        id: 's8',
        title: 'Node.js e Express',
        subject: 'Desenvolvimento Web',
        subjectColor: '#8B5CF6',
        time: '10:00',
        duration: '1h 30m',
        completed: true,
      },
      {
        id: 's9',
        title: 'Revisão de Normalização',
        subject: 'Banco de Dados',
        subjectColor: '#2563EB',
        time: '14:00',
        duration: '1h',
        completed: false,
      },
      {
        id: 's10',
        title: 'Termodinâmica',
        subject: 'Física',
        subjectColor: '#F59E0B',
        time: '16:30',
        duration: '1h',
        completed: false,
      },
    ],
    '5': [ // Sexta
      {
        id: 's11',
        title: 'TypeScript Avançado',
        subject: 'Desenvolvimento Web',
        subjectColor: '#8B5CF6',
        time: '09:00',
        duration: '2h',
        completed: false,
      },
      {
        id: 's12',
        title: 'Análise de Algoritmos',
        subject: 'Ciência da Computação',
        subjectColor: '#2563EB',
        time: '15:00',
        duration: '1h 30m',
        completed: false,
      },
    ],
    '6': [ // Sábado
      {
        id: 's13',
        title: 'Projeto Prático',
        subject: 'Desenvolvimento Web',
        subjectColor: '#8B5CF6',
        time: '10:00',
        duration: '3h',
        completed: false,
      },
    ],
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Agenda de Estudos
          </h1>
          <p className="text-sm text-gray-500 mt-1 capitalize">
            {formatMonthYear(weekDays[0])}
          </p>
        </div>
        <button
          onClick={onOpenStudyModal}
          className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-xl font-medium hover:bg-[#1e40af] transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Agendar Estudo
        </button>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-6 bg-slate-50 rounded-2xl p-4">
        <button
          onClick={() => setCurrentWeekOffset(currentWeekOffset - 1)}
          className="p-2 hover:bg-white rounded-xl transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <CalendarIcon className="w-4 h-4 text-[#2563EB]" />
          {weekDays[0].toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })} - {' '}
          {weekDays[6].toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}
        </div>

        <button
          onClick={() => setCurrentWeekOffset(currentWeekOffset + 1)}
          className="p-2 hover:bg-white rounded-xl transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Calendar Grid - Desktop */}
      <div className="hidden lg:grid lg:grid-cols-7 gap-4">
        {weekDays.map((date, index) => {
          const dayStudies = scheduledStudies[date.getDay().toString()] || [];
          const isTodayDate = isToday(date);
          
          return (
            <div key={index} className="min-h-[400px]">
              {/* Day Header */}
              <div
                className={`text-center py-3 rounded-t-2xl ${
                  isTodayDate
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-slate-50 text-gray-700'
                }`}
              >
                <p className={`text-xs font-medium mb-1 ${isTodayDate ? 'text-blue-100' : 'text-gray-500'}`}>
                  {date.toLocaleDateString('pt-BR', { weekday: 'short' }).toUpperCase()}
                </p>
                <p className="text-xl font-bold">
                  {date.getDate()}
                </p>
              </div>

              {/* Studies List */}
              <div className="bg-white border border-gray-200 border-t-0 rounded-b-2xl p-3 space-y-2 min-h-[350px]">
                {dayStudies.length > 0 ? (
                  dayStudies.map((study) => (
                    <div
                      key={study.id}
                      className={`p-3 rounded-xl border-l-4 transition-all hover:shadow-sm cursor-pointer ${
                        study.completed
                          ? 'bg-slate-50 opacity-60'
                          : 'bg-white border border-gray-200'
                      }`}
                      style={{ borderLeftColor: study.subjectColor }}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className={`text-xs font-semibold ${study.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                          {study.title}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{study.time}</span>
                        <span>•</span>
                        <span>{study.duration}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <p className="text-xs text-center">Nenhum estudo<br />agendado</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* List View - Mobile/Tablet */}
      <div className="lg:hidden space-y-4">
        {weekDays.map((date, index) => {
          const dayStudies = scheduledStudies[date.getDay().toString()] || [];
          const isTodayDate = isToday(date);
          
          return (
            <div key={index} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              {/* Day Header */}
              <div
                className={`px-4 py-3 flex items-center justify-between ${
                  isTodayDate
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-slate-50 text-gray-700'
                }`}
              >
                <div>
                  <p className={`text-xs font-medium ${isTodayDate ? 'text-blue-100' : 'text-gray-500'}`}>
                    {date.toLocaleDateString('pt-BR', { weekday: 'long' })}
                  </p>
                  <p className="text-lg font-bold">
                    {date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}
                  </p>
                </div>
                {isTodayDate && (
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                    Hoje
                  </span>
                )}
              </div>

              {/* Studies List */}
              <div className="p-4 space-y-3">
                {dayStudies.length > 0 ? (
                  dayStudies.map((study) => (
                    <div
                      key={study.id}
                      className={`p-4 rounded-xl border-l-4 ${
                        study.completed
                          ? 'bg-slate-50 opacity-60'
                          : 'bg-slate-50'
                      }`}
                      style={{ borderLeftColor: study.subjectColor }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <p className={`font-semibold ${study.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                          {study.title}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className="inline-block px-2 py-1 rounded-lg text-xs font-medium text-white"
                          style={{ backgroundColor: study.subjectColor }}
                        >
                          {study.subject}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{study.time} • {study.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-gray-400">
                    <CalendarIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Nenhum estudo agendado</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
