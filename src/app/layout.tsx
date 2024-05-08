import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Pretty Portfolio",
    description: "Best site for your portfolio",
};
export default function RootLayout({children,}: Readonly<{ children: React.ReactNode}>) {
    return (
        <html lang="en">
            <body className={inter.className + " dark h-screen"}>
                <Providers>
                    <Header links={[{title: 'Студенты', path: '/profiles'}]}/>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
