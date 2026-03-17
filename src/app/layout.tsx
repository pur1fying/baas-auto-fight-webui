import React from "react";

import '@primer/css/dist/primer.css'
import '@primer/primitives/dist/css/base/motion/motion.css'
import { BaseStyles, ThemeProvider } from "@primer/react";

import "./globals.css"


export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider colorMode="light" nightScheme="dark">
                    <BaseStyles>
                        {children}
                    </BaseStyles>
                </ThemeProvider>
            </body>
        </html >
    );
}