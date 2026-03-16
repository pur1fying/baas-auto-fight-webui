import { Stack } from "@primer/react";
import { SingleInfo } from "./current_page_info";
import CurrentPageInfo from "./current_page_info";
import SearchButton from "./search_region/search_module";

interface Props {
    PageInfo: SingleInfo[];
}

function TopNavCenter({ PageInfo }: Props) {
    return (
        <Stack
            className="top-nav-center w-full mt-3"
            direction="horizontal"
            justify="space-between"
            warp="nowrap"
            align="stretch"
        >
            <CurrentPageInfo items={PageInfo} />
            
            <SearchButton/>
        </Stack>
    );
}

export default TopNavCenter;
