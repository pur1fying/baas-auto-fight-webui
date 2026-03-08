'use client';
import { Breadcrumbs } from "@primer/react";
import styles from "@/components/top_nav/top_nav.module.css";

export interface SingleInfo {
    label: string;
    href: string;
};

interface Props {
    items: SingleInfo[];
}

function CurrentPageInfo({ items }: Props) {
    if (!items || items.length === 0) return null;

    return (
        <Breadcrumbs>
            {items.map((item, index) => (
                <Breadcrumbs.Item
                    key={index}
                    href={item.href}
                    className={`${styles.breadcrumbs} ${index === items.length - 1 ? styles['last-breadcrumb'] : ''}`}                   
                >
                    {item.label}
                </Breadcrumbs.Item>
            ))}
        </Breadcrumbs>
    );
}

export default CurrentPageInfo;