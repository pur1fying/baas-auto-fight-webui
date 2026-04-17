import {Text, Timeline} from "@primer/react";
import CreateNewFormGeneral from "@/components/BAAS/workflow/new/form/general";


export const Time_Line_Heading_Text_Style = `
    font-bold
    !text-[var(--fgColor-default)] 
    text-[18px]
`

export const Time_Line_Item_Description_Text_Style = `
    font-bold
    !text-[var(--fgColor-default)] 
    text-[16px]
`


function CreateNewWorkflowForm() {

    return (
        <>
            <Timeline clipSidebar>
                <CreateNewFormGeneral/>


                <Timeline.Item>
                    <TimeLineBadge text="3"/>
                    <Timeline.Body>
                        <Text className={Time_Line_Heading_Text_Style}>
                            Details
                        </Text>
                    </Timeline.Body>
                </Timeline.Item>
            </Timeline>
        </>
    )
}

interface props {
    text: string;
    children?: React.ReactNode;
}

export function TimeLineBadge({text}: props) {
    return <Timeline.Badge>{text}</Timeline.Badge>
}

export default CreateNewWorkflowForm;