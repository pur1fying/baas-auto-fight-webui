import {Text, Timeline} from "@primer/react";
import {
    Time_Line_Heading_Text_Style,
    Time_Line_Item_Description_Text_Style,
    TimeLineBadge
} from "@/components/BAAS/workflow/new/form/form";
import {useTranslation} from "react-i18next";


function CreateNewFormGeneral() {
    return (
        <Timeline.Item>
            <TimeLineBadge text="1"/>
            <Timeline.Body>
                <Text className={Time_Line_Heading_Text_Style}>General</Text>
                <div className="flex">
                    <FillInOwnership/>
                    <Divider/>
                    <FillInWorkflowName/>
                </div>
            </Timeline.Body>
        </Timeline.Item>
    )
}

function Divider(){
    return (
        <span className="mt-[22px] ml-[8px] mr-[8px] text-[24px] font-bold text-[var(--fgColor-muted)]">/</span>
    )
}

function FillInOwnership() {
    return (
        <div className="flex flex-col">
            <OwnershipDescription/>
            <Text> 114</Text>
        </div>
    )
}

function FillInWorkflowName() {
    return (
        <div>
            <WorkflowNameDescription/>
            <Text>514</Text>
        </div>
    )
}



function OwnershipDescription() {
    const { t } = useTranslation();

    return (
        <div className="flex">
            <Text className={Time_Line_Item_Description_Text_Style}>
                {t('workflow.new.form.general.ownerShipDescription')}
            </Text>
            {" "}
            <Text className={Time_Line_Item_Description_Text_Style}>
                *
            </Text>
        </div>
    )
}

function WorkflowNameDescription() {
    const { t } = useTranslation();

    return (
        <div className="flex">
            <Text className={Time_Line_Item_Description_Text_Style}>
                {t('workflow.new.form.general.workflowNameDescription')}
            </Text>
            {" "}
            <Text className={Time_Line_Item_Description_Text_Style}>
                *
            </Text>
        </div>
    )
}


export default CreateNewFormGeneral;