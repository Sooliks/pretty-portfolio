import React from 'react';
import {getBaseInfo} from "@/server-actions/profiles";
import {Textarea} from "@nextui-org/input";


type ProfilePageProps = {
    params: {
        id: string
    }
}
const ProfilePage = async ({params} : ProfilePageProps) => {
    const baseInfo = await getBaseInfo(params.id);
    if(!baseInfo){
        return <p>Это портфолио не готово</p>
    }
    return (
        <div>
            портфолио {params.id}
            <Textarea
                isReadOnly
                label="Описание"
                variant="bordered"
                labelPlacement="outside"
                className="max-w-xs"
                defaultValue={baseInfo.description || ""}
            />
        </div>
    );
};

export default ProfilePage;