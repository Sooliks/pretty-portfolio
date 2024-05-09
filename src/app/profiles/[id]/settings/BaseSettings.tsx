'use client'

import React, {useEffect, useState} from 'react';
import {getBaseInfo, saveBaseInfo} from "@/server-actions/profiles";
import {BaseInfo} from "@/types/base-info";
import {Button, CalendarDate, Card, DateInput, Input} from "@nextui-org/react";


const BaseSettings = ({id}:{id: string}) => {
    const [baseInfo,setBaseInfo] = useState<BaseInfo>();
    const [withoutEditBaseInfo,setWithoutEditBaseInfo] = useState<BaseInfo>();
    useEffect(()=>{
        getBaseInfo(id).then(data=>{
            setBaseInfo(data)
            setWithoutEditBaseInfo(data);
        });
    },[id])
    const handleSave = () => {
        if(baseInfo)
        saveBaseInfo(baseInfo).then(data=>{

        })
    }
    if(!baseInfo)return;
    return (
        <Card className={'flex flex-col p-4'}>
            <Input label={'Имя'} value={baseInfo?.name || ""} onChange={(e)=>setBaseInfo({...baseInfo, name: e.target.value})}/>
            <Input label={'Фамилия'} value={baseInfo?.surname || ""} onChange={(e)=>setBaseInfo({...baseInfo, surname: e.target.value})}/>
            <Input label={'Отчество'} value={baseInfo?.patronymic || ""} onChange={(e)=>setBaseInfo({...baseInfo, patronymic: e.target.value})}/>
            <Input label={'Описание'} value={baseInfo?.description || ""} onChange={(e)=>setBaseInfo({...baseInfo, description: e.target.value})}/>
            <DateInput
                onChange={(e)=>setBaseInfo({...baseInfo, birthDay: e.toDate('Europe/Moscow')})}
                label={"Дата рождения"}
                placeholderValue={new CalendarDate(1995, 11, 6)}
                className="max-w-sm"
            />
            <Button isDisabled={JSON.stringify(baseInfo) === JSON.stringify(withoutEditBaseInfo)} onClick={handleSave}>Сохранить</Button>
        </Card>
    );
};

export default BaseSettings;