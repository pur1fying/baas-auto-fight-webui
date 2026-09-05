import {describe, expect, test, vi} from 'vitest';

import {
    MOCK_SCENARIOS,
    MockRuntimeController,
} from '@/features/auto-fight/mock/MockRuntimeController';
import type {RuntimeEvent} from '@/features/auto-fight/graph/runtime/runtimeTypes';

describe('MockRuntimeController', () => {
    test('exposes condition, default, and action-fail scenarios', () => {
        expect(MOCK_SCENARIOS.map((scenario) => scenario.id)).toEqual([
            'condition-path',
            'default-path',
            'action-fail-path',
        ]);
        expect(MOCK_SCENARIOS[0].events.filter((event) => event.type === 'transition-selected'))
            .toEqual(expect.arrayContaining([
                expect.objectContaining({edgeId: 'opening:condition:0'}),
                expect.objectContaining({edgeId: 'burst:condition:0'}),
            ]));
    });

    test('single-step emits one workflow event and synchronizes paused visuals', () => {
        const controller = new MockRuntimeController(MOCK_SCENARIOS[0], 1000);
        const received: RuntimeEvent[] = [];
        controller.subscribe((event) => received.push(event));

        controller.step();
        expect(received.map((event) => event.type)).toEqual(['run-started', 'run-paused']);

        controller.step();

        expect(received.map((event) => event.type)).toEqual([
            'run-started',
            'run-paused',
            'transition-selected',
            'run-paused',
        ]);
        expect(controller.getSnapshot().nextEventIndex).toBe(2);
    });

    test('play, pause, speed, and reset control scheduled playback', () => {
        vi.useFakeTimers();
        const controller = new MockRuntimeController(MOCK_SCENARIOS[0], 1000);
        const received: RuntimeEvent[] = [];
        controller.subscribe((event) => received.push(event));

        controller.setSpeed(2);
        controller.play();
        expect(received[0].type).toBe('run-started');

        vi.advanceTimersByTime(499);
        expect(received).toHaveLength(1);
        vi.advanceTimersByTime(1);
        expect(received[1].type).toBe('transition-selected');

        controller.pause();
        expect(received.at(-1)?.type).toBe('run-paused');
        vi.advanceTimersByTime(1000);
        expect(received.at(-1)?.type).toBe('run-paused');

        controller.reset();
        expect(received.at(-1)?.type).toBe('run-reset');
        expect(controller.getSnapshot().nextEventIndex).toBe(0);
        vi.useRealTimers();
    });

    test('enters a target immediately after a selected transition when motion is reduced', () => {
        vi.useFakeTimers();
        const controller = new MockRuntimeController(MOCK_SCENARIOS[0], 1000);
        const received: RuntimeEvent[] = [];
        controller.subscribe((event) => received.push(event));
        controller.setReducedMotion(true);

        controller.play();
        vi.advanceTimersByTime(1000);
        expect(received.at(-1)?.type).toBe('transition-selected');
        vi.runOnlyPendingTimers();
        expect(received.at(-1)?.type).toBe('state-entered');
        vi.useRealTimers();
    });

    test('reduced-motion single-step skips transition animation and pauses on the target', () => {
        vi.useFakeTimers();
        const controller = new MockRuntimeController(MOCK_SCENARIOS[0], 1000);
        const received: RuntimeEvent[] = [];
        controller.subscribe((event) => received.push(event));
        controller.setReducedMotion(true);

        controller.step();
        controller.step();
        vi.runOnlyPendingTimers();

        expect(received.slice(-2).map((event) => event.type)).toEqual(['state-entered', 'run-paused']);
        expect(controller.getSnapshot()).toEqual(expect.objectContaining({
            nextEventIndex: 3,
            status: 'paused',
        }));
        vi.useRealTimers();
    });
});
