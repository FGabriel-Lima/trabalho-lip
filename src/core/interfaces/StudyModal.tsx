import { useState } from 'react';
import { X, BookOpen, Clock, FileText, ChevronDown } from 'lucide-react';

interface StudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (study: { subject: string; topic: string; color: string }) => void;
}

const subjects = [
  { id: 'cs', name: 'Ciência da Computação', color: '#2563EB' },
  { id: 'math', name: 'Matemática', color: '#10B981' },
  { id: 'web', name: 'Desenvolvimento Web', color: '#8B5CF6' },
  { id: 'physics', name: 'Física', color: '#F59E0B' },
  { id: 'portuguese', name: 'Português', color: '#10B981' },
  { id: 'database', name: 'Banco de Dados', color: '#2563EB' },
];

const defaultColors = ['#2563EB', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899', '#6366F1'];

export function StudyModal({ isOpen, onClose, onSubmit }: StudyModalProps) {
  const [subjectInput, setSubjectInput] = useState('Banco de Dados');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#2563EB');
  const [topic, setTopic] = useState('Normalização');
  const [hours, setHours] = useState('2');
  const [minutes, setMinutes] = useState('30');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!subjectInput.trim() || !topic.trim()) {
      return;
    }
    
    // Submeter os dados
    onSubmit({
      subject: subjectInput,
      topic: topic,
      color: selectedColor,
    });
    
    // Limpar o formulário
    setSubjectInput('');
    setTopic('');
    setHours('0');
    setMinutes('0');
    setSelectedColor('#2563EB');
  };

  const filteredSubjects = subjects.filter(s => 
    s.name.toLowerCase().includes(subjectInput.toLowerCase())
  );

  const handleSelectSubject = (subject: typeof subjects[0]) => {
    setSubjectInput(subject.name);
    setSelectedColor(subject.color);
    setShowSuggestions(false);
  };

  const handleSubjectInputChange = (value: string) => {
    setSubjectInput(value);
    setShowSuggestions(true);
    
    // Se o texto corresponder exatamente a uma disciplina existente, use sua cor
    const exactMatch = subjects.find(s => s.name.toLowerCase() === value.toLowerCase());
    if (exactMatch) {
      setSelectedColor(exactMatch.color);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-5 rounded-t-3xl flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              O que você estudou hoje?
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Registre seu progresso e gere revisões automáticas
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-50 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Disciplina */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#2563EB]" />
                <span>Disciplina</span>
              </div>
            </label>
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  value={subjectInput}
                  onChange={(e) => handleSubjectInputChange(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="Digite ou escolha uma disciplina..."
                  className="w-full px-4 py-3 pr-12 bg-slate-50 border border-gray-200 rounded-xl text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                />
                {/* Color indicator and dropdown icon */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: selectedColor }}
                  />
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              
              {/* Suggestions Dropdown */}
              {showSuggestions && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                  {filteredSubjects.length > 0 ? (
                    <>
                      <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b border-gray-100">
                        Disciplinas Existentes
                      </div>
                      {filteredSubjects.map((subject) => (
                        <button
                          key={subject.id}
                          type="button"
                          onClick={() => handleSelectSubject(subject)}
                          className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors flex items-center gap-3"
                        >
                          <div 
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: subject.color }}
                          />
                          <span className="font-medium text-gray-900">{subject.name}</span>
                        </button>
                      ))}
                    </>
                  ) : (
                    <div className="px-4 py-6 text-center">
                      <p className="text-sm text-gray-500 mb-2">Nenhuma disciplina encontrada</p>
                      <p className="text-xs text-gray-400">
                        Digite para criar: <span className="font-semibold text-[#2563EB]">&quot;{subjectInput}&quot;</span>
                      </p>
                    </div>
                  )}
                  
                  {/* Color Picker for new subjects */}
                  {subjectInput && !subjects.find(s => s.name.toLowerCase() === subjectInput.toLowerCase()) && (
                    <div className="border-t border-gray-100 p-3">
                      <p className="text-xs font-medium text-gray-600 mb-2">Escolha uma cor:</p>
                      <div className="flex gap-2">
                        {defaultColors.map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setSelectedColor(color)}
                            className={`w-8 h-8 rounded-lg transition-all ${
                              selectedColor === color 
                                ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' 
                                : 'hover:scale-105'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Tema do Estudo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#2563EB]" />
                <span>Tema do Estudo</span>
              </div>
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Digite o tema estudado..."
              className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
            />
          </div>

          {/* Tempo Dedicado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2563EB]" />
                <span>Tempo Dedicado</span>
              </div>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-gray-900 text-center focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none">
                  horas
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-gray-900 text-center focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none">
                  min
                </span>
              </div>
            </div>
          </div>

          {/* Preview Card */}
          <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-4 border border-blue-100">
            <p className="text-xs font-medium text-gray-600 mb-2">Prévia da Revisão</p>
            <div className="flex items-center gap-3">
              <div 
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: selectedColor }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{topic || 'Seu tema'}</p>
                <p className="text-sm text-gray-600">{subjectInput || 'Disciplina'}</p>
              </div>
              <div className="text-sm text-gray-500">
                {hours}h {minutes}m
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl font-medium text-gray-700 hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#2563EB] text-white rounded-xl font-semibold hover:bg-[#1e40af] shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Salvar e Gerar Revisões
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}