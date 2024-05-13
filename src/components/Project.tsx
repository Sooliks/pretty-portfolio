import React from 'react';
import {ProjectType} from "@/types/project";
import {Card, Divider} from "@nextui-org/react";
import {Textarea} from "@nextui-org/input";
import {Chip} from "@nextui-org/chip";
import Link from "next/link";
const Project = ({project}:{project: ProjectType}) => {
    const technologies_used = project.technologies_used.split(',');
    return (
        <Card className={'p-4 flex flex-col max-w-96'}>
            <h2>{project.title}</h2>
            <Divider/>
            <Textarea
                isReadOnly
                label={'Описание'}
                variant="bordered"
                labelPlacement="outside"
                defaultValue={project.description}
            />
            <p className={'mt-2 flex flex-row flex-wrap'}>Использованные технологии: {technologies_used.map(tech=><Chip size={'sm'} className={'ml-1'} key={tech}>{tech}</Chip>)}</p>
            <Link target={'_blank'} className={'text-small text-blue-600 mt-2'} href={project.link}>Исходный материал</Link>
            <Link target={'_blank'} className={'text-small text-blue-600 mt-2'} href={project.demo_link}>Демонстрационная версия</Link>
        </Card>
    );
};

export default Project;