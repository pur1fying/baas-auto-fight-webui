import type React from 'react';
import {notFound} from 'next/navigation';

import {
    getMockProject,
    MOCK_PROJECTS,
    ProjectWorkbenchShell,
} from '@/features/auto-fight';

interface WorkflowLayoutProps {
    readonly children: React.ReactNode;
    readonly params: Promise<{workflowId: string}>;
}

export default async function WorkflowLayout({children, params}: WorkflowLayoutProps) {
    const {workflowId} = await params;
    const project = getMockProject(workflowId);
    if (project === undefined) notFound();

    return (
        <ProjectWorkbenchShell project={project} projects={MOCK_PROJECTS}>
            {children}
        </ProjectWorkbenchShell>
    );
}
