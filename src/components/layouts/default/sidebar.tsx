import React from 'react';

interface Props {
    sidebar: React.ReactNode;
    width? : string;
}

function DefaultLayoutSidebar(
    {
        sidebar,
        width = "21rem"
    }: Props)
{
    if (sidebar == null) return null;

    return (
        <aside
            className="border-r border-gray-200 h-full overflow-y-auto"
            style={{ width: width }}
        >
            {sidebar}
        </aside>
    );
}

export default DefaultLayoutSidebar;