import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {beforeEach, describe, expect, test, vi} from 'vitest';

import {MOCK_WORKFLOW} from '@/features/auto-fight/mock/mockWorkflow';
import {RunsModule} from '@/features/auto-fight/runs/components/RunsModule';

vi.mock('next/navigation', () => ({
    useRouter: () => ({push: vi.fn()}),
    useSearchParams: () => new URLSearchParams(),
}));

beforeEach(() => {
    vi.useRealTimers();
});

describe('RunsModule', () => {
    test('keeps Follow active state separate from Pause', async () => {
        const user = userEvent.setup();
        render(<RunsModule workflow={MOCK_WORKFLOW}/>);

        await user.click(screen.getByRole('checkbox', {name: 'Follow active state'}));
        expect(screen.getByRole('checkbox', {name: 'Follow active state'})).not.toBeChecked();
        expect(screen.queryByText(/Paused ·/)).not.toBeInTheDocument();
    });

    test('records the exact selected edge and clears it on reset', async () => {
        const user = userEvent.setup();
        render(<RunsModule workflow={MOCK_WORKFLOW}/>);

        await user.click(screen.getByRole('button', {name: 'Step Mock run'}));
        await user.click(screen.getByRole('button', {name: 'Step Mock run'}));
        await user.click(screen.getByRole('tab', {name: 'Events'}));
        expect(screen.getByText('opening:condition:0')).toBeInTheDocument();

        await user.click(screen.getByRole('button', {name: 'Reset Mock run'}));
        expect(screen.queryByText('opening:condition:0')).not.toBeInTheDocument();
    });

    test.each([
        ['condition-path', 'opening:condition:0'],
        ['default-path', 'opening:default:0'],
        ['action-fail-path', 'opening:action-fail:0'],
    ])('surfaces the stable edge ID for %s', async (scenarioId, edgeId) => {
        const user = userEvent.setup();
        render(<RunsModule workflow={MOCK_WORKFLOW}/>);

        await user.selectOptions(screen.getByRole('combobox', {name: 'Mock scenario'}), scenarioId);
        await user.click(screen.getByRole('button', {name: 'Step Mock run'}));
        await user.click(screen.getByRole('button', {name: 'Step Mock run'}));
        await user.click(screen.getByRole('tab', {name: 'Events'}));

        expect(screen.getByText(edgeId)).toBeInTheDocument();
    });
});
