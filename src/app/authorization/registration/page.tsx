'use client'
import React, {useState} from 'react';
import InputForm from "@/components/ui/InputForm";
import {Button} from "@nextui-org/react";
import {SubmitHandler, useForm} from "react-hook-form";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {signUp} from "@/server-actions/authorization";

type RegisterValues = {
    email: string
    password: string
    secondPassword: string
    login: string
}
const RegistrationPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<RegisterValues>({mode: 'onChange'});
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const {replace} = useRouter();
    const onSubmit: SubmitHandler<RegisterValues> = async (data: any) => {
        setIsLoading(true)
        const res = await signUp(data.login, data.email, data.password);
        if(res.status === "success"){
            const r = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false
            })
            if(r && !r.error){
                replace('/')
            }
        }else {
            alert(res.message);
            setIsLoading(false)
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"w-3/5"}>
            <InputForm
                error={errors.email?.message}
                type={"email"}
                placeholder={'Email'}
                form={{
                    ...register('email', {
                        required: 'Required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid'
                        }
                    })
                }}
            />
            <InputForm
                error={errors.login?.message}
                type={"login"}
                placeholder={'login'}
                form={{
                    ...register('login', {
                        required: 'required',
                        pattern: {
                            value: /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,19}$/,
                            message: 'invalid'
                        }
                    })
                }}
            />
            <InputForm
                error={errors.password?.message}
                type={"password"}
                placeholder={'password'}
                form={{
                    ...register('password', {
                        required: 'required',
                        validate: () => {
                            if (watch('password').length <= 8) {
                                return 'watch(\'password\').length <= 8';
                            }
                        }
                    })
                }}
            />
            <InputForm
                error={errors.secondPassword?.message}
                type={"password"}
                placeholder={'secondPassword'}
                form={{
                    ...register('secondPassword', {
                        required: 'required',
                        validate: (value: string) => {
                            if (watch('password') !== value) {
                                return 'не совпадает';
                            }
                        }
                    })
                }}
            />
            <Button className={"mt-2"} color={"primary"} type={'submit'} isLoading={isLoading}>{'Зарегистрироваться'}</Button>
        </form>
    );
};

export default RegistrationPage;