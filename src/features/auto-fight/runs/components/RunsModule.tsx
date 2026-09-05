'use client';

import {useState} from 'react';
import {Button, Heading, Label, Text} from '@primer/react';

import {GraphModule} from '@/features/auto-fight/graph/components/GraphModule';
import {useMockRuntime} from '@/features/auto-fight/graph/runtime/useMockRuntime';
import type {WorkflowViewModel} from '@/features/auto-fight/model/workflow';
import {RunViewTabs} from '@/features/auto-fight/runs/components/RunViewTabs';
import type {RunView} from '@/features/auto-fight/runs/components/RunViewTabs';
import {RuntimeCommandBar} from '@/features/auto-fight/runs/components/RuntimeCommandBar';
import {RuntimeEventList} from '@/features/auto-fight/runs/components/RuntimeEventList';

import '@/features/auto-fight/styles/runs.css';

interface RunsModuleProps {
    readonly workflow: WorkflowViewModel;
}

export function RunsModule({workflow}: RunsModuleProps) {
    const runtime = useMockRuntime();
    const [activeView, setActiveView] = useState<RunView>('graph');
    const [followActiveState, setFollowActiveState] = useState(true);
    const hasActiveRun = runtime.controllerSnapshot.status === 'playing'
        || runtime.controllerSnapshot.status === 'paused';

    return (
        <div className="auto-fight-runs-module">
            <aside className="auto-fight-run-list" aria-label="Mock Runs">
                <Heading as="h2">Mock runs</Heading>
                <Text as="p">Offline scenarios retained for frontend observation.</Text>
                <Heading as="h3">Active</Heading>
                {hasActiveRun ? (
                    <RunScenarioButton
                        active
                        name={runtime.scenarios.find(
                            (scenario) => scenario.id === runtime.controllerSnapshot.scenarioId,
                        )?.name ?? runtime.controllerSnapshot.scenarioId}
                        onClick={() => undefined}
                    />
                ) : <Text as="span" className="auto-fight-run-list-empty">No active Run</Text>}
                <Heading as="h3">Recent</Heading>
                {runtime.scenarios.map((scenario) => (
                    <RunScenarioButton
                        active={scenario.id === runtime.controllerSnapshot.scenarioId}
                        key={scenario.id}
                        name={scenario.name}
                        onClick={() => runtime.selectScenario(scenario.id)}
                    />
                ))}
            </aside>
            <section className="auto-fight-run-workspace" aria-label="Selected Mock Run">
                <RuntimeCommandBar
                    followActiveState={followActiveState}
                    onFollowActiveStateChange={setFollowActiveState}
                    onPause={runtime.pause}
                    onPlay={runtime.play}
                    onReset={runtime.reset}
                    onScenarioChange={runtime.selectScenario}
                    onSpeedChange={runtime.setSpeed}
                    onStep={runtime.step}
                    scenarios={runtime.scenarios}
                    snapshot={runtime.controllerSnapshot}
                />
                <RunViewTabs activeView={activeView} onChange={setActiveView}/>
                <div className="auto-fight-run-view" role="tabpanel">
                    {activeView === 'graph' && (
                        <GraphModule
                            followActiveState={followActiveState}
                            runtimeState={runtime.observation.visual}
                            workflow={workflow}
                        />
                    )}
                    {activeView === 'timeline' && (
                        <RuntimeEventList events={runtime.observation.events} mode="timeline"/>
                    )}
                    {activeView === 'events' && (
                        <RuntimeEventList events={runtime.observation.events}/>
                    )}
                    {activeView === 'logs' && (
                        <RuntimeEventList events={runtime.observation.events} mode="logs"/>
                    )}
                </div>
            </section>
        </div>
    );
}

interface RunScenarioButtonProps {
    readonly active: boolean;
    readonly name: string;
    readonly onClick: () => void;
}

function RunScenarioButton({active, name, onClick}: RunScenarioButtonProps) {
    return (
        <Button
            aria-pressed={active}
            className="auto-fight-run-scenario"
            onClick={onClick}
            variant="invisible"
        >
            <span>{name}</span>
            {active && <Label size="small" variant="accent">Selected</Label>}
        </Button>
    );
}
