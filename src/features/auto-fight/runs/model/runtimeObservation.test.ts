import {describe, expect, test} from 'vitest';

import {
    createRuntimeObservationState,
    runtimeObservationReducer,
} from '@/features/auto-fight/runs/model/runtimeObservation';

describe('runtime observation history', () => {
    test('records exact transition identity in delivery order', () => {
        const started = runtimeObservationReducer(
            createRuntimeObservationState('mock-run-1'),
            {type: 'run-started', stateId: 'opening'},
        );
        const selected = runtimeObservationReducer(started, {
            type: 'transition-selected',
            edgeId: 'opening:default:0',
            from: 'opening',
            to: 'wait-cost',
            kind: 'default',
        });

        expect(selected.events.map((event) => event.sequence)).toEqual([1, 2]);
        expect(selected.events.at(-1)?.event).toMatchObject({edgeId: 'opening:default:0'});
        expect(selected.visual.activeStateId).toBe('opening');
        expect(selected.visual.pendingStateId).toBe('wait-cost');
    });

    test('reset clears live observation while preserving the selected run identity', () => {
        const started = runtimeObservationReducer(
            createRuntimeObservationState('mock-run-1'),
            {type: 'run-started', stateId: 'opening'},
        );
        const reset = runtimeObservationReducer(started, {type: 'run-reset'});

        expect(reset.runId).toBe('mock-run-1');
        expect(reset.visual.status).toBe('idle');
        expect(reset.events).toEqual([]);
    });
});
