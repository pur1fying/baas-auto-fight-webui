'use client';

import {useLoggerStore} from '@/store/loggerStore';
import {LogLevel} from '@/types/log';

const {addLog} = useLoggerStore.getState();

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

const logger = {
    debug: (tag: string, message: string) => logger._out(tag, message, 'debug'),
    info: (tag: string, message: string) => logger._out(tag, message, 'info'),
    warn: (tag: string, message: string) => logger._out(tag, message, 'warn'),
    error: (tag: string, message: string) => logger._out(tag, message, 'error'),
    fatal: (tag: string, message: string) => logger._out(tag, message, 'fatal'),

    hr: (tag: string, message: string, level: LogLevel = 'info') => {
        logger._out(tag, hr_line, level);
        logger._out(tag, build_hr_message(message), level);
        logger._out(tag, hr_line, level);
    },

    sub_title: (tag: string, message: string, level: LogLevel = 'info') => {
        logger._out(tag, `<<< ${message} >>>`, level);
    },

    _out: (tag: string, message: string, level: LogLevel) => {
        addLog(tag, message, level);
    },

    withTag: (tag: string) => {
        return {
            debug: (msg: string) => logger.debug(tag, msg),
            info: (msg: string) => logger.info(tag, msg),
            warn: (msg: string) => logger.warn(tag, msg),
            error: (msg: string) => logger.error(tag, msg),
            fatal: (msg: string) => logger.fatal(tag, msg),
            hr: (msg: string, level?: LogLevel) => logger.hr(tag, msg, level),
            sub_title: (msg: string, level: LogLevel) => logger.sub_title(tag, msg, level),
            _out: (msg: string, level: LogLevel) => logger._out(tag, msg, level),
        };
    },
};

export default logger;
