import {workflow_metadata} from "@/types/BAAS/auto_fight/metadata";
import {condition} from "@/types/BAAS/auto_fight/condition";
import {state} from "@/types/BAAS/auto_fight/state";
import {action} from "@/types/BAAS/auto_fight/action";

export interface BAAS_auto_fight_workflow {
    metadata : workflow_metadata,
    start_state : string,
    conditions : map<string, condition>,
    states : map<string, state>,
    actions : map<string, action>
}
