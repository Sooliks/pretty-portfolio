'use client'
import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {Button, Input} from "@nextui-org/react";
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
            replace('/')
        }else {
            alert('неверный емаил или пароль');
            setIsLoading(false)
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"w-3/5"}>
            <Input
                isInvalid={!!errors.email?.message}
                errorMessage={errors.email?.message}
                type={"email"}
                placeholder={'Email'}
                {...register('email', {
                    required: 'Пожалуйста введите email',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Введите корректный email'
                    }
                })}
                className={'mt-4'}
            />
            <Input
                isInvalid={!!errors.password?.message}
                errorMessage={errors.password?.message}
                type={"password"}
                placeholder={'Пароль'}
                {...register('password', {
                    required: 'Пожалуйста введите пароль'
                })}
                className={'mt-4'}
            />
            <Button className={"mt-4"} color={"primary"} type={'submit'} isLoading={isLoading}>{'Войти'}</Button>
        </form>
    );
};
export default LoginPage;