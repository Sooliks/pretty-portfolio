'use server'
import * as argon2 from "argon2";
import prisma from "@/configs/prisma";
import {User} from "@prisma/client";
import {redirect} from "next/navigation";

export const signUp = async (_login: string, _email: string, _password: string) => {
    let searchedUser = await prisma.user.findFirst({
        where: {
            email: {
                contains: _email,
                mode: 'insensitive'
            }
        }
    });
    if(searchedUser) return {
        status: 'error',
        message: 'Аккаунт с таким email уже существует!'
    }
    searchedUser = await prisma.user.findFirst({
        where: {
            login: {
                contains: _login,
                mode: 'insensitive'
            }
        }
    });
    if(searchedUser) return {
        status: 'error',
        message: 'Аккаунт с таким логином уже существует!'
    }
    const user = await prisma.user.create({
        data: {
            login: _login,
            email: _email.toLowerCase(),
            password: await argon2.hash(_password)
        }
    })
    redirect(`/profiles/${user.id}`)
    return {
        status: 'success'
    }
}