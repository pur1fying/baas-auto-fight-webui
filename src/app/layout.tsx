import React from "react";

import '@primer/css/dist/primer.css'
import '@primer/primitives/dist/css/base/motion/motion.css'
import { BaseStyles, ThemeProvider } from "@primer/react";

import "./globals.css"
import { I18nProvider } from "@/components/i18n/i18n_provider";


export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode; }>) {

    return (
        <html lang="en">
            <body>
                <ThemeProvider colorMode="light" nightScheme="dark">
                    <BaseStyles>
                        <I18nProvider>
                            {children}
                        </I18nProvider>
                    </BaseStyles>
                </ThemeProvider>
            </body>
        </html >
    );
}