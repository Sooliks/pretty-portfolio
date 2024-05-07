import {Button, Card} from "@nextui-org/react";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Card className={'p-4'}>
                <Button>Начать</Button>
            </Card>
        </main>
    );
}
