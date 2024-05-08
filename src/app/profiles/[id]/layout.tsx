import React from 'react';
import MenuProfile from "@/components/MenuProfile";
import {Metadata} from "next";

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
const ProfileLayout = ({params, children}: ProfileLayoutProps) => {
    return (
        <div className={'flex flex-row p-4 w-screen h-full'}>
            <MenuProfile id={params.id}/>
            {children}
        </div>
    );
};

export default ProfileLayout;