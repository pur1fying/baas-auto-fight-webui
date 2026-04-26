import {getByPath} from "@/store/BAASWorkflowStore";
import type {PathIssue} from "@/utils/workflowValidation/report";

const softRequiredPath = [
    "metadata.name",
    "metadata.author",
    "metadata.description",
    "metadata.video_link",
    "metadata.battle_type",
    "metadata.boss_name",
    "metadata.difficulty",

    "metadata.BossHealth.current_ocr_region",
    "metadata.BossHealth.max_ocr_region",
    "metadata.BossHealth.ocr_region",
    "metadata.BossHealth.ocr_model_name",

    "metadata.formation.front",
    "metadata.formation.back",
    "metadata.formation.slot_count",
    "metadata.formation.all_appeared_skills",

    "metadata.yolo_setting.model",
    "metadata.yolo_setting.update_interval"
]

export function collectMissingFieldIssues(
    data: unknown
): PathIssue[] {
    return softRequiredPath
        .filter((path) => getByPath(data, path) === undefined)
        .map((path) => ({
            path,
            kind: "missing_field",
            source: "missing",
            message: `${path} is required (not necessary).`,
        }));
}