export type TransitionKind = 'condition' | 'default' | 'action-fail';

export type LayoutDirection = 'left-to-right' | 'top-to-bottom';

export interface ActionStepViewModel {
    readonly type: string;
    readonly description: string;
    readonly parameters?: Readonly<Record<string, unknown>>;
}

export interface ActionViewModel {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly steps: readonly ActionStepViewModel[];
}

export interface ConditionViewModel {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly type: string;
    readonly expression: string;
}

export interface ConditionTransitionViewModel {
    readonly conditionId: string;
    readonly nextStateId: string;
}

export interface StateViewModel {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly actionId?: string;
    readonly actionFailTransition?: string;
    readonly transitions: readonly ConditionTransitionViewModel[];
    readonly defaultTransition?: string;
}

export interface WorkflowViewModel {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly startStateId: string;
    readonly states: Readonly<Record<string, StateViewModel>>;
    readonly actions: Readonly<Record<string, ActionViewModel>>;
    readonly conditions: Readonly<Record<string, ConditionViewModel>>;
    readonly sourceJson: Readonly<unknown>;
}
