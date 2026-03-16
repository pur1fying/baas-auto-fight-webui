import {IssueOpenedIcon} from '@primer/octicons-react'
import { IconButton } from '@primer/react';


function IssueButton() {
    return (
        <>
            <IconButton 
                as = "button"
                className = "!bg-[var(--bgColor-default)] !hidden sm:!flex"
                size="medium"
                icon={IssueOpenedIcon}
                aria-label="Issue"
                description='Issues'
                keybindingHint='G D'
            />
        </>
    );
}

export default IssueButton;