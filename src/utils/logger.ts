'use client';

import { useLoggerStore } from '@/store/loggerStore';
import { LogLevel } from '@/types/log';

const { addLog } = useLoggerStore.getState();

const hr_line_length = 50;

const hr_line = '-'.repeat(hr_line_length);

function build_hr_message(message: string) {
    const total_padding = hr_line_length - message.length;
    const left_padding = Math.floor(total_padding / 2);
    const right_padding = total_padding - left_padding;
    const left_space = ' '.repeat(left_padding - 1);
    const right_space = ' '.repeat(right_padding - 1);
    return `|${left_space}${message}${right_space}|`;
}

export const logger = {
    debug: (tag: string, message: string) => logger._out('debug', tag, message),
    info: (tag: string, message: string) => logger._out('info', tag, message),
    warn: (tag: string, message: string) => logger._out('warn', tag, message),
    error: (tag: string, message: string) => logger._out('error', tag, message),
    critical: (tag: string, message: string) => logger._out('critical', tag, message),

    hr: (tag: string, message: string, level: LogLevel = 'info') => {
        logger._out(level, tag, hr_line);
        logger._out(level, tag, build_hr_message(message));
        logger._out(level, tag, hr_line);
    },

    sub_title: (tag: string, message: string) => {
        logger.info(tag, `<<< ${message} >>>`);
    },

    _out: (level: LogLevel, tag: string, message: string) => {
        addLog(level, tag, message);
    },
};