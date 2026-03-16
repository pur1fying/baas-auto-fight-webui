import { Stack } from "@primer/react";
import TopNavLeft from "./left/top_nav_left";
import TopNavCenter from "./center/top_nav_center";
import { SingleInfo } from "./center/current_page_info";
import TopNavRight from "./right/top_nav_right";


interface Props { 
    PageInfo: SingleInfo[];
}

function TopNavBar ({PageInfo}: Props) {
    return (
        <Stack
            className="top-nav-bar"
            direction="horizontal"
            gap="none"
            padding="none"
            justify="space-between">
            <TopNavLeft/>
            <TopNavCenter PageInfo={PageInfo}/>
            <TopNavRight/>
        </Stack>
    );
};


export default TopNavBar;