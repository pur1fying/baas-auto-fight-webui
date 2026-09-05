import {notFound} from 'next/navigation';

import {getMockProject, RunsModule} from '@/features/auto-fight';

interface RunsPageProps {
    readonly params: Promise<{workflowId: string}>;
}

export default async function RunsPage({params}: RunsPageProps) {
    const {workflowId} = await params;
    const project = getMockProject(workflowId);
    if (project === undefined) notFound();

    return <RunsModule workflow={project.workflow}/>;
}
