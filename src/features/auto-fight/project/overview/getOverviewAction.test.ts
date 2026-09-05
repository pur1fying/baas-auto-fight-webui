import {expect, test} from 'vitest';

import {MOCK_PROJECT} from '@/features/auto-fight/project/mock/mockProjects';
import {getOverviewAction} from '@/features/auto-fight/project/overview/getOverviewAction';

test('F1 Overview recommends one implemented read-only destination', () => {
    expect(getOverviewAction(MOCK_PROJECT)).toEqual({
        label: 'Open State Graph',
        href: '/workflows/mock-raid-workflow/graph',
        reason: 'Review states, transitions, Start and End markers.',
    });
});
