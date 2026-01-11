'use client';

import { useEffect, useState } from 'react';
import { criarDisciplina, listarDisciplinas, excluirDisciplina } from '@/app/actions/disciplinas';
import { Trash2, Plus } from 'lucide-react';

export default function DisciplinasPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [disciplinas, setDisciplinas] = useState<any[]>([]);
  const [novoNome, setNovoNome] = useState('');

  // Carrega dados
  useEffect(() => {
    const id = localStorage.getItem('usuario_logado_id');
    if (id) {
      setUserId(id);
      carregar(id);
    }
  }, []);

  const carregar = async (id: string) => {
    const lista = await listarDisciplinas(id);
    setDisciplinas(lista);
  };

  const handleCriar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    
    await criarDisciplina(userId, novoNome);
    setNovoNome('');
    carregar(userId); // Recarrega lista
  };

  const handleExcluir = async (id: string) => {
    if (!userId) return;
    await excluirDisciplina(id);
    carregar(userId);
  };

  if (!userId) return <div className="p-8">Faça Login.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Gerenciar Disciplinas</h1>
      
      <form onSubmit={handleCriar} className="flex gap-4 mb-8">
        <input 
          value={novoNome}
          onChange={e => setNovoNome(e.target.value)}
          placeholder="Nome da disciplina (Ex: Matemática)"
          className="flex-1 p-3 border rounded-xl"
        />
        <button type="submit" className="bg-blue-600 text-white px-6 rounded-xl hover:bg-blue-700">
          <Plus />
        </button>
      </form>

      <div className="space-y-3">
        {disciplinas.map(d => (
          <div key={d.id} className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm border">
            <span className="font-medium">{d.nome}</span>
            <button onClick={() => handleExcluir(d.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}