export interface SignInterface {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    confirmPassword: string,
}

export interface StatusInterface {
    acceptor: string,
    status: string,
    acceptorId: number,
}

export class LoginModel implements Pick<SignInterface, "username" | "password">{
    constructor(
        public username = "",
        public password = ""
    ){}
}

export class UserModel implements SignInterface{
    constructor(
        public id = 0,
        public firstName = "",
        public lastName = "",
        public username = "",
        public password = "",
        public confirmPassword = "",
    ){}
}