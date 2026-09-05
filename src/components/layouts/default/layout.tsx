import type React from 'react';

import ImageBackground from '@/components/background/imgae_background';
import DefaultLayoutContent from '@/components/layouts/default/content';
import DefaultLayoutFooter from '@/components/layouts/default/footer';
import DefaultLayoutHeader from '@/components/layouts/default/header';
import DefaultLayoutSidebar from '@/components/layouts/default/sidebar';

export type DefaultLayoutContentMode = 'centered' | 'fill';

interface DefaultLayoutProps {
    readonly header?: React.ReactNode;
    readonly sidebar?: React.ReactNode;
    readonly sidebarWidth?: string;
    readonly content?: React.ReactNode;
    readonly footer?: React.ReactNode;
    readonly contentMode?: DefaultLayoutContentMode;
}

function DefaultLayout(
    {
        header,
        sidebar,
        sidebarWidth,
        content,
        footer,
        contentMode = 'centered',
    }: DefaultLayoutProps,
) {
    return (
        <ImageBackground>
            <div className="min-h-screen flex flex-col">
                <DefaultLayoutHeader header={header}/>

                <div className="flex flex-1 min-w-0">
                    <DefaultLayoutSidebar sidebar={sidebar} width={sidebarWidth}/>

                    <div className="flex flex-col flex-1 min-w-0">
                        <DefaultLayoutContent content={content} contentMode={contentMode}/>
                        <DefaultLayoutFooter footer={footer}/>
                    </div>
                </div>
            </div>
        </ImageBackground>
    );
}

export default DefaultLayout;
