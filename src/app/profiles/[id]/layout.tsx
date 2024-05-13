import React from 'react';
import MenuProfile from "@/components/MenuProfile";
import {Metadata} from "next";
import {getBaseInfo} from "@/server-actions/profiles";
type ProfileLayoutProps = {
    params: {
        id: string
    }
    children: React.ReactNode
}
export async function generateMetadata({params: {id}}: {params: {id: string}}): Promise<Metadata>{
    const baseInfo = await getBaseInfo(id);
    return {
        title: `Pretty Portfolio - ${baseInfo.name} ${baseInfo.surname}`,
        description: `Профиль пользователя ${baseInfo.name} ${baseInfo.surname}`,
        robots: 'all',
        keywords: [id, 'профиль','пользователь', `${baseInfo.name}`, `${baseInfo.surname}`]
    }
}
export const revalidate = 40;
const ProfileLayout = async ({params, children}: ProfileLayoutProps) => {
    const baseInfo = await getBaseInfo(params.id);
    if(!baseInfo){
        return <p>Это портфолио не готово</p>
    }
    return (
        <div className={'flex flex-row p-4 w-screen h-full flex-wrap'}>
            <MenuProfile baseInfo={baseInfo} id={params.id}/>
            {children}
        </div>
    );
};

export default ProfileLayout;