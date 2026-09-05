import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, test, vi} from 'vitest';

import {AppThemeProvider} from '@/components/theme/AppThemeProvider';
import {COLOR_MODE_STORAGE_KEY} from '@/components/theme/themePreference';
import TopNavRight from '@/components/top_nav/right/top_nav_right';

vi.mock('@/components/top_nav/right/add_button', () => ({default: () => null}));
vi.mock('@/components/top_nav/right/notification_button', () => ({default: () => null}));
vi.mock('@/components/top_nav/right/issue_button', () => ({default: () => null}));
vi.mock('@/components/top_nav/right/repo_button', () => ({default: () => null}));
vi.mock('@/components/top_nav/right/user_avatar', () => ({default: () => null}));

describe('TopNavRight', () => {
    test('owns the global system, light and dark theme selector', async () => {
        const user = userEvent.setup();
        render(
            <AppThemeProvider>
                <TopNavRight/>
            </AppThemeProvider>,
        );

        const selector = screen.getByRole('combobox', {name: '主题模式'});
        expect(selector).toHaveValue('auto');
        expect(screen.getByRole('option', {name: '跟随系统'})).toBeInTheDocument();
        expect(screen.getByRole('option', {name: '白色'})).toBeInTheDocument();
        expect(screen.getByRole('option', {name: '黑色'})).toBeInTheDocument();

        await user.selectOptions(selector, 'night');
        expect(localStorage.getItem(COLOR_MODE_STORAGE_KEY)).toBe('night');
    });
});
