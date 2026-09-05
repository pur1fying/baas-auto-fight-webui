import {describe, expect, test} from 'vitest';

import {getRuntimeEdgeClass} from '@/features/auto-fight/graph/edges/TransitionEdge';

describe('TransitionEdge runtime styling', () => {
    test('freezes the animated overlay while runtime is paused', () => {
        expect(getRuntimeEdgeClass(true)).toBe('auto-fight-edge-runtime is-paused');
        expect(getRuntimeEdgeClass(false)).toBe('auto-fight-edge-runtime');
    });
});
