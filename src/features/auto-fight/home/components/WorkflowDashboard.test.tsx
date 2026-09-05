import {render, screen} from '@testing-library/react';
import {describe, expect, test} from 'vitest';

import {WorkflowDashboard} from '@/features/auto-fight/home/components/WorkflowDashboard';
import {MOCK_PROJECTS} from '@/features/auto-fight/project/mock/mockProjects';

describe('WorkflowDashboard', () => {
    test('shows a focused empty state when no projects exist', () => {
        render(<WorkflowDashboard projects={[]}/>);

        expect(screen.getByRole('heading', {name: 'Create your first workflow'})).toBeInTheDocument();
        for (const link of screen.getAllByRole('link', {name: 'Blank workflow'})) {
            expect(link).toHaveAttribute('href', '/new');
        }
        for (const link of screen.getAllByRole('link', {name: 'Import JSON'})) {
            expect(link).toHaveAttribute('href', '/new/import');
        }
    });

    test('separates project discovery from continue-working navigation', () => {
        render(<WorkflowDashboard projects={MOCK_PROJECTS}/>);

        expect(screen.getByRole('heading', {name: 'Your workflows'})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: '继续主线推图 · 爆发队'})).toHaveAttribute(
            'href',
            '/workflows/mock-raid-workflow/graph',
        );
        expect(screen.getByRole('link', {name: 'Import JSON'})).toHaveAttribute('href', '/new/import');
        expect(screen.queryByText(/Idle/)).not.toBeInTheDocument();
    });

    test('shows lifecycle labels as status rather than controls', () => {
        render(<WorkflowDashboard projects={MOCK_PROJECTS}/>);

        expect(screen.getByText('Draft · latest 0.3.2')).toBeInTheDocument();
        expect(screen.getByText('Validated')).toBeInTheDocument();
        expect(screen.queryByRole('button', {name: 'Draft'})).not.toBeInTheDocument();
        expect(screen.queryByRole('button', {name: 'Validated'})).not.toBeInTheDocument();
    });
});
