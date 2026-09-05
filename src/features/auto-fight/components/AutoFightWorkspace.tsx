import {GraphModule} from '@/features/auto-fight/graph/components/GraphModule';
import type {WorkflowViewModel} from '@/features/auto-fight/model/workflow';

interface AutoFightWorkspaceProps {
    workflow: WorkflowViewModel;
}

export function AutoFightWorkspace({workflow}: AutoFightWorkspaceProps) {
    return <GraphModule workflow={workflow}/>;
}
