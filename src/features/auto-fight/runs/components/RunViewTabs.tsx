import {Button} from '@primer/react';

export type RunView = 'graph' | 'timeline' | 'events' | 'logs';

interface RunViewTabsProps {
    readonly activeView: RunView;
    readonly onChange: (view: RunView) => void;
}

const RUN_VIEWS: readonly {readonly id: RunView; readonly label: string}[] = [
    {id: 'graph', label: 'Live Graph'},
    {id: 'timeline', label: 'Timeline'},
    {id: 'events', label: 'Events'},
    {id: 'logs', label: 'Logs'},
];

export function RunViewTabs({activeView, onChange}: RunViewTabsProps) {
    return (
        <div className="auto-fight-run-tabs" role="tablist" aria-label="Run views">
            {RUN_VIEWS.map((view) => (
                <Button
                    aria-selected={activeView === view.id}
                    className="auto-fight-run-tab"
                    key={view.id}
                    onClick={() => onChange(view.id)}
                    role="tab"
                    variant="invisible"
                >
                    {view.label}
                </Button>
            ))}
        </div>
    );
}
