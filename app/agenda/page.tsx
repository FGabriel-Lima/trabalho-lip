'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Calendar as CalendarIcon, Clock, BookOpen, CheckCircle2, Circle } from 'lucide-react';

interface Revision {
    id: string;
    title: string;
    subject: string;
    date: string;
    difficulty: 'Fácil' | 'Médio' | 'Difícil';
    completed: boolean;
}

const initialRevisions: Revision[] = [
    { id: '1', title: 'Banco de Dados - Normalização', subject: 'Banco de Dados', date: '2026-01-11', difficulty: 'Médio', completed: false },
    { id: '2', title: 'Matemática - Álgebra Linear', subject: 'Matemática', date: '2026-01-11', difficulty: 'Médio', completed: false },
    { id: '3', title: 'React Hooks', subject: 'Programação', date: '2026-01-13', difficulty: 'Fácil', completed: true }
];

// O Modal pode ficar aqui ou em um arquivo separado
const StudyModal = ({ isOpen, onClose, selectedDate, onSave }: any) => {
    if (!isOpen) return null;
    const formattedDateDisplay = selectedDate.toLocaleDateString('pt-BR');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        onSave({
            subject: formData.get('subject'),
            topic: formData.get('topic'),
            date: selectedDate
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800">O que você estudou hoje?</h3>
                    <button onClick={onClose}><X size={20} className="text-gray-400 hover:text-gray-600" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="space-y-1.5">
                        <label className="flex items-center gap-2 text-sm text-gray-600"><BookOpen size={16} /> Disciplina</label>
                        <select name="subject" className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                            <option>Banco de Dados</option><option>Matemática</option><option>Programação</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm text-gray-600">Tema do Estudo</label>
                        <input name="topic" type="text" placeholder="Ex: Normalização..." className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm text-gray-600">Data Agendada</label>
                        <input type="text" value={formattedDateDisplay} readOnly className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-500" />
                    </div>
                    <div className="flex items-center gap-3 mt-8 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-3 text-gray-600 font-medium hover:bg-gray-50 rounded-xl">Cancelar</button>
                        <button type="submit" className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-200">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default function AgendaPage() {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 11));
    const [selectedDate, setSelectedDate] = useState(new Date(2026, 0, 11));
    const [revisions, setRevisions] = useState<Revision[]>(initialRevisions);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getDaysInMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    const getFirstDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1).getDay();
    const changeMonth = (i: number) => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1));

    const selectedDateStr = selectedDate.toISOString().split('T')[0];
    const revisionsForDay = revisions.filter(r => r.date === selectedDateStr);
    const hasRevisions = (day: number) => {
        const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
        return revisions.some(r => r.date === checkDate);
    };

    const handleAddRevision = (data: any) => {
        setRevisions([...revisions, {
            id: Date.now().toString(),
            title: `${data.subject} - ${data.topic}`,
            subject: data.subject,
            difficulty: 'Médio',
            completed: false,
            date: data.date.toISOString().split('T')[0]
        }]);
    };

    const renderDays = () => {
        const totalDays = getDaysInMonth(currentDate);
        const startEmpty = getFirstDay(currentDate);
        const days = [];
        for (let i = 0; i < startEmpty; i++) days.push(<div key={`empty-${i}`} className="h-14"></div>);
        for (let d = 1; d <= totalDays; d++) {
            const isSelected = selectedDate.getDate() === d && selectedDate.getMonth() === currentDate.getMonth();
            days.push(
                <button key={d} onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), d))}
                    className={`h-14 relative flex flex-col items-center justify-center rounded-xl transition-all ${isSelected ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-600 hover:bg-gray-50'}`}>
                    <span className={`text-sm ${isSelected ? 'font-bold' : ''}`}>{d}</span>
                    {hasRevisions(d) && <div className="flex gap-0.5 mt-1"><div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-teal-400'}`}></div></div>}
                </button>
            );
        }
        return days;
    };

    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] animate-in fade-in duration-500">
            <header className="mb-6">
                <div className="flex items-center gap-2 mb-1"><CalendarIcon className="text-blue-600 w-5 h-5" /><h1 className="text-2xl font-bold text-gray-800">Agenda</h1></div>
                <p className="text-gray-500 text-sm">Gerencie seus estudos</p>
            </header>
            <div className="flex flex-col lg:flex-row gap-8 flex-1 overflow-hidden pb-4">
                <div className="flex-1 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm overflow-y-auto">
                    <div className="flex justify-between mb-8">
                        <h2 className="text-lg font-semibold text-gray-800">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                        <div className="flex gap-2"><button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft size={20} /></button><button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronRight size={20} /></button></div>
                    </div>
                    <div className="grid grid-cols-7 mb-4 text-center text-xs font-medium text-gray-400 uppercase">
                        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => <div key={d}>{d}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-2">{renderDays()}</div>
                </div>
                <div className="w-full lg:w-96 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col">
                    <div className="mb-6"><h2 className="text-gray-800 font-semibold">{selectedDate.getDate()} de {monthNames[selectedDate.getMonth()]}</h2><p className="text-sm text-gray-500">{revisionsForDay.length} revisões</p></div>
                    <button onClick={() => setIsModalOpen(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-200 mb-6 transition-colors"><Plus size={20} /> Agendar Estudo</button>
                    <div className="space-y-3 overflow-y-auto flex-1 pr-2">
                        {revisionsForDay.length > 0 ? revisionsForDay.map(r => (
                            <div key={r.id} className="border border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer bg-white group">
                                <div className="flex items-start gap-3">
                                    <button onClick={() => setRevisions(revisions.map(rv => rv.id === r.id ? { ...rv, completed: !rv.completed } : rv))} className={r.completed ? 'text-green-500' : 'text-gray-300 group-hover:text-blue-500'}>{r.completed ? <CheckCircle2 size={22} /> : <Circle size={22} />}</button>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start"><span className={`text-sm font-medium ${r.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{r.title}</span><span className="text-[10px] font-bold px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full">{r.difficulty}</span></div>
                                        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded mt-1 inline-block">{r.subject}</span>
                                    </div>
                                </div>
                            </div>
                        )) : <div className="flex flex-col items-center justify-center h-40 text-gray-400 border-2 border-dashed border-gray-100 rounded-xl"><BookOpen size={32} className="mb-2 opacity-50" /><p className="text-sm">Vazio por aqui</p></div>}
                    </div>
                </div>
            </div>
            <StudyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedDate={selectedDate} onSave={handleAddRevision} />
        </div>
    );
}