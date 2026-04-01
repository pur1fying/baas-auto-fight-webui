'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { LogEntry, LogLevel } from '@/types/log';


interface LoggerStore {
    logs: LogEntry[];
    addLog: (level: LogLevel, tag: string, message: string) => void;
    clearLogs: () => void;
}

export const useLoggerStore = create<LoggerStore>()(
    devtools((set) => ({
        logs: [],
        addLog: (level, tag, message) => {
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