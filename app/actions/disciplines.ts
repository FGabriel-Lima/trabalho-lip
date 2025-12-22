"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getDisciplines() {
    return await prisma.discipline.findMany({
        orderBy: { createdAt: "desc" }
    })
}

export async function createDiscipline(formData: FormData) {
    const name = formData.get("name") as string
    const description = formData.get("description") as string

    await prisma.discipline.create({
        data: { name, description }
    })

    revalidatePath("/dashboard/disciplinas")
}

export async function deleteDiscipline(id: string) {
    await prisma.discipline.delete({
        where: { id }
    })

    revalidatePath("/dashboard/disciplinas")
}