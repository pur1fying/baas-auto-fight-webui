import {describe, expect, test} from 'vitest';

import {MOCK_WORKFLOW} from '@/features/auto-fight/mock/mockWorkflow';
import {createResourceCatalog} from '@/features/auto-fight/resources/model/resourceCatalog';

describe('read-only resource catalog projection', () => {
    test('projects Action usage without mutating or reordering the workflow', () => {
        const items = createResourceCatalog(MOCK_WORKFLOW, 'action');

        expect(items.map((item) => item.id)).toEqual([
            'start-battle',
            'wait',
            'burst-damage',
            'finishing-skill',
            'restart-battle',
        ]);
        expect(items.find((item) => item.id === 'wait')).toMatchObject({
            name: '等待',
            usageCount: 1,
        });
        expect(Object.isFrozen(MOCK_WORKFLOW)).toBe(true);
    });

    test('counts every ordered Condition transition usage', () => {
        const items = createResourceCatalog(MOCK_WORKFLOW, 'condition');

        expect(items.find((item) => item.id === 'cost-ready')).toMatchObject({usageCount: 2});
        expect(items.find((item) => item.id === 'boss-defeated')).toMatchObject({usageCount: 1});
    });
});
