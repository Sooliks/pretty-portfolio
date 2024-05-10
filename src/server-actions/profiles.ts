'use server'
import prisma from "@/configs/prisma";
import {BaseInfo} from "@/types/base-info";
import {getServerSession} from "next-auth";
import {authConfig} from "@/configs/auth";
import {EducationType} from "@/types/education";
import {ProjectType} from "@/types/project";
import {revalidatePath} from "next/cache";
import {Contact} from ".prisma/client";
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
        },
        orderBy: [{id: 'desc'}]
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
            data: {
                institution: education.institution,
                degree: education.degree,
                major: education.major,
                start_date: education.start_date,
                end_date: education.end_date
            }
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
export const getProjects = async (authorId: string) => {
    const projects = await prisma.project.findMany({
        where: {authorId: authorId},
        select: {
            title: true,
            description: true,
            technologies_used: true,
            link: true,
            demo_link: true,
            id: true
        }
    })
    return projects as ProjectType[];
}
export const addProject = async () => {
    const session = await getServerSession(authConfig);
    if(!session)return {status: 'error', message: 'Произошла ошибка, обновите страницу!'};
    const project = await prisma.project.create({
        data: {
            author: {connect: {id: session.user.id}}
        }
    })
    revalidatePath(`/profiles/${session.user.id}/settings`)
    return project as ProjectType;
}
export const saveProject = async (project: ProjectType) => {
    const session = await getServerSession(authConfig);
    if(!session)return {status: 'error', message: 'Произошла ошибка, обновите страницу!'};
    await prisma.project.update({
        where: {id: project.id},
        data: {
            title: project.title || null,
            description: project.description || null,
            technologies_used: project.technologies_used || null,
            link: project.link || null,
            demo_link: project.demo_link || null
        }
    })
    revalidatePath(`/profiles/${session.user.id}/settings`)
}
export const deleteProject = async (idProject: string) => {
    const session = await getServerSession(authConfig);
    if(!session)return {status: 'error', message: 'Произошла ошибка, обновите страницу!'};
    await prisma.project.delete({
        where: {id: idProject, authorId: session.user.id}
    })
    revalidatePath(`/profiles/${session.user.id}/settings`)
}
export const getContacts = async (userId: string) => {
    const contacts = await prisma.contact.findMany({
        where: {authorId: userId}
    })
    return contacts;
}
export const deleteContact = async (idContact: string) => {
    const session = await getServerSession(authConfig);
    if(!session)return {status: 'error', message: 'Произошла ошибка, обновите страницу!'};
    await prisma.contact.delete({
        where: {id: idContact, authorId: session.user.id}
    })
    revalidatePath(`/profiles/${session.user.id}/settings`)
}
export const saveContact = async (contact: Contact) => {
    const session = await getServerSession(authConfig);
    if(!session)return {status: 'error', message: 'Произошла ошибка, обновите страницу!'};
    if(contact.id) {
        await prisma.contact.update({
            where: {id: contact.id, authorId: session.user.id},
            data: {
                name: contact.name,
                url: contact.url
            }
        })
    }else {
        await prisma.contact.create({
            data: {
                name: contact.name,
                url: contact.url,
                author: {connect: {id: session.user.id}}
            }
        })
    }
    return {status: 'success', message: 'Сохранено!'};
}

