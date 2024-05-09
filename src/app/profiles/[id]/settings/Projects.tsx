'use client'
import React from 'react';
import {Accordion, AccordionItem, Button, Card} from "@nextui-org/react";
import {ProjectType} from "@/types/project";
import ProjectItem from "@/components/ProjectItem";

const Projects = ({projects}:{projects: ProjectType[]}) => {
    const handleAdd = () => {

    }
    return (
        <Card className={'flex flex-col p-4 mr-4 w-[280px]'}>
            <h2>Проекты</h2>
            <Accordion>
                {projects.map((project, index)=>
                    <AccordionItem key={index} aria-label={`Проект ${index}`} title={`Проект ${index}`}>
                        <ProjectItem project={project}/>
                    </AccordionItem>
                )}
            </Accordion>
            <Button className={'mt-2'} onClick={handleAdd}>Добавить</Button>
        </Card>
    );
};

export default Projects;