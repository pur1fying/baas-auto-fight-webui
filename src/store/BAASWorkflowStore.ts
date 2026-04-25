'use client';

import {create} from 'zustand';
import {BAAS_auto_fight_workflow} from "@/types/BAAS/auto_fight/workflow";
import {BossHealthSetting, FormationSetting, workflow_metadata, YOLOSetting} from "@/types/BAAS/auto_fight/metadata";
import {condition} from "@/types/BAAS/auto_fight/condition";
import {state} from "@/types/BAAS/auto_fight/state";
import {action} from "@/types/BAAS/auto_fight/action";

export function createEmptyBAASWorkflow(): BAAS_auto_fight_workflow {
    return {
        metadata: {
            name: '',
            author: '',
            description: '',
            video_link: '',

            battle_type: '',
            boss_name: '',
            difficulty: '',

            BossHealth: {
                current_ocr_region: [549, 45, 656, 60],
                max_ocr_region: [549, 45, 656, 60],
                ocr_region: [549, 45, 775, 60],
                ocr_model_name: 'en-us',
            },

            formation: {
                front: [],
                back: [],
                slot_count: 0,
                all_appeared_skills: [],
            },

            yolo_setting: {
                model: '',
                update_interval: 100,
            },
        },

        start_state: '',
        conditions: {},
        states: {},
        actions: {},
    };
}

function isArrayIndexSegment(segment: string): boolean {
    return /^\d+$/.test(segment);
}

function cloneContainer(value: unknown): unknown {
    if (Array.isArray(value)) {
        return [...value];
    }
    if (value !== null && typeof value === 'object') {
        return {...(value as Record<string, unknown>)};
    }
    return undefined;
}

function createContainerByNextKey(nextKey: string | undefined): unknown {
    if (nextKey !== undefined && isArrayIndexSegment(nextKey)) {
        return [];
    }
    return {};
}

export function getByPath(obj: unknown, path: string): unknown {
    if (!path.trim()) {
        return obj;
    }

    const keys = path.split('.').filter(Boolean);
    let current: unknown = obj;

    for (const key of keys) {
        if (current === null || current === undefined) {
            return undefined;
        }

        if (Array.isArray(current)) {
            const index = Number(key);
            if (!Number.isInteger(index)) {
                return undefined;
            }
            current = current[index];
            continue;
        }

        if (typeof current === 'object') {
            current = (current as Record<string, unknown>)[key];
            continue;
        }

        return undefined;
    }

    return current;
}

export function setByPath<T extends object>(
    source: T,
    path: string,
    value: unknown
): T {
    const keys = path.split('.').filter(Boolean);

    if (keys.length === 0) {
        return source;
    }

    const rootClone = cloneContainer(source);
    const root =
        (rootClone ??
            createContainerByNextKey(keys[0])) as Record<string, unknown> | unknown[];

    let oldCursor: unknown = source;
    let newCursor: unknown = root;

    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        const nextKey = keys[i + 1];

        let oldChild: unknown;
        if (Array.isArray(oldCursor)) {
            oldChild = oldCursor[Number(key)];
        } else if (oldCursor !== null && typeof oldCursor === 'object') {
            oldChild = (oldCursor as Record<string, unknown>)[key];
        } else {
            oldChild = undefined;
        }

        let newChild = cloneContainer(oldChild);
        if (newChild === undefined) {
            newChild = createContainerByNextKey(nextKey);
        }

        if (Array.isArray(newCursor)) {
            newCursor[Number(key)] = newChild;
        } else {
            (newCursor as Record<string, unknown>)[key] = newChild;
        }

        oldCursor = oldChild;
        newCursor = newChild;
    }

    const lastKey = keys[keys.length - 1];
    if (Array.isArray(newCursor)) {
        newCursor[Number(lastKey)] = value;
    } else {
        (newCursor as Record<string, unknown>)[lastKey] = value;
    }

    return root as T;
}

export function deleteByPath<T extends object>(source: T, path: string): T {
    const keys = path.split('.').filter(Boolean);
    if (keys.length === 0) {
        return source;
    }

    const rootClone = cloneContainer(source);
    const root =
        (rootClone ??
            createContainerByNextKey(keys[0])) as Record<string, unknown> | unknown[];

    let oldCursor: unknown = source;
    let newCursor: unknown = root;

    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];

        let oldChild: unknown;
        if (Array.isArray(oldCursor)) {
            oldChild = oldCursor[Number(key)];
        } else if (oldCursor !== null && typeof oldCursor === 'object') {
            oldChild = (oldCursor as Record<string, unknown>)[key];
        } else {
            oldChild = undefined;
        }

        let newChild = cloneContainer(oldChild);
        if (newChild === undefined) {
            newChild = {};
        }

        if (Array.isArray(newCursor)) {
            newCursor[Number(key)] = newChild;
        } else {
            (newCursor as Record<string, unknown>)[key] = newChild;
        }

        oldCursor = oldChild;
        newCursor = newChild;
    }

    const lastKey = keys[keys.length - 1];

    if (Array.isArray(newCursor)) {
        const index = Number(lastKey);
        if (Number.isInteger(index) && index >= 0 && index < newCursor.length) {
            newCursor.splice(index, 1);
        }
    } else {
        delete (newCursor as Record<string, unknown>)[lastKey];
    }

    return root as T;
}

