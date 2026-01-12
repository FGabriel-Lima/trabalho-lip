'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type ProfileFormData = {
  name?: string;
  email?: string;
  avatar?: string;
  course?: string;
  institution?: string;
  semester?: string;
};

export async function getUserProfile(userId: string) {
  if (!userId) return null;
  
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      course: true,
      institution: true,
      semester: true,
      createdAt: true,
    }
  });
}

export async function updateUserProfile(userId: string, data: ProfileFormData) {
  if (!userId) return { success: false, error: "Usuário não autenticado" };

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.avatar && { avatar: data.avatar }),
        ...(data.course && { course: data.course }),
        ...(data.institution && { institution: data.institution }),
        ...(data.semester && { semester: data.semester }),
      }
    });
    
    revalidatePath('/perfil');
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    return { success: false, error: "Erro ao atualizar perfil" };
  }
}

export async function getUserStats(userId: string) {
  if (!userId) return null;
  
  const [disciplines, revisions, totalHours] = await Promise.all([
    prisma.discipline.count({ where: { userId } }),
    prisma.revision.count({ where: { userId } }),
    prisma.discipline.aggregate({
      where: { userId },
      _sum: { totalHours: true, revisionsDone: true }
    })
  ]);

  const completedRevisions = await prisma.revision.count({
    where: { userId, completed: true }
  });

  const studyDays = await prisma.revision.groupBy({
    by: ['date'],
    where: { userId },
    _count: true
  });

  return {
    studyDays: studyDays.length,
    disciplines,
    revisions,
    completedRevisions,
    totalHours: totalHours._sum.totalHours || 0,
    totalRevisionsDone: totalHours._sum.revisionsDone || 0,
  };
}

