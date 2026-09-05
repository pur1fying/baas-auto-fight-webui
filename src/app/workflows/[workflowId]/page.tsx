import {notFound} from 'next/navigation';

import {getMockProject, ProjectOverview} from '@/features/auto-fight';

interface WorkflowOverviewPageProps {
    readonly params: Promise<{workflowId: string}>;
}

export default async function WorkflowOverviewPage({params}: WorkflowOverviewPageProps) {
    const {workflowId} = await params;
    const project = getMockProject(workflowId);
    if (project === undefined) notFound();

    return <ProjectOverview project={project}/>;
}
