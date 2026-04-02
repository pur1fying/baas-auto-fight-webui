import { Stack } from "@primer/react";
import CurrentPageInfo from "./current_page_info";
import SearchButton from "./search_region/search_module";


function TopNavCenter() {
    return (
        <Stack
            className="top-nav-center w-full mt-3"
            direction="horizontal"
            justify="space-between"
            warp="nowrap"
            align="stretch"
        >
            <CurrentPageInfo/>
            
            <SearchButton/>
        </Stack>
    );
}

export default TopNavCenter;
