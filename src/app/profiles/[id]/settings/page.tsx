import React from 'react';
import {getServerSession} from "next-auth";
import BaseSettings from "@/app/profiles/[id]/settings/BaseSettings";
import NotFound from "@/app/not-found";
import {authConfig} from "@/configs/auth";
import Education from "@/app/profiles/[id]/settings/Education";


type SettingsPageProps = {
    params: {
        id: string
    }
}
const SettingsPage = async ({params}:SettingsPageProps) => {
    const session = await getServerSession(authConfig);
    if(!session)return <NotFound/>;
    if(session.user.id !== params.id)return <NotFound/>;
    return (
        <div className={'flex flex-row'}>
            <BaseSettings id={session.user.id}/>
            <Education id={session.user.id}/>
        </div>
    );
};

export default SettingsPage;