import {
    BaseEdge,
    EdgeLabelRenderer,
    getBezierPath,
} from '@xyflow/react';
import type {EdgeProps} from '@xyflow/react';

import type {TransitionFlowEdge} from '@/features/auto-fight/graph/flowTypes';

export function getRuntimeEdgeClass(isPaused: boolean): string {
    return `auto-fight-edge-runtime${isPaused ? ' is-paused' : ''}`;
}

export function TransitionEdge(props: EdgeProps<TransitionFlowEdge>) {
    const [path, labelX, labelY] = getBezierPath({
        sourceX: props.sourceX,
        sourceY: props.sourceY,
        sourcePosition: props.sourcePosition,
        targetX: props.targetX,
        targetY: props.targetY,
        targetPosition: props.targetPosition,
        curvature: 0.32,
    });
    const data = props.data;
    if (data === undefined) {
        return null;
    }

    function openDetail(): void {
        if (data?.kind === 'condition' && data.conditionId !== undefined) {
            data.onOpenDetail({kind: 'condition', id: data.conditionId, title: data.label.replace(/^\d+\.\s*/, '')});
            return;
        }
        data?.onOpenDetail({
            kind: 'state',
            id: props.source,
            title: data.sourceStateName,
            anchorId: props.id,
        });
    }

    return (
        <>
            <BaseEdge
                id={props.id}
                path={path}
                markerEnd={props.markerEnd}
                className={`auto-fight-edge is-${data.kind}`}
                interactionWidth={22}
            />
            {data.isActive ? (
                <path
                    d={path}
                    className={getRuntimeEdgeClass(data.runtimeStatus === 'paused')}
                    aria-hidden="true"
                />
            ) : null}
            <EdgeLabelRenderer>
                <button
                    type="button"
                    className={`auto-fight-edge-label nodrag nopan is-${data.kind}`}
                    style={{transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`}}
                    aria-label={`查看连线 ${data.label}`}
                    onClick={openDetail}
                >
                    {data.label}
                </button>
            </EdgeLabelRenderer>
        </>
    );
}
