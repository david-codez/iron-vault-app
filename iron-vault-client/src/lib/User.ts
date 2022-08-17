
export interface PersonInterface {
    firstName: string,
    lastName: string,
    email: string,
}


export class GymMember implements PersonInterface {
    username: string
    firstName: string
    lastName: string
    email: string
    password: string
    admin?: boolean
    messages?: string[]
    workouts?: string[]


    constructor(username: string, firstName:string, lastName: string, email: string, password: string, admin: boolean, messages: string[], workouts: string[]) {
        this.username = username
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
        this.admin = admin
        this.messages = messages
        this.workouts = workouts
    }    
    


}
