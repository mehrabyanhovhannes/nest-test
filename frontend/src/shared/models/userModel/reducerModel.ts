import { StatusInterface, UserModel } from "../signModel";

export interface UserReducerInterface {
    loading: boolean,
    currentUser: Partial<UserModel>,
    users: Array<UserModel & StatusInterface>,
    error: any,
}