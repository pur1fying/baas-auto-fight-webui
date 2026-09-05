import {render, screen} from '@testing-library/react';
import {describe, expect, test} from 'vitest';

import {ProjectHeader} from '@/features/auto-fight/project/components/ProjectHeader';
import {ProjectNavigation} from '@/features/auto-fight/project/components/ProjectNavigation';
import {ProjectRail} from '@/features/auto-fight/project/components/ProjectRail';
import {MOCK_PROJECT, MOCK_PROJECTS} from '@/features/auto-fight/project/mock/mockProjects';

describe('project workbench shell', () => {
    test('keeps workflow search in the global header instead of the project rail', () => {
        render(<ProjectRail activeProjectId={MOCK_PROJECT.summary.id} projects={MOCK_PROJECTS}/>);

        expect(screen.getByRole('link', {name: 'Back to dashboard'})).toHaveAttribute('href', '/');
        expect(screen.queryByText('Find workflow')).not.toBeInTheDocument();
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });

    test('shows only implemented F1 modules and keeps search out of the rail', () => {
        render(<ProjectNavigation activeModule="graph" projectId={MOCK_PROJECT.summary.id}/>);

        expect(screen.getByText('Design')).toBeInTheDocument();
        expect(screen.getByText('Verify')).toBeInTheDocument();
        expect(screen.getByRole('link', {name: 'State Graph'})).toHaveAttribute(
            'href',
            '/workflows/mock-raid-workflow/graph',
        );
        expect(screen.getByRole('link', {name: 'State Graph'})).toHaveAttribute('aria-current', 'page');
        expect(screen.getByRole('link', {name: 'Runs'})).toBeInTheDocument();
        expect(screen.queryByText('Deliver')).not.toBeInTheDocument();
        expect(screen.queryByRole('link', {name: 'Validation'})).not.toBeInTheDocument();
        expect(screen.queryByRole('link', {name: 'Versions'})).not.toBeInTheDocument();
        expect(screen.queryByText('Find workflow')).not.toBeInTheDocument();
    });

    test('keeps persistence and release controls out of the read-only header', () => {
        render(<ProjectHeader project={MOCK_PROJECT}/>);

        expect(screen.getByText('主线推图 · 爆发队')).toBeInTheDocument();
        expect(screen.getByText('Draft · latest 0.3.2')).toBeInTheDocument();
        expect(screen.queryByRole('button', {name: /save/i})).not.toBeInTheDocument();
        expect(screen.queryByRole('button', {name: /publish/i})).not.toBeInTheDocument();
    });
});
