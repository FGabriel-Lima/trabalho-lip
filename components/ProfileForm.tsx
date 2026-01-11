'use client';

import { useState } from 'react';
import { User, Save, Edit2 } from 'lucide-react';

// Tipagem simples para o componente
interface ProfileData {
  nome: string;
  email: string;
  curso: string;
  instituicao: string;
  semestre: string;
  avatar: string;
}

interface Props {
  initialData: ProfileData;
  onSave: (data: Partial<ProfileData>) => Promise<void>;
}

export function ProfileForm({ initialData, onSave }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await onSave(formData);
    setLoading(false);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Meu Perfil</h2>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition"
          >
            <Edit2 size={18} /> Editar
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Avatar e Nome */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-4xl mb-2">
            {formData.avatar || "👤"}
          </div>
          {isEditing && (
            <input 
              type="text" 
              placeholder="Cole um Emoji aqui"
              className="text-center border rounded p-1 w-40 text-sm mb-2"
              value={formData.avatar}
              onChange={e => setFormData({...formData, avatar: e.target.value})}
              maxLength={2}
            />
          )}
          <h3 className="text-xl font-semibold">{formData.nome}</h3>
          <p className="text-slate-500">{formData.email}</p>
        </div>

        {/* Campos do Formulário */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
            <input
              disabled={!isEditing}
              value={formData.nome}
              onChange={e => setFormData({...formData, nome: e.target.value})}
              className="w-full p-2 border rounded-lg disabled:bg-slate-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Curso</label>
            <input
              disabled={!isEditing}
              value={formData.curso}
              onChange={e => setFormData({...formData, curso: e.target.value})}
              className="w-full p-2 border rounded-lg disabled:bg-slate-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Instituição</label>
            <input
              disabled={!isEditing}
              value={formData.instituicao}
              onChange={e => setFormData({...formData, instituicao: e.target.value})}
              className="w-full p-2 border rounded-lg disabled:bg-slate-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Semestre</label>
            <input
              disabled={!isEditing}
              value={formData.semestre}
              onChange={e => setFormData({...formData, semestre: e.target.value})}
              className="w-full p-2 border rounded-lg disabled:bg-slate-50"
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end gap-2 mt-6">
            <button 
              onClick={() => { setIsEditing(false); setFormData(initialData); }}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancelar
            </button>
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              <Save size={18} /> Salvar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}