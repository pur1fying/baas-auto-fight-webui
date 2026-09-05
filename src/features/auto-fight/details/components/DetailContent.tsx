import {useEffect, useMemo, useState} from 'react';
import {SegmentedControl} from '@primer/react';

import type {WorkflowViewModel} from '@/features/auto-fight/model/workflow';
import type {DetailResourceRef} from '@/features/auto-fight/details/store/detailTabsReducer';
import {JsonBlock} from '@/features/auto-fight/details/renderers/JsonBlock';
import {
    ActionDetails,
    ConditionDetails,
    StateDetails,
    WorkflowDetails,
} from '@/features/auto-fight/details/renderers/StructuredDetails';

interface DetailContentProps {
    workflow: WorkflowViewModel;
    resource: DetailResourceRef;
}

function getResourceValue(workflow: WorkflowViewModel, resource: DetailResourceRef): unknown {
    switch (resource.kind) {
        case 'workflow':
            return workflow.sourceJson;
        case 'state':
            return workflow.states[resource.id];
        case 'action':
            return workflow.actions[resource.id];
        case 'condition':
            return workflow.conditions[resource.id];
    }
}

function StructuredContent({workflow, resource}: DetailContentProps) {
    switch (resource.kind) {
        case 'workflow':
            return <WorkflowDetails workflow={workflow}/>;
        case 'state':
            return workflow.states[resource.id] === undefined
                ? null
                : <StateDetails state={workflow.states[resource.id]} workflow={workflow}/>;
        case 'action':
            return workflow.actions[resource.id] === undefined
                ? null
                : <ActionDetails action={workflow.actions[resource.id]}/>;
        case 'condition':
            return workflow.conditions[resource.id] === undefined
                ? null
                : <ConditionDetails condition={workflow.conditions[resource.id]}/>;
    }
}

export function DetailContent({workflow, resource}: DetailContentProps) {
    const [view, setView] = useState<'structured' | 'json'>('structured');
    const rawValue = useMemo(() => getResourceValue(workflow, resource), [resource, workflow]);

    useEffect(() => {
        setView('structured');
    }, [resource.kind, resource.id]);

    return (
        <div className="auto-fight-detail-content">
            <SegmentedControl aria-label="详情显示模式" size="small">
                <SegmentedControl.Button
                    selected={view === 'structured'}
                    onClick={() => setView('structured')}
                >
                    结构化
                </SegmentedControl.Button>
                <SegmentedControl.Button
                    selected={view === 'json'}
                    onClick={() => setView('json')}
                >
                    原始 JSON
                </SegmentedControl.Button>
            </SegmentedControl>
            <div className="auto-fight-detail-body">
                {view === 'json'
                    ? <JsonBlock value={rawValue}/>
                    : <StructuredContent workflow={workflow} resource={resource}/>
                }
            </div>
        </div>
    );
}
