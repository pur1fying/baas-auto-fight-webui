'use client';

import type React from 'react';
import {useEffect, useState} from 'react';
import {useSelectedLayoutSegment} from 'next/navigation';

import DefaultLayout from '@/components/layouts/default/layout';
import TopNavBar from '@/components/top_nav/top_nav';
import {ProjectHeader} from '@/features/auto-fight/project/components/ProjectHeader';
import {ProjectNavigation} from '@/features/auto-fight/project/components/ProjectNavigation';
import {ProjectRail} from '@/features/auto-fight/project/components/ProjectRail';
import type {
    WorkflowProject,
    WorkflowProjectSummary,
} from '@/features/auto-fight/project/model/workflowProject';
import {projectModuleFromSegment} from '@/features/auto-fight/project/model/workflowProject';

import '@/features/auto-fight/styles/project-shell.css';

export interface ProjectWorkbenchShellProps {
    readonly project: WorkflowProject;
    readonly projects: readonly WorkflowProjectSummary[];
    readonly children: React.ReactNode;
}

export function ProjectWorkbenchShell({project, projects, children}: ProjectWorkbenchShellProps) {
    const [railCollapsed, setRailCollapsed] = useState(false);
    const selectedSegment = useSelectedLayoutSegment();
    const activeModule = projectModuleFromSegment(selectedSegment);

    useEffect(() => {
        const media = window.matchMedia('(max-width: 1120px)');
        const syncRail = (event: Pick<MediaQueryListEvent, 'matches'>) => {
            setRailCollapsed(event.matches);
        };
        syncRail(media);
        media.addEventListener('change', syncRail);
        return () => media.removeEventListener('change', syncRail);
    }, []);

    return (
        <DefaultLayout
            content={(
                <div className="auto-fight-workbench">
                    <ProjectHeader project={project}/>
                    <ProjectNavigation activeModule={activeModule} projectId={project.summary.id}/>
                    <div className="auto-fight-workbench-module">{children}</div>
                </div>
            )}
            contentMode="fill"
            header={<TopNavBar/>}
            sidebar={(
                <ProjectRail
                    activeProjectId={project.summary.id}
                    collapsed={railCollapsed}
                    onToggleCollapsed={() => setRailCollapsed((collapsed) => !collapsed)}
                    projects={projects}
                />
            )}
            sidebarWidth={railCollapsed ? '4.25rem' : '16rem'}
        />
    );
}
