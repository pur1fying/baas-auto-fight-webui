'use client';

import {useCallback, useState} from 'react';

import {useAppTheme} from '@/components/theme/AppThemeProvider';
import type {LayoutDirection, WorkflowViewModel} from '@/features/auto-fight/model/workflow';
import {WorkspaceToolbar} from '@/features/auto-fight/components/WorkspaceToolbar';
import {StateGraph} from '@/features/auto-fight/graph/components/StateGraph';
import {useMockRuntime} from '@/features/auto-fight/graph/runtime/useMockRuntime';
import {DetailDock} from '@/features/auto-fight/details/components/DetailDock';
import {useResizableDock} from '@/features/auto-fight/details/components/useResizableDock';
import {useDetailTabs} from '@/features/auto-fight/details/store/useDetailTabs';
import type {DetailResourceRef} from '@/features/auto-fight/details/store/detailTabsReducer';

import '@/features/auto-fight/styles/autoFight.css';

interface AutoFightWorkspaceProps {
    workflow: WorkflowViewModel;
}

export function AutoFightWorkspace({workflow}: AutoFightWorkspaceProps) {
    const [layoutDirection, setLayoutDirection] = useState<LayoutDirection>('left-to-right');
    const [isDetailCollapsed, setDetailCollapsed] = useState(false);
    const theme = useAppTheme();
    const runtime = useMockRuntime();
    const details = useDetailTabs();
    const dock = useResizableDock();

    const openDetail = useCallback((resource: DetailResourceRef) => {
        details.open(resource);
        setDetailCollapsed(false);
    }, [details.open]);

    const openWorkflow = useCallback(() => {
        openDetail({kind: 'workflow', id: workflow.id, title: 'Workflow JSON'});
    }, [openDetail, workflow.id]);

    return (
        <div className="auto-fight-workspace">
            <WorkspaceToolbar
                workflowName={workflow.name}
                layoutDirection={layoutDirection}
                scenarios={runtime.scenarios}
                controllerSnapshot={runtime.controllerSnapshot}
                colorMode={theme.colorMode}
                isDetailCollapsed={isDetailCollapsed}
                onLayoutChange={setLayoutDirection}
                onScenarioChange={runtime.selectScenario}
                onPlay={runtime.play}
                onPause={runtime.pause}
                onStep={runtime.step}
                onReset={runtime.reset}
                onSpeedChange={runtime.setSpeed}
                onThemeChange={theme.setColorMode}
                onOpenWorkflow={openWorkflow}
                onExpandDetail={() => setDetailCollapsed(false)}
            />
            <main className="auto-fight-workspace-main">
                <StateGraph
                    workflow={workflow}
                    direction={layoutDirection}
                    runtimeState={runtime.runtimeState}
                    onOpenDetail={openDetail}
                />
                {!isDetailCollapsed ? (
                    <DetailDock
                        workflow={workflow}
                        tabsState={details.state}
                        width={dock.width}
                        onActivate={details.activate}
                        onClose={details.close}
                        onPin={details.pin}
                        onCollapse={() => setDetailCollapsed(true)}
                        onResizeStart={dock.onResizeStart}
                    />
                ) : null}
            </main>
        </div>
    );
}
