'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type RevisionFormData = {
  topic: string;
  subject: string;
  date: Date;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  durationMinutes?: number;
  disciplineId?: string;
};

export async function getRevisions(userId: string) {
  if (!userId) return [];
  
  return await prisma.revision.findMany({
    where: { userId },
    orderBy: { date: 'asc' },
    include: {
      discipline: {
        select: { name: true, color: true, icon: true }
      }
    }
  });
}

export async function getRevisionsByDate(userId: string, date: Date) {
  if (!userId) return [];
  
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  return await prisma.revision.findMany({
    where: {
      userId,
      date: {
        gte: startOfDay,
        lte: endOfDay
      }
    },
    orderBy: { createdAt: 'asc' }
  });
}

export async function getRevisionsByMonth(userId: string, year: number, month: number) {
  if (!userId) return [];
  
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);
  
  return await prisma.revision.findMany({
    where: {
      userId,
      date: {
        gte: startOfMonth,
        lte: endOfMonth
      }
    },
    orderBy: { date: 'asc' }
  });
}

export async function createRevision(userId: string, data: RevisionFormData) {
  if (!userId) return { success: false, error: "Usuário não autenticado" };
  if (!data.topic || data.topic.length < 2) {
    return { success: false, error: "Tema deve ter pelo menos 2 caracteres" };
  }

  try {
    let disciplineId: string | undefined = data.disciplineId;
    
    if (!disciplineId && data.subject) {
      const discipline = await prisma.discipline.findFirst({
        where: {
          userId,
          name: data.subject
        }
      });
      disciplineId = discipline?.id;
    }

    await prisma.revision.create({
      data: {
        topic: data.topic,
        date: data.date,
        difficulty: data.difficulty || 'Médio',
        completed: false,
        durationMinutes: data.durationMinutes || 30,
        userId,
        disciplineId
      }
    });
    
    revalidatePath('/agenda');
    return { success: true };
  } catch (error) {
    console.error("Erro ao criar revisão:", error);
    return { success: false, error: "Erro ao criar revisão" };
  }
}

export async function toggleRevisionCheck(revisionId: string) {
  try {
    const revision = await prisma.revision.findUnique({
      where: { id: revisionId }
    });

    if (!revision) {
      return { success: false, error: "Revisão não encontrada" };
    }

    await prisma.revision.update({
      where: { id: revisionId },
      data: {
        completed: !revision.completed
      }
    });
    
    revalidatePath('/agenda');
    return { success: true, completed: !revision.completed };
  } catch (error) {
    console.error("Erro ao atualizar revisão:", error);
    return { success: false, error: "Erro ao atualizar revisão" };
  }
}

export async function updateRevision(revisionId: string, data: Partial<RevisionFormData>) {
  try {
    await prisma.revision.update({
      where: { id: revisionId },
      data: {
        ...(data.topic && { topic: data.topic }),
        ...(data.date && { date: data.date }),
        ...(data.difficulty && { difficulty: data.difficulty }),
        ...(data.durationMinutes && { durationMinutes: data.durationMinutes }),
        ...(data.disciplineId && { disciplineId: data.disciplineId }),
      }
    });
    
    revalidatePath('/agenda');
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar revisão:", error);
    return { success: false, error: "Erro ao atualizar revisão" };
  }
}

export async function deleteRevision(revisionId: string) {
  try {
    await prisma.revision.delete({
      where: { id: revisionId }
    });
    
    revalidatePath('/agenda');
    return { success: true };
  } catch (error) {
    console.error("Erro ao excluir revisão:", error);
    return { success: false, error: "Erro ao excluir revisão" };
  }
}

export async function getRevisionStats(userId: string) {
  if (!userId) return null;
  
  const [total, completed, byDifficulty] = await Promise.all([
    prisma.revision.count({ where: { userId } }),
    prisma.revision.count({ where: { userId, completed: true } }),
    prisma.revision.groupBy({
      by: ['difficulty'],
      where: { userId },
      _count: true
    })
  ]);

  return {
    total,
    completed,
    pending: total - completed,
    byDifficulty: byDifficulty.reduce((acc, curr) => {
      acc[curr.difficulty] = curr._count;
      return acc;
    }, {} as Record<string, number>)
  };
}

