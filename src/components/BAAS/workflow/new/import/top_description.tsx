import {Text} from "@primer/react";


function ImportWorkflowTopDescription() {
    return (
        <div className="flex flex-col mt-4">
            <Text className="text-[20px] font-bold">
                Import a workflow
            </Text>

            <Text className="text-[var(--fgColor-muted)]">
                Import a workflow by uploading a JSON file or pasting workflow JSON content.
            </Text>

            <Text className="text-[var(--fgColor-muted)] italic">
                Required fields are marked with an asterisk (*).
            </Text>


        </div>
    );
}

export default ImportWorkflowTopDescription;