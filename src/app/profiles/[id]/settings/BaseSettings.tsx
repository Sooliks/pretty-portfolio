'use client'
import React, {useEffect, useState} from 'react';
import {getBaseInfo, saveBaseInfo} from "@/server-actions/profiles";
import {BaseInfo} from "@/types/base-info";
import {Button, Card, DateInput, Input} from "@nextui-org/react";

const BaseSettings = ({id}:{id: string}) => {
    const [baseInfo,setBaseInfo] = useState<BaseInfo>();
    const [withoutEditBaseInfo,setWithoutEditBaseInfo] = useState<BaseInfo>();
    const [isLoading,setIsLoading] = useState<boolean>(false);
    useEffect(()=>{
        getBaseInfo(id).then(data=>{
            setBaseInfo(data)
            setWithoutEditBaseInfo(data);
        });
    },[])
    const handleSave = () => {
        setIsLoading(true);
        if(baseInfo)
        saveBaseInfo(baseInfo).then(data=>{

        }).finally(()=>setIsLoading(false))
    }
    if(!baseInfo)return;

    return (
        <Card className={'flex flex-col p-4 mr-4'}>
            <h2>Основная информация</h2>
            <Input className={'mt-2'} label={'Фамилия'} value={baseInfo?.surname || ""} onChange={(e)=>setBaseInfo({...baseInfo, surname: e.target.value})}/>
            <Input className={'mt-2'} label={'Имя'} value={baseInfo?.name || ""} onChange={(e)=>setBaseInfo({...baseInfo, name: e.target.value})}/>
            <Input className={'mt-2'} label={'Отчество'} value={baseInfo?.patronymic || ""} onChange={(e)=>setBaseInfo({...baseInfo, patronymic: e.target.value})}/>
            <Input className={'mt-2'} label={'Описание'} value={baseInfo?.description || ""} onChange={(e)=>setBaseInfo({...baseInfo, description: e.target.value})}/>
            <DateInput
                onChange={(e)=>setBaseInfo({...baseInfo, birthDay: new Date(e.toDate(Intl.DateTimeFormat().resolvedOptions().timeZone))})}
                label={"Дата рождения"}
                className="max-w-sm mt-2"
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