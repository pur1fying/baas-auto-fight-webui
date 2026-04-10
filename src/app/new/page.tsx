'use client';
import TopNavBar from '@/components/top_nav/top_nav';
import React, {useEffect} from 'react'
import DefaultLayout from '@/components/layouts/default/layout'
import WorkflowEditor from "@/components/BAAS/workflow/editor/workflow_editor";
import {usePageInfoStore} from "@/store/page_info_store";
import PageNewWorkflowBody from "@/components/BAAS/workflow/new/page_new_workflow_body";
import { useTranslation } from 'react-i18next';

export default function New() {
    const { t } = useTranslation();
    const setPageInfo = usePageInfoStore(s => s.setPageInfo);

    const pageInfo = [
        { label: t('workflow.newBaasWorkflow') }
    ];

    useEffect(() => {
        setPageInfo(pageInfo);
    }, [setPageInfo, pageInfo]);

    return (
        <>
            <DefaultLayout
                header={<TopNavBar/>}
                sidebar={null}
                content={<div className="flex justify-center"> <PageNewWorkflowBody/> </div>}
                footer={<div className="text-center">{t('common.thisIsFooter')}</div>}>
            </DefaultLayout>
        </>
    );
}

