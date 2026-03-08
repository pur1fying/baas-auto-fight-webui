'use client';
import TopNavBar from '@/components/top_nav/top_nav';

const PageInfo = [
    { 
        label: 'Dashboard', 
        href: '/' 
    },
    {
        label: 'Info',
        href: '/info'
    }
];

export default function Home() {
    return (
        <>
            <TopNavBar PageInfo={PageInfo}/>
        </>
    );
}

