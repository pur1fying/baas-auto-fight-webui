import type {Edge, Node} from '@xyflow/react';

import type {WorkflowViewModel} from '@/features/auto-fight/model/workflow';
import type {GraphNodeView, TerminalKind} from '@/features/auto-fight/graph/model/graphProjection';
import type {RuntimeStatus} from '@/features/auto-fight/graph/runtime/runtimeTypes';
import type {DetailResourceRef} from '@/features/auto-fight/details/store/detailTabsReducer';
import type {LayoutDirection, TransitionKind} from '@/features/auto-fight/model/workflow';

export interface StateNodeData extends Record<string, unknown> {
    graphNode: GraphNodeView;
    workflow: WorkflowViewModel;
    direction: LayoutDirection;
    runtimeRole: 'idle' | 'active' | 'pending' | 'visited';
    runtimeStatus: RuntimeStatus;
    onOpenDetail: (resource: DetailResourceRef) => void;
}

export interface TransitionEdgeData extends Record<string, unknown> {
    kind: TransitionKind;
    label: string;
    conditionId?: string;
    sourceStateName: string;
    isActive: boolean;
    runtimeStatus: RuntimeStatus;
    onOpenDetail: (resource: DetailResourceRef) => void;
}

export type StateFlowNode = Node<StateNodeData, 'state'>;
export type TransitionFlowEdge = Edge<TransitionEdgeData, 'transition'>;

export interface StateBadgeInfo {
    isStart: boolean;
    terminalKind: TerminalKind;
}
