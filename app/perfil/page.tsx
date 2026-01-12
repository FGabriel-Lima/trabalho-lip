'use client';

import React, { useState } from 'react';
import {
  User, Mail, BookOpen, Building2, Calendar,
  Smile, Edit2, LogOut, Save, GraduationCap
} from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Estudante',
    email: 'ss@gmail.com',
    course: 'Não informado',
    institution: 'Não informado',
    semester: '1º Semestre',
    avatar: '👨‍🎓'
  });

  // Estado temporário para edição (para poder cancelar)
  const [tempProfile, setTempProfile] = useState(profile);

  const handleEdit = () => {
    setTempProfile(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setTempProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="animate-in fade-in duration-500 space-y-8 max-w-6xl mx-auto">

      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <User className="text-blue-600 w-5 h-5" />
            <h1 className="text-2xl font-bold text-gray-800">Meu Perfil</h1>
          </div>
          <p className="text-gray-500 text-sm">Gerencie suas informações pessoais</p>
        </div>

        {!isEditing && (
          <button
            onClick={handleEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-200 flex items-center gap-2 transition-all active:scale-95 w-full sm:w-auto justify-center"
          >
            <Edit2 size={18} /> Editar Perfil
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Coluna Esquerda: Cartão de Perfil */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col items-center text-center h-fit">
            <div className="w-28 h-28 rounded-full bg-blue-600 flex items-center justify-center text-6xl mb-4 shadow-lg shadow-blue-200">
              {profile.avatar}
            </div>
            <h2 className="text-xl font-bold text-gray-800">{profile.name}</h2>
            <p className="text-gray-400 text-sm mt-1">{profile.course !== 'Não informado' ? profile.course : 'Não informado'}</p>

            <div className="w-full border-t border-gray-100 my-6"></div>

            <div className="w-full space-y-4 text-left">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Mail size={16} className="text-gray-400" />
                <span className="truncate">{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <GraduationCap size={16} className="text-gray-400" />
                <span className="truncate">{profile.institution}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Calendar size={16} className="text-gray-400" />
                <span>Membro desde jan de 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna Direita: Formulário e Estatísticas */}
        <div className="lg:col-span-2 space-y-8">

          {/* Formulário */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Informações Pessoais</h3>

            <div className="space-y-5">
              {/* Nome */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm text-gray-500 font-medium"><User size={14} /> Nome Completo</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={isEditing ? tempProfile.name : profile.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm text-gray-500 font-medium"><Mail size={14} /> Email</label>
                <input
                  type="email"
                  disabled={!isEditing}
                  value={isEditing ? tempProfile.email : profile.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                />
              </div>

              {/* Curso */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm text-gray-500 font-medium"><BookOpen size={14} /> Curso</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={isEditing ? tempProfile.course : profile.course}
                  onChange={(e) => handleChange('course', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                />
              </div>

              {/* Instituição */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm text-gray-500 font-medium"><Building2 size={14} /> Instituição</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={isEditing ? tempProfile.institution : profile.institution}
                  onChange={(e) => handleChange('institution', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                />
              </div>

              {/* Semestre */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm text-gray-500 font-medium"><Calendar size={14} /> Semestre/Período</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={isEditing ? tempProfile.semester : profile.semester}
                  onChange={(e) => handleChange('semester', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                />
              </div>

              {/* Avatar (Emoji) */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm text-gray-500 font-medium"><Smile size={14} /> Avatar (Emoji)</label>
                <input
                  type="text"
                  maxLength={2}
                  disabled={!isEditing}
                  value={isEditing ? tempProfile.avatar : profile.avatar}
                  onChange={(e) => handleChange('avatar', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed text-xl"
                />
                {isEditing && <p className="text-xs text-gray-400">Escolha um emoji para representar você</p>}
              </div>

              {/* Botões de Ação (Aparecem apenas na edição) */}
              {isEditing && (
                <div className="flex items-center gap-3 mt-8 pt-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-2">
                  <button
                    onClick={handleCancel}
                    className="flex-1 px-4 py-3 text-gray-600 font-medium border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
                  >
                    <Save size={18} /> Salvar Alterações
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Estatísticas Azul */}
          <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
            <h3 className="font-semibold mb-4 text-blue-100">Estatísticas de Aprendizado</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-500/30 p-4 rounded-xl">
                <p className="text-xs text-blue-100 mb-1">Dias de Estudo</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="bg-blue-500/30 p-4 rounded-xl">
                <p className="text-xs text-blue-100 mb-1">Total de Horas</p>
                <p className="text-2xl font-bold">87h</p>
              </div>
              <div className="bg-blue-500/30 p-4 rounded-xl">
                <p className="text-xs text-blue-100 mb-1">Disciplinas</p>
                <p className="text-2xl font-bold">6</p>
              </div>
              <div className="bg-blue-500/30 p-4 rounded-xl">
                <p className="text-xs text-blue-100 mb-1">Revisões</p>
                <p className="text-2xl font-bold">42</p>
              </div>
            </div>
          </div>

          {/* Botão Sair */}
          <button className="w-full border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 font-medium py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group">
            <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
            Sair da Conta
          </button>

        </div>
      </div>
    </div>
  );
}