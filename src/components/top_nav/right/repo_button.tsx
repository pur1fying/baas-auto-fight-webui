import {RepoIcon} from '@primer/octicons-react'
import { IconButton } from '@primer/react';


function RepoButton() {
    return (
        <>
            <IconButton 
                className = "!bg-[var(--bgColor-default)]"
                size = "medium"
                aria-label="Repositories"
                icon={RepoIcon}
                description='Repositories'
            />
        </>
    );
}

export default RepoButton;