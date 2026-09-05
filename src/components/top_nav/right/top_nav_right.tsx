'use client';
import {Stack} from "@primer/react";
import AddButton from "./add_button";
import NotificationButton from "./notification_button";
import IssueButton from "./issue_button";
import RepoButton from "./repo_button";
import UserAvatarButton from "@/components/top_nav/right/user_avatar";
import {ThemeModeSelect} from '@/components/theme/ThemeModeSelect';
import {useAppTheme} from '@/components/theme/AppThemeProvider';

interface Props {

}

function TopNavRight(props: Props) {
    const {colorMode, setColorMode} = useAppTheme();

    return (
        <Stack
            className="mt-3 mr-3 ml-2"
            direction="horizontal"
            gap="condensed"
        >
            <ThemeModeSelect colorMode={colorMode} onChange={setColorMode}/>
            <AddButton/>
            <IssueButton/>
            <RepoButton/>
            <NotificationButton/>
            <UserAvatarButton/>
        </Stack>
    );
}

export default TopNavRight;
