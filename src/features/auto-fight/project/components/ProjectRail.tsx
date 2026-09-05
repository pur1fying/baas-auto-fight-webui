import Link from 'next/link';
import {ArrowLeftIcon, SidebarCollapseIcon, SidebarExpandIcon, WorkflowIcon} from '@primer/octicons-react';
import {IconButton, Text} from '@primer/react';

import type {WorkflowProjectSummary} from '@/features/auto-fight/project/model/workflowProject';
import {projectOverviewHref} from '@/features/auto-fight/project/model/workflowProject';

interface ProjectRailProps {
    readonly activeProjectId: string;
    readonly projects: readonly WorkflowProjectSummary[];
    readonly collapsed?: boolean;
    readonly onToggleCollapsed?: () => void;
}

export function ProjectRail({
    activeProjectId,
    projects,
    collapsed = false,
    onToggleCollapsed,
}: ProjectRailProps) {
    const pinnedProjects = projects.filter((project) => project.isPinned);
    const recentProjects = projects.filter((project) => !project.isPinned);

    return (
        <nav
            aria-label="Workflow projects"
            className="auto-fight-project-rail"
            data-collapsed={collapsed}
        >
            <div className="auto-fight-project-rail-header">
                <Link aria-label="Back to dashboard" className="auto-fight-project-rail-back" href="/">
                    <ArrowLeftIcon aria-hidden="true"/>
                    {!collapsed && <span>Back to dashboard</span>}
                </Link>
                {onToggleCollapsed !== undefined && (
                    <IconButton
                        aria-label={collapsed ? 'Expand project rail' : 'Collapse project rail'}
                        icon={collapsed ? SidebarExpandIcon : SidebarCollapseIcon}
                        onClick={onToggleCollapsed}
                        size="small"
                        variant="invisible"
                    />
                )}
            </div>
            <ProjectRailGroup
                activeProjectId={activeProjectId}
                collapsed={collapsed}
                label="Pinned"
                projects={pinnedProjects}
            />
            <ProjectRailGroup
                activeProjectId={activeProjectId}
                collapsed={collapsed}
                label="Recent"
                projects={recentProjects}
            />
        </nav>
    );
}

interface ProjectRailGroupProps {
    readonly activeProjectId: string;
    readonly collapsed: boolean;
    readonly label: string;
    readonly projects: readonly WorkflowProjectSummary[];
}

function ProjectRailGroup({activeProjectId, collapsed, label, projects}: ProjectRailGroupProps) {
    return (
        <section aria-label={`${label} workflows`} className="auto-fight-project-rail-group">
            {!collapsed && <Text as="h2">{label}</Text>}
            {projects.map((project) => (
                <Link
                    aria-current={project.id === activeProjectId ? 'page' : undefined}
                    aria-label={collapsed ? project.name : undefined}
                    className="auto-fight-project-rail-link"
                    href={projectOverviewHref(project.id)}
                    key={project.id}
                    title={collapsed ? project.name : undefined}
                >
                    <WorkflowIcon aria-hidden="true"/>
                    {!collapsed && <span>{project.name}</span>}
                </Link>
            ))}
        </section>
    );
}
