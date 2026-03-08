import { Stack } from "@primer/react";
import TopNavLeft from "./left/top_nav_left";
import TopNavCenter from "./center/top_nav_center";
import { SingleInfo } from "./center/current_page_info";


interface Props { 
    PageInfo: SingleInfo[];
}

function TopNavBar ({PageInfo}: Props) {
    return (
        <Stack direction="horizontal" gap="none" padding="none" className="top-nav-bar">
            <TopNavLeft/>
            <TopNavCenter PageInfo={PageInfo}/>
        </Stack>
    );
};


export default TopNavBar;