'use client';
import { Breadcrumbs } from "@primer/react";

export interface SingleInfo {
    label: string;
    href: string;
}

interface Props {
    items: SingleInfo[];
}

const breadcrumbs_default_style = `
    !text-[var(--fgColor-default)]
    hover:!no-underline
    hover:!bg-[var(--bgColor-disabled)]
    min-w-[3ch]
    leading-[var(--base-size-24)]
    rounded-[var(--borderRadius-medium)]
    px-[var(--base-size-6)]
    py-[var(--base-size-4)]
    items-center
    h-full
    inline-flex

`;

function CurrentPageInfo({ items }: Props) {
    if (!items || items.length === 0) return null;

    return (
        <Breadcrumbs>
            {items.map((item, index) =>
                index === items.length - 1
                    ? gen_breadcrumbs_last_item(item, index)
                    : gen_breadcrumbs_item(item, index)
            )}
        </Breadcrumbs>
    );
}

function gen_breadcrumbs_item(item: SingleInfo, key: number) {
    return (
        <Breadcrumbs.Item
            key={key}
            href={item.href}
            className={breadcrumbs_default_style}
        >
            {item.label}
        </Breadcrumbs.Item>
    );
}

function gen_breadcrumbs_last_item(item: SingleInfo, key: number) {
    return (
        <Breadcrumbs.Item
            key={key}
            href={item.href}
            className={`${breadcrumbs_default_style} font-bold`}
        >
            {item.label}
        </Breadcrumbs.Item>
    );
}

export default CurrentPageInfo;