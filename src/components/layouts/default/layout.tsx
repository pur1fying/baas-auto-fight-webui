import React from "react";
import DefaultLayoutHeader from "@/components/layouts/default/header";
import DefaultLayoutSidebar from "@/components/layouts/default/sidebar";
import DefaultLayoutFooter from "@/components/layouts/default/footer";
import DefaultLayoutContent from "@/components/layouts/default/content";
import ImageBackground from "@/components/background/imgae_background";

interface Props {
    header  ? : React.ReactNode;
    sidebar ? : React.ReactNode;
    sidebar_width ? : string;
    content ? : React.ReactNode;
    footer  ? : React.ReactNode;
}

function DefaultLayout(
    {
        header,
        sidebar,
        sidebar_width,
        content,
        footer
    }: Props)
{
    return (
        <ImageBackground>
            <div className="min-h-screen flex flex-col">
                <DefaultLayoutHeader header={header}/>

                <div className="flex flex-1">
                    <DefaultLayoutSidebar sidebar={sidebar} width={sidebar_width}/>

                    <div className="flex flex-col flex-1">
                        <DefaultLayoutContent content={content}/>
                        <DefaultLayoutFooter footer={footer}/>
                    </div>
                </div>
            </div>
        </ImageBackground>
    );
}

export default DefaultLayout;