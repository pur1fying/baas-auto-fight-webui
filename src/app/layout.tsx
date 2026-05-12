import React from "react";

import '@primer/css/dist/primer.css'
import '@primer/primitives/dist/css/base/motion/motion.css'
import {BaseStyles, ThemeProvider} from "@primer/react";

import "./globals.css"
import {I18nProvider} from "@/components/i18n/i18n_provider";
import NavigationLogger from "@/components/logger/navigarion_logger";


export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode; }>) {

    return (
        <html lang="en">
        <body>
        <ThemeProvider colorMode="dark" nightScheme="dark_dimmed">
            <BaseStyles>
                <NavigationLogger/>
                <I18nProvider>
                    {children}
                </I18nProvider>
            </BaseStyles>
        </ThemeProvider>
        </body>
        </html>
    );
}
