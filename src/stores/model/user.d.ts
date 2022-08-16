interface IUser {
  id: number
  name?: string
  email?: string
  password?: string
  token?: string
}

type AuthUserState = {
  loginUser?: IUser
}

type AuthAction = {
  type: string
  loginUser: IUser
}

type DispatchType = (args: AuthUserState) => AuthUserState