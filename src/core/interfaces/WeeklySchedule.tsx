import { useRef } from 'react';

export function WeeklySchedule() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const days = [
    { day: 'Seg', date: 5, subjects: ['#2563EB', '#10B981', '#F59E0B'] },
    { day: 'Ter', date: 6, subjects: ['#2563EB', '#EC4899'] },
    { day: 'Qua', date: 7, subjects: ['#10B981', '#F59E0B', '#8B5CF6'] },
    { day: 'Qui', date: 8, subjects: ['#2563EB', '#10B981'], current: true },
    { day: 'Sex', date: 9, subjects: ['#EC4899', '#F59E0B'] },
    { day: 'Sáb', date: 10, subjects: ['#10B981'] },
    { day: 'Dom', date: 11, subjects: [] },
  ];

  return (
    <div 
      ref={scrollRef}
      className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {days.map((item, index) => (
        <div
          key={index}
          className={`flex-shrink-0 w-20 p-4 rounded-2xl text-center transition-all ${
            item.current
              ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-500/30'
              : 'bg-slate-50 text-gray-700'
          }`}
        >
          <p className={`text-xs font-medium mb-2 ${item.current ? 'text-blue-100' : 'text-gray-500'}`}>
            {item.day}
          </p>
          <p className="text-2xl font-bold mb-3">{item.date}</p>
          <div className="flex gap-1 justify-center">
            {item.subjects.map((color, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: item.current ? 'rgba(255,255,255,0.7)' : color }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}