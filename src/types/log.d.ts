
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'critical';

export interface LogEntry {
    timestamp: number;
    level: LogLevel;
    tag: string;
    message: string;
}
