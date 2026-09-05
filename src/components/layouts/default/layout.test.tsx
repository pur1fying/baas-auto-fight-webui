import {render, screen} from '@testing-library/react';
import {describe, expect, test} from 'vitest';

import DefaultLayout from '@/components/layouts/default/layout';

describe('DefaultLayout content modes', () => {
    test('uses the centered content mode by default', () => {
        render(<DefaultLayout content={<div>Centered page</div>}/>);

        expect(screen.getByRole('main')).toHaveAttribute('data-content-mode', 'centered');
    });

    test('supports a fill workspace without changing centered pages', () => {
        render(<DefaultLayout contentMode="fill" content={<div>Workspace</div>}/>);

        expect(screen.getByRole('main')).toHaveAttribute('data-content-mode', 'fill');
    });
});
