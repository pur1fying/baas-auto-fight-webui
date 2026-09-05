import Link from 'next/link';
import {NavList} from '@primer/react';

import type {ProjectModule} from '@/features/auto-fight/project/model/workflowProject';
import {projectOverviewHref} from '@/features/auto-fight/project/model/workflowProject';

interface ProjectNavigationProps {
    readonly activeModule: ProjectModule | undefined;
    readonly projectId: string;
}

export const F1_MODULES: readonly {
    readonly group: 'Overview' | 'Design' | 'Verify';
    readonly module: ProjectModule;
    readonly label: string;
}[] = [
    {group: 'Overview', module: 'overview', label: 'Overview'},
    {group: 'Design', module: 'graph', label: 'State Graph'},
    {group: 'Design', module: 'actions', label: 'Actions'},
    {group: 'Design', module: 'conditions', label: 'Conditions'},
    {group: 'Verify', module: 'runs', label: 'Runs'},
];

const GROUPS = ['Overview', 'Design', 'Verify'] as const;

function moduleHref(projectId: string, projectModule: ProjectModule): string {
    const overviewHref = projectOverviewHref(projectId);
    return projectModule === 'overview' ? overviewHref : `${overviewHref}/${projectModule}`;
}

export function ProjectNavigation({activeModule, projectId}: ProjectNavigationProps) {
    return (
        <NavList aria-label="Workflow project modules" className="auto-fight-project-navigation">
            {GROUPS.map((group) => (
                <NavList.Group className="auto-fight-project-navigation-group" key={group} title={group}>
                    {F1_MODULES.filter((item) => item.group === group).map((item) => (
                        <NavList.Item
                            as={Link}
                            aria-current={activeModule === item.module ? 'page' : undefined}
                            href={moduleHref(projectId, item.module)}
                            key={item.module}
                        >
                            {item.label}
                        </NavList.Item>
                    ))}
                </NavList.Group>
            ))}
        </NavList>
    );
}
