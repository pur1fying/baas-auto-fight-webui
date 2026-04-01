export interface condition {
    type : string,
    op : string,
    name : string,
    p : number,
    timeout : number,
    and : Array<string>,
    or : Array<string>
}
