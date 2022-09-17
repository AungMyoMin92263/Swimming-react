export interface ClassInterface {
    name?: string | null;
    school_id?: number | null;
    type?: string | null;
    start_time?: string | null;
    end_time?: string | null;
    open_days?: string[] | null;
    start_date?: Date | null;
    logo?: string | null;
    error?: string | null;
}
export interface ClassProgramInterface {
    id?: number
    logo?: string
    upload_date?: string
    class_id?:string
}
export interface ClassRangeInterface {
    class_list: ClassInterface[] | null
    date: Date | null;
}