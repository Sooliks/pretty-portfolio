'use client'
import React from 'react';
import {Button, Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useSession} from "next-auth/react";


type HeaderProps = {
    links: {title: string, path: string}[]
}
const Header = ({links}: HeaderProps) => {
    const pathname = usePathname();
    const session = useSession();
    return (
        <header className={'border-b-1 w-full border-b-slate-600'}>
            <Navbar>
                <NavbarBrand as={Link} href={'/'} className={'max-sm:hidden'}>
                    <p className="font-bold text-inherit">Pretty Portfolio</p>
                </NavbarBrand>
                <NavbarContent justify="center">
                    {links.map(link =>
                        <NavbarItem key={link.path} isActive={pathname === link.path}>
                            <Link color="foreground" href={link.path}>
                                {link.title}
                            </Link>
                        </NavbarItem>
                    )}
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem>
                        {session && !session.data ?
                            <Button as={Link} color="primary" href="/authorization" variant="flat">
                                Войти
                            </Button>
                            :
                            <Button>Профиль</Button>
                        }
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </header>
    );
};

export default Header;