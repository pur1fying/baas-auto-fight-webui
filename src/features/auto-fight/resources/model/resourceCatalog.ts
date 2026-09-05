import type {WorkflowViewModel} from '@/features/auto-fight/model/workflow';

export type ResourceKind = 'action' | 'condition';

export interface ResourceCatalogItem {
    readonly kind: ResourceKind;
    readonly id: string;
    readonly name: string;
    readonly typeLabel: string;
    readonly description: string;
    readonly usageCount: number;
}

function actionUsageCount(workflow: WorkflowViewModel, actionId: string): number {
    return Object.values(workflow.states).filter((state) => state.actionId === actionId).length;
}

function conditionUsageCount(workflow: WorkflowViewModel, conditionId: string): number {
    return Object.values(workflow.states).reduce(
        (count, state) => count + state.transitions.filter(
            (transition) => transition.conditionId === conditionId,
        ).length,
        0,
    );
}

export function createResourceCatalog(
    workflow: WorkflowViewModel,
    kind: ResourceKind,
): readonly ResourceCatalogItem[] {
    if (kind === 'action') {
        return Object.values(workflow.actions).map((action) => ({
            kind,
            id: action.id,
            name: action.name,
            typeLabel: action.steps[0]?.type ?? 'Action',
            description: action.description,
            usageCount: actionUsageCount(workflow, action.id),
        }));
    }

    return Object.values(workflow.conditions).map((condition) => ({
        kind,
        id: condition.id,
        name: condition.name,
        typeLabel: condition.type,
        description: condition.description,
        usageCount: conditionUsageCount(workflow, condition.id),
    }));
}
