'use client';

import Link from 'next/link';
import {Button, Heading, Label, Text} from '@primer/react';
import {
    AlertIcon,
    FileCodeIcon,
    PencilIcon,
    PlusIcon,
    UploadIcon,
    WorkflowIcon,
} from '@primer/octicons-react';

import type {WorkflowProjectSummary} from '@/features/auto-fight/project/model/workflowProject';
import {projectModuleHref} from '@/features/auto-fight/project/model/workflowProject';
import {projectStatusText} from '@/features/auto-fight/project/model/projectStatus';

import '@/features/auto-fight/styles/home.css';

interface WorkflowDashboardProps {
    projects: readonly WorkflowProjectSummary[];
}

function statusVariant(project: WorkflowProjectSummary): 'attention' | 'success' | 'accent' {
    if (project.currentDraft.isDirty || project.currentDraft.readiness === 'draft') return 'attention';
    if (project.latestVersion !== undefined && project.currentDraft.baseVersionId === project.latestVersion.id) {
        return 'accent';
    }
    return 'success';
}

export function WorkflowDashboard({projects}: WorkflowDashboardProps) {
    const recentProjects = projects.slice(0, 2);
    const attentionProjects = projects.filter((project) => project.attention !== undefined);
    const hasProjects = projects.length > 0;

    return (
        <div className="auto-fight-dashboard">
            <main className="auto-fight-dashboard-main">
                <header className="auto-fight-dashboard-header">
                    <div>
                        <Heading as="h1">Your workflows</Heading>
                        <Text as="p" className="auto-fight-muted">继续最近工作，或创建一个新的自动战斗项目。</Text>
                    </div>
                    <Button as={Link} href="/new" variant="primary" leadingVisual={PlusIcon}>New workflow</Button>
                </header>

                {hasProjects ? (
                    <>
                        <section aria-labelledby="continue-working-heading">
                            <div className="auto-fight-section-heading">
                                <Heading as="h2" id="continue-working-heading">Continue working</Heading>
                            </div>
                            <div className="auto-fight-project-grid">
                                {recentProjects.map((project) => (
                                    <article className="auto-fight-project-card" key={project.id}>
                                        <div className="auto-fight-project-card-title">
                                            <WorkflowIcon aria-hidden="true"/>
                                            <Link aria-label={`继续${project.name}`} href={projectModuleHref(project)}>{project.name}</Link>
                                        </div>
                                        <Text as="p" className="auto-fight-project-description">{project.description}</Text>
                                        <div className="auto-fight-project-meta">
                                            <Label size="small" variant={statusVariant(project)}>{projectStatusText(project)}</Label>
                                            <span>{project.stateCount} states</span>
                                            <span>{project.updatedLabel}</span>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>

                        <section aria-labelledby="recent-activity-heading">
                            <div className="auto-fight-section-heading">
                                <Heading as="h2" id="recent-activity-heading">Recent activity</Heading>
                            </div>
                            <div className="auto-fight-activity-list">
                                <div className="auto-fight-activity-row">
                                    <PencilIcon aria-hidden="true"/>
                                    <div><strong>你编辑了 主线推图 · 爆发队</strong><Text as="span">修改 State “等待费用”的 Default transition</Text></div>
                                    <time>12 min</time>
                                </div>
                                <div className="auto-fight-activity-row">
                                    <FileCodeIcon aria-hidden="true"/>
                                    <div><strong>悬赏通缉 · 室内通过结构校验</strong><Text as="span">0 errors · 2 warnings</Text></div>
                                    <time>Yesterday</time>
                                </div>
                            </div>
                        </section>
                    </>
                ) : (
                    <section className="auto-fight-home-empty" aria-labelledby="empty-workflows-heading">
                        <WorkflowIcon aria-hidden="true" size={32}/>
                        <Heading as="h2" id="empty-workflows-heading">Create your first workflow</Heading>
                        <Text as="p" className="auto-fight-muted">Create a blank project or import an existing JSON axis file.</Text>
                        <div className="auto-fight-home-empty-actions">
                            <Button as={Link} href="/new" variant="primary">Blank workflow</Button>
                            <Button as={Link} href="/new/import">Import JSON</Button>
                        </div>
                    </section>
                )}
            </main>

            <aside className="auto-fight-dashboard-aside" aria-label="Workflow quick actions">
                <section className="auto-fight-side-card">
                    <Heading as="h2">Start a workflow</Heading>
                    <Text as="p" className="auto-fight-muted">创建入口集中在这里和顶部 New 菜单中。</Text>
                    <Link aria-label="Blank workflow" className="auto-fight-quick-link" href="/new"><PlusIcon aria-hidden="true"/><span><strong>Blank workflow</strong><small>从最小项目结构开始</small></span></Link>
                    <Link aria-label="Import JSON" className="auto-fight-quick-link" href="/new/import"><UploadIcon aria-hidden="true"/><span><strong>Import JSON</strong><small>进入现有 Schema 校验导入页</small></span></Link>
                </section>
                {hasProjects && (
                    <section className="auto-fight-side-card">
                        <Heading as="h2">Needs attention</Heading>
                        <Text as="p" className="auto-fight-muted">只显示会阻断下一阶段的问题。</Text>
                        {attentionProjects.map((project) => (
                            <Link className="auto-fight-attention-link" href={`/workflows/${project.id}`} key={project.id}>
                                <AlertIcon aria-hidden="true"/>
                                <span><strong>{project.name}</strong><small>{project.attention}</small></span>
                            </Link>
                        ))}
                    </section>
                )}
            </aside>
        </div>
    );
}
