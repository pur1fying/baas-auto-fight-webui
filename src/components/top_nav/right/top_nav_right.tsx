'use client';
import { Stack } from "@primer/react";
import AddButton from "./add_button";
import NotificationButton from "./notification_button";
import IssueButton from "./issue_button";
import RepoButton from "./repo_button";
interface Props {

}

function TopNavRight(props: Props) {
    return (
        <Stack 
            direction="horizontal" 
            gap="condensed" 
            padding="normal"
            style={
                {paddingRight: "8px"}
            }
        > 
            <AddButton/>
            <IssueButton/>
            <RepoButton/>
            <NotificationButton/>
        </Stack>
    );
}

export default TopNavRight;