import React from 'react';
import {getPreviewsPortfolio} from "@/server-actions/profiles";
import PreviewPortfolio from "@/components/PreviewPortfolio";
import {Metadata} from "next";
export const revalidate = 40;
export const metadata: Metadata = {
    title: "Pretty Portfolio - Студенты",
    description: "Site for your portfolio",
};
const ProfilesPage = async () => {
    const previews = await getPreviewsPortfolio();
    return (
        <div className={'flex flex-row p-4 flex-wrap'}>
            {previews.length > 0 ? previews.map((preview: any)=> {
                if(!preview.description || !preview.id || !preview.birthDay)return;

                return <PreviewPortfolio name={preview.name || "Без имени"} surname={preview.surname || ""} key={preview.id} description={preview.description} id={preview.id} birthDay={preview.birthDay}/>
            })
                :
                <p>Не одного портфолио пока нету</p>
            }
        </div>
    );
};

export default ProfilesPage;