import React from 'react';
import {getServerSession} from "next-auth";
import BaseSettings from "@/app/profiles/[id]/settings/BaseSettings";
import NotFound from "@/app/not-found";
import {authConfig} from "@/configs/auth";
import Education from "@/app/profiles/[id]/settings/Education";
import {getBaseInfo, getContacts, getEducations, getProjects} from "@/server-actions/profiles";
import Projects from "@/app/profiles/[id]/settings/Projects";
import UploadAvatar from "@/app/profiles/[id]/settings/UploadAvatar";
import Contacts from "@/app/profiles/[id]/settings/Contacts";


type SettingsPageProps = {
    params: {
        id: string
    }
}
const SettingsPage = async ({params}:SettingsPageProps) => {
    const session = await getServerSession(authConfig);
    if(!session)return <NotFound/>;
    if(session.user.id !== params.id)return <NotFound/>;
    const educations = await getEducations(params.id);
    const baseInfo = await getBaseInfo(params.id);
    const projects = await getProjects(params.id);
    const contacts = await getContacts(params.id);
    return (
        <div className={'flex flex-row flex-wrap'}>
            <BaseSettings _baseInfo={baseInfo}/>
            <Education educations={educations}/>
            <Projects projects={projects}/>
            <UploadAvatar/>
            <Contacts _contacts={contacts}/>
        </div>
    );
};

export default SettingsPage;