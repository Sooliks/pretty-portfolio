'use client'
import React, {useState} from 'react';
import {Contact} from ".prisma/client";
import {Accordion, AccordionItem, Button, Card} from "@nextui-org/react";
import ContactItem from "@/components/ContactItem";
import EducationItem from "@/components/EducationItem";

const Contacts = ({_contacts}:{_contacts: Contact[]}) => {
    const [contacts,setContacts] = useState<Contact[]>(_contacts);
    const [isOpen,setIsOpen] = useState<boolean>(false)
    const handleAdd = () => {
        setContacts([...contacts, {
            name: "",
            id: "",
            url: "",
            authorId: ""
        }])
    }
    const removeItem = (indexToRemove: number) => {
        setContacts(prevItems => {
            const updatedItems = [...prevItems];
            updatedItems.splice(indexToRemove, 1);
            return updatedItems;
        });
    };
    return (
        <Card className={'p-4 flex flex-col'}>
            <h2>Контакты</h2>
            <Accordion variant="bordered">
                <AccordionItem
                    onPressStart={(e)=>setIsOpen(prev=>!prev)}
                    isCompact
                    title={isOpen ? 'Свернуть' : 'Развернуть'}
                    key="1"
                >
                    {contacts.map((contact, index)=>
                        <ContactItem onDelete={()=>removeItem(index)} _contact={contact} key={contact.id}/>
                    )}
                    <Button className={'mt-2'} onClick={handleAdd}>Добавить {contacts.length>0 && 'еще'}</Button>
                </AccordionItem>
            </Accordion>
        </Card>
    );
};

export default Contacts;