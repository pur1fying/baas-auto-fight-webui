import type {MouseEvent} from 'react';
import {Handle, Position} from '@xyflow/react';
import type {NodeProps} from '@xyflow/react';
import {
    AlertIcon,
    CheckCircleIcon,
    GitBranchIcon,
    PlayIcon,
    StopIcon,
    ZapIcon,
} from '@primer/octicons-react';

import type {TransitionKind} from '@/features/auto-fight/model/workflow';
import type {StateFlowNode, StateNodeData} from '@/features/auto-fight/graph/flowTypes';

interface TransferRow {
    id: string;
    kind: TransitionKind;
    label: string;
    targetLabel: string;
    conditionId?: string;
}

function getTransferRows(data: StateNodeData): TransferRow[] {
    const {state} = data.graphNode;
    const rows: TransferRow[] = [];
    if (state.actionFailTransition !== undefined) {
        rows.push({
            id: `${state.id}:action-fail:0`,
            kind: 'action-fail',
            label: 'Action fail',
            targetLabel: data.workflow.states[state.actionFailTransition]?.name ?? state.actionFailTransition,
        });
    }
    state.transitions.forEach((transition, index) => {
        rows.push({
            id: `${state.id}:condition:${index}`,
            kind: 'condition',
            label: `${index + 1}. ${data.workflow.conditions[transition.conditionId]?.name ?? transition.conditionId}`,
            targetLabel: data.workflow.states[transition.nextStateId]?.name ?? transition.nextStateId,
            conditionId: transition.conditionId,
        });
    });
    if (state.defaultTransition !== undefined) {
        rows.push({
            id: `${state.id}:default:0`,
            kind: 'default',
            label: 'Default',
            targetLabel: data.workflow.states[state.defaultTransition]?.name ?? state.defaultTransition,
        });
    }
    return rows;
}

function stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
}

export function StateNode({data, selected}: NodeProps<StateFlowNode>) {
    const {graphNode, workflow, direction} = data;
    const {state} = graphNode;
    const action = state.actionId === undefined ? undefined : workflow.actions[state.actionId];
    const transfers = getTransferRows(data);
    const horizontal = direction === 'left-to-right';

    return (
        <article
            className="auto-fight-state-node"
            data-selected={selected ? 'true' : 'false'}
            data-runtime={data.runtimeRole}
            data-runtime-status={data.runtimeStatus}
        >
            <Handle
                type="target"
                position={horizontal ? Position.Left : Position.Top}
                className="auto-fight-port auto-fight-port-target"
                isConnectable={false}
            />
            <header className="auto-fight-node-header">
                <button
                    type="button"
                    className="auto-fight-node-title nodrag"
                    aria-label={`查看状态 ${state.name}`}
                    onClick={() => data.onOpenDetail({kind: 'state', id: state.id, title: state.name})}
                >
                    <GitBranchIcon aria-hidden="true"/>
                    <span>{state.name}</span>
                </button>
                <div className="auto-fight-node-badges">
                    {graphNode.isStart ? <span className="auto-fight-node-badge is-start"><PlayIcon/> START</span> : null}
                    {graphNode.terminalKind === 'definite-end'
                        ? <span className="auto-fight-node-badge is-end"><StopIcon/> END</span>
                        : null}
                    {graphNode.terminalKind === 'success-end'
                        ? <span className="auto-fight-node-badge is-success-end"><CheckCircleIcon/> 成功结束</span>
                        : null}
                </div>
            </header>
            <div className="auto-fight-node-description">{state.description}</div>
            <div className="auto-fight-node-action-row">
                <ZapIcon aria-hidden="true"/>
                <span className="auto-fight-row-kind">Action</span>
                {action === undefined ? (
                    <span className="auto-fight-row-muted">No action</span>
                ) : (
                    <button
                        type="button"
                        className="auto-fight-resource-link nodrag"
                        aria-label={`查看 Action ${action.name}`}
                        onClick={(event) => {
                            stopPropagation(event);
                            data.onOpenDetail({kind: 'action', id: action.id, title: action.name});
                        }}
                    >
                        {action.name}
                    </button>
                )}
            </div>
            <div className="auto-fight-transfer-list">
                {transfers.map((transfer) => {
                    const conditionId = transfer.conditionId;
                    return (
                    <div className={`auto-fight-transfer-row is-${transfer.kind}`} key={transfer.id}>
                        {transfer.kind === 'action-fail' ? <AlertIcon aria-hidden="true"/> : <GitBranchIcon aria-hidden="true"/>}
                        {conditionId === undefined ? (
                            <button
                                type="button"
                                className="auto-fight-transfer-label nodrag"
                                onClick={() => data.onOpenDetail({
                                    kind: 'state',
                                    id: state.id,
                                    title: state.name,
                                    anchorId: transfer.id,
                                })}
                            >
                                {transfer.label}
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="auto-fight-transfer-label nodrag"
                                aria-label={`查看 Condition ${workflow.conditions[conditionId]?.name ?? conditionId}`}
                                onClick={() => data.onOpenDetail({
                                    kind: 'condition',
                                    id: conditionId,
                                    title: workflow.conditions[conditionId]?.name ?? conditionId,
                                })}
                            >
                                {transfer.label}
                            </button>
                        )}
                        <span className="auto-fight-transfer-target">→ {transfer.targetLabel}</span>
                        {horizontal ? (
                            <Handle
                                type="source"
                                id={transfer.id}
                                position={Position.Right}
                                className={`auto-fight-port is-${transfer.kind}`}
                                isConnectable={false}
                            />
                        ) : null}
                    </div>
                    );
                })}
            </div>
            {!horizontal && transfers.length > 0 ? (
                <div className="auto-fight-bottom-ports" aria-hidden="true">
                    {transfers.map((transfer, index) => (
                        <Handle
                            key={transfer.id}
                            type="source"
                            id={transfer.id}
                            position={Position.Bottom}
                            className={`auto-fight-port is-${transfer.kind}`}
                            style={{left: `${((index + 1) / (transfers.length + 1)) * 100}%`}}
                            isConnectable={false}
                        />
                    ))}
                </div>
            ) : null}
        </article>
    );
}
