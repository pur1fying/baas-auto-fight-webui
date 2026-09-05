import type {WorkflowProject} from '@/features/auto-fight/project/model/workflowProject';

export interface OverviewAction {
    readonly label: string;
    readonly href: string;
    readonly reason: string;
}

export function getOverviewAction(project: WorkflowProject): OverviewAction {
    return {
        label: 'Open State Graph',
        href: `/workflows/${project.summary.id}/graph`,
        reason: 'Review states, transitions, Start and End markers.',
    };
}
