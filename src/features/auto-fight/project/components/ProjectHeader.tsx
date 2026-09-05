import {Heading, Label, Text} from '@primer/react';

import type {WorkflowProject} from '@/features/auto-fight/project/model/workflowProject';
import {projectStatusText} from '@/features/auto-fight/project/model/projectStatus';

interface ProjectHeaderProps {
    readonly project: WorkflowProject;
}

export function ProjectHeader({project}: ProjectHeaderProps) {
    return (
        <header className="auto-fight-project-header">
            <div className="auto-fight-project-heading">
                <Heading as="h1">{project.summary.name}</Heading>
                <Label
                    size="small"
                    variant={project.summary.currentDraft.isDirty ? 'attention' : 'success'}
                >
                    {projectStatusText(project.summary)}
                </Label>
            </div>
            <Text as="p" className="auto-fight-muted">{project.summary.description}</Text>
        </header>
    );
}
