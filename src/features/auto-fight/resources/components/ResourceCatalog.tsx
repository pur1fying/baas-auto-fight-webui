import {Button, Label, Text} from '@primer/react';

import type {ResourceCatalogItem} from '@/features/auto-fight/resources/model/resourceCatalog';

interface ResourceCatalogProps {
    readonly items: readonly ResourceCatalogItem[];
    readonly onOpen: (item: ResourceCatalogItem) => void;
    readonly onPin: (item: ResourceCatalogItem) => void;
}

export function ResourceCatalog({items, onOpen, onPin}: ResourceCatalogProps) {
    return (
        <ul className="auto-fight-resource-list" aria-label="Workflow resources">
            {items.map((item) => (
                <li key={item.id}>
                    <Button
                        aria-label={`Open ${item.kind} ${item.name}`}
                        className="auto-fight-resource-row"
                        onClick={() => onOpen(item)}
                        onDoubleClick={() => onPin(item)}
                        variant="invisible"
                    >
                        <span className="auto-fight-resource-row-main">
                            <Text as="strong">{item.name}</Text>
                            <Text as="span">{item.description}</Text>
                        </span>
                        <Label size="small">{item.typeLabel}</Label>
                        <Text as="span" className="auto-fight-resource-usage">{item.usageCount} usages</Text>
                    </Button>
                </li>
            ))}
        </ul>
    );
}
