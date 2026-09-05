import {Label, Text} from '@primer/react';

import type {ObservedRuntimeEvent} from '@/features/auto-fight/runs/model/runtimeObservation';

interface RuntimeEventListProps {
    readonly events: readonly ObservedRuntimeEvent[];
    readonly mode?: 'events' | 'timeline' | 'logs';
}

function eventSummary(event: ObservedRuntimeEvent['event']): string {
    if (event.type === 'run-started') return `Run started at ${event.stateId}`;
    if (event.type === 'state-entered') return `Entered ${event.stateId}`;
    if (event.type === 'transition-selected') return `${event.from} → ${event.to}`;
    if (event.type === 'run-paused') return 'Run paused';
    if (event.type === 'run-resumed') return 'Run resumed';
    if (event.type === 'run-completed') return `Run completed at ${event.stateId}`;
    if (event.type === 'run-failed') return event.message;
    return 'Run reset';
}

export function RuntimeEventList({events, mode = 'events'}: RuntimeEventListProps) {
    if (events.length === 0) {
        return <div className="auto-fight-run-empty">No Mock runtime events have been observed.</div>;
    }

    if (mode === 'logs') {
        return (
            <pre className="auto-fight-run-logs" aria-label="Mock Run logs">
                {events.map((item) => `[${item.sequence}] ${item.event.type}: ${eventSummary(item.event)}`).join('\n')}
            </pre>
        );
    }

    return (
        <ol className={`auto-fight-runtime-events is-${mode}`}>
            {events.map((item) => (
                <li key={item.sequence}>
                    <span className="auto-fight-runtime-sequence">{item.sequence}</span>
                    <div>
                        <Label size="small">{item.event.type}</Label>
                        <Text as="p">{eventSummary(item.event)}</Text>
                        {item.event.type === 'transition-selected' && (
                            <Text as="code">{item.event.edgeId}</Text>
                        )}
                    </div>
                </li>
            ))}
        </ol>
    );
}
