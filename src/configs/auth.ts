import type {AuthOptions} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/configs/prisma";
import * as argon2 from "argon2";
import {User} from "@prisma/client";

export const authConfig: AuthOptions = {
    providers: [
        Credentials({
            credentials: {
                email: {label: 'email', type: 'email', required: true},
                password: {label: 'password', type: 'password', required: true}
            },
            async authorize(credentials, callback) {
                if(!credentials?.email || !credentials.password) return null;
                const searchedUser = await prisma.user.findFirst({
                    where: {email: credentials.email}
                });
                if(!searchedUser)return null;
                const isVerify = await argon2.verify(searchedUser.password, credentials.password)
                if(!isVerify){
                    return null;
                }
                const {password, ...userWithoutPass} = searchedUser;
                return userWithoutPass as User;
            }
        })
    ],
    pages: {
        signIn: '/authorization'
    },
    callbacks: {
        async jwt({ token, user, account }) {
            return {...token, ...user}
        },
        async session({ session, token, user }) {
            session.user = token as User;
            return session
        }
    }
}