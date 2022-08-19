export interface User {
    id: number,
    created_by: number,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date,
    email: string,
    uuid: string,
    phone: string,
    name: string,
    password: string,
    favorite: string,
    role: string,
    avatar: string,
    token: string
  }