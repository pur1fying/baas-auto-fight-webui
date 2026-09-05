import type {PointerEvent as ReactPointerEvent} from 'react';
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
    onResizeStart,
}: DetailDockProps) {
    const activeTab = tabsState.tabs.find((tab) => tab.key === tabsState.activeKey);

    return (
        <aside className="auto-fight-detail-dock" style={{width}} aria-label="工作流详情">
            <div
                className="auto-fight-detail-resizer"
                role="separator"
                aria-orientation="vertical"
                aria-label="调整详情面板宽度"
                onPointerDown={onResizeStart}
            />
            <div className="auto-fight-detail-tabs-row">
                <div className="auto-fight-detail-tabs" role="tablist" aria-label="已打开的详情">
                    {tabsState.tabs.map((tab) => (
                        <div className="auto-fight-detail-tab-group" key={tab.key}>
                            <Button
                                className="auto-fight-detail-tab"
                                variant="invisible"
                                role="tab"
                                aria-selected={tab.key === tabsState.activeKey}
                                onClick={() => onActivate(tab.key)}
                                onDoubleClick={() => onPin(tab.key)}
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
            {activeTab === undefined ? (
                <div className="auto-fight-detail-empty">
                    <Text>选择状态、Action 或 Condition 查看详情。</Text>
                </div>
            ) : (
                <DetailContent workflow={workflow} resource={activeTab.resource}/>
            )}
        </aside>
    );
}
