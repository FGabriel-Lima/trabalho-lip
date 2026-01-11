'use client';

import { useEffect, useState } from 'react';
import { getPerfil, atualizarPerfil } from '@/app/actions/profile';
import { ProfileForm } from '@/components/ProfileForm';

export default function PerfilPage() {
  // Simulação de pegar o ID do usuário logado (já que não temos Auth completa ainda)
  // Em produção, isso viria do seu Contexto de Auth ou Cookie
  const [userId, setUserId] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Tenta recuperar ID salvo no localStorage pelo login
    const id = localStorage.getItem('usuario_logado_id');
    if (id) {
      setUserId(id);
      // Carrega dados iniciais via Server Action
      getPerfil(id).then(user => setData(user));
    }
  }, []);

  const handleSave = async (novosDados: any) => {
    if (!userId) return;
    await atualizarPerfil(userId, novosDados);
    alert('Perfil atualizado!');
  };

  if (!userId) return <div className="p-8">Por favor, faça login.</div>;
  if (!data) return <div className="p-8">Carregando...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ProfileForm 
        initialData={{
          nome: data.nome,
          email: data.email,
          curso: data.curso || '',
          instituicao: data.instituicao || '',
          semestre: data.semestre || '',
          avatar: data.avatar || ''
        }}
        onSave={handleSave}
      />
    </div>
  );
}