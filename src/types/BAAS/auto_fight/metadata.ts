export interface workflow_metadata {
    name : string,
    battle_type : string,
    boss_name : string,
    difficulty : string,
    boss_health : BossHealthSetting,
    description : string,
    author : string,
    version : string,
    video_link : string,
    formation : formation_setting,
    yolo : yolo_setting
}

export interface formation_setting {
    front : string[],
    back : string[],
    slot_count : number,
    all_appeared_skills : string[]
}

export interface BossHealthSetting {
    current_ocr_region : string,
    max_ocr_region : string,
    ocr_region : string,
    ocr_model_name : string
}

export interface yolo_setting {
    model : string,
    update_interval : number
}