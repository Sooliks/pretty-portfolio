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
export async function generateMetadata({params: {id}}: {params: { id: string }}): Promise<Metadata>{
    return {
        title: `Pretty Portfolio`,
        description: 'Профиль пользователя',
        robots: 'all',
        keywords: [id, 'профиль','пользователь']
    }
}
const ProfileLayout = async ({params, children}: ProfileLayoutProps) => {
    const baseInfo = await getBaseInfo(params.id);
    return (
        <div className={'flex flex-row p-4 w-screen h-full flex-wrap'}>
            <MenuProfile baseInfo={baseInfo} id={params.id}/>
            {children}
        </div>
    );
};

export default ProfileLayout;