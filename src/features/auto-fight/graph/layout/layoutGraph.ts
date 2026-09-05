import {Graph, layout} from '@dagrejs/dagre';

import type {LayoutDirection} from '@/features/auto-fight/model/workflow';
import type {GraphProjection} from '@/features/auto-fight/graph/model/graphProjection';

export interface PositionedNode {
    readonly id: string;
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
}

export interface LayoutResult {
    readonly nodesById: Readonly<Record<string, PositionedNode>>;
}

export function layoutGraph(
    projection: GraphProjection,
    direction: LayoutDirection,
): LayoutResult {
    const graph = new Graph().setDefaultEdgeLabel(() => ({}));
    graph.setGraph({
        rankdir: direction === 'left-to-right' ? 'LR' : 'TB',
        ranksep: 110,
        nodesep: 58,
        edgesep: 24,
        marginx: 48,
        marginy: 48,
    });

    for (const node of projection.nodes) {
        graph.setNode(node.id, {width: node.width, height: node.height});
    }
    for (const edge of projection.edges) {
        graph.setEdge(edge.source, edge.target, {weight: edge.kind === 'condition' ? 2 : 1});
    }

    layout(graph);

    const nodesById = Object.fromEntries(projection.nodes.map((node) => {
        const position = graph.node(node.id);
        return [node.id, {
            id: node.id,
            x: position.x - node.width / 2,
            y: position.y - node.height / 2,
            width: node.width,
            height: node.height,
        } satisfies PositionedNode];
    }));

    return {nodesById};
}
