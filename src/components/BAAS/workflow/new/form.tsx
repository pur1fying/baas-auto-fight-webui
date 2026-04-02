import {Text, Timeline} from "@primer/react";


const Time_Line_Heading_Text_Style = `
    font-bold
    !text-[var(--fgColor-default)] 
`


function CreateNewWorkflowForm() {

    return (
        <>
            <Timeline clipSidebar>
                <Timeline.Item>
                    <TimeLineBadge text="1"/>

                        <Timeline.Body>
                            <Text className={Time_Line_Heading_Text_Style}>General </Text>
                            <div className="mt">
                            </div>
                        </Timeline.Body>

                </Timeline.Item>



                <Timeline.Item>
                    <Timeline.Badge>3</Timeline.Badge>
                    <Timeline.Body className={Time_Line_Heading_Text_Style}>Details</Timeline.Body>
                </Timeline.Item>
            </Timeline>
        </>
    )
}

interface props {
    text: string;
    children?: React.ReactNode;
}

function TimeLineBadge({text}: props) {
    return <Timeline.Badge>{text}</Timeline.Badge>
}

function TimeLineHeading({text}: props) {
    return
}

export default CreateNewWorkflowForm;