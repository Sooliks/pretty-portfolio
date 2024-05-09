import React from 'react';
import {getServerSession} from "next-auth";
import BaseSettings from "@/app/profiles/[id]/settings/BaseSettings";
import NotFound from "@/app/not-found";
import {authConfig} from "@/configs/auth";
import Education from "@/app/profiles/[id]/settings/Education";
import {getBaseInfo, getEducations, getProjects} from "@/server-actions/profiles";
import Projects from "@/app/profiles/[id]/settings/Projects";


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
    return (
        <div className={'flex flex-row'}>
            <BaseSettings _baseInfo={baseInfo}/>
            <Education educations={educations}/>
            <Projects projects={projects}/>
        </div>
    );
};

export default SettingsPage;