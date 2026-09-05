'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';

import {DetailDock} from '@/features/auto-fight/details/components/DetailDock';
import {useResizableDock} from '@/features/auto-fight/details/components/useResizableDock';
import type {DetailResourceRef} from '@/features/auto-fight/details/store/detailTabsReducer';
import {useDetailTabs} from '@/features/auto-fight/details/store/useDetailTabs';
import {GraphCommandBar} from '@/features/auto-fight/graph/components/GraphCommandBar';
import {StateGraph} from '@/features/auto-fight/graph/components/StateGraph';
import type {StateGraphHandle} from '@/features/auto-fight/graph/components/StateGraph';
import type {RuntimeVisualState} from '@/features/auto-fight/graph/runtime/runtimeTypes';
import type {LayoutDirection, WorkflowViewModel} from '@/features/auto-fight/model/workflow';
import {
    clearDetailQuery,
    readDetailQuery,
    writeDetailQuery,
} from '@/features/auto-fight/resources/navigation/detailRoute';

import '@/features/auto-fight/styles/autoFight.css';

const IDLE_RUNTIME: RuntimeVisualState = Object.freeze({status: 'idle', visitedStateIds: []});

interface GraphModuleProps {
    readonly workflow: WorkflowViewModel;
    readonly runtimeState?: RuntimeVisualState;
    readonly followActiveState?: boolean;
}

function resourceTitle(workflow: WorkflowViewModel, resource: Pick<DetailResourceRef, 'kind' | 'id'>): string {
    if (resource.kind === 'workflow') return workflow.name;
    if (resource.kind === 'state') return workflow.states[resource.id]?.name ?? resource.id;
    if (resource.kind === 'action') return workflow.actions[resource.id]?.name ?? resource.id;
    return workflow.conditions[resource.id]?.name ?? resource.id;
}

export function GraphModule({
    workflow,
    runtimeState = IDLE_RUNTIME,
    followActiveState = false,
}: GraphModuleProps) {
    const [direction, setDirection] = useState<LayoutDirection>('left-to-right');
    const [isDetailCollapsed, setDetailCollapsed] = useState(false);
    const graphRef = useRef<StateGraphHandle>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const serializedSearchParams = searchParams.toString();
    const details = useDetailTabs();
    const dock = useResizableDock();

    const openDetail = useCallback((resource: DetailResourceRef) => {
        details.open(resource);
        setDetailCollapsed(false);
        const params = writeDetailQuery(new URLSearchParams(serializedSearchParams), resource);
        router.push(`?${params.toString()}`);
    }, [details.open, router, serializedSearchParams]);

    useEffect(() => {
        const query = readDetailQuery(new URLSearchParams(serializedSearchParams));
        if (query === undefined) return;
        details.open({
            kind: query.kind,
            id: query.id,
            title: resourceTitle(workflow, query),
            ...(query.focus === undefined ? {} : {anchorId: query.focus}),
        });
        setDetailCollapsed(false);
    }, [details.open, serializedSearchParams, workflow]);

    const closeDetail = useCallback((key: string) => {
        const closesActive = details.state.activeKey === key;
        details.close(key);
        if (!closesActive) return;
        const params = clearDetailQuery(new URLSearchParams(serializedSearchParams));
        router.push(params.size === 0 ? '?' : `?${params.toString()}`);
    }, [details, router, serializedSearchParams]);

    return (
        <div className="auto-fight-workspace auto-fight-graph-module">
            <GraphCommandBar
                direction={direction}
                isDetailCollapsed={isDetailCollapsed}
                onDirectionChange={setDirection}
                onFitView={() => void graphRef.current?.fitView()}
                onShowDetails={() => setDetailCollapsed(false)}
            />
            <div className="auto-fight-graph-module-body">
                <StateGraph
                    direction={direction}
                    followActiveState={followActiveState}
                    onOpenDetail={openDetail}
                    ref={graphRef}
                    runtimeState={runtimeState}
                    workflow={workflow}
                />
                {!isDetailCollapsed && (
                    <DetailDock
                        onActivate={details.activate}
                        onClose={closeDetail}
                        onCollapse={() => setDetailCollapsed(true)}
                        onPin={details.pin}
                        onResizeBy={dock.onResizeBy}
                        onResizeStart={dock.onResizeStart}
                        tabsState={details.state}
                        width={dock.width}
                        workflow={workflow}
                    />
                )}
            </div>
        </div>
    );
}
