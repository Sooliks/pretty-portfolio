import React from 'react';
import {getBaseInfo, getEducations, getProjects} from "@/server-actions/profiles";
import {Textarea} from "@nextui-org/input";
import {Card, Divider} from "@nextui-org/react";


type ProfilePageProps = {
    params: {
        id: string
    }
}
const ProfilePage = async ({params} : ProfilePageProps) => {
    const baseInfo = await getBaseInfo(params.id);
    const educations = await getEducations(params.id);
    const projects = await getProjects(params.id);
    if(!baseInfo){
        return <p>Это портфолио не готово</p>
    }
    return (
        <div className={'flex flex-row flex-wrap'}>
            <Card className={'p-4'}>
                <h2>Образования</h2>
                <Divider className={'my-4'}/>
                <div className={'flex flex-row'}>
                    {educations.length > 0 ? educations.map(education =>
                        <Textarea
                            key={education.id}
                            isReadOnly
                            label={education.institution}
                            variant="bordered"
                            labelPlacement="outside"
                            className="max-w-xs w-96"
                            defaultValue={
                                "Степень " + education.degree + " \n" +
                                "Специализация " + education.major + " \n" +
                                "Дата поступления " + education.start_date + " \n" +
                                "Дата окончания " + education.start_date + " \n"
                            }
                        />
                    )
                        :
                        <p className={'text-small'}>Образований пока нет</p>
                    }
                </div>
            </Card>
            <Card className={'p-4 ml-2'}>
                <h2>Основная информация</h2>
                <Divider className={'my-4'}/>
                <Textarea
                    isReadOnly
                    variant="bordered"
                    labelPlacement="outside"
                    className="max-w-xs w-96"
                    defaultValue={
                        "Имя: " + baseInfo.name + " \n" +
                        "Фамилия: " + baseInfo.surname + " \n" +
                        "Отчество: " + baseInfo.patronymic + " \n" +
                        "Дата рождения: " + baseInfo.birthDay?.toLocaleDateString() + " \n" +
                        "Описание: " + baseInfo.description + " \n"
                    }
                />
            </Card>
        </div>
    );
};

export default ProfilePage;