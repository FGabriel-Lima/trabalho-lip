'use client';

import React, { useState } from 'react';
import {
  BookOpen, Clock, Target, Plus, Search, Edit2, Trash2, X,
  Laptop, Zap, Ruler, PenTool, Save, Palette, Music, Globe,
  Microscope, BarChart3, Dumbbell, Lightbulb, Rocket, Settings,
  Calculator, FlaskConical, Languages, Check, GraduationCap
} from 'lucide-react';

// --- 1. CONFIGURAÇÕES E DADOS ---

// Mapeamento de strings para componentes Lucide para renderizar dinamicamente
const iconMap: { [key: string]: any } = {
  'save': Save, 'laptop': Laptop, 'zap': Zap, 'ruler': Ruler, 'pen': PenTool,
  'book': BookOpen, 'palette': Palette, 'music': Music, 'globe': Globe,
  'microscope': Microscope, 'chart': BarChart3, 'sport': Dumbbell,
  'idea': Lightbulb, 'rocket': Rocket, 'target': Target, 'settings': Settings,
  'math': Calculator, 'chemistry': FlaskConical, 'lang': Languages, 'grad': GraduationCap
};

const colorMap: { [key: string]: string } = {
  'blue': 'bg-blue-600', 'emerald': 'bg-emerald-500', 'amber': 'bg-amber-500',
  'violet': 'bg-violet-600', 'pink': 'bg-pink-500', 'purple': 'bg-purple-600',
  'red': 'bg-red-500', 'teal': 'bg-teal-500', 'orange': 'bg-orange-500', 'cyan': 'bg-cyan-500'
};

// Interface da Disciplina
interface Discipline {
  id: string;
  name: string;
  icon: string;
  color: string; // chave do colorMap
  totalHours: number;
  revisionsDone: number;
  revisionsTotal: number;
  progress: number;
}

const initialDisciplines: Discipline[] = [
  { id: '1', name: 'Banco de Dados', icon: 'save', color: 'blue', totalHours: 12, revisionsDone: 5, revisionsTotal: 8, progress: 63 },
  { id: '2', name: 'Programação', icon: 'laptop', color: 'emerald', totalHours: 18, revisionsDone: 8, revisionsTotal: 12, progress: 67 },
  { id: '3', name: 'Física', icon: 'zap', color: 'amber', totalHours: 8, revisionsDone: 4, revisionsTotal: 6, progress: 67 },
  { id: '4', name: 'Matemática', icon: 'ruler', color: 'violet', totalHours: 15, revisionsDone: 7, revisionsTotal: 10, progress: 70 },
  { id: '5', name: 'Química', icon: 'chemistry', color: 'pink', totalHours: 6, revisionsDone: 3, revisionsTotal: 4, progress: 75 },
  { id: '6', name: 'Português', icon: 'book', color: 'purple', totalHours: 10, revisionsDone: 5, revisionsTotal: 7, progress: 71 },
];

