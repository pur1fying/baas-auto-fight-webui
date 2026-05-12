'use client';
import TopNavBar from '@/components/top_nav/top_nav';
import React, {useEffect} from 'react'
import DefaultLayout from '@/components/layouts/default/layout'
import WorkflowEditor from "@/components/BAAS/workflow/editor/workflow_editor";
import {usePageInfoStore} from "@/store/page_info_store";

const PageInfo = [
    {
        label: 'Pur1fying',
        href: '/'
    },
    {
        label: 'This is BAAS AutoFIght workflow repository',
        href: '/info'
    }
];

export default function Home() {

    const setPageInfo = usePageInfoStore(s => s.setPageInfo);

    useEffect(() => {
        setPageInfo(PageInfo);
    }, [setPageInfo]);

    return (
        <>
            <DefaultLayout
                header={<TopNavBar/>}
                sidebar={<div className="text-center text-blue-500"> this is sidebar </div>}
                content={<div className="text-center"><WorkflowEditor/></div>}
                footer={<div className="text-center"> this is footer </div>}>
            </DefaultLayout>
        </>
    );
}
