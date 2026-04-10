'use client';

import { useRouter } from "next/navigation";
import { useTranslation } from 'react-i18next';

import {ActionList, Avatar, IconButton, Stack} from "@primer/react";
import ButtonOverlay, {useButtonOverlay} from "@/components/overlay/button_overlay";
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
    const { t } = useTranslation();
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
                aria-label={t('userMenu.userIcon')}
                description={isOpen ? t('userMenu.closeUserNavMenu') : t('userMenu.openUserNavMenu')}
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
    const { t } = useTranslation();
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

                <IconButton icon={ArrowSwitchIcon} variant="invisible" aria-label={t('userMenu.switchAccount')}/>
            </Stack>
        </div>
    )
}

function UserAvatarButtonOverlayProfile() {
    const { t } = useTranslation();
    return (
        <ActionList.Item>
            <ActionList.LeadingVisual>
                <PersonIcon/>
            </ActionList.LeadingVisual>
            {t('userMenu.profile')}
        </ActionList.Item>
    )
}

function UserAvatarButtonOverlayWorkflows() {
    const { t } = useTranslation();
    return (
        <ActionList.Item>
            <ActionList.LeadingVisual>
                <RepoIcon/>
            </ActionList.LeadingVisual>
            {t('userMenu.baasWorkflows')}
        </ActionList.Item>
    )
}

function UserAvatarButtonOverlayStars() {
    const { t } = useTranslation();
    return (
        <ActionList.Item>
            <ActionList.LeadingVisual>
                <StarIcon/>
            </ActionList.LeadingVisual>
            {t('userMenu.stars')}
        </ActionList.Item>
    )
}

function UserAvatarButtonOverlaySettings() {
    const { t } = useTranslation();
    return (
        <ActionList.Item>
            <ActionList.LeadingVisual>
                <GearIcon/>
            </ActionList.LeadingVisual>
            {t('userMenu.settings')}
        </ActionList.Item>
    )
}

function UserAvatarButtonOverlayAppearance() {
    const { t } = useTranslation();
    return (
        <ActionList.Item>
            <ActionList.LeadingVisual>
                <PaintbrushIcon/>
            </ActionList.LeadingVisual>
            {t('userMenu.appearance')}
        </ActionList.Item>
    )
}

function UserAvatarButtonOverlayLog() {
    const { t } = useTranslation();
    const router = useRouter()

    return (
        <ActionList.Item onClick={ () => { router.push('/dashboard/webui_log') } }>
            <ActionList.LeadingVisual>
                <LogIcon/>
            </ActionList.LeadingVisual>
            {t('userMenu.baasWebuiLog')}
        </ActionList.Item>
    )
}

function UserAvatarButtonOverlayDataMonitor() {
    const { t } = useTranslation();
    return (
        <ActionList.Item>
            <ActionList.LeadingVisual>
                <MeterIcon/>
            </ActionList.LeadingVisual>
            {t('userMenu.dataMonitor')}
        </ActionList.Item>
    )
}

function UserAvatarButtonOverlaySignOut() {
    const { t } = useTranslation();
    return (
        <ActionList.Item>
            <ActionList.LeadingVisual>
                <SignOutIcon/>
            </ActionList.LeadingVisual>
            {t('userMenu.signOut')}
        </ActionList.Item>
    )
}


export default UserAvatarButton;