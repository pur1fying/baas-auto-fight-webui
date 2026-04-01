export interface single_action {
    name : string,
    description : string,
    t : string,
    op : string,
    skill_n : string,
    l_rel_idx : string
}

export interface action {
    action_list : single_action[]
}
