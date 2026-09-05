import React from 'react';

import type {DefaultLayoutContentMode} from '@/components/layouts/default/layout';

interface DefaultLayoutContentProps {
    readonly content: React.ReactNode;
    readonly contentMode: DefaultLayoutContentMode;
}

const DefaultLayoutContent = ({content, contentMode}: DefaultLayoutContentProps) => {
    if (content == null) return null;
    const className = contentMode === 'fill'
        ? 'flex flex-1 min-w-0 w-full'
        : 'flex flex-col flex-1 items-center justify-center min-w-0';

    return (
        <main className={className} data-content-mode={contentMode}>
            {content}
        </main>
    );
};

export default DefaultLayoutContent;
