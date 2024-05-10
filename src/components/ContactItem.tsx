'use client'
import React, {useState} from 'react';
import {Contact} from ".prisma/client";
import {Button, Input} from "@nextui-org/react";
import {deleteContact, saveContact} from "@/server-actions/profiles";


const ContactItem = ({_contact, onDelete}:{_contact: Contact, onDelete: () => void}) => {
    const [contact,setContact] = useState(_contact);
    const [isLoadingSave,setIsLoadingSave] = useState<boolean>(false);
    const [isLoadingDelete,setIsLoadingDelete] = useState<boolean>(false);
    const handleSave = () => {
        setIsLoadingSave(true);
        saveContact(contact).then(data=>{

        }).finally(()=>setIsLoadingSave(false))
    }
    const handleDelete = () => {
        if(!contact.id){
            onDelete()
            return
        }
        setIsLoadingDelete(true);
        deleteContact(contact.id).then(data=>{

        }).finally(()=>setIsLoadingDelete(false))
    }
    return (
        <div className={'flex flex-row mt-2 border-1 border-gray-800 rounded-md p-2'}>
            <Input
                label={'Название'}
                placeholder={'Введите название'}
                value={contact.name}
                onChange={(e)=>setContact({...contact, name: e.target.value})}
            />
            <Input
                label={'Ссылка'}
                className={'ml-2'}
                type={'url'}
                placeholder={'Введите ссылку'}
                value={contact.url}
                onChange={(e)=>setContact({...contact, url: e.target.value})}
            />
            <Button className={'ml-2'} isLoading={isLoadingSave} isDisabled={JSON.stringify(_contact) === JSON.stringify(contact)} onClick={handleSave}>Сохранить</Button>
            <Button className={'ml-2'} isLoading={isLoadingDelete} onClick={handleDelete} color={'danger'}>Удалить</Button>
        </div>
    );
};

export default ContactItem;