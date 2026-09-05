import {useEffect, useMemo, useState} from 'react';
import {Heading, SegmentedControl, Text} from '@primer/react';

import type {WorkflowViewModel} from '@/features/auto-fight/model/workflow';
import type {DetailResourceRef} from '@/features/auto-fight/details/store/detailTabsReducer';
import {JsonBlock} from '@/features/auto-fight/details/renderers/JsonBlock';
import {
    ActionDetails,
    ConditionDetails,
    StateDetails,
    WorkflowDetails,
    getDetailAnchorDomId,
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

function resourceExists(workflow: WorkflowViewModel, resource: DetailResourceRef): boolean {
    if (resource.kind === 'workflow') return resource.id === workflow.id;
    if (resource.kind === 'state') return workflow.states[resource.id] !== undefined;
    if (resource.kind === 'action') return workflow.actions[resource.id] !== undefined;
    return workflow.conditions[resource.id] !== undefined;
}

function StructuredContent({workflow, resource}: DetailContentProps) {
    switch (resource.kind) {
        case 'workflow':
            return <WorkflowDetails workflow={workflow}/>;
        case 'state':
            return workflow.states[resource.id] === undefined
                ? null
                : (
                    <StateDetails
                        state={workflow.states[resource.id]}
                        workflow={workflow}
                        anchorId={resource.anchorId}
                    />
                );
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

interface UsageItem {
    readonly key: string;
    readonly stateName: string;
    readonly description: string;
}

function getUsageItems(workflow: WorkflowViewModel, resource: DetailResourceRef): readonly UsageItem[] {
    if (resource.kind === 'workflow') return [];
    if (resource.kind === 'action') {
        return Object.values(workflow.states)
            .filter((state) => state.actionId === resource.id)
            .map((state) => ({
                key: state.id,
                stateName: state.name,
                description: 'Action row',
            }));
    }
    if (resource.kind === 'condition') {
        return Object.values(workflow.states).flatMap((state) => state.transitions.flatMap(
            (transition, index) => transition.conditionId === resource.id ? [{
                key: `${state.id}:${index}`,
                stateName: state.name,
                description: `Condition transition ${index + 1}`,
            }] : [],
        ));
    }

    return Object.values(workflow.states).flatMap((state) => {
        const usages: UsageItem[] = [];
        state.transitions.forEach((transition, index) => {
            if (transition.nextStateId === resource.id) usages.push({
                key: `${state.id}:condition:${index}`,
                stateName: state.name,
                description: `Condition transition ${index + 1}`,
            });
        });
        if (state.defaultTransition === resource.id) usages.push({
            key: `${state.id}:default`,
            stateName: state.name,
            description: 'Default transition',
        });
        if (state.actionFailTransition === resource.id) usages.push({
            key: `${state.id}:action-fail`,
            stateName: state.name,
            description: 'Action fail transition',
        });
        return usages;
    });
}

function UsageContent({workflow, resource}: DetailContentProps) {
    const usages = getUsageItems(workflow, resource);
    return (
        <div className="auto-fight-detail-usage">
            <Heading as="h2">Usage</Heading>
            {resource.kind === 'workflow' ? (
                <Text as="p">Workflow JSON is the root document.</Text>
            ) : usages.length === 0 ? (
                <Text as="p">This resource is not referenced by any State.</Text>
            ) : usages.map((usage) => (
                <div className="auto-fight-detail-card" key={usage.key}>
                    <Text as="strong">{usage.stateName}</Text>
                    <Text as="div">{usage.description}</Text>
                </div>
            ))}
        </div>
    );
}

export function DetailContent({workflow, resource}: DetailContentProps) {
    const [view, setView] = useState<'fields' | 'json' | 'usage'>('fields');
    const rawValue = useMemo(() => getResourceValue(workflow, resource), [resource, workflow]);
    const exists = resourceExists(workflow, resource);

    useEffect(() => {
        setView('fields');
        const anchorId = resource.anchorId;
        if (anchorId === undefined) {
            return;
        }
        const frame = requestAnimationFrame(() => {
            document.getElementById(getDetailAnchorDomId(anchorId))
                ?.scrollIntoView?.({block: 'center'});
        });
        return () => cancelAnimationFrame(frame);
    }, [resource]);

    if (!exists) {
        return (
            <div className="auto-fight-detail-empty" role="status">
                <div>
                    <Heading as="h2">Resource not found</Heading>
                    <Text as="p">The {resource.kind} “{resource.id}” is not present in this workflow.</Text>
                </div>
            </div>
        );
    }

    return (
        <div className="auto-fight-detail-content">
            <SegmentedControl aria-label="Detail view" size="small">
                <SegmentedControl.Button
                    selected={view === 'fields'}
                    onClick={() => setView('fields')}
                >
                    Fields
                </SegmentedControl.Button>
                <SegmentedControl.Button
                    selected={view === 'json'}
                    onClick={() => setView('json')}
                >
                    Raw JSON
                </SegmentedControl.Button>
                <SegmentedControl.Button
                    selected={view === 'usage'}
                    onClick={() => setView('usage')}
                >
                    Usage
                </SegmentedControl.Button>
            </SegmentedControl>
            <div className="auto-fight-detail-body">
                {view === 'json' && <JsonBlock value={rawValue}/>}
                {view === 'fields' && <StructuredContent workflow={workflow} resource={resource}/>}
                {view === 'usage' && <UsageContent workflow={workflow} resource={resource}/>}
            </div>
        </div>
    );
}
