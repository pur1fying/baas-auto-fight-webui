import {describe, expect, test} from 'vitest';

import {projectStatusText} from '@/features/auto-fight/project/model/projectStatus';
import {MOCK_PROJECTS} from '@/features/auto-fight/project/mock/mockProjects';
import {
    projectModuleFromSegment,
    projectModuleHref,
} from '@/features/auto-fight/project/model/workflowProject';
import type {WorkflowProjectSummary} from '@/features/auto-fight/project/model/workflowProject';

const SUMMARY: WorkflowProjectSummary = {
    id: 'raid',
    name: 'Raid',
    description: 'Example',
    currentDraft: {
        readiness: 'validated',
        isDirty: true,
        savedRevisionId: 'r18',
        baseVersionId: 'v4',
    },
    latestVersion: {
        id: 'v4',
        label: '0.4.0',
        publishedAtLabel: '3 days ago',
    },
    stateCount: 7,
    transitionCount: 9,
    updatedLabel: '12 minutes ago',
    lastModule: 'graph',
    isPinned: true,
};

describe('F1 project read model', () => {
    test('keeps dirty Draft readiness and latest release availability orthogonal', () => {
        expect(projectStatusText(SUMMARY)).toBe('Draft · latest 0.4.0');
    });

    test('describes a clean Draft that still matches its latest published version', () => {
        expect(projectStatusText({
            ...SUMMARY,
            currentDraft: {...SUMMARY.currentDraft, isDirty: false},
        })).toBe('Published 0.4.0');
    });

    test('restores the last supported F1 module', () => {
        expect(projectModuleHref(SUMMARY)).toBe('/workflows/raid/graph');
    });

    test('rejects unsupported module segments at the route boundary', () => {
        expect(projectModuleFromSegment(null)).toBe('overview');
        expect(projectModuleFromSegment('runs')).toBe('runs');
        expect(projectModuleFromSegment('versions')).toBeUndefined();
    });

    test('keeps Mock project summaries and nested status values immutable', () => {
        expect(Object.isFrozen(MOCK_PROJECTS)).toBe(true);
        expect(Object.isFrozen(MOCK_PROJECTS[0])).toBe(true);
        expect(Object.isFrozen(MOCK_PROJECTS[0].currentDraft)).toBe(true);
        expect(Object.isFrozen(MOCK_PROJECTS[0].latestVersion)).toBe(true);
    });
});
