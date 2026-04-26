// src/utils/validation/extra.ts

import {BAASWorkflowSchema} from "@/schema/BAASWorkflow.schema";
import type {PathIssue} from "@/utils/workflowValidation/report";

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function collectExtraFieldsRecursive(
    data: unknown,
    schemaNode: any,
    basePath = ""
): PathIssue[] {
    if (!isRecord(data) || !schemaNode || typeof schemaNode !== "object") {
        return [];
    }

    const properties = schemaNode.properties ?? {};
    const issues: PathIssue[] = [];

    for (const [key, value] of Object.entries(data)) {
        const path = basePath ? `${basePath}.${key}` : key;
        const childSchema = properties[key];

        if (!childSchema) {
            issues.push({
                path,
                kind: "extra_field",
                source: "extra",
                message: `${path} is not defined in schema.`,
                value,
            });
            continue;
        }

        issues.push(...collectExtraFieldsRecursive(value, childSchema, path));
    }

    return issues;
}

export function collectExtraFieldIssues(data: unknown): PathIssue[] {
    return collectExtraFieldsRecursive(data, BAASWorkflowSchema, "");
}