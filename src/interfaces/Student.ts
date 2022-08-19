export interface Student  {
    id: number,
    created_by: number,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date,
    name: string,
    email: string,
    user_id: string,
    parent_name: string,
    parent_email: string,
    avatar: string
  }