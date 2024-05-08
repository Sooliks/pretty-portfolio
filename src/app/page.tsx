import {Button, Card} from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center h-full">
            <div className={'mt-[10%] flex flex-col items-center'}>
                <Card className={'p-20'}>
                    <h1>Pretty Portfolio - это сайт где вы можете опубликовать/смотреть портфолио студентов</h1>
                </Card>
                <Card className={'p-4 w-96 mt-4'}>
                    <Button as={Link} href="/authorization">Начать</Button>
                </Card>
            </div>
        </main>
    );
}
