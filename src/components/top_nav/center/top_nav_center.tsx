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
            className="top-nav-center"
            direction="horizontal"
            gap="condensed"
            padding="normal"
            justify="start"
            warp="nowrap"
            align="stretch"
            style= {{
                paddingLeft: "0px"
            }}
        >
            <CurrentPageInfo items={PageInfo} />
            
            <SearchButton/>
        </Stack>
    );
}

export default TopNavCenter;
