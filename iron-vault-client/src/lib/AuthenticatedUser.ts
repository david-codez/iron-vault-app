
export interface AuthInterface {
    username: string,
    firstName: string,
    email: string,
    token: string
}


export class AuthenticatedUser implements AuthInterface {
    username: string
    firstName: string
    email: string
    token: string


    constructor(username: string, firstName:string, email: string, password: string, token: string) {
        this.username = username
        this.firstName = firstName
        this.email = email
        this.token = token

    }    
    


}
