'use server'
import prisma from "@/configs/prisma";
export const getPreviewsPortfolio = async () => {
    const previews = await prisma.user.findMany({
        select: {
            description: true,
            id: true,
            birthDay: true
        },
        where: {
            description: {not: null},
            birthDay: {not: null}
        }
    })
    return previews;
}
export const getBaseInfo = async (id: string) => {
    const info = await prisma.user.findUnique({
        where: {id: id},
        select: {
            name: true,
            surname: true,
            patronymic: true,
            description: true,
            birthDay: true
        }
    })
    return info;
}
