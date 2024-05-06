"use client"
import React from 'react';
import {InputProps} from "@nextui-org/input";
import {Input} from "@nextui-org/react";
interface IInputFormProps extends InputProps {
    error?: string
    form: any
}

const InputForm: React.FC<IInputFormProps> = (props) => {
    return (
        <>
            <Input className={"mt-2"} {...props} {...props.form}/>
            <p className={"text-danger h-5"}>{props.error}</p>
        </>
    );
};

export default InputForm;