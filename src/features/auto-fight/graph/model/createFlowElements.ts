import {MarkerType, Position} from '@xyflow/react';

import type {DetailResourceRef} from '@/features/auto-fight/details/store/detailTabsReducer';
import type {LayoutDirection, WorkflowViewModel} from '@/features/auto-fight/model/workflow';
import type {RuntimeVisualState} from '@/features/auto-fight/graph/runtime/runtimeTypes';
import type {StateFlowNode, TransitionFlowEdge} from '@/features/auto-fight/graph/flowTypes';
import {projectWorkflowToGraph} from '@/features/auto-fight/graph/model/graphProjection';
import {layoutGraph} from '@/features/auto-fight/graph/layout/layoutGraph';

export interface FlowElements {
    nodes: StateFlowNode[];
    edges: TransitionFlowEdge[];
}

export function applyRuntimeOverlay(
    nodes: readonly StateFlowNode[],
    edges: readonly TransitionFlowEdge[],
    runtime: RuntimeVisualState,
): FlowElements {
    return {
        nodes: nodes.map((node) => ({
            ...node,
            data: {
                ...node.data,
                runtimeRole: getRuntimeRole(node.id, runtime),
                runtimeStatus: runtime.status,
            },
        })),
        edges: edges.map((edge) => edge.data === undefined ? edge : ({
            ...edge,
            data: {
                ...edge.data,
                isActive: runtime.activeEdgeId === edge.id,
                runtimeStatus: runtime.status,
            },
        })),
    };
}

function getRuntimeRole(stateId: string, runtime: RuntimeVisualState): StateFlowNode['data']['runtimeRole'] {
    if (runtime.activeStateId === stateId) {
        return 'active';
    }
    if (runtime.pendingStateId === stateId) {
        return 'pending';
    }
    if (runtime.visitedStateIds.includes(stateId)) {
        return 'visited';
    }
    return 'idle';
}

export function createFlowElements(
    workflow: WorkflowViewModel,
    direction: LayoutDirection,
    runtime: RuntimeVisualState,
    onOpenDetail: (resource: DetailResourceRef) => void,
): FlowElements {
    const projection = projectWorkflowToGraph(workflow);
    const layout = layoutGraph(projection, direction);
    const sourcePosition = direction === 'left-to-right' ? Position.Right : Position.Bottom;
    const targetPosition = direction === 'left-to-right' ? Position.Left : Position.Top;

    const nodes = projection.nodes.map((node) => ({
        id: node.id,
        type: 'state' as const,
        position: {
            x: layout.nodesById[node.id].x,
            y: layout.nodesById[node.id].y,
        },
        sourcePosition,
        targetPosition,
        width: node.width,
        height: node.height,
        data: {
            graphNode: node,
            workflow,
            direction,
            runtimeRole: getRuntimeRole(node.id, runtime),
            runtimeStatus: runtime.status,
            onOpenDetail,
        },
    }));

    const edges = projection.edges.map((edge) => ({
        id: edge.id,
        type: 'transition' as const,
        source: edge.source,
        target: edge.target,
        sourceHandle: edge.sourceHandle,
        markerEnd: {type: MarkerType.ArrowClosed, width: 16, height: 16},
        focusable: true,
        data: {
            kind: edge.kind,
            label: edge.label,
            conditionId: edge.conditionId,
            sourceStateName: workflow.states[edge.source]?.name ?? edge.source,
            isActive: runtime.activeEdgeId === edge.id,
            runtimeStatus: runtime.status,
            onOpenDetail,
        },
    }));

    return {nodes, edges};
}
