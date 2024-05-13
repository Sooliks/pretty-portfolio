import React from 'react';
import {getContacts} from "@/server-actions/profiles";
import Link from "next/link";
import {Card, Divider} from "@nextui-org/react";
type InformationPageProps = {
    params: {
        id: string
    }
}
const InformationPage = async ({params}:InformationPageProps) => {
    const contacts = await getContacts(params.id);
    return (
        <Card className={'flex flex-col p-4'}>
            <h2>Контакты</h2>
            <Divider className={'mb-4'}/>
            {contacts.length > 0 ? contacts.map(contact=>
                <Link
                    key={contact.id}
                    href={contact.url}
                    target={'_blank'}
                    className={'text-small text-blue-600 mb-2'}
                >
                    {contact.name}
                </Link>
            )
                :
                <p>Пользователь не добавил не одного контакта</p>
            }
        </Card>
    );
};

export default InformationPage;