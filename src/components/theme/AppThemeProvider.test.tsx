import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, test} from 'vitest';

import {AppThemeProvider, useAppTheme} from '@/components/theme/AppThemeProvider';
import {ThemeModeSelect} from '@/components/theme/ThemeModeSelect';
import {COLOR_MODE_STORAGE_KEY} from '@/components/theme/themePreference';

function ThemeProbe() {
    const {colorMode, setColorMode} = useAppTheme();
    return <ThemeModeSelect colorMode={colorMode} onChange={setColorMode}/>;
}

describe('AppThemeProvider', () => {
    test('restores the saved mode and persists explicit changes', async () => {
        localStorage.setItem(COLOR_MODE_STORAGE_KEY, 'night');
        const user = userEvent.setup();
        render(
            <AppThemeProvider>
                <ThemeProbe/>
            </AppThemeProvider>,
        );

        const select = screen.getByRole('combobox', {name: '主题模式'});
        await waitFor(() => expect(select).toHaveValue('night'));
        await user.selectOptions(select, 'day');

        expect(localStorage.getItem(COLOR_MODE_STORAGE_KEY)).toBe('day');
    });
});
