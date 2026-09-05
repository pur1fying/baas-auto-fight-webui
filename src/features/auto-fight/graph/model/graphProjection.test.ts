import {describe, expect, test} from 'vitest';

import {MOCK_WORKFLOW} from '@/features/auto-fight/mock/mockWorkflow';
import {
    classifyState,
    createEdgeId,
    projectWorkflowToGraph,
} from '@/features/auto-fight/graph/model/graphProjection';

describe('graph projection', () => {
    test('ships the mock workflow as immutable input data', () => {
        expect(Object.isFrozen(MOCK_WORKFLOW)).toBe(true);
        expect(Object.isFrozen(MOCK_WORKFLOW.states.opening.transitions)).toBe(true);
        expect(MOCK_WORKFLOW.sourceJson).toMatchObject({
            start_state: '开场',
            states: expect.objectContaining({开场: expect.any(Object)}),
            actions: expect.objectContaining({启动战斗: expect.any(Array)}),
            conditions: expect.objectContaining({费用充足: expect.any(Object)}),
        });
    });

    test('builds stable edge ids for every transition kind', () => {
        expect(createEdgeId('opening', 'condition', 0)).toBe('opening:condition:0');
        expect(createEdgeId('opening', 'default', 0)).toBe('opening:default:0');
        expect(createEdgeId('opening', 'action-fail', 0)).toBe('opening:action-fail:0');
    });

    test('distinguishes definite and success terminal states', () => {
        expect(classifyState(MOCK_WORKFLOW.states.victory)).toBe('definite-end');
        expect(classifyState(MOCK_WORKFLOW.states.finisher)).toBe('success-end');
        expect(classifyState(MOCK_WORKFLOW.states.opening)).toBe('normal');
    });

    test('keeps condition order and emits all transfer mechanisms', () => {
        const projection = projectWorkflowToGraph(MOCK_WORKFLOW);
        const opening = projection.nodes.find((node) => node.id === 'opening');
        const openingEdges = projection.edges.filter((edge) => edge.source === 'opening');

        expect(opening?.isStart).toBe(true);
        expect(openingEdges.map((edge) => edge.id)).toEqual([
            'opening:action-fail:0',
            'opening:condition:0',
            'opening:default:0',
        ]);
        expect(openingEdges.map((edge) => edge.kind)).toEqual([
            'action-fail',
            'condition',
            'default',
        ]);
    });
});
