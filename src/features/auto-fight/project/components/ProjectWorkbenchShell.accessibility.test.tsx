import {render, screen} from '@testing-library/react';
import {describe, expect, test} from 'vitest';

import {ProjectNavigation} from '@/features/auto-fight/project/components/ProjectNavigation';
import {ProjectRail} from '@/features/auto-fight/project/components/ProjectRail';
import {MOCK_PROJECT, MOCK_PROJECTS} from '@/features/auto-fight/project/mock/mockProjects';

describe('project workbench accessibility', () => {
    test('labels the project rail and exposes the current project and module', () => {
        render(
            <>
                <ProjectRail
                    activeProjectId={MOCK_PROJECT.summary.id}
                    projects={MOCK_PROJECTS}
                />
                <ProjectNavigation activeModule="runs" projectId={MOCK_PROJECT.summary.id}/>
            </>,
        );

        expect(screen.getByRole('navigation', {name: 'Workflow projects'})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: MOCK_PROJECT.summary.name}))
            .toHaveAttribute('aria-current', 'page');
        expect(screen.getByRole('link', {name: 'Runs'}))
            .toHaveAttribute('aria-current', 'page');
    });
});
