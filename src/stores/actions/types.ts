import { SignInAction, SignOutAction } from "./auth-action";

export enum ActionTypes {
  signIn,
  signOut,
}

export type Action = SignInAction
  | SignOutAction
