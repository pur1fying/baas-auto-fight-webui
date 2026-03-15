import {TriangleDownIcon, PlusIcon} from '@primer/octicons-react'
import { Button, Tooltip } from '@primer/react';

const TriangleDown = () => <TriangleDownIcon size={16} />;
const Plus = () => <PlusIcon size={16} />;
const button_style = `
    !bg-[var(--bgColor-default)] 
    !p-2
    !gap-1
`

function AddButton() {
    return (
        <Tooltip text="Create new..." > 
            <Button 
                className={button_style}
                leadingVisual={Plus} 
                trailingAction={TriangleDown}
                >
            </Button>
        </Tooltip>
    );
}


export default AddButton;