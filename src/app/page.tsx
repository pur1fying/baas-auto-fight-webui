'use client';
import TopNavBar from '@/components/top_nav/top_nav';
import React from 'react'
import DefaultLayout from '@/components/layouts/default/layout'

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

function Nav() {
    return <TopNavBar PageInfo={PageInfo}/>
}

export default function Home() {
    return (
        <>
            <DefaultLayout
                header={<Nav/>}
                sidebar={<div className="text-center text-blue-500"> this is sidebar </div>}
                content={<div className="text-center"> this is content </div>}
                footer={<div className="text-center"> this is footer </div>}>
            </DefaultLayout>
        </>
    );
}

