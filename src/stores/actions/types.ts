import { SignInAction, SignOutAction } from "./auth-action";

export enum ActionTypes {
  signIn,
  signOut,
  getError
}

export type Action = SignInAction
  | SignOutAction
