import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, test, vi} from 'vitest';

import {WorkspaceToolbar} from '@/features/auto-fight/components/WorkspaceToolbar';
import {MOCK_SCENARIOS} from '@/features/auto-fight/mock/MockRuntimeController';

describe('WorkspaceToolbar', () => {
    test('changes layout, scenario, speed, and theme through visible controls', async () => {
        const user = userEvent.setup();
        const onLayoutChange = vi.fn();
        const onScenarioChange = vi.fn();
        const onSpeedChange = vi.fn();
        const onThemeChange = vi.fn();
        render(
            <WorkspaceToolbar
                workflowName="状态图演示"
                layoutDirection="left-to-right"
                scenarios={MOCK_SCENARIOS}
                controllerSnapshot={{
                    scenarioId: 'condition-path',
                    nextEventIndex: 0,
                    eventCount: 6,
                    status: 'idle',
                    speed: 1,
                }}
                colorMode="auto"
                isDetailCollapsed={false}
                onLayoutChange={onLayoutChange}
                onScenarioChange={onScenarioChange}
                onPlay={vi.fn()}
                onPause={vi.fn()}
                onStep={vi.fn()}
                onReset={vi.fn()}
                onSpeedChange={onSpeedChange}
                onThemeChange={onThemeChange}
                onOpenWorkflow={vi.fn()}
                onExpandDetail={vi.fn()}
            />,
        );

        await user.click(screen.getByRole('button', {name: '上到下布局'}));
        await user.selectOptions(screen.getByRole('combobox', {name: 'Mock 场景'}), 'default-path');
        await user.selectOptions(screen.getByRole('combobox', {name: '播放速度'}), '2');
        await user.selectOptions(screen.getByRole('combobox', {name: '主题模式'}), 'night');

        expect(onLayoutChange).toHaveBeenCalledWith('top-to-bottom');
        expect(onScenarioChange).toHaveBeenCalledWith('default-path');
        expect(onSpeedChange).toHaveBeenCalledWith(2);
        expect(onThemeChange).toHaveBeenCalledWith('night');
    });

    test('uses play while idle and pause while running', async () => {
        const user = userEvent.setup();
        const onPlay = vi.fn();
        const onPause = vi.fn();
        const props = {
            workflowName: '状态图演示',
            layoutDirection: 'left-to-right' as const,
            scenarios: MOCK_SCENARIOS,
            colorMode: 'auto' as const,
            isDetailCollapsed: false,
            onLayoutChange: vi.fn(),
            onScenarioChange: vi.fn(),
            onPlay,
            onPause,
            onStep: vi.fn(),
            onReset: vi.fn(),
            onSpeedChange: vi.fn(),
            onThemeChange: vi.fn(),
            onOpenWorkflow: vi.fn(),
            onExpandDetail: vi.fn(),
        };
        const {rerender} = render(
            <WorkspaceToolbar
                {...props}
                controllerSnapshot={{scenarioId: 'condition-path', nextEventIndex: 0, eventCount: 6, status: 'idle', speed: 1}}
            />,
        );

        await user.click(screen.getByRole('button', {name: '播放'}));
        rerender(
            <WorkspaceToolbar
                {...props}
                controllerSnapshot={{scenarioId: 'condition-path', nextEventIndex: 1, eventCount: 6, status: 'playing', speed: 1}}
            />,
        );
        await user.click(screen.getByRole('button', {name: '暂停'}));

        expect(onPlay).toHaveBeenCalledOnce();
        expect(onPause).toHaveBeenCalledOnce();
    });
});
