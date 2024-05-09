'use server'
import prisma from "@/configs/prisma";
import {BaseInfo} from "@/types/base-info";
import {getServerSession} from "next-auth";
import {Education} from ".prisma/client";
import {authConfig} from "@/configs/auth";
import {EducationType} from "@/types/education";
export const getPreviewsPortfolio = async () => {
    const previews = await prisma.user.findMany({
        select: {
            description: true,
            id: true,
            birthDay: true,
            name: true,
            surname: true
        },
        where: {
            description: {not: null},
            birthDay: {not: null},
            name: {not: null},
            surname: {not: null},
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
export const getEducations = async (authorId: string) => {
    const educations = await prisma.education.findMany({
        where: {authorId: authorId},
        select: {
            institution: true,
            degree: true,
            major: true,
            start_date: true,
            end_date: true,
            id: true
        }
    })
    return educations as EducationType[];
}
export const saveBaseInfo = async (baseInfo: BaseInfo) => {
    const session = await getServerSession(authConfig);
    if(!session)return {status: 'error', message: 'Произошла ошибка, обновите страницу!'};
    console.log(session.user.id)
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
export const saveEducation = async (education: EducationType) => {
    const session = await getServerSession(authConfig);
    if(!session)return {status: 'error', message: 'Произошла ошибка, обновите страницу!'};
    if(await prisma.education.count({where: {authorId: session.user.id}})>2)return {status: 'error', message: 'Добавлено уже 3 образования'};
    if(education.id) {
        await prisma.education.update({
            where: {id: education.id, authorId: session.user.id},
            data: education
        })
    }else {
        await prisma.education.create({
            data: {
                institution: education.institution || "",
                degree: education.degree || "",
                major: education.major || "",
                start_date: education.start_date || new Date(),
                end_date: education.end_date || new Date(),
                author: {connect: {id: session.user.id}}
            }
        })
    }
    return {status: 'success', message: 'Сохранено!'};
}
