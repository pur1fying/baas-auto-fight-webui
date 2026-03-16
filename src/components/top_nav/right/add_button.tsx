import {TriangleDownIcon, PlusIcon} from '@primer/octicons-react'
import { Button, Tooltip } from '@primer/react';

const TriangleDown = () => <TriangleDownIcon size={16} />;
const Plus = () => <PlusIcon size={16} />;
const button_style = `
    !hidden 
    sm:!flex
    !bg-[var(--bgColor-default)] 
    !p-2
    !gap-1
    !w-[50px]
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