"use client"
import React, {useEffect, useState} from 'react';
import {useSession} from "next-auth/react";
import SpinLoading from "@/components/SpinLoading";
type LoaderProviderProps = {
    children: React.ReactNode
}
const LoaderProvider: React.FC<LoaderProviderProps> = ({children}) => {
    const session = useSession()
    const [loading,setLoading] = useState<boolean>(true)
    useEffect(()=>{
        if(session.status === 'loading'){
            setLoading(true)
        }else {
            setLoading(false)
        }
    },[session])
    return (
        <>
            {session.status === "loading" || loading ?
                <div className={'w-screen h-screen flex flex-row justify-center items-center'}>
                    <SpinLoading/>
                </div>
                :
                children
            }
        </>
    );
    
};

export default LoaderProvider;