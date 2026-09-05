import type {
    RuntimeEvent,
    RuntimeEventSource,
} from '@/features/auto-fight/graph/runtime/runtimeTypes';

export interface MockScenario {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly events: readonly RuntimeEvent[];
}

export interface MockControllerSnapshot {
    readonly scenarioId: string;
    readonly nextEventIndex: number;
    readonly eventCount: number;
    readonly status: 'idle' | 'playing' | 'paused' | 'complete';
    readonly speed: number;
}

export const MOCK_SCENARIOS: readonly MockScenario[] = [
    {
        id: 'condition-path',
        name: 'Condition 路径',
        description: '费用与击败条件依次成立。',
        events: [
            {type: 'run-started', stateId: 'opening'},
            {type: 'transition-selected', edgeId: 'opening:condition:0', from: 'opening', to: 'burst', kind: 'condition'},
            {type: 'state-entered', stateId: 'burst'},
            {type: 'transition-selected', edgeId: 'burst:condition:0', from: 'burst', to: 'victory', kind: 'condition'},
            {type: 'state-entered', stateId: 'victory'},
            {type: 'run-completed', stateId: 'victory'},
        ],
    },
    {
        id: 'default-path',
        name: 'Default 路径',
        description: '条件均未成立，最终进入超时结束。',
        events: [
            {type: 'run-started', stateId: 'opening'},
            {type: 'transition-selected', edgeId: 'opening:default:0', from: 'opening', to: 'wait-cost', kind: 'default'},
            {type: 'state-entered', stateId: 'wait-cost'},
            {type: 'transition-selected', edgeId: 'wait-cost:default:0', from: 'wait-cost', to: 'timeout', kind: 'default'},
            {type: 'state-entered', stateId: 'timeout'},
            {type: 'run-completed', stateId: 'timeout'},
        ],
    },
    {
        id: 'action-fail-path',
        name: 'Action fail 路径',
        description: '开场失败后重开，再恢复并进入成功结束节点。',
        events: [
            {type: 'run-started', stateId: 'opening'},
            {type: 'transition-selected', edgeId: 'opening:action-fail:0', from: 'opening', to: 'restart', kind: 'action-fail'},
            {type: 'state-entered', stateId: 'restart'},
            {type: 'transition-selected', edgeId: 'restart:default:0', from: 'restart', to: 'opening', kind: 'default'},
            {type: 'state-entered', stateId: 'opening'},
            {type: 'transition-selected', edgeId: 'opening:condition:0', from: 'opening', to: 'burst', kind: 'condition'},
            {type: 'state-entered', stateId: 'burst'},
            {type: 'transition-selected', edgeId: 'burst:default:0', from: 'burst', to: 'finisher', kind: 'default'},
            {type: 'state-entered', stateId: 'finisher'},
            {type: 'run-completed', stateId: 'finisher'},
        ],
    },
];

type Listener = (event: RuntimeEvent) => void;

export class MockRuntimeController implements RuntimeEventSource {
    private scenario: MockScenario;
    private readonly listeners = new Set<Listener>();
    private nextEventIndex = 0;
    private status: MockControllerSnapshot['status'] = 'idle';
    private speed = 1;
    private reducedMotion = false;
    private timer: ReturnType<typeof setTimeout> | undefined;

    constructor(scenario: MockScenario, private readonly baseDelayMs = 900) {
        this.scenario = scenario;
    }

    subscribe(listener: Listener): () => void {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    getSnapshot(): MockControllerSnapshot {
        return {
            scenarioId: this.scenario.id,
            nextEventIndex: this.nextEventIndex,
            eventCount: this.scenario.events.length,
            status: this.status,
            speed: this.speed,
        };
    }

    setScenario(scenario: MockScenario): void {
        this.clearTimer();
        this.scenario = scenario;
        this.nextEventIndex = 0;
        this.status = 'idle';
        this.emit({type: 'run-reset'});
    }

    setSpeed(speed: number): void {
        if (speed <= 0) {
            throw new RangeError('Mock runtime speed must be greater than zero.');
        }
        this.speed = speed;
        if (this.status === 'playing') {
            this.scheduleNext();
        }
    }

    setReducedMotion(reducedMotion: boolean): void {
        this.reducedMotion = reducedMotion;
    }

    play(): void {
        if (this.status === 'playing' || this.status === 'complete') {
            return;
        }
        if (this.status === 'paused') {
            this.status = 'playing';
            this.emit({type: 'run-resumed'});
            this.scheduleNext();
            return;
        }
        this.status = 'playing';
        this.dispatchNext(true);
    }

    pause(): void {
        if (this.status !== 'playing') {
            return;
        }
        this.clearTimer();
        this.status = 'paused';
        this.emit({type: 'run-paused'});
    }

    step(): void {
        if (this.status === 'complete') {
            return;
        }
        this.clearTimer();
        this.dispatchNext(false);
    }

    reset(): void {
        this.clearTimer();
        this.nextEventIndex = 0;
        this.status = 'idle';
        this.emit({type: 'run-reset'});
    }

    private dispatchNext(keepPlaying: boolean): void {
        const event = this.scenario.events[this.nextEventIndex];
        if (event === undefined) {
            this.status = 'complete';
            return;
        }
        this.nextEventIndex += 1;
        if (this.nextEventIndex >= this.scenario.events.length) {
            this.status = 'complete';
        } else if (keepPlaying) {
            this.status = 'playing';
        } else {
            this.status = 'paused';
        }
        this.emit(event);

        if (this.status === 'playing') {
            const nextDelay = this.reducedMotion && event.type === 'transition-selected'
                ? 0
                : undefined;
            this.scheduleNext(nextDelay);
        }
    }

    private scheduleNext(delayMs = this.baseDelayMs / this.speed): void {
        this.clearTimer();
        this.timer = setTimeout(() => this.dispatchNext(true), delayMs);
    }

    private clearTimer(): void {
        if (this.timer !== undefined) {
            clearTimeout(this.timer);
            this.timer = undefined;
        }
    }

    private emit(event: RuntimeEvent): void {
        for (const listener of this.listeners) {
            listener(event);
        }
    }
}
