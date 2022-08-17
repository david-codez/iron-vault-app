import { GymMember } from "./User"

export interface MessageInterface {
    user: GymMember,
    recepient: GymMember,
    message: string,
    timestamp: Date,
}