import type {
    StateViewModel,
    TransitionKind,
    WorkflowViewModel,
} from '@/features/auto-fight/model/workflow';

export type TerminalKind = 'normal' | 'definite-end' | 'success-end';

export interface GraphNodeView {
    readonly id: string;
    readonly state: StateViewModel;
    readonly isStart: boolean;
    readonly terminalKind: TerminalKind;
    readonly width: number;
    readonly height: number;
}

export interface GraphEdgeView {
    readonly id: string;
    readonly source: string;
    readonly target: string;
    readonly sourceHandle: string;
    readonly kind: TransitionKind;
    readonly index: number;
    readonly conditionId?: string;
    readonly label: string;
}

export interface GraphProjection {
    readonly nodes: readonly GraphNodeView[];
    readonly edges: readonly GraphEdgeView[];
}

const NODE_WIDTH = 300;
const NODE_BASE_HEIGHT = 116;
const NODE_ROW_HEIGHT = 34;

export function createEdgeId(source: string, kind: TransitionKind, index: number): string {
    return `${source}:${kind}:${index}`;
}

export function classifyState(state: StateViewModel): TerminalKind {
    const hasSuccessTransfer = state.transitions.length > 0 || state.defaultTransition !== undefined;
    if (hasSuccessTransfer) {
        return 'normal';
    }
    return state.actionFailTransition === undefined ? 'definite-end' : 'success-end';
}

function createEdges(workflow: WorkflowViewModel, state: StateViewModel): GraphEdgeView[] {
    const edges: GraphEdgeView[] = [];

    if (state.actionFailTransition !== undefined) {
        edges.push({
            id: createEdgeId(state.id, 'action-fail', 0),
            source: state.id,
            target: state.actionFailTransition,
            sourceHandle: `${state.id}:action-fail:0`,
            kind: 'action-fail',
            index: 0,
            label: 'Action fail',
        });
    }

    state.transitions.forEach((transition, index) => {
        edges.push({
            id: createEdgeId(state.id, 'condition', index),
            source: state.id,
            target: transition.nextStateId,
            sourceHandle: `${state.id}:condition:${index}`,
            kind: 'condition',
            index,
            conditionId: transition.conditionId,
            label: `${index + 1}. ${workflow.conditions[transition.conditionId]?.name ?? transition.conditionId}`,
        });
    });

    if (state.defaultTransition !== undefined) {
        edges.push({
            id: createEdgeId(state.id, 'default', 0),
            source: state.id,
            target: state.defaultTransition,
            sourceHandle: `${state.id}:default:0`,
            kind: 'default',
            index: 0,
            label: 'Default',
        });
    }

    return edges;
}

export function projectWorkflowToGraph(workflow: WorkflowViewModel): GraphProjection {
    const nodes = Object.values(workflow.states).map((state) => {
        const transferRows = state.transitions.length
            + Number(state.actionFailTransition !== undefined)
            + Number(state.defaultTransition !== undefined);
        return {
            id: state.id,
            state,
            isStart: state.id === workflow.startStateId,
            terminalKind: classifyState(state),
            width: NODE_WIDTH,
            height: NODE_BASE_HEIGHT + transferRows * NODE_ROW_HEIGHT,
        } satisfies GraphNodeView;
    });

    return {
        nodes,
        edges: nodes.flatMap((node) => createEdges(workflow, node.state)),
    };
}
