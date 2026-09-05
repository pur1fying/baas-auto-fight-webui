import {notFound} from 'next/navigation';

import {getMockProject, ResourceBrowser} from '@/features/auto-fight';

interface ActionsPageProps {
    readonly params: Promise<{workflowId: string}>;
}

export default async function ActionsPage({params}: ActionsPageProps) {
    const {workflowId} = await params;
    const project = getMockProject(workflowId);
    if (project === undefined) notFound();

    return <ResourceBrowser kind="action" workflow={project.workflow}/>;
}
