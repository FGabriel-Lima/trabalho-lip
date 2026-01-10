import { Plus } from 'lucide-react';

interface AddStudyButtonProps {
  onClick: () => void;
}

export function AddStudyButton({ onClick }: AddStudyButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="fixed bottom-24 md:bottom-8 right-4 md:right-8 bg-[#2563EB] text-white rounded-2xl px-6 py-4 shadow-lg shadow-blue-500/40 hover:bg-[#1e40af] transition-all hover:scale-105 active:scale-95 flex items-center gap-2 z-40"
    >
      <Plus className="w-5 h-5" strokeWidth={2.5} />
      <span className="font-semibold">Registrar Novo Estudo</span>
    </button>
  );
}