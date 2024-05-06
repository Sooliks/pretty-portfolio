'use client'
import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {Button} from "@nextui-org/react";
import {signIn} from "next-auth/react";
import InputForm from "@/components/ui/InputForm";
import {useRouter} from "next/navigation";
type LoginValues = {
    email: string
    password: string
}
const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors}
    } = useForm<LoginValues>({mode: 'onChange'});
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const {replace} = useRouter();
    const onSubmit: SubmitHandler<LoginValues> = async (data) => {
        setIsLoading(true)
        const res = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        })
        if(res && !res.error){
            replace('/admin')
        }else {
            alert('неверный емаил или пароль');
            setIsLoading(false)
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"w-3/5"}>
            <InputForm
                error={errors.email?.message}
                type={"email"}
                placeholder={'email'}
                form={{
                    ...register('email', {
                        required: 'required'
                    })
                }}
            />
            <InputForm
                error={errors.password?.message}
                type={"password"}
                placeholder={'password'}
                form={{
                    ...register('password', {
                        required: 'required'
                    })
                }}
            />
            <Button className={"mt-2"} color={"primary"} type={'submit'} isLoading={isLoading}>{'Войти'}</Button>
        </form>
    );
};
export default LoginPage;