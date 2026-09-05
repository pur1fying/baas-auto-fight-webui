import {Children, isValidElement, Suspense} from 'react';
import type {ReactElement, ReactNode} from 'react';
import {describe, expect, test} from 'vitest';

import RootLayout from '@/app/layout';

interface ElementWithChildren {
    readonly children: ReactNode;
}

function asElement(node: ReactNode): ReactElement<ElementWithChildren> {
    if (!isValidElement<ElementWithChildren>(node)) {
        throw new Error('Expected a React element with children.');
    }
    return node;
}

describe('RootLayout', () => {
    test('isolates the URL logger behind the Suspense boundary required by Next.js', () => {
        const root = asElement(RootLayout({children: <main>Application</main>}));
        const body = asElement(Children.only(root.props.children));
        const themeProvider = asElement(Children.only(body.props.children));
        const themeChildren = Children.toArray(themeProvider.props.children);

        expect(asElement(themeChildren[0]).type).toBe(Suspense);
    });
});
