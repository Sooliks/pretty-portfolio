'use client'
import React, {useEffect, useState} from 'react';
import {Accordion, AccordionItem, Card} from "@nextui-org/react";
import {getEducations} from "@/server-actions/profiles";
import EducationItem from "@/components/EducationItem";
import {EducationType} from "@/types/education";
const Education = ({id}:{id: string}) => {
    const [education,setEducation] = useState<EducationType[]>([]);
    const [withoutEditEducation,setWithoutEditEducation] = useState<EducationType[]>([]);
    const [isLoading,setIsLoading] = useState<boolean>(false);
    useEffect(()=>{
        getEducations(id).then(data=>{
            if(!data)return;
            setEducation(data)
            setWithoutEditEducation(data);
        });
    },[])
    return (
        <Card className={'flex flex-col px-4 mr-4'}>
            <Accordion>
                <AccordionItem key="1" aria-label="Образование 1" title="Образование 1">
                    <EducationItem _education={education[0] || undefined}/>
                </AccordionItem>
                <AccordionItem key="2" aria-label="Образование 2" title="Образование 2">
                    <EducationItem _education={education[1] || undefined}/>
                </AccordionItem>
                <AccordionItem key="3" aria-label="Образование 3" title="Образование 3">
                    <EducationItem _education={education[2] || undefined}/>
                </AccordionItem>
            </Accordion>
        </Card>
    );
};

export default Education;