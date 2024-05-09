'use client'
import React, {useState} from 'react';
import {saveBaseInfo} from "@/server-actions/profiles";
import {BaseInfo} from "@/types/base-info";
import {Button, Card, DateInput, Input} from "@nextui-org/react";
import {parseDate} from "@internationalized/date";

const BaseSettings = ({_baseInfo}:{_baseInfo: BaseInfo}) => {
    const [baseInfo,setBaseInfo] = useState<BaseInfo>(_baseInfo);
    const [withoutEditBaseInfo,setWithoutEditBaseInfo] = useState<BaseInfo>(baseInfo);
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const handleSave = () => {
        setIsLoading(true);
        if(baseInfo)
        saveBaseInfo(baseInfo).then(data=>{

        }).finally(()=>setIsLoading(false))
    }
    function convertToDateValue(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Добавляем ведущий ноль, если месяц < 10
        const day = date.getDate().toString().padStart(2, '0'); // Добавляем ведущий ноль, если день < 10
        return `${year}-${month}-${day}`;
    }
    if(!baseInfo)return;
    return (
        <Card className={'flex flex-col p-4 mr-4 w-[280px] mb-4'}>
            <h2>Основная информация</h2>
            <Input className={'mt-2'} label={'Фамилия'} value={baseInfo?.surname || ""} onChange={(e)=>setBaseInfo({...baseInfo, surname: e.target.value})}/>
            <Input className={'mt-2'} label={'Имя'} value={baseInfo?.name || ""} onChange={(e)=>setBaseInfo({...baseInfo, name: e.target.value})}/>
            <Input className={'mt-2'} label={'Отчество'} value={baseInfo?.patronymic || ""} onChange={(e)=>setBaseInfo({...baseInfo, patronymic: e.target.value})}/>
            <Input className={'mt-2'} label={'Описание'} value={baseInfo?.description || ""} onChange={(e)=>setBaseInfo({...baseInfo, description: e.target.value})}/>
            <DateInput
                onChange={(e)=>setBaseInfo({...baseInfo, birthDay: new Date(e.toDate(Intl.DateTimeFormat().resolvedOptions().timeZone))})}
                label={"Дата рождения"}
                className="max-w-sm mt-2"
                defaultValue={parseDate(convertToDateValue(_baseInfo.birthDay || new Date()))}
            />
            <Button
                isLoading={isLoading}
                className={'mt-2'}
                isDisabled={JSON.stringify(baseInfo) === JSON.stringify(withoutEditBaseInfo)}
                onClick={handleSave}
            >
                Сохранить
            </Button>
        </Card>
    );
};

export default BaseSettings;