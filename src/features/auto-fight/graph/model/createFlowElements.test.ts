import {describe, expect, test, vi} from 'vitest';

import {MOCK_WORKFLOW} from '@/features/auto-fight/mock/mockWorkflow';
import {
    applyRuntimeOverlay,
    createFlowElements,
} from '@/features/auto-fight/graph/model/createFlowElements';

describe('flow runtime overlay', () => {
    test('updates active elements without resetting dragged positions', () => {
        const initial = createFlowElements(
            MOCK_WORKFLOW,
            'left-to-right',
            {status: 'idle', visitedStateIds: []},
            vi.fn(),
        );
        const draggedNodes = initial.nodes.map((node) => node.id === 'opening'
            ? {...node, position: {x: 999, y: 777}}
            : node);

        const updated = applyRuntimeOverlay(draggedNodes, initial.edges, {
            status: 'running',
            activeStateId: 'opening',
            activeEdgeId: 'opening:condition:0',
            pendingStateId: 'burst',
            visitedStateIds: ['opening'],
        });

        expect(updated.nodes.find((node) => node.id === 'opening')?.position).toEqual({x: 999, y: 777});
        expect(updated.nodes.find((node) => node.id === 'opening')?.data.runtimeRole).toBe('active');
        expect(updated.nodes.find((node) => node.id === 'burst')?.data.runtimeRole).toBe('pending');
        expect(updated.edges.find((edge) => edge.id === 'opening:condition:0')?.data?.isActive).toBe(true);
    });
});
