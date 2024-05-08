import React, {Suspense} from 'react';
import {Button, Card} from "@nextui-org/react";
import Link from "next/link";
import SpinLoading from "@/components/SpinLoading";
import {getServerSession} from "next-auth";
import {permanentRedirect} from "next/navigation";
import {Metadata} from "next";
export const metadata: Metadata = {
    robots: 'noindex, nofollow'
}
const AuthorizationLayout = async ({children} : {children: React.ReactNode}) => {
    const session = await getServerSession()
    if(session){
        permanentRedirect(`/`)
    }
    return (
        <div className={"w-full flex items-center justify-center flex-col mt-[10%]"}>
            <Card className={"max-sm:w-full flex flex-row p-2 w-2/5 justify-center"}>
                <Link href={'/authorization'}>
                    <Button className={"mx-4"}>{'Войти'}</Button>
                </Link>
                <Link href={'/authorization/registration'}>
                    <Button className={"mx-4"}>{'Регистрация'}</Button>
                </Link>
            </Card>
            <Card className={"max-sm:w-full w-2/5 h-96 mt-2 flex flex-row justify-center items-start p-4"}>
                <Suspense fallback={<SpinLoading/>}>
                    {children}
                </Suspense>
            </Card>
        </div>
    );
};

export default AuthorizationLayout;