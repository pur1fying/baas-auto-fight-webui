import {notFound} from 'next/navigation';

import {getMockProject, GraphModule} from '@/features/auto-fight';

interface GraphPageProps {
    readonly params: Promise<{workflowId: string}>;
}

export default async function GraphPage({params}: GraphPageProps) {
    const {workflowId} = await params;
    const project = getMockProject(workflowId);
    if (project === undefined) notFound();

    return <GraphModule workflow={project.workflow}/>;
}
