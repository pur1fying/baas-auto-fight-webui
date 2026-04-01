// components/LogViewer.tsx
'use client';

import React from 'react';
import { useLoggerStore } from '@/store/loggerStore';
import LogViewer from '@/components/logger/log_viewer';

function PageWebuiLog() {
    const { logs } = useLoggerStore();

    if (!logs || logs.length === 0) {
        return <div className="p-4 text-gray-500">暂无日志</div>;
    }

    return (
        <>
            <LogViewer/>
        </>
    );
}

export default PageWebuiLog;