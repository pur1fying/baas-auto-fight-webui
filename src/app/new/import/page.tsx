'use client';
import TopNavBar from '@/components/top_nav/top_nav';
import React, {useEffect} from 'react'
import DefaultLayout from '@/components/layouts/default/layout'
import {usePageInfoStore} from "@/store/page_info_store";
import PageImportWorkflowBody from "@/components/BAAS/workflow/new/import/page_import_workflow_body";

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
                content={<div className="flex justify-center"><PageImportWorkflowBody/></div>}
                footer={<div className="text-center"> this is footer </div>}>
            </DefaultLayout>
        </>
    );
}

