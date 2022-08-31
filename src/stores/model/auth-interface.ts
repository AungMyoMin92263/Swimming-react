export interface AuthInterface {
  isSignedIn: boolean | null;
  userInfo: IUser | null;
  error?: string | null;
  token?: string | null;
}

export interface SignInInterface {
  email?: string | null;
  password?: string | null;
}

export interface APIResInterface {
  data?: any
  error?: any
}

export interface SignUpInterface {
  email?: string;
  password?: string;
  token?: string;
}

export interface SignedUpInterface {
  isSignedUp?: boolean | null;
  error?: any
}