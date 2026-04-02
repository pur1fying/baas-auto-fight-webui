import { Stack } from "@primer/react";
import TopNavLeft from "./left/top_nav_left";
import TopNavCenter from "./center/top_nav_center";
import TopNavRight from "./right/top_nav_right";

function TopNavBar () {
    return (
        <Stack
            className="top-nav-bar"
            direction="horizontal"
            gap="none"
            padding="none"
            justify="space-between">

            <TopNavLeft/>

            <TopNavCenter/>

            <TopNavRight/>

        </Stack>
    );
};


export default TopNavBar;