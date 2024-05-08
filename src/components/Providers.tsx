"use client";

import {SessionProvider} from "next-auth/react";
import {NextUIProvider} from "@nextui-org/system";
import LoaderProvider from "@/components/LoaderProvider";

export default function Providers({children}: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <NextUIProvider>
                <LoaderProvider>
                    {children}
                </LoaderProvider>
            </NextUIProvider>
        </SessionProvider>
    )
}