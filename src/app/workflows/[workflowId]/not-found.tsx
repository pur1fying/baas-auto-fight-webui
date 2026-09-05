'use client';

import Link from 'next/link';
import {ArrowLeftIcon} from '@primer/octicons-react';
import {Button, Heading, Text} from '@primer/react';

export default function WorkflowNotFound() {
    return (
        <section className="auto-fight-project-unavailable">
            <Heading as="h1">Workflow unavailable</Heading>
            <Text as="p">This workflow does not exist or is not available in the local F1 demo.</Text>
            <Button as={Link} href="/" leadingVisual={ArrowLeftIcon}>Back to workflows</Button>
        </section>
    );
}
