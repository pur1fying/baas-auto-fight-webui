export const COLOR_MODE_STORAGE_KEY = 'baas-webui-color-mode';

export type AppColorMode = 'auto' | 'day' | 'night';

const SUPPORTED_MODES: readonly AppColorMode[] = ['auto', 'day', 'night'];

export function readColorModePreference(storage: Pick<Storage, 'getItem'>): AppColorMode {
    const stored = storage.getItem(COLOR_MODE_STORAGE_KEY);
    return SUPPORTED_MODES.includes(stored as AppColorMode) ? stored as AppColorMode : 'auto';
}

export function writeColorModePreference(
    storage: Pick<Storage, 'setItem'>,
    colorMode: AppColorMode,
): void {
    storage.setItem(COLOR_MODE_STORAGE_KEY, colorMode);
}
