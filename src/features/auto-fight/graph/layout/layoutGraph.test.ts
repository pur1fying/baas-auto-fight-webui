import {describe, expect, test} from 'vitest';

import {MOCK_WORKFLOW} from '@/features/auto-fight/mock/mockWorkflow';
import {projectWorkflowToGraph} from '@/features/auto-fight/graph/model/graphProjection';
import {layoutGraph} from '@/features/auto-fight/graph/layout/layoutGraph';

describe('layoutGraph', () => {
    test('places the first condition target to the right in horizontal layout', () => {
        const projection = projectWorkflowToGraph(MOCK_WORKFLOW);
        const original = structuredClone(projection.nodes);
        const result = layoutGraph(projection, 'left-to-right');

        expect(result.nodesById.burst.x).toBeGreaterThan(result.nodesById.opening.x);
        expect(projection.nodes).toEqual(original);
    });

    test('places the first condition target below in vertical layout', () => {
        const projection = projectWorkflowToGraph(MOCK_WORKFLOW);
        const result = layoutGraph(projection, 'top-to-bottom');

        expect(result.nodesById.burst.y).toBeGreaterThan(result.nodesById.opening.y);
    });

    test('does not overlap node rectangles in either direction', () => {
        const projection = projectWorkflowToGraph(MOCK_WORKFLOW);

        for (const direction of ['left-to-right', 'top-to-bottom'] as const) {
            const nodes = Object.values(layoutGraph(projection, direction).nodesById);
            for (let index = 0; index < nodes.length; index += 1) {
                for (let otherIndex = index + 1; otherIndex < nodes.length; otherIndex += 1) {
                    const first = nodes[index];
                    const second = nodes[otherIndex];
                    const overlaps =
                        first.x < second.x + second.width &&
                        first.x + first.width > second.x &&
                        first.y < second.y + second.height &&
                        first.y + first.height > second.y;
                    expect(overlaps).toBe(false);
                }
            }
        }
    });
});
