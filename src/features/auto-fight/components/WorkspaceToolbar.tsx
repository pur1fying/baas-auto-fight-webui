import {Heading, IconButton, SegmentedControl} from '@primer/react';
import {
    ArrowDownIcon,
    ArrowRightIcon,
    FileCodeIcon,
    SidebarExpandIcon,
    WorkflowIcon,
} from '@primer/octicons-react';

import type {AppColorMode} from '@/components/theme/themePreference';
import {ThemeModeSelect} from '@/components/theme/ThemeModeSelect';
import type {LayoutDirection} from '@/features/auto-fight/model/workflow';
import type {
    MockControllerSnapshot,
    MockScenario,
} from '@/features/auto-fight/mock/MockRuntimeController';
import {RuntimeToolbarControls} from '@/features/auto-fight/components/RuntimeToolbarControls';

interface WorkspaceToolbarProps {
    workflowName: string;
    layoutDirection: LayoutDirection;
    scenarios: readonly MockScenario[];
    controllerSnapshot: MockControllerSnapshot;
    colorMode: AppColorMode;
    isDetailCollapsed: boolean;
    onLayoutChange: (direction: LayoutDirection) => void;
    onScenarioChange: (scenarioId: string) => void;
    onPlay: () => void;
    onPause: () => void;
    onStep: () => void;
    onReset: () => void;
    onSpeedChange: (speed: number) => void;
    onThemeChange: (colorMode: AppColorMode) => void;
    onOpenWorkflow: () => void;
    onExpandDetail: () => void;
}

export function WorkspaceToolbar(props: WorkspaceToolbarProps) {
    return (
        <header className="auto-fight-toolbar">
            <div className="auto-fight-toolbar-title">
                <WorkflowIcon size={20} aria-hidden="true"/>
                <Heading as="h1">{props.workflowName}</Heading>
                <span className="auto-fight-mock-badge">MOCK</span>
            </div>
            <div className="auto-fight-toolbar-groups">
                <SegmentedControl
                    aria-label="自动布局方向"
                    size="small"
                    onChange={(index) => props.onLayoutChange(index === 0 ? 'left-to-right' : 'top-to-bottom')}
                >
                    <SegmentedControl.Button
                        selected={props.layoutDirection === 'left-to-right'}
                        leadingVisual={ArrowRightIcon}
                    >
                        左到右布局
                    </SegmentedControl.Button>
                    <SegmentedControl.Button
                        selected={props.layoutDirection === 'top-to-bottom'}
                        leadingVisual={ArrowDownIcon}
                    >
                        上到下布局
                    </SegmentedControl.Button>
                </SegmentedControl>
                <RuntimeToolbarControls
                    scenarios={props.scenarios}
                    snapshot={props.controllerSnapshot}
                    onScenarioChange={props.onScenarioChange}
                    onPlay={props.onPlay}
                    onPause={props.onPause}
                    onStep={props.onStep}
                    onReset={props.onReset}
                    onSpeedChange={props.onSpeedChange}
                />
                <IconButton
                    icon={FileCodeIcon}
                    aria-label="打开 Workflow JSON"
                    size="small"
                    onClick={props.onOpenWorkflow}
                />
                {props.isDetailCollapsed ? (
                    <IconButton
                        icon={SidebarExpandIcon}
                        aria-label="展开详情面板"
                        size="small"
                        onClick={props.onExpandDetail}
                    />
                ) : null}
                <ThemeModeSelect colorMode={props.colorMode} onChange={props.onThemeChange}/>
            </div>
        </header>
    );
}
