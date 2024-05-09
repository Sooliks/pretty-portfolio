'use client'
import React, {useState} from 'react';
import {Button, DateInput, DatePicker, Input} from "@nextui-org/react";
import {Education} from ".prisma/client";
import {EducationType} from "@/types/education";
import {saveEducation} from "@/server-actions/profiles";
import {CalendarDateTime} from "@internationalized/date";


const EducationItem = ({_education}:{_education: EducationType | undefined}) => {
    const [isLoading,setIsLoading] = useState(false);
    const [education,setEducation] = useState<EducationType>(_education || {
        institution: "",
        degree: "",
        major: "",
        start_date: new Date(),
        end_date: new Date(),
        id: undefined
    });
    const handleSave = () => {
        setIsLoading(true);
        saveEducation(education).then(data=>{

        }).finally(()=>setIsLoading(false))
    }
    return (
        <div>
            <Input label={'Колледж / Институт'} value={education?.institution || ""} onChange={(e)=>setEducation({...education, institution: e.target.value})}/>
            <Input className={'mt-2'} label={'Степень (бакалавр, магистр и т.д.)'} value={education?.degree || ""} onChange={(e)=>setEducation({...education, degree: e.target.value})}/>
            <Input className={'mt-2'} label={'Специализация / специальность'} value={education?.major || ""} onChange={(e)=>setEducation({...education, major: e.target.value})}/>
            <DatePicker onChange={(e)=>setEducation({...education, start_date: new Date(e.toDate(Intl.DateTimeFormat().resolvedOptions().timeZone))})} label="Дата начала обучения" className="max-w-[284px] mt-2" />
            <DatePicker onChange={(e)=>setEducation({...education, end_date: new Date(e.toDate(Intl.DateTimeFormat().resolvedOptions().timeZone))})} label="Дата окончания обучения" className="max-w-[284px] mt-2" />
            <Button
                isLoading={isLoading}
                className={'mt-2'}
                isDisabled={JSON.stringify(education) === JSON.stringify(_education)}
                onClick={handleSave}
            >
                Сохранить
            </Button>
        </div>
    );
};

export default EducationItem;