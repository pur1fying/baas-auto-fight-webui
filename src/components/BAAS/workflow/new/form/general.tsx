'use client';
import {Button, Text, TextInput, Timeline} from "@primer/react";
import {
    Time_Line_Heading_Text_Style,
    Time_Line_Item_Description_Text_Style,
    TimeLineBadge
} from "@/components/BAAS/workflow/new/form/form";
import {useTranslation} from "react-i18next";
import {TriangleDownIcon} from "@primer/octicons-react";
import UserAvatar from "@/components/user_avatar";
import React from "react";

const monkUserName = "Pur1fying";

function CreateNewFormGeneral() {
    return (
        <Timeline.Item>
            <TimeLineBadge text="1"/>
            <Timeline.Body>
                <Text className={Time_Line_Heading_Text_Style}>General</Text>

                <div className="flex flex-1 mt-[4px]">
                    <FillInOwnership avatarWidth={20}/>
                    <Divider/>
                    <FillInWorkflowName/>
                </div>
            </Timeline.Body>
        </Timeline.Item>
    )
}

function Divider() {
    return (
        <span className="mt-[21px] ml-[8px] mr-[8px] text-[24px] text-[var(--fgColor-muted)]">/</span>
    )
}

function OwnershipAvatar(size: number) {
    return <UserAvatar size={size}/>
}

const FillInOwnership: React.FC<{ avatarWidth: number }> = ({avatarWidth}) => {
    return (
        <div className="flex flex-col">
            <OwnershipDescription/>
            <Button
                className="!mt-[4px] !p-1 !px-2 [&>span]:!flex"
                leadingVisual={() => OwnershipAvatar(avatarWidth)}
                trailingAction={TriangleDownIcon}
            >
                {monkUserName}
            </Button>
        </div>
    )
}

function FillInWorkflowName() {

    return (
        <div className="flex flex-col flex-1">
            <WorkflowNameDescription/>
            <TextInput className="mt-[4px] w-full"/>
            <RecommendedWorkflowName/>
        </div>
    )
}


function RecommendedWorkflowName() {
    const {t} = useTranslation();

    return (
        <>
            <Text>
                {t('workflow.new.form.general.generateRecommendedWorkflowName')}
            </Text>


            <Text className="">

            </Text>


        </>
    )
}

function OwnershipDescription() {
    const {t} = useTranslation();

    return (
        <div className="flex gap-1">
            <Text className={Time_Line_Item_Description_Text_Style}>
                {t('workflow.new.form.general.ownerShipDescription')}
            </Text>
            <Text className={Time_Line_Item_Description_Text_Style}>
                *
            </Text>
        </div>
    )
}

function WorkflowNameDescription() {
    const {t} = useTranslation();

    return (
        <div className="flex gap-1">
            <Text className={Time_Line_Item_Description_Text_Style}>
                {t('workflow.new.form.general.workflowNameDescription')}
            </Text>
            <Text className={Time_Line_Item_Description_Text_Style}>
                *
            </Text>
        </div>
    )
}


export default CreateNewFormGeneral;
