'use client'
import React, {useState} from 'react';
import {Button, DatePicker, Input} from "@nextui-org/react";
import {EducationType} from "@/types/education";
import {saveEducation} from "@/server-actions/profiles";
import {parseDate} from "@internationalized/date";
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
    function convertToDateValue(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth()).toString().padStart(2, '0'); // Добавляем ведущий ноль, если месяц < 10
        const day = date.getDate().toString().padStart(2, '0'); // Добавляем ведущий ноль, если день < 10
        return `${year}-${month}-${day}`;
    }
    return (
        <div>
            <Input label={'Колледж / Институт'} value={education?.institution || ""} onChange={(e)=>setEducation({...education, institution: e.target.value})}/>
            <Input className={'mt-2'} label={'Степень (бакалавр, магистр и т.д.)'} value={education?.degree || ""} onChange={(e)=>setEducation({...education, degree: e.target.value})}/>
            <Input className={'mt-2'} label={'Специализация / специальность'} value={education?.major || ""} onChange={(e)=>setEducation({...education, major: e.target.value})}/>
            <DatePicker defaultValue={parseDate(convertToDateValue(_education?.start_date || new Date()))} onChange={(e)=>setEducation({...education, start_date: new Date(e.toDate(Intl.DateTimeFormat().resolvedOptions().timeZone))})} label="Дата начала обучения" className="max-w-[284px] mt-2" />
            <DatePicker defaultValue={parseDate(convertToDateValue(_education?.end_date || new Date()))} onChange={(e)=>setEducation({...education, end_date: new Date(e.toDate(Intl.DateTimeFormat().resolvedOptions().timeZone))})} label="Дата окончания обучения" className="max-w-[284px] mt-2" />
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