// --- 2. COMPONENTE MODAL DE CRIAÇÃO ---
const NewDisciplineModal = ({ isOpen, onClose, onSave }: any) => {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [selectedIcon, setSelectedIcon] = useState('book');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!name) return;
    onSave({ name, color: selectedColor, icon: selectedIcon });
    setName('');
    setSelectedColor('blue');
    setSelectedIcon('book');
    onClose();
  };

  const colors = ['blue', 'emerald', 'amber', 'violet', 'pink', 'purple', 'red', 'teal', 'orange', 'cyan'];
  const icons = [
    'book', 'laptop', 'zap', 'ruler', 'pen', 'save',
    'palette', 'music', 'globe', 'microscope', 'chart', 'sport',
    'idea', 'rocket', 'target', 'settings', 'math', 'grad'
  ];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Nova Disciplina</h3>
          <button onClick={onClose}><X size={20} className="text-gray-400 hover:text-gray-600" /></button>
        </div>

        <div className="p-6 space-y-6">
          {/* Nome */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600"><BookOpen size={16} /> Nome da Disciplina</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Ex: Matemática, Programação..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Cor */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Cor da Disciplina</label>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`w-10 h-10 rounded-xl ${colorMap[c]} flex items-center justify-center transition-transform hover:scale-110 ${selectedColor === c ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' : ''}`}
                >
                  {selectedColor === c && <Check size={16} className="text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Ícone */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Ícone da Disciplina</label>
            <div className="grid grid-cols-6 sm:grid-cols-9 gap-3">
              {icons.map((iconKey) => {
                const IconComp = iconMap[iconKey];
                return (
                  <button
                    key={iconKey}
                    onClick={() => setSelectedIcon(iconKey)}
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all hover:bg-gray-50
                      ${selectedIcon === iconKey ? 'border-blue-500 bg-blue-50 text-blue-600 ring-2 ring-blue-500/20' : 'border-gray-200 text-gray-500'}`}
                  >
                    <IconComp size={20} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-6 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
          <button onClick={onClose} className="flex-1 px-4 py-3 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors">Cancelar</button>
          <button onClick={handleSubmit} className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-200 transition-colors">Criar Disciplina</button>
        </div>
      </div>
    </div>
  );
};

// --- 3. PÁGINA PRINCIPAL ---
export default function DisciplinasPage() {
  const [disciplines, setDisciplines] = useState<Discipline[]>(initialDisciplines);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cálculos para os cards de estatísticas
  const totalDisciplines = disciplines.length;
  const totalHours = disciplines.reduce((acc, curr) => acc + curr.totalHours, 0);
  const avgHours = totalDisciplines > 0 ? Math.round(totalHours / totalDisciplines) : 0;

  const handleAddDiscipline = (data: any) => {
    const newDisc: Discipline = {
      id: Date.now().toString(),
      name: data.name,
      color: data.color,
      icon: data.icon,
      totalHours: 0,
      revisionsDone: 0,
      revisionsTotal: 0,
      progress: 0
    };
    setDisciplines([...disciplines, newDisc]);
  };

  const handleDelete = (id: string) => {
    setDisciplines(disciplines.filter(d => d.id !== id));
  };

  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="text-blue-600 w-5 h-5" />
            <h1 className="text-2xl font-bold text-gray-800">Disciplinas</h1>
          </div>
          <p className="text-gray-500 text-sm">Gerencie suas matérias de estudo</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-200 flex items-center gap-2 transition-all active:scale-95 w-full md:w-auto justify-center"
        >
          <Plus size={20} /> Nova Disciplina
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
          <div className="bg-blue-50 p-3 rounded-xl text-blue-600"><BookOpen size={24} /></div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Total de Disciplinas</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{totalDisciplines}</h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
          <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600"><Clock size={24} /></div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Total de Horas</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{totalHours}h</h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
          <div className="bg-amber-50 p-3 rounded-xl text-amber-600"><Target size={24} /></div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Média por Disciplina</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{avgHours}h</h3>
          </div>
        </div>
      </div>

      {/* Grid de Disciplinas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
        {disciplines.map((discipline) => {
          const IconComponent = iconMap[discipline.icon] || BookOpen;
          const bgClass = colorMap[discipline.color] || 'bg-blue-600';
          const textClass = bgClass.replace('bg-', 'text-');
          const bgLightClass = bgClass.replace('bg-', 'bg-').replace('500', '50').replace('600', '50'); // Ex: bg-blue-50

          return (
            <div key={discipline.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative">
              {/* Botões de Ação (Hover) */}
              <div className="absolute top-4 right-4 flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={16} /></button>
                <button onClick={() => handleDelete(discipline.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
              </div>

              {/* Ícone */}
              <div className={`w-12 h-12 rounded-xl ${bgLightClass} ${textClass} flex items-center justify-center mb-4`}>
                <IconComponent size={24} />
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-6">{discipline.name}</h3>

              {/* Estatísticas Internas */}
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total de Horas</span>
                  <span className="font-semibold text-gray-700">{discipline.totalHours}h</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Revisões</span>
                  <span className="font-semibold text-gray-700">{discipline.revisionsDone}/{discipline.revisionsTotal}</span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 font-medium">Progresso</span>
                    <span className="font-bold text-gray-700">{discipline.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${bgClass}`}
                      style={{ width: `${discipline.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Card Adicionar Nova (Ghost) */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="min-h-[280px] border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-4 text-gray-400 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50/30 transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-gray-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
            <Plus size={24} />
          </div>
          <span className="font-medium">Adicionar Nova Disciplina</span>
        </button>
      </div>

      <NewDisciplineModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddDiscipline}
      />
    </div>
  );
}