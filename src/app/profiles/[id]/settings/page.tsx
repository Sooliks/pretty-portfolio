import React from 'react';
import {getServerSession} from "next-auth";
import BaseSettings from "@/app/profiles/[id]/settings/BaseSettings";
import NotFound from "@/app/not-found";


type SettingsPageProps = {
    params: {
        id: string
    }
}
const SettingsPage = async ({params}:SettingsPageProps) => {
    const session = await getServerSession();
    if(!session || !session.user)return <NotFound/>;
    if(session.user.id !== params.id)return <NotFound/>;
    return (
        <div>
            настройки {params.id}
            <BaseSettings id={session.user.id}/>
        </div>
    );
};

export default SettingsPage;