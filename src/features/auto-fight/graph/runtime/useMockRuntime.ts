'use client';

import {useCallback, useEffect, useMemo, useReducer, useState} from 'react';

import {
    MOCK_SCENARIOS,
    MockRuntimeController,
} from '@/features/auto-fight/mock/MockRuntimeController';
import {
    createRuntimeObservationState,
    runtimeObservationReducer,
} from '@/features/auto-fight/runs/model/runtimeObservation';

export function useMockRuntime() {
    const controller = useMemo(() => new MockRuntimeController(MOCK_SCENARIOS[0]), []);
    const [observation, dispatch] = useReducer(
        runtimeObservationReducer,
        'mock-live-run',
        createRuntimeObservationState,
    );
    const [controllerSnapshot, setControllerSnapshot] = useState(controller.getSnapshot());

    const refreshSnapshot = useCallback(() => {
        setControllerSnapshot(controller.getSnapshot());
    }, [controller]);

    useEffect(() => {
        const unsubscribe = controller.subscribe((event) => {
            dispatch(event);
            setControllerSnapshot(controller.getSnapshot());
        });
        return () => {
            unsubscribe();
            controller.reset();
        };
    }, [controller]);

    useEffect(() => {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => controller.setReducedMotion(media.matches);
        update();
        media.addEventListener('change', update);
        return () => media.removeEventListener('change', update);
    }, [controller]);

    const selectScenario = useCallback((scenarioId: string) => {
        const scenario = MOCK_SCENARIOS.find((candidate) => candidate.id === scenarioId);
        if (scenario === undefined) {
            return;
        }
        controller.setScenario(scenario);
        refreshSnapshot();
    }, [controller, refreshSnapshot]);

    const play = useCallback(() => {
        controller.play();
        refreshSnapshot();
    }, [controller, refreshSnapshot]);
    const pause = useCallback(() => {
        controller.pause();
        refreshSnapshot();
    }, [controller, refreshSnapshot]);
    const step = useCallback(() => {
        controller.step();
        refreshSnapshot();
    }, [controller, refreshSnapshot]);
    const reset = useCallback(() => {
        controller.reset();
        refreshSnapshot();
    }, [controller, refreshSnapshot]);
    const setSpeed = useCallback((speed: number) => {
        controller.setSpeed(speed);
        refreshSnapshot();
    }, [controller, refreshSnapshot]);

    return {
        observation,
        runtimeState: observation.visual,
        controllerSnapshot,
        scenarios: MOCK_SCENARIOS,
        selectScenario,
        play,
        pause,
        step,
        reset,
        setSpeed,
    };
}
