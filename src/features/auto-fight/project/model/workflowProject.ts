import type {WorkflowViewModel} from '@/features/auto-fight/model/workflow';

export type ProjectModule = 'overview' | 'graph' | 'actions' | 'conditions' | 'runs';

export type DraftReadiness = 'draft' | 'validated' | 'tested';

export interface DraftSummary {
    readonly readiness: DraftReadiness;
    readonly isDirty: boolean;
    readonly savedRevisionId?: string;
    readonly baseVersionId?: string;
}

export interface PublishedVersionSummary {
    readonly id: string;
    readonly label: string;
    readonly publishedAtLabel: string;
}

export interface WorkflowProjectSummary {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly currentDraft: DraftSummary;
    readonly latestVersion?: PublishedVersionSummary;
    readonly stateCount: number;
    readonly transitionCount: number;
    readonly updatedLabel: string;
    readonly lastModule: ProjectModule;
    readonly isPinned: boolean;
    readonly attention?: string;
}

export interface WorkflowProjectActivity {
    readonly id: string;
    readonly kind: 'edited' | 'validated' | 'published';
    readonly title: string;
    readonly detail: string;
    readonly occurredLabel: string;
}

export interface WorkflowProject {
    readonly summary: WorkflowProjectSummary;
    readonly workflow: WorkflowViewModel;
    readonly owner: string;
    readonly language: string;
    readonly createdLabel: string;
    readonly sourceLabel: string;
    readonly activities: readonly WorkflowProjectActivity[];
}

export function projectOverviewHref(projectId: string): string {
    return `/workflows/${projectId}`;
}

export function projectModuleHref(project: WorkflowProjectSummary): string {
    const overviewHref = projectOverviewHref(project.id);
    return project.lastModule === 'overview' ? overviewHref : `${overviewHref}/${project.lastModule}`;
}

export function projectModuleFromSegment(segment: string | null): ProjectModule | undefined {
    if (segment === null) return 'overview';
    if (segment === 'graph' || segment === 'actions' || segment === 'conditions' || segment === 'runs') {
        return segment;
    }
    return undefined;
}
