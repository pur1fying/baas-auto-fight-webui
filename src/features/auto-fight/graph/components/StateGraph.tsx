'use client';

import type {ForwardedRef} from 'react';
import {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import {
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    BackgroundVariant,
    Controls,
    MiniMap,
    ReactFlow,
    ReactFlowProvider,
    useReactFlow,
} from '@xyflow/react';
import type {EdgeChange, NodeChange, NodeTypes, EdgeTypes} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import type {DetailResourceRef} from '@/features/auto-fight/details/store/detailTabsReducer';
import type {LayoutDirection, WorkflowViewModel} from '@/features/auto-fight/model/workflow';
import type {RuntimeVisualState} from '@/features/auto-fight/graph/runtime/runtimeTypes';
import type {StateFlowNode, TransitionFlowEdge} from '@/features/auto-fight/graph/flowTypes';
import {
    applyRuntimeOverlay,
    createFlowElements,
} from '@/features/auto-fight/graph/model/createFlowElements';
import {StateNode} from '@/features/auto-fight/graph/nodes/StateNode';
import {TransitionEdge} from '@/features/auto-fight/graph/edges/TransitionEdge';

const NODE_TYPES = {state: StateNode} satisfies NodeTypes;
const EDGE_TYPES = {transition: TransitionEdge} satisfies EdgeTypes;

export interface StateGraphHandle {
    readonly fitView: () => Promise<boolean>;
}

export interface StateGraphProps {
    readonly workflow: WorkflowViewModel;
    readonly direction: LayoutDirection;
    readonly runtimeState: RuntimeVisualState;
    readonly onOpenDetail: (resource: DetailResourceRef) => void;
    readonly followActiveState?: boolean;
}

interface StateGraphCanvasProps extends StateGraphProps {
    readonly graphRef: ForwardedRef<StateGraphHandle>;
}

function motionDuration(): number {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 280;
}

function StateGraphCanvas({
    workflow,
    direction,
    runtimeState,
    onOpenDetail,
    followActiveState = false,
    graphRef,
}: StateGraphCanvasProps) {
    const [initialElements] = useState(() => createFlowElements(workflow, direction, runtimeState, onOpenDetail));
    const runtimeRef = useRef(runtimeState);
    runtimeRef.current = runtimeState;
    const [nodes, setNodes] = useState<StateFlowNode[]>(initialElements.nodes);
    const [edges, setEdges] = useState<TransitionFlowEdge[]>(initialElements.edges);
    const {fitView, getNode} = useReactFlow<StateFlowNode, TransitionFlowEdge>();
    const fitGraph = useCallback(
        () => fitView({padding: 0.16, duration: motionDuration()}),
        [fitView],
    );

    useImperativeHandle(graphRef, () => ({fitView: fitGraph}), [fitGraph]);

    useEffect(() => {
        const elements = createFlowElements(workflow, direction, runtimeRef.current, onOpenDetail);
        setNodes(elements.nodes);
        setEdges(elements.edges);
        const frame = requestAnimationFrame(() => void fitGraph());
        return () => cancelAnimationFrame(frame);
    }, [direction, fitGraph, onOpenDetail, workflow]);

    useEffect(() => {
        setNodes((currentNodes) => applyRuntimeOverlay(currentNodes, [], runtimeState).nodes);
        setEdges((currentEdges) => applyRuntimeOverlay([], currentEdges, runtimeState).edges);
    }, [runtimeState]);

    useEffect(() => {
        if (!followActiveState || runtimeState.activeStateId === undefined) return;
        const activeNode = getNode(runtimeState.activeStateId);
        if (activeNode === undefined) return;
        const frame = requestAnimationFrame(() => void fitView({
            nodes: [activeNode],
            padding: 0.7,
            duration: motionDuration(),
            maxZoom: 1.1,
        }));
        return () => cancelAnimationFrame(frame);
    }, [fitView, followActiveState, getNode, runtimeState.activeStateId]);

    return (
        <ReactFlow<StateFlowNode, TransitionFlowEdge>
            nodes={nodes}
            edges={edges}
            nodeTypes={NODE_TYPES}
            edgeTypes={EDGE_TYPES}
            onNodesChange={(changes: NodeChange<StateFlowNode>[]) => setNodes((current) => applyNodeChanges(changes, current))}
            onEdgesChange={(changes: EdgeChange<TransitionFlowEdge>[]) => setEdges((current) => applyEdgeChanges(changes, current))}
            nodesConnectable={false}
            edgesReconnectable={false}
            deleteKeyCode={null}
            zoomOnDoubleClick={false}
            fitView
            minZoom={0.25}
            maxZoom={1.8}
            className="auto-fight-flow"
        >
            <Background variant={BackgroundVariant.Dots} gap={22} size={1.2}/>
            <Controls position="bottom-left" showInteractive={false}/>
            <MiniMap pannable zoomable position="bottom-right" nodeBorderRadius={8}/>
        </ReactFlow>
    );
}

export const StateGraph = forwardRef<StateGraphHandle, StateGraphProps>(function StateGraph(props, ref) {
    return (
        <div className="auto-fight-graph" aria-label="自动战斗状态图">
            <ReactFlowProvider>
                <StateGraphCanvas {...props} graphRef={ref}/>
            </ReactFlowProvider>
        </div>
    );
});