export interface BAASWorkflowStore {
    workflow: BAAS_auto_fight_workflow;

    setWorkflow: (workflow: BAAS_auto_fight_workflow) => void;
    setEmptyWorkflow: () => void;

    // common set method
    setWorkflowByPath: (path: string, value: unknown) => void;
    removeWorkflowByPath: (path: string) => void;

    // set an exact field in workflow
    setMetadataField: <K extends keyof workflow_metadata>(
        key: K,
        value: workflow_metadata[K]
    ) => void;

    setBossHealthField: <K extends keyof BossHealthSetting>(
        key: K,
        value: BossHealthSetting[K]
    ) => void;

    setFormationField: <K extends keyof FormationSetting>(
        key: K,
        value: FormationSetting[K]
    ) => void;

    setYoloField: <K extends keyof YOLOSetting>(
        key: K,
        value: YOLOSetting[K]
    ) => void;

    setStartState: (value: string) => void;

    setCondition: (name: string, value: condition) => void;
    removeCondition: (name: string) => void;

    setState: (name: string, value: state) => void;
    removeState: (name: string) => void;

    setAction: (name: string, value: action) => void;
    removeAction: (name: string) => void;
}

export const useBAASWorkflowStore = create<BAASWorkflowStore>((set) => ({
    workflow: createEmptyBAASWorkflow(),

    setWorkflow: (workflow) => {
        set({workflow});
    },

    setEmptyWorkflow: () => {
        set({workflow: createEmptyBAASWorkflow()});
    },

    setWorkflowByPath: (path, value) => {
        set((state) => ({
            workflow: setByPath(state.workflow, path, value),
        }));
    },

    removeWorkflowByPath: (path) => {
        set((state) => ({
            workflow: deleteByPath(state.workflow, path),
        }));
    },

    setMetadataField: (key, value) => {
        set((state) => ({
            workflow: {
                ...state.workflow,
                metadata: {
                    ...state.workflow.metadata,
                    [key]: value,
                },
            },
        }));
    },

    setBossHealthField: (key, value) => {
        set((state) => ({
            workflow: {
                ...state.workflow,
                metadata: {
                    ...state.workflow.metadata,
                    BossHealth: {
                        ...state.workflow.metadata.BossHealth,
                        [key]: value,
                    },
                },
            },
        }));
    },

    setFormationField: (key, value) => {
        set((state) => ({
            workflow: {
                ...state.workflow,
                metadata: {
                    ...state.workflow.metadata,
                    formation: {
                        ...state.workflow.metadata.formation,
                        [key]: value,
                    },
                },
            },
        }));
    },

    setYoloField: (key, value) => {
        set((state) => ({
            workflow: {
                ...state.workflow,
                metadata: {
                    ...state.workflow.metadata,
                    yolo_setting: {
                        ...state.workflow.metadata.yolo_setting,
                        [key]: value,
                    },
                },
            },
        }));
    },

    setStartState: (value) => {
        set((state) => ({
            workflow: {
                ...state.workflow,
                start_state: value,
            },
        }));
    },

    setCondition: (name, value) => {
        set((state) => ({
            workflow: {
                ...state.workflow,
                conditions: {
                    ...state.workflow.conditions,
                    [name]: value,
                },
            },
        }));
    },

    removeCondition: (name) => {
        set((state) => {
            const nextConditions = {...state.workflow.conditions};
            delete nextConditions[name];

            return {
                workflow: {
                    ...state.workflow,
                    conditions: nextConditions,
                },
            };
        });
    },

    setState: (name, value) => {
        set((state) => ({
            workflow: {
                ...state.workflow,
                states: {
                    ...state.workflow.states,
                    [name]: value,
                },
            },
        }));
    },

    removeState: (name) => {
        set((state) => {
            const nextStates = {...state.workflow.states};
            delete nextStates[name];

            return {
                workflow: {
                    ...state.workflow,
                    states: nextStates,
                },
            };
        });
    },

    setAction: (name, value) => {
        set((state) => ({
            workflow: {
                ...state.workflow,
                actions: {
                    ...state.workflow.actions,
                    [name]: value,
                },
            },
        }));
    },

    removeAction: (name) => {
        set((state) => {
            const nextActions = {...state.workflow.actions};
            delete nextActions[name];

            return {
                workflow: {
                    ...state.workflow,
                    actions: nextActions,
                },
            };
        });
    },
}));
