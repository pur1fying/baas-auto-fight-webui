import {Button, IconButton, Label, Select} from '@primer/react';
import {PauseIcon, PlayIcon, SkipIcon, SyncIcon} from '@primer/octicons-react';

import type {
    MockControllerSnapshot,
    MockScenario,
} from '@/features/auto-fight/mock/MockRuntimeController';

interface RuntimeToolbarControlsProps {
    scenarios: readonly MockScenario[];
    snapshot: MockControllerSnapshot;
    onScenarioChange: (scenarioId: string) => void;
    onPlay: () => void;
    onPause: () => void;
    onStep: () => void;
    onReset: () => void;
    onSpeedChange: (speed: number) => void;
}

const STATUS_LABELS: Record<MockControllerSnapshot['status'], string> = {
    idle: 'Idle',
    playing: 'Running',
    paused: 'Paused',
    complete: 'Complete',
};

export function RuntimeToolbarControls({
    scenarios,
    snapshot,
    onScenarioChange,
    onPlay,
    onPause,
    onStep,
    onReset,
    onSpeedChange,
}: RuntimeToolbarControlsProps) {
    return (
        <div className="auto-fight-runtime-controls" aria-label="Mock 运行控制">
            <Select
                aria-label="Mock 场景"
                size="small"
                value={snapshot.scenarioId}
                onChange={(event) => onScenarioChange(event.target.value)}
            >
                {scenarios.map((scenario) => (
                    <Select.Option key={scenario.id} value={scenario.id}>{scenario.name}</Select.Option>
                ))}
            </Select>
            {snapshot.status === 'playing' ? (
                <Button size="small" leadingVisual={PauseIcon} onClick={onPause}>暂停</Button>
            ) : (
                <Button
                    size="small"
                    leadingVisual={PlayIcon}
                    onClick={onPlay}
                    disabled={snapshot.status === 'complete'}
                >
                    播放
                </Button>
            )}
            <Button
                size="small"
                leadingVisual={SkipIcon}
                onClick={onStep}
                disabled={snapshot.status === 'playing' || snapshot.status === 'complete'}
            >
                单步
            </Button>
            <IconButton icon={SyncIcon} aria-label="重置模拟运行" size="small" onClick={onReset}/>
            <Select
                aria-label="播放速度"
                size="small"
                value={String(snapshot.speed)}
                onChange={(event) => onSpeedChange(Number(event.target.value))}
            >
                <Select.Option value="0.5">0.5×</Select.Option>
                <Select.Option value="1">1×</Select.Option>
                <Select.Option value="2">2×</Select.Option>
            </Select>
            <Label variant={snapshot.status === 'complete' ? 'success' : 'accent'}>
                {STATUS_LABELS[snapshot.status]} · {snapshot.nextEventIndex}/{snapshot.eventCount}
            </Label>
        </div>
    );
}
