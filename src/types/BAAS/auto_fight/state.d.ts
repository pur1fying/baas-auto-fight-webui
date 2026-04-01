export interface state {
    action : string,
    action_fail_transition : string,
    transitions : Array<{
        condition : string,
        next : string
    }>,
    default_transition : string
}
