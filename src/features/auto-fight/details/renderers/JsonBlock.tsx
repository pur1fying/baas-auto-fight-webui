interface JsonBlockProps {
    value: unknown;
}

export function JsonBlock({value}: JsonBlockProps) {
    return (
        <pre
            className="auto-fight-json-block"
            aria-label="JSON 内容"
        >
            {JSON.stringify(value, null, 2)}
        </pre>
    );
}
