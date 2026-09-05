import {
    ArrowDownIcon,
    ArrowRightIcon,
    ScreenFullIcon,
    SidebarExpandIcon,
} from '@primer/octicons-react';
import {Button, ButtonGroup} from '@primer/react';

import type {LayoutDirection} from '@/features/auto-fight/model/workflow';

interface GraphCommandBarProps {
    readonly direction: LayoutDirection;
    readonly isDetailCollapsed: boolean;
    readonly onDirectionChange: (direction: LayoutDirection) => void;
    readonly onFitView: () => void;
    readonly onShowDetails: () => void;
}

export function GraphCommandBar({
    direction,
    isDetailCollapsed,
    onDirectionChange,
    onFitView,
    onShowDetails,
}: GraphCommandBarProps) {
    return (
        <div className="auto-fight-graph-command-bar" aria-label="State Graph view controls">
            <ButtonGroup aria-label="Automatic layout direction">
                <Button
                    aria-label="Left to right layout"
                    aria-pressed={direction === 'left-to-right'}
                    leadingVisual={ArrowRightIcon}
                    onClick={() => onDirectionChange('left-to-right')}
                >
                    Left → right
                </Button>
                <Button
                    aria-label="Top to bottom layout"
                    aria-pressed={direction === 'top-to-bottom'}
                    leadingVisual={ArrowDownIcon}
                    onClick={() => onDirectionChange('top-to-bottom')}
                >
                    Top → bottom
                </Button>
            </ButtonGroup>
            <Button leadingVisual={ScreenFullIcon} onClick={onFitView} aria-label="Fit graph to view">
                Fit
            </Button>
            {isDetailCollapsed && (
                <Button leadingVisual={SidebarExpandIcon} onClick={onShowDetails}>Show details</Button>
            )}
        </div>
    );
}
