'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function criarDisciplina(usuarioId: string, nome: string) {
  if (!nome || nome.length < 2) return { success: false, error: "Nome inválido" };

  try {
    await prisma.disciplina.create({
      data: {
        nome,
        usuarioId
      }
    });
    revalidatePath('/disciplinas');
    return { success: true };
  } catch (e) {
    return { success: false, error: "Erro ao criar disciplina" };
  }
}

export async function listarDisciplinas(usuarioId: string) {
  return await prisma.disciplina.findMany({
    where: { usuarioId },
    orderBy: { nome: 'asc' }
  });
}

export async function excluirDisciplina(id: string) {
  try {
    await prisma.disciplina.delete({ where: { id } });
    revalidatePath('/disciplinas');
    return { success: true };
  } catch (e) {
    return { success: false, error: "Erro ao excluir" };
  }
}