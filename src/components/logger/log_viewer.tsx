'use client';

import {useLoggerStore} from '@/store/loggerStore';
import LogRow from './log_row';
import { useTranslation } from 'react-i18next';

function LogViewer() {
    const {logs} = useLoggerStore();
    const { t } = useTranslation();

    if (!logs || logs.length === 0) {
        return <div className="p-4 text-gray-500">{t('common.noLogsYet')}</div>;
    }

    return (
        <div className="log-viewer font-mono text-sm overflow-auto">
            {
                logs.map((log, index) => (
                    <LogRow key={index} log={log} index={index}/>
                ))
            }
        </div>
    );
}

export default LogViewer;