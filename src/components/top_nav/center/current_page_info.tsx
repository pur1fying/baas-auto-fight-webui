'use client';

import { Breadcrumbs } from "@primer/react";
import { usePageInfoStore } from "@/store/page_info_store";

const BASE_STYLE = `
    !text-[var(--fgColor-default)]
    leading-[var(--base-size-24)]
    rounded-[var(--borderRadius-medium)]
    px-[var(--base-size-6)]
    py-[var(--base-size-4)]
    hover:!no-underline
`;

const INTERACTIVE_STYLE = `
    hover:!bg-[var(--bgColor-disabled)]
    cursor-pointer
`;

const DISABLED_STYLE = `
    cursor-default
    hover:!bg-transparent
`;

function CurrentPageInfo() {
    const items = usePageInfoStore((state) => state.items);

    if (!items || items.length === 0) return null;

    return (
        <Breadcrumbs overflow="menu">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;
                const isClickable = item.href && item.href !== "" && item.href !== "#";

                return (
                    <Breadcrumbs.Item
                        key={`${item.href}-${index}`}
                        href={isClickable ? item.href : undefined}
                        className={`
                            ${BASE_STYLE} 
                            ${isLast ? 'font-bold' : ''} 
                            ${isClickable ? INTERACTIVE_STYLE : DISABLED_STYLE}
                        `}
                        selected={isLast}
                    >
                        {item.label}
                    </Breadcrumbs.Item>
                );
            })}
        </Breadcrumbs>
    );
}

export default CurrentPageInfo;