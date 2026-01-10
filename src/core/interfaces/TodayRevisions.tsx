// TodayRevisions.tsx
import { RevisionCard } from './RevisionCard';
import { Revision } from '../../../App';

interface TodayRevisionsProps {
  revisions: Revision[];
  onToggleCompletion: (id: string) => void;
}

export function TodayRevisions({ revisions, onToggleCompletion }: TodayRevisionsProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Revisões de Hoje</h2>
        <span className="text-sm text-gray-500">
          {revisions.filter(r => r.completed).length} / {revisions.length} concluídas
        </span>
      </div>
      
      <div className="space-y-3">
        {revisions.map((revision) => (
          <RevisionCard
            key={revision.id}
            revision={revision}
            onToggle={() => onToggleCompletion(revision.id)}
          />
        ))}
      </div>
    </div>
  );
}