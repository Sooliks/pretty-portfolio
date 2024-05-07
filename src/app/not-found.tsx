"use client"
import React from 'react';
import {useRouter} from "next/navigation";
import {Button} from "@nextui-org/react";
const NotFound: React.FC = () => {
    const {back} = useRouter();
    return (
        <div className={'h-full w-full flex flex-row items-center justify-center mt-[20%]'}>
            <h1>
                Страница не найдена <Button style={{marginLeft: 10}} onClick={()=>back()}>Назад</Button>
            </h1>
        </div>
    );
};
export default NotFound;