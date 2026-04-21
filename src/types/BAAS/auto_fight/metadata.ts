export interface workflow_metadata {
    name : string,
    author : string,
    description : string,
    video_link : string,

    battle_type : string,
    boss_name : string,
    difficulty : string,

    BossHealth : BossHealthSetting,
    formation : FormationSetting,
    yolo_setting : YOLOSetting
}

export interface FormationSetting {
    front : string[],
    back : string[],
    slot_count : number,
    all_appeared_skills : string[]
}

export interface BossHealthSetting {
    current_ocr_region : number[],
    max_ocr_region : number[],
    ocr_region : number[],
    ocr_model_name : string
}

export interface YOLOSetting {
    model : string,
    update_interval : number
}