import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {beforeEach, expect, test, vi} from 'vitest';

import {GraphModule} from '@/features/auto-fight/graph/components/GraphModule';
import {MOCK_WORKFLOW} from '@/features/auto-fight/mock/mockWorkflow';

const push = vi.fn();
let searchParams = new URLSearchParams();

vi.mock('next/navigation', () => ({
    useRouter: () => ({push}),
    useSearchParams: () => searchParams,
}));

beforeEach(() => {
    push.mockReset();
    searchParams = new URLSearchParams();
});

test('keeps graph controls local and omits runtime and theme controls', () => {
    render(<GraphModule workflow={MOCK_WORKFLOW}/>);

    expect(screen.getByRole('button', {name: 'Left to right layout'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Top to bottom layout'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Fit graph to view'})).toBeInTheDocument();
    expect(screen.queryByText('Idle')).not.toBeInTheDocument();
    expect(screen.queryByRole('combobox', {name: /theme/i})).not.toBeInTheDocument();
    expect(screen.queryByRole('button', {name: /play/i})).not.toBeInTheDocument();
});

test('opens graph resources in the deep-linked Detail Dock', async () => {
    const user = userEvent.setup();
    render(<GraphModule workflow={MOCK_WORKFLOW}/>);

    await user.click(await screen.findByRole('button', {name: '查看状态 开场'}));
    expect(screen.getByRole('heading', {name: '开场'})).toBeInTheDocument();
    expect(push).toHaveBeenCalledWith(expect.stringContaining('detailKind=state'));
    expect(push).toHaveBeenCalledWith(expect.stringContaining('detailId=opening'));
});
