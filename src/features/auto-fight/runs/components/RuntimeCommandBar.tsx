import {PauseIcon, PlayIcon, SkipIcon, SyncIcon} from '@primer/octicons-react';
import {Button, Checkbox, IconButton, Label, Select} from '@primer/react';

import type {
    MockControllerSnapshot,
    MockScenario,
} from '@/features/auto-fight/mock/MockRuntimeController';

interface RuntimeCommandBarProps {
    readonly scenarios: readonly MockScenario[];
    readonly snapshot: MockControllerSnapshot;
    readonly followActiveState: boolean;
    readonly onFollowActiveStateChange: (follow: boolean) => void;
    readonly onScenarioChange: (scenarioId: string) => void;
    readonly onPlay: () => void;
    readonly onPause: () => void;
    readonly onStep: () => void;
    readonly onReset: () => void;
    readonly onSpeedChange: (speed: number) => void;
}

const STATUS_LABELS: Record<MockControllerSnapshot['status'], string> = {
    idle: 'Ready',
    playing: 'Running',
    paused: 'Paused',
    complete: 'Complete',
};

export function RuntimeCommandBar({
    scenarios,
    snapshot,
    followActiveState,
    onFollowActiveStateChange,
    onScenarioChange,
    onPlay,
    onPause,
    onStep,
    onReset,
    onSpeedChange,
}: RuntimeCommandBarProps) {
    return (
        <div className="auto-fight-runtime-command-bar" aria-label="Mock Run controls">
            <Select
                aria-label="Mock scenario"
                size="small"
                value={snapshot.scenarioId}
                onChange={(event) => onScenarioChange(event.currentTarget.value)}
            >
                {scenarios.map((scenario) => (
                    <Select.Option key={scenario.id} value={scenario.id}>{scenario.name}</Select.Option>
                ))}
            </Select>
            {snapshot.status === 'playing' ? (
                <Button aria-label="Pause Mock run" leadingVisual={PauseIcon} onClick={onPause}>Pause</Button>
            ) : (
                <Button
                    aria-label="Play Mock run"
                    disabled={snapshot.status === 'complete'}
                    leadingVisual={PlayIcon}
                    onClick={onPlay}
                >
                    {snapshot.status === 'paused' ? 'Resume' : 'Play'}
                </Button>
            )}
            <Button
                aria-label="Step Mock run"
                disabled={snapshot.status === 'playing' || snapshot.status === 'complete'}
                leadingVisual={SkipIcon}
                onClick={onStep}
            >
                Step
            </Button>
            <IconButton aria-label="Reset Mock run" icon={SyncIcon} onClick={onReset}/>
            <Select
                aria-label="Mock playback speed"
                size="small"
                value={String(snapshot.speed)}
                onChange={(event) => onSpeedChange(Number(event.currentTarget.value))}
            >
                <Select.Option value="0.5">0.5×</Select.Option>
                <Select.Option value="1">1×</Select.Option>
                <Select.Option value="2">2×</Select.Option>
            </Select>
            <label className="auto-fight-follow-active">
                <Checkbox
                    aria-label="Follow active state"
                    checked={followActiveState}
                    onChange={(event) => onFollowActiveStateChange(event.currentTarget.checked)}
                />
                <span>Follow active state</span>
            </label>
            <Label variant={snapshot.status === 'complete' ? 'success' : 'accent'}>
                {STATUS_LABELS[snapshot.status]} · {snapshot.nextEventIndex}/{snapshot.eventCount}
            </Label>
        </div>
    );
}
