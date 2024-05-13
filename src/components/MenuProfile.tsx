'use client'
import React, {Key} from 'react';
import {Listbox, ListboxItem} from "@nextui-org/react";
import {signOut, useSession} from "next-auth/react";
import {usePathname, useRouter} from "next/navigation";
import {User} from "@nextui-org/user";
import {BaseInfo} from "@/types/base-info";
const MenuProfile = ({id, baseInfo}:{id: string, baseInfo: BaseInfo}) => {
    const session = useSession();
    const {push} = useRouter();
    const pathname = usePathname()
    const handleAction = async (key: Key) => {
        if(!key)return;
        switch (key) {
            case 'signOut':
                await signOut({callbackUrl: '/authorization'});
                break;
            default:
                if(pathname === key.toString())return
                push(key.toString())
                break
        }
    }
    return (
        <div className={'mr-4 w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 mb-4'}>
            <Listbox
                aria-label="Actions"
                onAction={handleAction}
                selectionMode="single"
            >
                <ListboxItem key={""}>
                    <User
                        name={!baseInfo.name && !baseInfo.surname ? 'Без имени' : baseInfo.name + " " + baseInfo.surname}
                        description={baseInfo.description}
                        avatarProps={{
                            src:`https://res.cloudinary.com/dqggb6cgz/image/upload/v${new Date().getTime()}/avatars/${id}`
                        }}
                    />
                </ListboxItem>
                <ListboxItem key={`/profiles/${id}`}>Портфолио</ListboxItem>
                <ListboxItem key={`/profiles/${id}/contacts`}>Контакты</ListboxItem>
                <ListboxItem className={session?.data?.user.id !== id ? 'hidden' : undefined} key={`/profiles/${id}/settings`}>Настройки</ListboxItem>
                <ListboxItem key={`signOut`} className={session?.data?.user.id !== id ? 'hidden text-danger-400' : undefined} color="danger">
                    Выйти из аккаунта
                </ListboxItem>
            </Listbox>
        </div>
    );
};

export default MenuProfile;