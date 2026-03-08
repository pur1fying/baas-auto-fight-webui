'use client';
import { ActionList, Breadcrumbs, IconButton } from "@primer/react";
import styles from '../top_nav/top_nav.module.css';

interface Props {
    items: string[]
}



function HomePageButton({ items }: Props) {
    console.log("Rendering HomePageButton with items:", items);
    return (
        <>

            <Breadcrumbs>
                <Breadcrumbs.Item href="/pur1fying" className={styles.crumb}>
                    pur1fying
                </Breadcrumbs.Item>

                <Breadcrumbs.Item href="/pur1fying/bluearchive" className={`${styles.crumb} ${styles.last}`}>
                    blue_archive_auto_script
                </Breadcrumbs.Item>


            </Breadcrumbs>

            <h1> List </h1>
            <ActionList showDividers selectionVariant="single">
                {items.map((item, idx) => (
                    <ActionList.Item key={item} onClick={(event) => { console.log(event) }}>{item}</ActionList.Item>
                ))}
                <ActionList.Item size="large" selected role='menuitemcheckbox' variant="danger">Item one</ActionList.Item>
                <ActionList.Item >Item two</ActionList.Item>
                <ActionList.Item>Item three</ActionList.Item>
            </ActionList>
        </>
    );
};


export default HomePageButton;