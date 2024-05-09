'use client'
import React, {useState} from 'react';
import {ProjectType} from "@/types/project";
import {Button, Input} from "@nextui-org/react";
import {deleteProject, saveProject} from "@/server-actions/profiles";
const ProjectItem = ({_project}:{_project: ProjectType | undefined}) => {
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [isLoadingDelete,setIsLoadingDelete] = useState<boolean>(false);
    const [project,setProject] = useState<ProjectType>(_project || {
        title: "",
        description: "",
        technologies_used: "",
        link: "",
        demo_link: "",
        id: ""
    });
    const handleSave = () => {
        setIsLoading(true);
        saveProject(project).then(data=>{

        }).finally(()=>setIsLoading(false))
    }
    const handleDelete = () => {
        if(!project.id)return
        setIsLoadingDelete(true);
        deleteProject(project.id).then(data=>{

        }).finally(()=>setIsLoadingDelete(false))
    }
    return (
        <div className={'flex flex-col px-2 py-6'}>
            <div className={'flex flex-row items-start'}>
                <Input placeholder={'Название'} value={project.title || ""} onChange={(e)=>setProject({...project, title: e.target.value})}/>
                <Input className={'ml-2'} label={'Описание'} value={project?.description || ""} onChange={(e)=>setProject({...project, description: e.target.value})}/>
                <Input className={'ml-2'} label={'Использованные технологии'} value={project?.technologies_used || ""} onChange={(e)=>setProject({...project, technologies_used: e.target.value})}/>
                <Input type={'url'} className={'ml-2'} label={'Ссылка на исходный материал'} value={project?.link || ""} onChange={(e)=>setProject({...project, link: e.target.value})}/>
                <Input type={'url'} className={'ml-2'} label={'Ссылка на демонстрационную версию'} value={project?.demo_link || ""} onChange={(e)=>setProject({...project, demo_link: e.target.value})}/>
            </div>
            <div className={'flex flex-row mt-2'}>
                <Button isLoading={isLoading} onClick={handleSave}>Сохранить</Button>
                <Button isLoading={isLoadingDelete} onClick={handleDelete} className={'ml-2'} color={"danger"}>Удалить</Button>
            </div>
        </div>
    );
};

export default ProjectItem;