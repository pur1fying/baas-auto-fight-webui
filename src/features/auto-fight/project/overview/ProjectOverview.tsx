'use client';

import Link from 'next/link';
import {
    ArrowRightIcon,
    ChecklistIcon,
    ClockIcon,
    CodeSquareIcon,
    GitBranchIcon,
    PlayIcon,
    WorkflowIcon,
} from '@primer/octicons-react';
import {Button, Heading, Label, Text} from '@primer/react';

import type {WorkflowProject} from '@/features/auto-fight/project/model/workflowProject';
import {projectStatusText} from '@/features/auto-fight/project/model/projectStatus';
import {getOverviewAction} from '@/features/auto-fight/project/overview/getOverviewAction';

import '@/features/auto-fight/styles/project-shell.css';

interface ProjectOverviewProps {
    readonly project: WorkflowProject;
}

const CONTENT_LINKS = [
    {segment: 'graph', label: 'State Graph', icon: WorkflowIcon},
    {segment: 'actions', label: 'Actions', icon: PlayIcon},
    {segment: 'conditions', label: 'Conditions', icon: GitBranchIcon},
    {segment: 'runs', label: 'Runs', icon: ChecklistIcon},
] as const;

export function ProjectOverview({project}: ProjectOverviewProps) {
    const nextAction = getOverviewAction(project);
    const {summary} = project;

    return (
        <div className="auto-fight-overview">
            <section className="auto-fight-overview-next" aria-labelledby="next-action-heading">
                <div>
                    <Text as="span" className="auto-fight-overline">Recommended next step</Text>
                    <Heading as="h2" id="next-action-heading">Review the workflow structure</Heading>
                    <Text as="p">{nextAction.reason}</Text>
                    {summary.attention !== undefined && (
                        <Text as="p" className="auto-fight-overview-attention">{summary.attention}</Text>
                    )}
                </div>
                <Button as={Link} href={nextAction.href} trailingVisual={ArrowRightIcon} variant="primary">
                    {nextAction.label}
                </Button>
            </section>

            <div className="auto-fight-overview-grid">
                <section className="auto-fight-overview-card" aria-labelledby="project-contents-heading">
                    <Heading as="h2" id="project-contents-heading">Project contents</Heading>
                    <div className="auto-fight-overview-links">
                        {CONTENT_LINKS.map(({segment, label, icon: Icon}) => (
                            <Link href={`/workflows/${summary.id}/${segment}`} key={segment}>
                                <Icon aria-hidden="true"/>
                                <span>{label}</span>
                                <ArrowRightIcon aria-hidden="true"/>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="auto-fight-overview-card" aria-labelledby="draft-readiness-heading">
                    <Heading as="h2" id="draft-readiness-heading">Current Draft readiness</Heading>
                    <div className="auto-fight-overview-status">
                        <Label size="small" variant={summary.currentDraft.isDirty ? 'attention' : 'success'}>
                            {projectStatusText(summary)}
                        </Label>
                        <Text as="span">
                            {summary.currentDraft.savedRevisionId === undefined
                                ? 'No saved Draft Revision'
                                : `Saved revision ${summary.currentDraft.savedRevisionId}`}
                        </Text>
                    </div>
                    <Text as="p">Readiness describes this Draft only; it does not replace release history.</Text>
                    <div className="auto-fight-overview-release">
                        <Text as="strong">Latest published version</Text>
                        {summary.latestVersion === undefined ? (
                            <Text as="span">None</Text>
                        ) : (
                            <span>
                                <Label size="small" variant="accent">{summary.latestVersion.label}</Label>
                                <Text as="span">{summary.latestVersion.publishedAtLabel}</Text>
                            </span>
                        )}
                    </div>
                </section>

                <section className="auto-fight-overview-card" aria-labelledby="metadata-heading">
                    <Heading as="h2" id="metadata-heading">Project metadata</Heading>
                    <dl className="auto-fight-overview-metadata">
                        <div><dt>Owner</dt><dd>{project.owner}</dd></div>
                        <div><dt>Language</dt><dd>{project.language}</dd></div>
                        <div><dt>Created</dt><dd>{project.createdLabel}</dd></div>
                        <div><dt>Source</dt><dd><CodeSquareIcon aria-hidden="true"/> {project.sourceLabel}</dd></div>
                    </dl>
                </section>

                <section className="auto-fight-overview-card" aria-labelledby="activity-heading">
                    <Heading as="h2" id="activity-heading">Recent activity</Heading>
                    <div className="auto-fight-overview-activity">
                        {project.activities.map((activity) => (
                            <article key={activity.id}>
                                <ClockIcon aria-hidden="true"/>
                                <div><Text as="strong">{activity.title}</Text><Text as="span">{activity.detail}</Text></div>
                                <time>{activity.occurredLabel}</time>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
