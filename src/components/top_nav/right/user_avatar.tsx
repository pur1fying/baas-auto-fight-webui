'use client';

import {ActionList, Avatar, IconButton, Stack} from "@primer/react";
import ButtonOverlay, {useButtonOverlay} from "@/components/overlay/button_overlay";
import React from "react";
import {
    ArrowSwitchIcon,
    GearIcon, LogIcon, MeterIcon,
    PaintbrushIcon,
    PersonIcon,
    RepoIcon,
    SignOutIcon,
    StarIcon
} from "@primer/octicons-react";

const DEFAULT_USER_ICON_PATH = "/logo.png";
const DEFAULT_USER_NAME = "Pur1fying"
const DEFAULT_USER_DISPLAY_NAME = "Pur1fy"

function UserAvatar() {
    return <Avatar src={DEFAULT_USER_ICON_PATH} size={32}/>;
}

function getUsername() {
    return DEFAULT_USER_NAME;
}

function getUserDisplayName() {
    return DEFAULT_USER_DISPLAY_NAME;
}

const container_root_id = 'top-nav-bar-user-avatar-whole-box'

function UserAvatarButton() {
    const {
        isOpen,
        buttonRef,
        renderBoxRef,
        closeOverlay,
        toggleOverlay,
    } = useButtonOverlay(container_root_id);


    return (
        <div ref={renderBoxRef}>
            <IconButton
                ref={buttonRef}
                onClick={toggleOverlay}
                size="medium"
                icon={UserAvatar}
                aria-label="User Icon"
                description={`${isOpen ? "Close" : "Open"} user navigation menu`}
                variant="invisible"
            />

            <ButtonOverlay
                isOpen={isOpen}
                onClose={closeOverlay}
                anchorRef={buttonRef}
                ignoreClickRefs={[buttonRef]}
                containerName={container_root_id}
                width="small"
                height="auto"
                style={{
                    top: "0px",
                    left: "-220px"
                }}
            >

                <UserAvatarButtonOverlayOptions/>

            </ButtonOverlay>
        </div>

    );
}

function UserAvatarButtonOverlayOptions() {
    return (
        <div>
            <UserAvatarButtonOverlayUserAvatarAndName/>

            <div className="p-2">
                <ActionList variant="full">

                    <UserAvatarButtonOverlayProfile/>
                    <UserAvatarButtonOverlayWorkflows/>
                    <UserAvatarButtonOverlayStars/>

                    <ActionList.Divider/>

                    <UserAvatarButtonOverlaySettings/>
                    <UserAvatarButtonOverlayAppearance/>

                    <ActionList.Divider/>

                    <UserAvatarButtonOverlayLog/>
                    <UserAvatarButtonOverlayDataMonitor/>

                    <ActionList.Divider/>

                    <UserAvatarButtonOverlaySignOut/>
                </ActionList>
            </div>

        </div>
    )
}

function UserAvatarButtonOverlayUserAvatarAndName() {
    return (
        <div className="ml-3 mt-3">
            <Stack className="mr-3" direction="horizontal" justify="space-between">
                <Stack direction="horizontal" justify="space-between">
                    <UserAvatar/>
                    <div className="flex flex-column">
                        <div className="text-bold height-auto !h-[17.5px]">{getUsername()}</div>
                        <div className="text-[var(--fgColor-muted)] !h-[17.5px]">{getUserDisplayName()}</div>
                    </div>
                </Stack>

                <IconButton icon={ArrowSwitchIcon} variant="invisible" aria-label="Switch account"/>
            </Stack>
        </div>
    )
}

function UserAvatarButtonOverlayProfile() {
    return (
        <ActionList.Item>
            <ActionList.LeadingVisual>
                <PersonIcon/>
            </ActionList.LeadingVisual>
            Profile
        </ActionList.Item>
    )
}

function UserAvatarButtonOverlayWorkflows() {
    return (
        <ActionList.Item>
            <ActionList.LeadingVisual>
                <RepoIcon/>
            </ActionList.LeadingVisual>
            BAAS Workflows
        </ActionList.Item>
    )
}

function UserAvatarButtonOverlayStars() {
    return (
        <ActionList.Item>
            <ActionList.LeadingVisual>
                <StarIcon/>
            </ActionList.LeadingVisual>
            Stars
        </ActionList.Item>
    )
}

function UserAvatarButtonOverlaySettings() {
    return (
        <ActionList.Item>
            <ActionList.LeadingVisual>
                <GearIcon/>
            </ActionList.LeadingVisual>
            Settings
        </ActionList.Item>
    )
}

function UserAvatarButtonOverlayAppearance() {
    return (
        <ActionList.Item>
            <ActionList.LeadingVisual>
                <PaintbrushIcon/>
            </ActionList.LeadingVisual>
            Appearance
        </ActionList.Item>
    )
}

function UserAvatarButtonOverlayLog() {
    return (
        <ActionList.Item>
            <ActionList.LeadingVisual>
                <LogIcon/>
            </ActionList.LeadingVisual>
            BAAS Webui Log
        </ActionList.Item>
    )
}

function UserAvatarButtonOverlayDataMonitor() {
    return (
        <ActionList.Item>
            <ActionList.LeadingVisual>
                <MeterIcon/>
            </ActionList.LeadingVisual>
            Data Monitor
        </ActionList.Item>
    )
}



function UserAvatarButtonOverlaySignOut() {
    return (
        <ActionList.Item>
            <ActionList.LeadingVisual>
                <SignOutIcon/>
            </ActionList.LeadingVisual>
            Sign out
        </ActionList.Item>
    )
}


export default UserAvatarButton;