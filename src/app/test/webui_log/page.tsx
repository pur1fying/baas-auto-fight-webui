// components/LogViewer.tsx
'use client';

import PageWebuiLog from "@/app/dashboard/webui_log/page";
import logger from "@/utils/logger";
import {useEffect} from "react";

const _tag = "Test_PageWebuiLog";

const _logger = logger.withTag(_tag)

const test_log_entries = [
    {
        level: 'debug',
        message: 'This is a debug message'
    },
    {
        level: 'info',
        message: 'This is an info message'
    },
    {
        level: 'warn',
        message: 'This is a warning message'
    },
    {
        level: 'error',
        message: 'This is an error message'
    },
    {
        level: 'fatal',
        message: 'This is a fatal message'
    },

    {
        type: 'hr',
        message: 'Debug Flag',
        level: 'debug'
    },
    {
        type: 'hr',
        message: 'Info Flag',
        level: 'info'
    },
    {
        type: 'hr',
        message: 'Warning Flag',
        level: 'warn'
    },
    {
        type: 'hr',
        message: 'Error Flag',
        level: 'error'
    },
    {
        type: 'hr',
        message: 'fatal Flag',
        level: 'fatal'
    },

    {
        type: 'sub_title',
        message: 'Debug Sub Title',
        level: 'debug'
    },
    {
        type: 'sub_title',
        message: 'Info Sub Title',
        level: 'info'
    },
    {
        type: 'sub_title',
        message: 'Warning Sub Title',
        level: 'warn'
    },
    {
        type: 'sub_title',
        message: 'Error Sub Title',
        level: 'error'
    },
    {
        type: 'sub_title',
        message: 'fatal Sub Title',
        level: 'fatal'
    },

    {
        type: 'hr',
        message: 'Test Long Text',
        level: 'info'
    },
    {
        message: '分布式系统的核心挑战在于处理节点间的数据一致性与网络分区容错。CAP 理论指出，在一致性（Consistency）、可用性（Availability）和分区容错性（Partition Tolerance）三者中，系统最多只能同时满足两个。实际生产环境中，工程师常常需要在最终一致性与强一致性之间做出权衡，并通过共识算法如 Raft 或 Paxos 来保证集群状态同步',
        level: 'info'
    },
]

function logEntry(entry: any) {
    const level = entry.level || 'info';
    const type = entry.type || 'out';
    const message = entry.message;

    if (type === 'hr') {
        _logger.hr(message, level);
        return;
    }

    switch (type) {
        case 'out':
            _logger._out(message, level);
            break;
        case 'sub_title':
            _logger.sub_title(message, level);
    }
}

function Test_PageWebuiLog() {

    useEffect(() => {
        _logger.hr('Test Logger Page');
        for (const entry of test_log_entries) {
            logEntry(entry);
        }
    }, []);

    return <PageWebuiLog/>;
}

export default Test_PageWebuiLog;