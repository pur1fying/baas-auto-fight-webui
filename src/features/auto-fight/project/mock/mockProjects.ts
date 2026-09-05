import {MOCK_WORKFLOW} from '@/features/auto-fight/mock/mockWorkflow';
import type {
    WorkflowProject,
    WorkflowProjectSummary,
} from '@/features/auto-fight/project/model/workflowProject';

function deepFreeze<T>(value: T): T {
    if (value !== null && typeof value === 'object' && !Object.isFrozen(value)) {
        for (const child of Object.values(value)) deepFreeze(child);
        Object.freeze(value);
    }
    return value;
}

const PRIMARY_SUMMARY: WorkflowProjectSummary = deepFreeze({
    id: MOCK_WORKFLOW.id,
    name: '主线推图 · 爆发队',
    description: '开场费用判断与爆发循环仍在完善。',
    currentDraft: {
        readiness: 'draft',
        isDirty: true,
        savedRevisionId: 'draft-r18',
        baseVersionId: 'version-0.3.2',
    },
    latestVersion: {
        id: 'version-0.3.2',
        label: '0.3.2',
        publishedAtLabel: '5 days ago',
    },
    stateCount: Object.keys(MOCK_WORKFLOW.states).length,
    transitionCount: 9,
    updatedLabel: '12 minutes ago',
    lastModule: 'graph',
    isPinned: true,
    attention: '2 schema errors block validation',
});

export const MOCK_PROJECTS: readonly WorkflowProjectSummary[] = deepFreeze([
    PRIMARY_SUMMARY,
    {
        id: 'indoor-bounty',
        name: '悬赏通缉 · 室内',
        description: '已通过结构校验，等待运行检查。',
        currentDraft: {
            readiness: 'validated',
            isDirty: false,
            savedRevisionId: 'draft-r7',
        },
        stateCount: 11,
        transitionCount: 14,
        updatedLabel: 'Yesterday',
        lastModule: 'overview',
        isPinned: true,
    },
    {
        id: 'raid-test-axis',
        name: '总力战 · 测试轴',
        description: '用于运行观察与发布流程验证。',
        currentDraft: {
            readiness: 'tested',
            isDirty: false,
            savedRevisionId: 'draft-r12',
            baseVersionId: 'version-1.0.0',
        },
        latestVersion: {
            id: 'version-1.0.0',
            label: '1.0.0',
            publishedAtLabel: '3 days ago',
        },
        stateCount: 15,
        transitionCount: 21,
        updatedLabel: '3 days ago',
        lastModule: 'overview',
        isPinned: false,
    },
]);

export const MOCK_PROJECT: WorkflowProject = deepFreeze({
    summary: PRIMARY_SUMMARY,
    workflow: MOCK_WORKFLOW,
    owner: 'pur1fying',
    language: 'zh-CN',
    createdLabel: 'Aug 27, 2026',
    sourceLabel: 'Imported JSON',
    activities: [
        {
            id: 'activity-edit-wait',
            kind: 'edited',
            title: '修改 State “等待费用”',
            detail: '更新 Default transition',
            occurredLabel: '12 min',
        },
        {
            id: 'activity-add-condition',
            kind: 'validated',
            title: '新增 Condition “Boss 已击败”',
            detail: '用于进入战斗胜利状态',
            occurredLabel: 'Yesterday',
        },
    ],
} satisfies WorkflowProject);

export function getMockProject(projectId: string): WorkflowProject | undefined {
    return projectId === MOCK_PROJECT.summary.id ? MOCK_PROJECT : undefined;
}
