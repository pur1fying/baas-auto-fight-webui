import React from 'react'

import {TriangleDownIcon, PlusIcon, RepoIcon, IssueOpenedIcon} from '@primer/octicons-react'
import {Button, Tooltip, ActionList} from '@primer/react';

import ButtonOverlay, {useButtonOverlay} from "@/components/overlay/button_overlay";
import {useRouter} from "next/navigation";

const TriangleDown = () => <TriangleDownIcon size={16}/>;
const Plus = () => <PlusIcon size={16}/>;
const add_button_style = `
    !hidden 
    sm:!flex
    !bg-[var(--bgColor-default)] 
    !p-2
    !gap-1
    !w-[50px]
`
const container_root_id = 'top-nav-bar-add-button-whole-box'

function AddButton() {
    // Overlay control
    const {
        isOpen,
        buttonRef,
        buttonContainerRef,
        renderBoxRef,
        closeOverlay,
        toggleOverlay,
    } = useButtonOverlay(container_root_id);


    return (
        <div ref={renderBoxRef}>
            <div ref={buttonContainerRef}>
                <Tooltip text="Create new...">
                    <Button
                        onClick={toggleOverlay}
                        className={add_button_style}
                        leadingVisual={Plus}
                        trailingAction={TriangleDown}>
                    </Button>
                </Tooltip>
            </div>

            <ButtonOverlay
                isOpen={isOpen}
                onClose={closeOverlay}
                anchorRef={buttonRef}
                ignoreClickRefs={[buttonContainerRef]}
                containerName={container_root_id}>

                <AddButtonOverlayOptions/>
            </ButtonOverlay>
        </div>
    );
}

function AddButtonOverlayOptions() {
    return (
        <ActionList>
            <AddButtonOverlayOptionNewWorkFlow/>
            <AddButtonOverlayOptionNewIssue/>
        </ActionList>
    )
}

function AddButtonOverlayOptionNewWorkFlow() {
    const router = useRouter()

    return (
        <ActionList.Item onClick={ () => { router.push('/new') } }>
            <ActionList.LeadingVisual>
                <RepoIcon/>
            </ActionList.LeadingVisual>
            New BAAS Workflow
        </ActionList.Item>
    )
}

function AddButtonOverlayOptionNewIssue() {
    return (
        <ActionList.Item>
            <ActionList.LeadingVisual>
                <IssueOpenedIcon/>
            </ActionList.LeadingVisual>
            New Issue
        </ActionList.Item>
    )
}


export default AddButton;

