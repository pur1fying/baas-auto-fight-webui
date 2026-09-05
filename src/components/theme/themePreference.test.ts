import {describe, expect, test} from 'vitest';

import {
    COLOR_MODE_STORAGE_KEY,
    readColorModePreference,
    writeColorModePreference,
} from '@/components/theme/themePreference';

describe('theme preference', () => {
    test('falls back to auto when storage contains an unsupported value', () => {
        localStorage.setItem(COLOR_MODE_STORAGE_KEY, 'dark_dimmed');
        expect(readColorModePreference(localStorage)).toBe('auto');
    });

    test('reads and writes supported Primer color modes', () => {
        writeColorModePreference(localStorage, 'night');
        expect(localStorage.getItem(COLOR_MODE_STORAGE_KEY)).toBe('night');
        expect(readColorModePreference(localStorage)).toBe('night');
    });
});
