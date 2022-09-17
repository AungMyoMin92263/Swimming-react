export interface CommentInterface {
  sender_id: number
  receiver_id: number
  message: string
  created_date?: string
  user_info?: any
  parent_id?: number;
}