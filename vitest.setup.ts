import '@testing-library/jest-dom/vitest';

import {cleanup} from '@testing-library/react';
import {afterEach} from 'vitest';

afterEach(() => {
    cleanup();
});

class ResizeObserverStub implements ResizeObserver {
    constructor(private readonly callback: ResizeObserverCallback) {}

    disconnect(): void {}
    observe(target: Element): void {
        const contentRect = target.getBoundingClientRect();
        this.callback([{
            target,
            contentRect,
            borderBoxSize: [],
            contentBoxSize: [],
            devicePixelContentBoxSize: [],
        }], this);
    }
    unobserve(): void {}
}

Object.defineProperty(globalThis, 'ResizeObserver', {
    configurable: true,
    value: ResizeObserverStub,
});

Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: (query: string): MediaQueryList => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        addListener: () => undefined,
        removeListener: () => undefined,
        dispatchEvent: () => true,
    }),
});

Object.defineProperty(Document.prototype, 'adoptedStyleSheets', {
    configurable: true,
    writable: true,
    value: [],
});

Object.defineProperty(ShadowRoot.prototype, 'adoptedStyleSheets', {
    configurable: true,
    writable: true,
    value: [],
});

HTMLElement.prototype.getBoundingClientRect = function getBoundingClientRect(): DOMRect {
    return new DOMRect(0, 0, 1024, 768);
};

for (const property of ['clientWidth', 'offsetWidth']) {
    Object.defineProperty(HTMLElement.prototype, property, {
        configurable: true,
        get: () => 1024,
    });
}

for (const property of ['clientHeight', 'offsetHeight']) {
    Object.defineProperty(HTMLElement.prototype, property, {
        configurable: true,
        get: () => 768,
    });
}

Object.defineProperty(window, 'DOMMatrixReadOnly', {
    configurable: true,
    value: class DOMMatrixReadOnlyStub {
        readonly m22 = 1;
    },
});
