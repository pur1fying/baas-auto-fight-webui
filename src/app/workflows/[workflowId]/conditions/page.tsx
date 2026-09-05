import {notFound} from 'next/navigation';

import {getMockProject, ResourceBrowser} from '@/features/auto-fight';

interface ConditionsPageProps {
    readonly params: Promise<{workflowId: string}>;
}

export default async function ConditionsPage({params}: ConditionsPageProps) {
    const {workflowId} = await params;
    const project = getMockProject(workflowId);
    if (project === undefined) notFound();

    return <ResourceBrowser kind="condition" workflow={project.workflow}/>;
}
