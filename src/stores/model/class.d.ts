 export interface Class {
    id: number,
    created_by: any,
    created_at: DateTime,
    updated_at: DateTime,
    deleted_at: DateTime,
    name: string,
    school_id: number,
    type: string,
    open_days: string[],
    start_time: string,
    end_time: string,
    start_date: DateTime,
    logo: string,
    assign_user: any[],
    studnetCount: number
  }