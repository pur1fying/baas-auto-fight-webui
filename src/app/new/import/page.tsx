'use client';
import TopNavBar from '@/components/top_nav/top_nav';
import React, {useEffect} from 'react'
import DefaultLayout from '@/components/layouts/default/layout'
import WorkflowEditor from "@/components/BAAS/workflow/editor/workflow_editor";
import {usePageInfoStore} from "@/store/page_info_store";
import PageNewWorkflowBody from "@/components/BAAS/workflow/new/page_new_workflow_body";

const PageInfo = [
    {
        label: 'Import workflow'
    }
];

export default function New() {

    const setPageInfo = usePageInfoStore(s => s.setPageInfo);

    useEffect(() => {
        setPageInfo(PageInfo);
    }, [setPageInfo]);

    return (
        <>
            <DefaultLayout
                header={<TopNavBar/>}
                sidebar={null}
                content={<div className="flex justify-center"> this is import page </div>}
                footer={<div className="text-center"> this is footer </div>}>
            </DefaultLayout>
        </>
    );
}

