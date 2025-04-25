import { Document, ObjectId } from 'mongoose'

export interface UserInterface extends Document {
    _id: ObjectId
    name: string
    email: string
    password: string
    googleId: string
    isActive: boolean
    profileImage: string
    wallet: {
        balance: number
        transaction: {
            date: Date
            details: string
            amount: number
            status: string
        }[]
    }
    isAdmin: boolean
    phone: string
    address: {
        city: string;
        pinCode: number;
        state: string;
        street: string;
      }[];
}

export interface registration {
    name: string
    email: string
    password: string
    isAdmin?: boolean
    isActive?: boolean

}

export interface userData {
    name: string
    email: string
    password: string
    isAdmin?: boolean
    isActive?: boolean
}