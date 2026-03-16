import React from "react";
import DefaultLayoutHeader from "@/components/layouts/default/header";
import DefaultLayoutSidebar from "@/components/layouts/default/sidebar";
import DefaultLayoutFooter from "@/components/layouts/default/footer";
import DefaultLayoutContent from "@/components/layouts/default/content";

interface Props {
  header  ? : React.ReactNode;
  sidebar ? : React.ReactNode;
  content ? : React.ReactNode;
  footer  ? : React.ReactNode;
}

function DefaultLayout({ header, sidebar, content, footer }: Props) {
    return (
        <div className="min-h-screen flex flex-col">
            <DefaultLayoutHeader header={header}/>

            <div className="flex flex-1">
                <DefaultLayoutSidebar sidebar={sidebar}/>

                <div className="flex flex-col">
                    <DefaultLayoutContent content={content}/>
                    <DefaultLayoutFooter footer={footer}/>
                </div>
            </div>
        </div>
  );
}

export default DefaultLayout;