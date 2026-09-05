import {render, screen} from '@testing-library/react';
import {describe, expect, test} from 'vitest';

import {ProjectOverview} from '@/features/auto-fight/project/overview/ProjectOverview';
import {MOCK_PROJECT} from '@/features/auto-fight/project/mock/mockProjects';

describe('ProjectOverview', () => {
    test('shows exactly one implemented primary next action', () => {
        render(<ProjectOverview project={MOCK_PROJECT}/>);

        expect(screen.getByText('2 schema errors block validation')).toBeInTheDocument();
        expect(screen.getByRole('link', {name: 'Open State Graph'})).toHaveAttribute(
            'href',
            '/workflows/mock-raid-workflow/graph',
        );
        expect(screen.queryByRole('link', {name: 'Open Validation'})).not.toBeInTheDocument();
    });

    test('links project contents to their owning modules and explains lifecycle', () => {
        render(<ProjectOverview project={MOCK_PROJECT}/>);

        expect(screen.getByRole('link', {name: 'State Graph'})).toHaveAttribute(
            'href',
            '/workflows/mock-raid-workflow/graph',
        );
        expect(screen.getByRole('link', {name: 'Actions'})).toHaveAttribute(
            'href',
            '/workflows/mock-raid-workflow/actions',
        );
        expect(screen.getByRole('link', {name: 'Conditions'})).toHaveAttribute(
            'href',
            '/workflows/mock-raid-workflow/conditions',
        );
        expect(screen.getByText('Created')).toBeInTheDocument();
        expect(screen.getByText('Latest published version')).toBeInTheDocument();
        expect(screen.getByText('0.3.2')).toBeInTheDocument();
        expect(screen.queryByRole('button', {name: /publish/i})).not.toBeInTheDocument();
    });
});
