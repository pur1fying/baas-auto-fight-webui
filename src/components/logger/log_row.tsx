import { LogEntry, LogLevel } from "@/types/log";
import { formatTimestamp } from "@/utils/string_utils";
import '@primer/css/dist/primer.css'

interface Props {
    log: LogEntry;
    index: number;       
}

const log_index_width = 6;

function getLevelColor(level: LogLevel): string {
    switch (level) {
        case 'debug'    : return 'text-[var(--fgColor-success)]'
        case 'info'     : return 'text-[var(--fgColor-accent)]'
        case 'warn'     : return 'text-[var(--fgColor-attention)]'
        case 'error'    : return 'text-[var(--fgColor-danger)]'
        case 'critical' : return 'text-[var(--fgColor-done)]'
    }
}

const level_width = 8   // 控制 INFO / CRITICAL 对齐
const tag_width = 20     // 你要求的 tag 宽度

function padRight(str: string, width: number) {
    return str.padEnd(width, ' ')
}

const LogRow = ({ log, index }: Props) => {
    const logNumber = index + 1
    const formattedNumber = String(logNumber).padStart(log_index_width, ' ')
    const timestampStr = formatTimestamp(log.timestamp)
    const levelColor = getLevelColor(log.level)

    const levelStr = padRight(log.level.toUpperCase(), level_width)
    const tagStr = padRight(log.tag, tag_width)

    return (
        <div className="font-mono whitespace-pre">

            <span className="inline-block text-right mr-2 text-gray-500">
                {formattedNumber}
            </span>

            <span className="text-gray-400 mr-2">
                [{timestampStr}]
            </span>

            <span className={`mr-2`}>
                {tagStr}
            </span>

            <span className={`${levelColor} mr-2`}>
                {levelStr}
            </span>

            <span className={`${levelColor}`}>
                {log.message}
            </span>
        </div>
    )
}
export default LogRow;