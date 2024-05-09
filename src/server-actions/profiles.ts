'use server'
import prisma from "@/configs/prisma";
import {BaseInfo} from "@/types/base-info";
import {getServerSession} from "next-auth";
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
            birthDay: true,
            id: true
        }
    })
    return info as BaseInfo;
}
export const saveBaseInfo = async (baseInfo: BaseInfo) => {
    const session = await getServerSession();
    if(!session)return {status: 'error', message: 'Произошла ошибка, обновите страницу!'};
    await prisma.user.update({
        where: {id: session.user.id},
        data: {
            name: baseInfo.name,
            surname: baseInfo.surname,
            patronymic: baseInfo.patronymic,
            description: baseInfo.description,
            birthDay: baseInfo.birthDay,
        }
    })
    return {status: 'success', message: 'Сохранено!'};
}
