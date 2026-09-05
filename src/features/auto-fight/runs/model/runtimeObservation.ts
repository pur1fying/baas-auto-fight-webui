import {INITIAL_RUNTIME_STATE, runtimeReducer} from '@/features/auto-fight/graph/runtime/runtimeReducer';
import type {RuntimeEvent, RuntimeVisualState} from '@/features/auto-fight/graph/runtime/runtimeTypes';

export interface ObservedRuntimeEvent {
    readonly sequence: number;
    readonly event: RuntimeEvent;
}

export interface RuntimeObservationState {
    readonly runId: string;
    readonly visual: RuntimeVisualState;
    readonly events: readonly ObservedRuntimeEvent[];
}

export function createRuntimeObservationState(runId: string): RuntimeObservationState {
    return {
        runId,
        visual: INITIAL_RUNTIME_STATE,
        events: [],
    };
}

export function runtimeObservationReducer(
    state: RuntimeObservationState,
    event: RuntimeEvent,
): RuntimeObservationState {
    if (event.type === 'run-reset') return createRuntimeObservationState(state.runId);

    return {
        ...state,
        visual: runtimeReducer(state.visual, event),
        events: [...state.events, {sequence: (state.events.at(-1)?.sequence ?? 0) + 1, event}],
    };
}
