import "./globals.css"
import '@primer/css/dist/primer.css'
import '@primer/primitives/dist/css/base/motion/motion.css'
import { BaseStyles, ThemeProvider } from "@primer/react";

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider colorMode="auto" nightScheme="dark_dimmed">
                    <BaseStyles>
                        {children}
                    </BaseStyles>
                </ThemeProvider>
            </body>
        </html >
    );
}