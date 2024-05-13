'use client'
import React, {useState} from 'react';
import {Accordion, AccordionItem, Button, Card} from "@nextui-org/react";
import {ProjectType} from "@/types/project";
import ProjectItem from "@/components/ProjectItem";
import {addProject} from "@/server-actions/profiles";
const Projects = ({projects}:{projects: ProjectType[]}) => {
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const handleAdd = () => {
        setIsLoading(true)
        addProject().then(data=>{

        }).finally(()=>setIsLoading(false))
    }
    return (
        <Card className={'flex flex-col p-4 mr-4 min-w-[280px] mb-4'}>
            <h2>Проекты</h2>
            <Accordion>
                {projects.map((project, index)=>
                    <AccordionItem key={index} aria-label={`Проект ${index + 1}`} title={`Проект ${index + 1}`}>
                        <Card>
                            <ProjectItem _project={project}/>
                        </Card>
                    </AccordionItem>
                )}
            </Accordion>
            <Button isLoading={isLoading} className={'mt-2'} onClick={handleAdd}>Добавить</Button>
        </Card>
    );
};

export default Projects;