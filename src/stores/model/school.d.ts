export interface School {
    id: number,
    created_by: number,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date,
    name: string,
    logo: string,
  assign_user:string[],
  }