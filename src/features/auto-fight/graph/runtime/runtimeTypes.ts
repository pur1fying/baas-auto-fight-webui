import type {TransitionKind} from '@/features/auto-fight/model/workflow';

export type RuntimeEvent =
    | {readonly type: 'run-started'; readonly stateId: string}
    | {readonly type: 'state-entered'; readonly stateId: string}
    | {
        readonly type: 'transition-selected';
        readonly edgeId: string;
        readonly from: string;
        readonly to: string;
        readonly kind: TransitionKind;
    }
    | {readonly type: 'run-paused'}
    | {readonly type: 'run-resumed'}
    | {readonly type: 'run-completed'; readonly stateId: string}
    | {readonly type: 'run-failed'; readonly message: string}
    | {readonly type: 'run-reset'};

export interface RuntimeEventSource {
    readonly subscribe: (listener: (event: RuntimeEvent) => void) => () => void;
}

export type RuntimeStatus = 'idle' | 'running' | 'paused' | 'completed' | 'failed';

export interface RuntimeVisualState {
    readonly status: RuntimeStatus;
    readonly activeStateId?: string;
    readonly activeEdgeId?: string;
    readonly pendingStateId?: string;
    readonly visitedStateIds: readonly string[];
    readonly errorMessage?: string;
}
