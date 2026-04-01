

export function formatTimestamp(timestamp: number): string {
    const d = new Date(timestamp)

    const date = d.toLocaleDateString('zh-CN').replace(/\//g, '-')
    const time = d.toLocaleTimeString('zh-CN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 3
    })

    return `${date} ${time}`
}