import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, test, vi} from 'vitest';

import {MOCK_WORKFLOW} from '@/features/auto-fight/mock/mockWorkflow';
import {StateGraph} from '@/features/auto-fight/graph/components/StateGraph';
import type {RuntimeVisualState} from '@/features/auto-fight/graph/runtime/runtimeTypes';

const IDLE_RUNTIME: RuntimeVisualState = {status: 'idle', visitedStateIds: []};

describe('StateGraph', () => {
    test('renders state semantics and navigates to state, action, and condition details', async () => {
        const user = userEvent.setup();
        const onOpenDetail = vi.fn();
        render(
            <StateGraph
                workflow={MOCK_WORKFLOW}
                direction="left-to-right"
                runtimeState={IDLE_RUNTIME}
                onOpenDetail={onOpenDetail}
            />,
        );

        expect(await screen.findByText('START')).toBeInTheDocument();
        expect(screen.getAllByText('END')).toHaveLength(2);
        expect(screen.getByText('成功结束')).toBeInTheDocument();

        await user.click(screen.getByRole('button', {name: '查看状态 开场'}));
        await user.click(screen.getByRole('button', {name: '查看 Action 启动战斗'}));
        await user.click(screen.getAllByRole('button', {name: '查看 Condition 费用充足'})[0]);

        expect(onOpenDetail).toHaveBeenNthCalledWith(1, {kind: 'state', id: 'opening', title: '开场'});
        expect(onOpenDetail).toHaveBeenNthCalledWith(2, {kind: 'action', id: 'start-battle', title: '启动战斗'});
        expect(onOpenDetail).toHaveBeenNthCalledWith(3, {kind: 'condition', id: 'cost-ready', title: '费用充足'});
    });

    test('marks the active node without changing the workflow', async () => {
        render(
            <StateGraph
                workflow={MOCK_WORKFLOW}
                direction="top-to-bottom"
                runtimeState={{status: 'running', activeStateId: 'burst', visitedStateIds: ['opening', 'burst']}}
                onOpenDetail={vi.fn()}
            />,
        );

        const activeNodeButton = await screen.findByRole('button', {name: '查看状态 爆发输出'});
        expect(activeNodeButton.closest('.auto-fight-state-node')).toHaveAttribute('data-runtime', 'active');
        expect(MOCK_WORKFLOW.startStateId).toBe('opening');
    });

});
