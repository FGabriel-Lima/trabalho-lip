// RevisionCard.tsx
import { Check } from 'lucide-react';
import { Revision } from '../../../App';

interface RevisionCardProps {
  revision: Revision;
  onToggle: () => void;
}

export function RevisionCard({ revision, onToggle }: RevisionCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        {/* Checkbox */}
        <button
          onClick={onToggle}
          className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
            revision.completed
              ? 'bg-[#2563EB] border-[#2563EB]'
              : 'border-gray-300 hover:border-[#2563EB]'
          }`}
        >
          {revision.completed && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-medium mb-1 ${
              revision.completed ? 'text-gray-400 line-through' : 'text-gray-900'
            }`}
          >
            {revision.title}
          </h3>
          <div className="flex items-center gap-2">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: revision.subjectColor }}
            >
              {revision.subject}
            </span>
          </div>
        </div>

        {/* Done Button - Shows on larger screens */}
        <button
          onClick={onToggle}
          className={`hidden sm:block px-4 py-2 rounded-xl font-medium text-sm transition-all ${
            revision.completed
              ? 'bg-gray-100 text-gray-400'
              : 'bg-[#2563EB] text-white hover:bg-[#1e40af] shadow-sm'
          }`}
        >
          {revision.completed ? 'Desfazer' : 'Concluir'}
        </button>
      </div>
    </div>
  );
}