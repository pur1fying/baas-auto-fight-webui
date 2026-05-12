import type {ErrorObject} from "ajv"
import localizeEn from "ajv-i18n/localize/en"
import localizeZh from "ajv-i18n/localize/zh"
import localizeZhTW from "ajv-i18n/localize/zh-TW"
import localizeJa from "ajv-i18n/localize/ja"
import localizeKo from "ajv-i18n/localize/ko"

import i18n from "@/utils/i18n"
import {validateBAASWorkflow} from "@/schema/BAASWorkflow.schema"
import type {PathIssue} from "@/utils/workflowValidation/report"

type AjvI18nLanguage = "en" | "zh" | "zh-tw" | "ja" | "ko"

const ajv_localizers: Record<AjvI18nLanguage, (errors?: ErrorObject[] | null) => void> = {
    en      : localizeEn,
    zh      : localizeZh,
    "zh-tw": localizeZhTW,
    ja      : localizeJa,
    ko      : localizeKo
}

function getCurrentAjvLanguage(): AjvI18nLanguage {
    const rawLang = (i18n.resolvedLanguage ?? i18n.language ?? "en").toLowerCase()

    if (rawLang.startsWith("zh-tw")) return "zh-tw"
    if (rawLang.startsWith("zh-hk")) return "zh-tw"
    if (rawLang.startsWith("zh")) return "zh"
    if (rawLang.startsWith("ja")) return "ja"
    if (rawLang.startsWith("ko")) return "ko"
    return "en"
}

function jsonPointerToDotPath(instancePath: string): string {
    if (!instancePath) return ""
    return instancePath
        .split("/")
        .slice(1)
        .map((part) => part.replace(/~1/g, "/").replace(/~0/g, "~"))
        .join(".")
}

function normalizeAjvErrorPath(error: ErrorObject): string {
    if (error.keyword === "required") {
        const missingProperty = String(
            (error.params as { missingProperty?: string }).missingProperty ?? ""
        )
        const base = jsonPointerToDotPath(error.instancePath)
        return base ? `${base}.${missingProperty}` : missingProperty
    }

    if (error.keyword === "additionalProperties") {
        const additionalProperty = String(
            (error.params as { additionalProperty?: string }).additionalProperty ?? ""
        )
        const base = jsonPointerToDotPath(error.instancePath)
        return base ? `${base}.${additionalProperty}` : additionalProperty
    }

    return jsonPointerToDotPath(error.instancePath)
}

function localizeAjvErrors(
    errors?: ErrorObject[] | null
): ErrorObject[] {
    const copiedErrors = errors ? errors.map((error) => ({...error})) : []
    const currentLang = getCurrentAjvLanguage()
    ajv_localizers[currentLang]?.(copiedErrors)
    return copiedErrors
}

export function collectSchemaIssues(data: unknown): {
    isStructurallyValid : boolean
    issues              : PathIssue[]
} {
    const isStructurallyValid = validateBAASWorkflow(data)

    const localizedErrors = localizeAjvErrors(validateBAASWorkflow.errors)

    const issues: PathIssue[] = localizedErrors.map((error) => ({
        path: normalizeAjvErrorPath(error),
        kind: "schema_error",
        source: "schema",
        keyword: error.keyword,
        message: error.message ?? "Invalid value"
    }))

    return {
        isStructurallyValid,
        issues
    }
}
