import React, {Suspense} from "react";

import '@primer/css/dist/primer.css'
import '@primer/primitives/dist/css/base/motion/motion.css'

import "./globals.css"
import {I18nProvider} from "@/components/i18n/i18n_provider";
import NavigationLogger from "@/components/logger/navigarion_logger";
import {AppThemeProvider} from "@/components/theme/AppThemeProvider";


export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode; }>) {

    return (
        <html lang="zh-CN" suppressHydrationWarning>
        <body>
        <AppThemeProvider>
            <Suspense fallback={null}>
                <NavigationLogger/>
            </Suspense>
            <I18nProvider>
                {children}
            </I18nProvider>
        </AppThemeProvider>
        </body>
        </html>
    );
}
