import {describe, expect, test} from 'vitest';

import {
    INITIAL_RUNTIME_STATE,
    runtimeReducer,
} from '@/features/auto-fight/graph/runtime/runtimeReducer';

describe('runtimeReducer', () => {
    test('keeps the source active while its selected edge animates', () => {
        const running = runtimeReducer(INITIAL_RUNTIME_STATE, {
            type: 'run-started',
            stateId: 'opening',
        });
        const transitioning = runtimeReducer(running, {
            type: 'transition-selected',
            edgeId: 'opening:condition:0',
            from: 'opening',
            to: 'burst',
            kind: 'condition',
        });

        expect(transitioning.activeStateId).toBe('opening');
        expect(transitioning.activeEdgeId).toBe('opening:condition:0');
        expect(transitioning.pendingStateId).toBe('burst');
    });

    test('clears the edge only when the target state is entered', () => {
        const transitioning = {
            ...INITIAL_RUNTIME_STATE,
            status: 'running' as const,
            activeStateId: 'opening',
            activeEdgeId: 'opening:default:0',
            pendingStateId: 'wait-cost',
        };
        const entered = runtimeReducer(transitioning, {
            type: 'state-entered',
            stateId: 'wait-cost',
        });

        expect(entered.activeStateId).toBe('wait-cost');
        expect(entered.activeEdgeId).toBeUndefined();
        expect(entered.visitedStateIds).toEqual(['opening', 'wait-cost']);
    });

    test('supports pause, completion, failure, and reset', () => {
        const running = runtimeReducer(INITIAL_RUNTIME_STATE, {type: 'run-started', stateId: 'opening'});
        expect(runtimeReducer(running, {type: 'run-paused'}).status).toBe('paused');
        expect(runtimeReducer(running, {type: 'run-completed', stateId: 'victory'}).status).toBe('completed');
        expect(runtimeReducer(running, {type: 'run-failed', message: 'lost connection'})).toMatchObject({
            status: 'failed',
            errorMessage: 'lost connection',
        });
        expect(runtimeReducer(running, {type: 'run-reset'})).toEqual(INITIAL_RUNTIME_STATE);
    });
});
