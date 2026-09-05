import type {
    KeyboardEvent as ReactKeyboardEvent,
    PointerEvent as ReactPointerEvent,
} from 'react';
import {Button, Text} from '@primer/react';
import {PinIcon, SidebarCollapseIcon, XIcon} from '@primer/octicons-react';

import type {WorkflowViewModel} from '@/features/auto-fight/model/workflow';
import type {DetailTabsState} from '@/features/auto-fight/details/store/detailTabsReducer';
import {DetailContent} from '@/features/auto-fight/details/components/DetailContent';

interface DetailDockProps {
    workflow: WorkflowViewModel;
    tabsState: DetailTabsState;
    width: number;
    onActivate: (key: string) => void;
    onClose: (key: string) => void;
    onPin: (key: string) => void;
    onCollapse: () => void;
    onResizeBy: (delta: number) => void;
    onResizeStart: (event: ReactPointerEvent<HTMLDivElement>) => void;
}

export function DetailDock({
    workflow,
    tabsState,
    width,
    onActivate,
    onClose,
    onPin,
    onCollapse,
    onResizeBy,
    onResizeStart,
}: DetailDockProps) {
    const activeTab = tabsState.tabs.find((tab) => tab.key === tabsState.activeKey);

    function handleResizeKeyDown(event: ReactKeyboardEvent<HTMLDivElement>): void {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        onResizeBy(event.key === 'ArrowLeft' ? 16 : -16);
    }

    return (
        <aside className="auto-fight-detail-dock" style={{width}} aria-label="工作流详情">
            <div
                className="auto-fight-detail-resizer"
                role="separator"
                aria-orientation="vertical"
                aria-label="调整详情面板宽度"
                aria-valuenow={Math.round(width)}
                aria-valuetext={`${Math.round(width)} pixels`}
                onKeyDown={handleResizeKeyDown}
                onPointerDown={onResizeStart}
                tabIndex={0}
            />
            <div className="auto-fight-detail-tabs-row">
                <div className="auto-fight-detail-tabs" role="tablist" aria-label="已打开的详情">
                    {tabsState.tabs.map((tab) => (
                        <div className="auto-fight-detail-tab-group" key={tab.key}>
                            <Button
                                className="auto-fight-detail-tab"
                                variant="invisible"
                                role="tab"
                                aria-controls="auto-fight-detail-panel"
                                aria-selected={tab.key === tabsState.activeKey}
                                id={`auto-fight-detail-tab-${tab.key}`}
                                onClick={() => onActivate(tab.key)}
                                onDoubleClick={() => onPin(tab.key)}
                                tabIndex={tab.key === tabsState.activeKey ? 0 : -1}
                            >
                                {tab.resource.title}
                                {tab.isPreview ? (
                                    <Text className="auto-fight-preview-dot" aria-hidden="true"> ●</Text>
                                ) : null}
                            </Button>
                            {tab.isPreview ? (
                                <Button
                                    variant="invisible"
                                    aria-label={`固定 ${tab.resource.title}`}
                                    onClick={() => onPin(tab.key)}
                                >
                                    <PinIcon/>
                                </Button>
                            ) : null}
                            <Button
                                variant="invisible"
                                aria-label={`关闭 ${tab.resource.title}`}
                                onClick={() => onClose(tab.key)}
                            >
                                <XIcon/>
                            </Button>
                        </div>
                    ))}
                </div>
                <Button variant="invisible" aria-label="折叠详情面板" onClick={onCollapse}>
                    <SidebarCollapseIcon/>
                </Button>
            </div>
            <div
                aria-labelledby={activeTab === undefined
                    ? undefined
                    : `auto-fight-detail-tab-${activeTab.key}`}
                className="auto-fight-detail-panel"
                id="auto-fight-detail-panel"
                role="tabpanel"
            >
                {activeTab === undefined ? (
                    <div className="auto-fight-detail-empty">
                        <Text>选择状态、Action 或 Condition 查看详情。</Text>
                    </div>
                ) : (
                    <DetailContent workflow={workflow} resource={activeTab.resource}/>
                )}
            </div>
        </aside>
    );
}
