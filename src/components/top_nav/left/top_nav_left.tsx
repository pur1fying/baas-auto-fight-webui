'use client';
import { Stack } from "@primer/react";
import OpenMenuButton from "./open_menu_button";
import BAAS_IconButton from "./icon";

interface Props {

}

function TopNavLeft(props: Props) {
    return (
        <Stack 
            direction="horizontal" 
            gap="condensed" 
            padding="normal"
            style={
                {paddingRight: "8px"}
            }
        > 
            <OpenMenuButton />
            <BAAS_IconButton />
        </Stack>
    );
}

export default TopNavLeft;