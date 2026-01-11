'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function atualizarPerfil(usuarioId: string, dados: {
  nome: string;
  curso?: string;
  instituicao?: string;
  semestre?: string;
  avatar?: string;
}) {
  try {
    await prisma.usuario.update({
      where: { id: usuarioId },
      data: {
        nome: dados.nome,
        curso: dados.curso,
        instituicao: dados.instituicao,
        semestre: dados.semestre,
        avatar: dados.avatar,
      },
    });
    revalidatePath('/perfil'); // Atualiza a tela sem refresh
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao atualizar perfil" };
  }
}

export async function getPerfil(usuarioId: string) {
  return await prisma.usuario.findUnique({
    where: { id: usuarioId }
  });
}