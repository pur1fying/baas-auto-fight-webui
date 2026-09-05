import type {
    DetailResourceKind,
    DetailResourceRef,
} from '@/features/auto-fight/details/store/detailTabsReducer';

export type DetailView = 'fields' | 'json' | 'usage';

export interface DetailQuery {
    readonly kind: DetailResourceKind;
    readonly id: string;
    readonly view?: DetailView;
    readonly focus?: string;
}

const RESOURCE_KINDS: readonly DetailResourceKind[] = ['workflow', 'state', 'action', 'condition'];
const DETAIL_VIEWS: readonly DetailView[] = ['fields', 'json', 'usage'];

function isResourceKind(value: string | null): value is DetailResourceKind {
    return value !== null && RESOURCE_KINDS.some((kind) => kind === value);
}

function isDetailView(value: string | null): value is DetailView {
    return value !== null && DETAIL_VIEWS.some((view) => view === value);
}

export function readDetailQuery(params: URLSearchParams): DetailQuery | undefined {
    const kind = params.get('detailKind');
    const id = params.get('detailId');
    if (!isResourceKind(kind) || id === null || id.length === 0) return undefined;

    const viewValue = params.get('detailView');
    const focus = params.get('focus');
    return {
        kind,
        id,
        ...(isDetailView(viewValue) ? {view: viewValue} : {}),
        ...(focus === null || focus.length === 0 ? {} : {focus}),
    };
}

export function writeDetailQuery(
    source: URLSearchParams,
    resource: DetailResourceRef,
    view?: DetailView,
): URLSearchParams {
    const params = new URLSearchParams(source);
    params.set('detailKind', resource.kind);
    params.set('detailId', resource.id);
    if (view === undefined) params.delete('detailView');
    else params.set('detailView', view);
    if (resource.anchorId === undefined) params.delete('focus');
    else params.set('focus', resource.anchorId);
    return params;
}

export function clearDetailQuery(source: URLSearchParams): URLSearchParams {
    const params = new URLSearchParams(source);
    for (const key of ['detailKind', 'detailId', 'detailView', 'focus']) params.delete(key);
    return params;
}
