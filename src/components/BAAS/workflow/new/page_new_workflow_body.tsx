import {Stack} from "@primer/react";
import CreateNewWorkflowTopDescription from "@/components/BAAS/workflow/new/top_description";
import CreateNewWorkflowForm from "@/components/BAAS/workflow/new/form/form";


function PageNewWorkflowBody() {
    return (
        <Stack>
            <CreateNewWorkflowTopDescription/>

            <CreateNewWorkflowForm/>

        </Stack>
    );
}

export default PageNewWorkflowBody;