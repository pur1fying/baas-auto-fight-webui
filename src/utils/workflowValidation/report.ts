import {collectSchemaIssues} from "@/utils/workflowValidation/ajv_schema";
import {collectMissingFieldIssues} from "@/utils/workflowValidation/missing";
import {collectExtraFieldIssues} from "@/utils/workflowValidation/extra";
import {collectSemanticIssues} from "@/utils/workflowValidation/semantic";

export type PathIssueKind =
    | "schema_error"
    | "missing_field"
    | "extra_field"
    | "semantic_error"
    | "semantic_warning";

export type PathIssue = {
    path     : string;
    kind     : PathIssueKind;
    source   : "schema" | "missing" | "extra" | "semantic";
    message  : string;
    keyword? : string;
    value?   : unknown;
};

export type WorkflowPathReport = {
    isStructurallyValid : boolean;
    issues              : PathIssue[];
    issuesByPath        : Record<string, PathIssue[]>;
};

export function groupIssuesByPath(
    issues: PathIssue[]
): Record<string, PathIssue[]> {
    const result: Record<string, PathIssue[]> = {};

    for (const issue of issues) {
        if (!result[issue.path]) {
            result[issue.path] = [];
        }
        result[issue.path].push(issue);
    }

    return result;
}

export function buildWorkflowPathReport(
    data: unknown
): WorkflowPathReport {
    const schemaResult = collectSchemaIssues(data);
    const missingIssues = collectMissingFieldIssues(data);
    const extraIssues = collectExtraFieldIssues(data);
    const semanticIssues = collectSemanticIssues(data);

    const issues = [
        ...schemaResult.issues,
        ...missingIssues,
        ...extraIssues,
        ...semanticIssues,
    ];

    return {
        isStructurallyValid: schemaResult.isStructurallyValid,
        issues,
        issuesByPath: groupIssuesByPath(issues),
    };
}
