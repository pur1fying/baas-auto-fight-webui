import type {WorkflowProjectSummary} from '@/features/auto-fight/project/model/workflowProject';

function readinessLabel(readiness: WorkflowProjectSummary['currentDraft']['readiness']): string {
    if (readiness === 'tested') return 'Tested';
    if (readiness === 'validated') return 'Validated';
    return 'Draft';
}

export function projectStatusText(project: WorkflowProjectSummary): string {
    const {currentDraft, latestVersion} = project;

    if (!currentDraft.isDirty && latestVersion !== undefined && currentDraft.baseVersionId === latestVersion.id) {
        return `Published ${latestVersion.label}`;
    }

    const currentLabel = currentDraft.isDirty ? 'Draft' : readinessLabel(currentDraft.readiness);
    return latestVersion === undefined ? currentLabel : `${currentLabel} · latest ${latestVersion.label}`;
}
