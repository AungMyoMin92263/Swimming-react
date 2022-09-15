import School from './school';
export interface Event {
  id: number,
  created_by: number,
  created_at: DateTime,
  updated_at: DateTime,
  deleted_at: DateTime,
  name: string,
  school_id: number,
  gender: male,
  stroke: string,
  stroke_length: number,
  from_age: number,
  to_age: number,
  assigned: number,
  school: School,
  assign_user: string[],
  studnetCount: number
}