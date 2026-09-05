'use client';

import {useCallback, useEffect, useMemo, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {SidebarExpandIcon, XIcon} from '@primer/octicons-react';
import {Button, Heading, Select, Text, TextInput} from '@primer/react';

import {DetailDock} from '@/features/auto-fight/details/components/DetailDock';
import {useResizableDock} from '@/features/auto-fight/details/components/useResizableDock';
import type {DetailResourceRef} from '@/features/auto-fight/details/store/detailTabsReducer';
import {createDetailKey} from '@/features/auto-fight/details/store/detailTabsReducer';
import {useDetailTabs} from '@/features/auto-fight/details/store/useDetailTabs';
import type {WorkflowViewModel} from '@/features/auto-fight/model/workflow';
import {ResourceCatalog} from '@/features/auto-fight/resources/components/ResourceCatalog';
import type {
    ResourceCatalogItem,
    ResourceKind,
} from '@/features/auto-fight/resources/model/resourceCatalog';
import {createResourceCatalog} from '@/features/auto-fight/resources/model/resourceCatalog';
import {
    clearDetailQuery,
    readDetailQuery,
    writeDetailQuery,
} from '@/features/auto-fight/resources/navigation/detailRoute';

import '@/features/auto-fight/styles/autoFight.css';
import '@/features/auto-fight/styles/resources.css';

interface ResourceBrowserProps {
    readonly workflow: WorkflowViewModel;
    readonly kind: ResourceKind;
}

function resourceTitle(workflow: WorkflowViewModel, resource: Pick<DetailResourceRef, 'kind' | 'id'>): string {
    if (resource.kind === 'workflow') return workflow.name;
    if (resource.kind === 'state') return workflow.states[resource.id]?.name ?? resource.id;
    if (resource.kind === 'action') return workflow.actions[resource.id]?.name ?? resource.id;
    return workflow.conditions[resource.id]?.name ?? resource.id;
}

function toDetailRef(item: ResourceCatalogItem): DetailResourceRef {
    return {kind: item.kind, id: item.id, title: item.name};
}

export function ResourceBrowser({workflow, kind}: ResourceBrowserProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const details = useDetailTabs();
    const dock = useResizableDock();
    const [query, setQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [isDetailCollapsed, setDetailCollapsed] = useState(false);
    const serializedSearchParams = searchParams.toString();
    const catalog = useMemo(() => createResourceCatalog(workflow, kind), [kind, workflow]);
    const types = useMemo(() => [...new Set(catalog.map((item) => item.typeLabel))], [catalog]);
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const filteredItems = catalog.filter((item) => (
        (typeFilter === 'all' || item.typeLabel === typeFilter)
        && (normalizedQuery.length === 0
            || item.name.toLocaleLowerCase().includes(normalizedQuery)
            || item.description.toLocaleLowerCase().includes(normalizedQuery))
    ));

    const open = useCallback((resource: DetailResourceRef, updateLocation = true) => {
        details.open(resource);
        setDetailCollapsed(false);
        if (updateLocation) {
            const params = writeDetailQuery(new URLSearchParams(searchParams.toString()), resource);
            router.push(`?${params.toString()}`);
        }
    }, [details.open, router, searchParams]);

    useEffect(() => {
        const detailQuery = readDetailQuery(new URLSearchParams(serializedSearchParams));
        if (detailQuery === undefined) return;
        details.open({
            kind: detailQuery.kind,
            id: detailQuery.id,
            title: resourceTitle(workflow, detailQuery),
            ...(detailQuery.focus === undefined ? {} : {anchorId: detailQuery.focus}),
        });
        setDetailCollapsed(false);
    }, [details.open, serializedSearchParams, workflow]);

    const pin = useCallback((item: ResourceCatalogItem) => {
        const resource = toDetailRef(item);
        open(resource);
        details.pin(createDetailKey(resource));
    }, [details.pin, open]);

    const close = useCallback((key: string) => {
        const closesActive = details.state.activeKey === key;
        details.close(key);
        if (closesActive) {
            const params = clearDetailQuery(new URLSearchParams(searchParams.toString()));
            router.push(params.size === 0 ? '?' : `?${params.toString()}`);
        }
    }, [details, router, searchParams]);

    const resourceLabel = kind === 'action' ? 'actions' : 'conditions';
    const hasFilters = query.length > 0 || typeFilter !== 'all';

    return (
        <div className="auto-fight-resource-browser">
            <section className="auto-fight-resource-catalog" aria-labelledby={`${kind}-catalog-heading`}>
                <header className="auto-fight-resource-header">
                    <div>
                        <Heading as="h2" id={`${kind}-catalog-heading`}>
                            {kind === 'action' ? 'Actions' : 'Conditions'}
                        </Heading>
                        <Text as="p">Read-only resources from the current Mock workflow.</Text>
                    </div>
                    {isDetailCollapsed && (
                        <Button leadingVisual={SidebarExpandIcon} onClick={() => setDetailCollapsed(false)}>
                            Show details
                        </Button>
                    )}
                </header>
                <div className="auto-fight-resource-filters">
                    <TextInput
                        aria-label={`Filter ${resourceLabel}`}
                        block
                        onChange={(event) => setQuery(event.currentTarget.value)}
                        placeholder={`Filter ${resourceLabel}`}
                        type="search"
                        value={query}
                    />
                    <Select
                        aria-label={`Filter ${resourceLabel} by type`}
                        onChange={(event) => setTypeFilter(event.currentTarget.value)}
                        value={typeFilter}
                    >
                        <Select.Option value="all">All types</Select.Option>
                        {types.map((type) => <Select.Option key={type} value={type}>{type}</Select.Option>)}
                    </Select>
                </div>
                {catalog.length === 0 ? (
                    <div className="auto-fight-resource-empty">No {resourceLabel} are defined in this workflow.</div>
                ) : filteredItems.length === 0 ? (
                    <div className="auto-fight-resource-empty">
                        <Text as="p">No {resourceLabel} match the current filters.</Text>
                        {hasFilters && (
                            <Button
                                leadingVisual={XIcon}
                                onClick={() => { setQuery(''); setTypeFilter('all'); }}
                            >
                                Clear filters
                            </Button>
                        )}
                    </div>
                ) : (
                    <ResourceCatalog
                        items={filteredItems}
                        onOpen={(item) => open(toDetailRef(item))}
                        onPin={pin}
                    />
                )}
            </section>
            {!isDetailCollapsed && (
                <DetailDock
                    onActivate={details.activate}
                    onClose={close}
                    onCollapse={() => setDetailCollapsed(true)}
                    onPin={details.pin}
                    onResizeBy={dock.onResizeBy}
                    onResizeStart={dock.onResizeStart}
                    tabsState={details.state}
                    width={dock.width}
                    workflow={workflow}
                />
            )}
        </div>
    );
}
