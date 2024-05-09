
import React from 'react';
import {Card, Divider} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";


type PreviewPortfolioProps = {
    description: string
    id: string
    birthDay: Date,
    name: string
    surname: string
}

const PreviewPortfolio = ({description, id, birthDay,name,surname}: PreviewPortfolioProps) => {
    const calculateAge = (birthDate: Date): number => {
        const today: Date = new Date();
        let age: number = today.getFullYear() - birthDate.getFullYear();
        const monthDiff: number = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    const calculateAgeString = (age: number): string => {
        const lastDigit: number = age % 10;
        const lastTwoDigits: number = age % 100;
        if ((lastDigit === 1 && lastTwoDigits !== 11) || age === 1) {
            return `${age} год`;
        } else if ((lastDigit >= 2 && lastDigit <= 4) && !(lastTwoDigits >= 12 && lastTwoDigits <= 14)) {
            return `${age} года`;
        } else {
            return `${age} лет`;
        }
    }
    return (
        <Card className={'p-4 flex flex-col mr-2'} as={Link} href={`/profiles/${id}`}>
            <Image
                src={`https://res.cloudinary.com/dqggb6cgz/image/upload/v${new Date().getTime()}/avatars/${id}`}
                alt={'avatar'}
                width={200}
                height={180}
            />
            <p>{name + " " + surname}</p>
            <Divider orientation={"horizontal"}/>
            <p>{description}</p>
            <p>{calculateAgeString(calculateAge(birthDay))}</p>
        </Card>
    );
};

export default PreviewPortfolio;