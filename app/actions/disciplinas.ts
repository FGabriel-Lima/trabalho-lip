'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type DisciplineFormData = {
  name: string;
  icon: string;
  color: string;
};

// GET: Listar todas as disciplinas do usuário
export async function getDisciplines(userId: string) {
  if (!userId) return [];
  
  return await prisma.discipline.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
}

// GET: Obter uma disciplina específica
export async function getDiscipline(id: string) {
  return await prisma.discipline.findUnique({
    where: { id }
  });
}

// POST: Criar nova disciplina
export async function createDiscipline(userId: string, data: DisciplineFormData) {
  if (!userId) return { success: false, error: "Usuário não autenticado" };
  if (!data.name || data.name.length < 2) {
    return { success: false, error: "Nome deve ter pelo menos 2 caracteres" };
  }

  try {
    await prisma.discipline.create({
      data: {
        name: data.name,
        icon: data.icon || 'book',
        color: data.color || 'blue',
        totalHours: 0,
        revisionsDone: 0,
        revisionsTotal: 0,
        progress: 0,
        userId
      }
    });
    
    revalidatePath('/disciplinas');
    return { success: true };
  } catch (error) {
    console.error("Erro ao criar disciplina:", error);
    return { success: false, error: "Erro ao criar disciplina" };
  }
}

// DELETE: Excluir disciplina
export async function deleteDiscipline(id: string) {
  try {
    await prisma.discipline.delete({
      where: { id }
    });
    
    revalidatePath('/disciplinas');
    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir disciplina:", error);
    return { success: false, error: "Erro ao excluir disciplina" };
  }
}

// PUT: Atualizar disciplina
export async function updateDiscipline(id: string, data: Partial<DisciplineFormData>) {
  try {
    await prisma.discipline.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.icon && { icon: data.icon }),
        ...(data.color && { color: data.color }),
      }
    });
    
    revalidatePath('/disciplinas');
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar disciplina:", error);
    return { success: false, error: "Erro ao atualizar disciplina" };
  }
}

// GET: Estatísticas agregadas do usuário
export async function getDisciplineStats(userId: string) {
  if (!userId) return null;
  
  const disciplines = await prisma.discipline.findMany({
    where: { userId },
    select: {
      totalHours: true,
      revisionsDone: true,
      revisionsTotal: true,
      progress: true
    }
  });

  const totals = disciplines.reduce((acc, curr) => ({
    totalHours: acc.totalHours + curr.totalHours,
    revisionsDone: acc.revisionsDone + curr.revisionsDone,
    revisionsTotal: acc.revisionsTotal + curr.revisionsTotal,
  }), { totalHours: 0, revisionsDone: 0, revisionsTotal: 0 });

  return {
    count: disciplines.length,
    ...totals
  };
}

