'use client';
import { Stack } from "@primer/react";
import AddButton from "./add_button";
import NotificationButton from "./notification_button";
import IssueButton from "./issue_button";
import RepoButton from "./repo_button";
import UserAvatarButton from "@/components/top_nav/right/user_avatar";
interface Props {

}

function TopNavRight(props: Props) {
    return (
        <Stack
            className="mt-3 mr-3 ml-2"
            direction="horizontal" 
            gap="condensed" 
        >
            <AddButton/>
            <IssueButton/>
            <RepoButton/>
            <NotificationButton/>
            <UserAvatarButton/>
        </Stack>
    );
}

export default TopNavRight;