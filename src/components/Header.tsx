'use client'
import React from 'react';
import {Button, Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";
import Link from "next/link";
import {usePathname} from "next/navigation";


type HeaderProps = {
    links: {title: string, path: string}[]
}
const Header = ({links}: HeaderProps) => {
    const pathname = usePathname();
    return (
        <header className={'w-full'}>
            <Navbar>
                <NavbarBrand className={'max-sm:hidden'}>
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
                        <Button as={Link} color="primary" href="/authorization" variant="flat">
                            Войти
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </header>
    );
};

export default Header;