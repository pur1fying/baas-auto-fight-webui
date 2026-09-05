import Link from 'next/link';
import {Heading, Label, Text} from '@primer/react';
import {HomeIcon} from '@primer/octicons-react';

import type {WorkflowProjectSummary} from '@/features/auto-fight/project/model/workflowProject';
import {projectOverviewHref} from '@/features/auto-fight/project/model/workflowProject';
import {projectStatusText} from '@/features/auto-fight/project/model/projectStatus';

interface WorkflowHomeSidebarProps {
    projects: readonly WorkflowProjectSummary[];
}

export function WorkflowHomeSidebar({projects}: WorkflowHomeSidebarProps) {
    const pinnedProjects = projects.filter((project) => project.isPinned);
    const recentProjects = projects.filter((project) => !project.isPinned);

    return (
        <div className="auto-fight-home-sidebar">
            <nav aria-label="Workflow navigation">
                <Link aria-current="page" className="auto-fight-home-nav active" href="/">
                    <HomeIcon aria-hidden="true"/>
                    <span>Home</span>
                </Link>
            </nav>
            <Heading as="h2" className="auto-fight-sidebar-heading">Pinned workflows</Heading>
            <div className="auto-fight-sidebar-projects">
                {pinnedProjects.map((project) => (
                    <Link className="auto-fight-sidebar-project" href={projectOverviewHref(project.id)} key={project.id}>
                        <Text as="span" className="auto-fight-sidebar-project-name">{project.name}</Text>
                        <span className="auto-fight-sidebar-project-meta">
                            <Label size="small" variant={project.currentDraft.isDirty ? 'attention' : 'success'}>
                                {projectStatusText(project)}
                            </Label>
                            {project.updatedLabel}
                        </span>
                    </Link>
                ))}
            </div>
            <Heading as="h2" className="auto-fight-sidebar-heading">Recent workflows</Heading>
            <div className="auto-fight-sidebar-projects">
                {recentProjects.map((project) => (
                    <Link className="auto-fight-sidebar-project" href={projectOverviewHref(project.id)} key={project.id}>
                        <Text as="span" className="auto-fight-sidebar-project-name">{project.name}</Text>
                        <span className="auto-fight-sidebar-project-meta">
                            <Label size="small" variant={project.currentDraft.isDirty ? 'attention' : 'success'}>
                                {projectStatusText(project)}
                            </Label>
                            {project.updatedLabel}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
