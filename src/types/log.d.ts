
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export interface LogEntry {
    timestamp: number;
    level: LogLevel;
    tag: string;
    message: string;
}
