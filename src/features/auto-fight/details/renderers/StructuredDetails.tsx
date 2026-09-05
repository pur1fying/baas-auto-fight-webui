import {Heading, Label, Stack, Text} from '@primer/react';

import type {
    ActionViewModel,
    ConditionViewModel,
    StateViewModel,
    WorkflowViewModel,
} from '@/features/auto-fight/model/workflow';

interface FieldProps {
    label: string;
    children: React.ReactNode;
    anchorId?: string;
    isLocated?: boolean;
}

export function getDetailAnchorDomId(anchorId: string): string {
    return `auto-fight-detail-${anchorId}`;
}

function Field({label, children, anchorId, isLocated = false}: FieldProps) {
    return (
        <div
            id={anchorId === undefined ? undefined : getDetailAnchorDomId(anchorId)}
            className="auto-fight-detail-field"
            data-located={isLocated ? 'true' : undefined}
        >
            <Text as="div" className="auto-fight-detail-label">{label}</Text>
            <div>{children}</div>
        </div>
    );
}

export function WorkflowDetails({workflow}: {workflow: WorkflowViewModel}) {
    return (
        <Stack direction="vertical" gap="normal">
            <Heading as="h2">{workflow.name}</Heading>
            <Text>{workflow.description}</Text>
            <Field label="Start state">{workflow.states[workflow.startStateId]?.name}</Field>
            <Field label="Resources">
                {Object.keys(workflow.states).length} states · {Object.keys(workflow.actions).length} actions ·{' '}
                {Object.keys(workflow.conditions).length} conditions
            </Field>
        </Stack>
    );
}

export function StateDetails({
    state,
    workflow,
    anchorId,
}: {
    state: StateViewModel;
    workflow: WorkflowViewModel;
    anchorId?: string;
}) {
    const action = state.actionId === undefined ? undefined : workflow.actions[state.actionId];
    const actionFailAnchor = `${state.id}:action-fail:0`;
    const defaultAnchor = `${state.id}:default:0`;
    return (
        <Stack direction="vertical" gap="normal">
            <Heading as="h2">{state.name}</Heading>
            <Text>{state.description}</Text>
            <Field label="State ID"><Text as="code">{state.id}</Text></Field>
            <Field label="Action">{action?.name ?? 'No action'}</Field>
            <Field
                label="Action fail"
                anchorId={actionFailAnchor}
                isLocated={anchorId === actionFailAnchor}
            >
                {state.actionFailTransition === undefined
                    ? 'None'
                    : workflow.states[state.actionFailTransition]?.name ?? state.actionFailTransition}
            </Field>
            <Field label="Ordered conditions">
                {state.transitions.length === 0 ? 'None' : (
                    <Stack direction="vertical" gap="condensed">
                        {state.transitions.map((transition, index) => (
                            <div key={`${transition.conditionId}:${index}`}>
                                <Label>{index + 1}</Label>{' '}
                                {workflow.conditions[transition.conditionId]?.name ?? transition.conditionId}
                                {' → '}
                                {workflow.states[transition.nextStateId]?.name ?? transition.nextStateId}
                            </div>
                        ))}
                    </Stack>
                )}
            </Field>
            <Field
                label="Default"
                anchorId={defaultAnchor}
                isLocated={anchorId === defaultAnchor}
            >
                {state.defaultTransition === undefined
                    ? 'None'
                    : workflow.states[state.defaultTransition]?.name ?? state.defaultTransition}
            </Field>
        </Stack>
    );
}

export function ActionDetails({action}: {action: ActionViewModel}) {
    return (
        <Stack direction="vertical" gap="normal">
            <Heading as="h2">{action.name}</Heading>
            <Text>{action.description}</Text>
            <Field label="Action ID"><Text as="code">{action.id}</Text></Field>
            <Field label="Steps">
                <Stack direction="vertical" gap="condensed">
                    {action.steps.map((step, index) => (
                        <div className="auto-fight-detail-card" key={`${step.type}:${index}`}>
                            <Label>{index + 1}</Label>{' '}
                            <Text as="strong">{step.type}</Text>
                            <Text as="div">{step.description}</Text>
                        </div>
                    ))}
                </Stack>
            </Field>
        </Stack>
    );
}

export function ConditionDetails({condition}: {condition: ConditionViewModel}) {
    return (
        <Stack direction="vertical" gap="normal">
            <Heading as="h2">{condition.name}</Heading>
            <Text>{condition.description}</Text>
            <Field label="Condition ID"><Text as="code">{condition.id}</Text></Field>
            <Field label="Type"><Label>{condition.type}</Label></Field>
            <Field label="Expression"><Text as="code">{condition.expression}</Text></Field>
        </Stack>
    );
}
