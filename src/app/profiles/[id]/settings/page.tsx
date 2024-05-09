import React from 'react';
import {getServerSession} from "next-auth";


type SettingsPageProps = {
    params: {
        id: string
    }
}
const SettingsPage = async ({params}:SettingsPageProps) => {
    const session = await getServerSession();
    if(!session || !session.user)return;
    if(session.user.id !== params.id)return;
    return (
        <div>
            настройки {params.id}
        </div>
    );
};

export default SettingsPage;