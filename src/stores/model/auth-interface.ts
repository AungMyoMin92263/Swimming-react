export interface AuthInterface{
  isSignedIn: boolean | null;
  userInfo: IUser | null;
}

export interface SignInInterface{
  email?: string | null;
  password?: string | null;
}