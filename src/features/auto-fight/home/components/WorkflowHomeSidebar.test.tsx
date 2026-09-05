import {render, screen} from '@testing-library/react';
import {expect, test} from 'vitest';

import {WorkflowHomeSidebar} from '@/features/auto-fight/home/components/WorkflowHomeSidebar';
import {MOCK_PROJECTS} from '@/features/auto-fight/project/mock/mockProjects';

test('keeps the Home rail project-oriented and omits unimplemented global destinations', () => {
    render(<WorkflowHomeSidebar projects={MOCK_PROJECTS}/>);

    expect(screen.getByRole('link', {name: 'Home'})).toHaveAttribute('href', '/');
    expect(screen.getByText('Pinned workflows')).toBeInTheDocument();
    expect(screen.getByText('Recent workflows')).toBeInTheDocument();
    expect(screen.queryByText('Find workflow')).not.toBeInTheDocument();
    expect(screen.queryByRole('link', {name: 'Run history'})).not.toBeInTheDocument();
    expect(screen.queryByRole('link', {name: 'Published'})).not.toBeInTheDocument();
});
