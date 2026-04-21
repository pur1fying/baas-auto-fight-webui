'use client';

import {Stack} from "@primer/react";
import ImportWorkflowTopDescription from "@/components/BAAS/workflow/new/import/top_description";
import ImportWorkflowUploadZone from "@/components/buttons/ImportWorkflowUploadZone";

function PageImportWorkflowBody() {


    return (
        <Stack direction="vertical" gap="normal">
            <ImportWorkflowTopDescription/>
            <ImportWorkflowUploadZone/>
        </Stack>
    );
}

export default PageImportWorkflowBody;