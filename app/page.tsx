'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { Clock, BookOpen, Target, Award, TrendingUp } from 'lucide-react';

// ... (Copie os DADOS MOCKADOS: weeklyData, subjectHoursData, difficultyData, topSubjects aqui)
const weeklyData = [
  { name: 'Seg', hours: 2.5 }, { name: 'Ter', hours: 3.0 },
  { name: 'Qua', hours: 2.0 }, { name: 'Qui', hours: 4.0 },
  { name: 'Sex', hours: 3.5 }, { name: 'Sáb', hours: 1.5 }, { name: 'Dom', hours: 1.0 },
];
// (Adicione o resto dos dados mockados aqui para economizar espaço na resposta...)
const subjectHoursData = [
  { name: 'Programação', hours: 18, fill: '#2563EB' },
  { name: 'Matemática', hours: 15, fill: '#10B981' },
  { name: 'Banco de Dados', hours: 12, fill: '#F59E0B' },
  { name: 'Física', hours: 8, fill: '#8B5CF6' },
  { name: 'Química', hours: 6, fill: '#EC4899' },
];

const difficultyData = [
  { name: 'Fácil', value: 5, color: '#10B981' },
  { name: 'Médio', value: 8, color: '#F59E0B' },
  { name: 'Difícil', value: 3, color: '#EC4899' },
];

const topSubjects = [
  { rank: 1, name: 'Programação', hours: '18h', color: 'bg-blue-600', width: 'w-[90%]' },
  { rank: 2, name: 'Matemática', hours: '15h', color: 'bg-emerald-500', width: 'w-[75%]' },
  { rank: 3, name: 'Banco de Dados', hours: '12h', color: 'bg-blue-700', width: 'w-[60%]' },
  { rank: 4, name: 'Física', hours: '8h', color: 'bg-orange-500', width: 'w-[40%]' },
  { rank: 5, name: 'Química', hours: '6h', color: 'bg-pink-500', width: 'w-[30%]' },
];

export default function DashboardPage() {
  return (
    <div className="animate-in fade-in duration-500">
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="text-blue-600 w-5 h-5" />
          <h1 className="text-2xl font-bold text-gray-800">Análises</h1>
        </div>
        <p className="text-gray-500 text-sm">Acompanhe seu progresso e desempenho</p>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total de Horas', val: '59h', sub: 'Neste mês', color: 'bg-blue-600', icon: Clock, shadow: 'shadow-blue-200', iconBg: 'bg-blue-500/30' },
          { title: 'Disciplinas', val: '5', sub: 'Estudadas', color: 'bg-emerald-500', icon: BookOpen, shadow: 'shadow-emerald-200', iconBg: 'bg-emerald-400/30' },
          { title: 'Taxa Conclusão', val: '20%', sub: '1 de 5 revisões', color: 'bg-purple-600', icon: Target, shadow: 'shadow-purple-200', iconBg: 'bg-purple-500/30' },
          { title: 'Sequência', val: '7 dias', sub: 'Recorde: 12 dias', color: 'bg-orange-600', icon: Award, shadow: 'shadow-orange-200', iconBg: 'bg-orange-500/30' },
        ].map((card, idx) => (
          <div key={idx} className={`${card.color} rounded-2xl p-5 text-white shadow-lg ${card.shadow}`}>
            <div className="flex items-start justify-between mb-4"><div className={`${card.iconBg} p-2 rounded-lg`}><card.icon className="w-6 h-6" /></div></div>
            <div className="space-y-1"><p className="text-white/80 text-sm font-medium">{card.title}</p><h3 className="text-3xl font-bold">{card.val}</h3><p className="text-white/80 text-xs mt-2">{card.sub}</p></div>
          </div>
        ))}
      </div>

      {/* Gráficos Linha 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Gráfico Progresso Semanal */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-6 flex items-center gap-2"><TrendingUp size={18} className="text-blue-600" /> Progresso Semanal</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="hours" stroke="#2563EB" strokeWidth={3} dot={{ fill: '#2563EB', r: 4, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico Horas por Disciplina */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-6 flex items-center gap-2"><BookOpen size={18} className="text-blue-600" /> Horas por Disciplina</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectHoursData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 10 }} dy={10} interval={0} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <RechartsTooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="hours" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Gráficos Linha 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
        {/* Gráfico Pizza */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between">
          <div className="h-48 w-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={difficultyData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {difficultyData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><div className="w-3 h-3 bg-gray-200 rounded-full"></div></div>
          </div>
          <div className="flex-1 w-full md:pl-8 space-y-3 mt-6 md:mt-0">
            <h3 className="font-semibold text-gray-700 mb-4">Dificuldade</h3>
            {difficultyData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div><span className="text-sm text-gray-600">{item.name}</span></div>
                <span className="text-sm font-bold text-gray-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lista Top Disciplinas */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-6">Top Disciplinas</h3>
          <div className="space-y-6">
            {topSubjects.map((subject) => (
              <div key={subject.rank}>
                <div className="flex justify-between text-sm mb-2">
                  <div className="flex items-center gap-3"><span className="w-6 h-6 flex items-center justify-center bg-gray-100 text-gray-600 rounded text-xs font-bold">{subject.rank}</span><span className="text-gray-700 font-medium">{subject.name}</span></div>
                  <span className="font-bold text-gray-700">{subject.hours}</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden"><div className={`h-full rounded-full ${subject.color}`} style={{ width: subject.width }}></div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}