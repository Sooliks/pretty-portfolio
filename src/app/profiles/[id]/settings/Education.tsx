'use client'
import React, {useState} from 'react';
import {Accordion, AccordionItem, Card} from "@nextui-org/react";
import EducationItem from "@/components/EducationItem";
import {EducationType} from "@/types/education";
const Education = ({educations}:{educations: EducationType[]}) => {
    return (
        <Card className={'flex flex-col p-4 mr-4 w-[280px] mb-4'}>
            <h2>Образования</h2>
            <Accordion>
                <AccordionItem key="1" aria-label="Образование 1" title="Образование 1">
                    <EducationItem _education={educations[0] || undefined}/>
                </AccordionItem>
                <AccordionItem key="2" aria-label="Образование 2" title="Образование 2">
                    <EducationItem _education={educations[1] || undefined}/>
                </AccordionItem>
                <AccordionItem key="3" aria-label="Образование 3" title="Образование 3">
                    <EducationItem _education={educations[2] || undefined}/>
                </AccordionItem>
            </Accordion>
        </Card>
    );
};

export default Education;