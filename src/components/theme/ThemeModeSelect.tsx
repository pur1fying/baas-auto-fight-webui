import {Select} from '@primer/react';

import type {AppColorMode} from '@/components/theme/themePreference';

interface ThemeModeSelectProps {
    colorMode: AppColorMode;
    onChange: (mode: AppColorMode) => void;
}

export function ThemeModeSelect({colorMode, onChange}: ThemeModeSelectProps) {
    return (
        <Select
            aria-label="主题模式"
            size="small"
            value={colorMode}
            onChange={(event) => onChange(event.target.value as AppColorMode)}
        >
            <Select.Option value="auto">跟随系统</Select.Option>
            <Select.Option value="day">白色</Select.Option>
            <Select.Option value="night">黑色</Select.Option>
        </Select>
    );
}
