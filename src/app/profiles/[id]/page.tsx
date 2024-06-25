import React from 'react';
import {getBaseInfo, getEducations, getProjects} from "@/server-actions/profiles";
import {Textarea} from "@nextui-org/input";
import {Card, Divider} from "@nextui-org/react";
import Project from "@/components/Project";
type ProfilePageProps = {
    params: {
        id: string
    }
}
export const revalidate = 20;
const ProfilePage = async ({params} : ProfilePageProps) => {
    const baseInfo = await getBaseInfo(params.id);
    const educations = await getEducations(params.id);
    const projects = await getProjects(params.id);
    function convertToDateValue(date?: Date | null): string {
        if(!date)return 'нету'
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Добавляем ведущий ноль, если месяц < 10
        const day = date.getDate().toString().padStart(2, '0'); // Добавляем ведущий ноль, если день < 10
        return `${day}.${month}.${year}`;
    }
    return (
        <div className={'flex flex-row flex-wrap'}>
            <Card className={'p-4 mr-2 max-sm:mt-4'}>
                <h2 className={'text-2xl'}>Основная информация</h2>
                <Divider className={'my-4'}/>
                <Textarea
                    isReadOnly
                    variant="bordered"
                    labelPlacement="outside"
                    defaultValue={
                        "Имя: " + `${baseInfo.name || 'не добавлено'}` + " \n" +
                        "Фамилия: " + `${baseInfo.surname || 'не добавлено'}` + " \n" +
                        "Отчество: " + `${baseInfo.patronymic || 'не добавлено'}` + " \n" +
                        "Дата рождения: " + `${convertToDateValue(baseInfo.birthDay) || 'не добавлено'}` + " \n" +
                        "Описание: " + `${baseInfo.description || 'не добавлено'}` + " \n"
                    }
                />
            </Card>
            <Card className={'p-4 mr-2 max-sm:mt-4'}>
                <h2 className={'text-2xl'}>Образования</h2>
                <Divider className={'my-4'}/>
                <div className={'flex flex-row flex-wrap'}>
                    {educations.length > 0 ? educations.map((education,index) =>
                        <Textarea
                            className={index > 0 ? 'mt-2' : undefined}
                            key={education.id}
                            isReadOnly
                            label={education.institution}
                            variant="bordered"
                            labelPlacement="outside"
                            defaultValue={
                                "Степень: " + `${education.degree || 'не указано'}` + " \n" +
                                "Специализация: " + `${education.major || 'не указано'}` + " \n" +
                                "Дата поступления: " + `${convertToDateValue(education?.start_date) || 'не указано'}` + " \n" +
                                "Дата окончания: " + `${convertToDateValue(education?.end_date) || 'не указано'}` + " \n"
                            }
                        />
                    )
                        :
                        <p className={'text-small'}>Образований пока нет</p>
                    }
                </div>
            </Card>
            <Card className={'p-4 max-sm:mt-4'}>
                <h2 className={'text-2xl'}>Проекты</h2>
                <Divider className={'my-4'}/>
                <div className={'flex flex-row flex-wrap'}>
                    {projects.length > 0 ? projects.map(project =>
                            <Project key={project.id} project={project}/>
                        )
                        :
                        <p className={'text-small'}>Проектов пока нет</p>
                    }
                </div>
            </Card>
        </div>
    );
};

export default ProfilePage;