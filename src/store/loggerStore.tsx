'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { LogEntry, LogLevel } from '@/types/log';


interface LoggerStore {
    logs: LogEntry[];
    addLog: (tag: string, message: string, level: LogLevel) => void;
    clearLogs: () => void;
}

export const useLoggerStore = create<LoggerStore>()(
    devtools((set) => ({
        logs: [],
        addLog: (tag, message, level) => {
            const newLog: LogEntry = {
                timestamp: Date.now(),
                level,
                tag,
                message,
            };
            set((state) => ({ logs: [...state.logs, newLog] }));
        }
    }))
);