import type {RuntimeEvent, RuntimeVisualState} from '@/features/auto-fight/graph/runtime/runtimeTypes';

export const INITIAL_RUNTIME_STATE: RuntimeVisualState = {
    status: 'idle',
    visitedStateIds: [],
};

function appendVisit(visits: readonly string[], stateId: string): readonly string[] {
    return visits.at(-1) === stateId ? visits : [...visits, stateId];
}

export function runtimeReducer(
    state: RuntimeVisualState,
    event: RuntimeEvent,
): RuntimeVisualState {
    switch (event.type) {
        case 'run-started':
            return {
                status: 'running',
                activeStateId: event.stateId,
                visitedStateIds: [event.stateId],
            };
        case 'transition-selected':
            return {
                ...state,
                status: 'running',
                activeStateId: event.from,
                activeEdgeId: event.edgeId,
                pendingStateId: event.to,
            };
        case 'state-entered':
            const visitsWithSource = state.activeStateId === undefined
                ? state.visitedStateIds
                : appendVisit(state.visitedStateIds, state.activeStateId);
            return {
                ...state,
                status: 'running',
                activeStateId: event.stateId,
                activeEdgeId: undefined,
                pendingStateId: undefined,
                visitedStateIds: appendVisit(visitsWithSource, event.stateId),
            };
        case 'run-paused':
            return {...state, status: 'paused'};
        case 'run-resumed':
            return {...state, status: 'running'};
        case 'run-completed':
            return {
                ...state,
                status: 'completed',
                activeStateId: event.stateId,
                activeEdgeId: undefined,
                pendingStateId: undefined,
                visitedStateIds: appendVisit(state.visitedStateIds, event.stateId),
            };
        case 'run-failed':
            return {
                ...state,
                status: 'failed',
                activeEdgeId: undefined,
                pendingStateId: undefined,
                errorMessage: event.message,
            };
        case 'run-reset':
            return INITIAL_RUNTIME_STATE;
    }
}
