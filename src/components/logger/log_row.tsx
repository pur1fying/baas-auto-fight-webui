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
        case 'fatal'    : return 'text-[var(--fgColor-done)]'
    }
}

const level_width = 5
const tag_width = 20

function padRight(str: string, width: number) {
    return str.padEnd(width, ' ')
}

const LogRow = ({ log, index }: Props) => {
    const logNumber = index + 1;
    const formattedNumber = String(logNumber).padStart(log_index_width, ' ');
    const timestampStr = formatTimestamp(log.timestamp);
    const levelColor = getLevelColor(log.level);

    const levelStr = padRight(log.level.toUpperCase(), level_width);
    const tagStr = padRight(log.tag, tag_width);

    return (
        <div className="flex items-start font-mono whitespace-pre-wrap break-all">

            <div className="flex-shrink-0 flex">
                <span className="inline-block text-right mr-2 text-[var(--fgColor-muted)]">
                    {formattedNumber}
                </span>

                <span className="text-[var(--fgColor-muted)]mr-2">
                    [{timestampStr}]
                </span>

                <span className="mr-2">
                    {tagStr}
                </span>

                <span className={`${levelColor} mr-2`}>
                    {levelStr}
                </span>
            </div>

            <div className={`${levelColor} flex-1`}>
                {log.message}
            </div>
        </div>
    );
};
export default LogRow;