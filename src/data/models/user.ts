import { Schema, model } from 'mongoose'
import { UserModel } from '../../models/user-model'
import { UserColumns } from './user-columns'
import { TableNames } from './table-names'

const userSchema = new Schema<UserModel>({
    [UserColumns.firstName]: {
        type: String,
        required: true
    },
    [UserColumns.lastName]: {
        type: String,
        required: true
    },
    [UserColumns.email]: {
        type: String,
        required: true
    },
    [UserColumns.password]: {
        type: String,
        required: true
    },
    [UserColumns.phone]: {
        type: String,
        required: true
    },
    [UserColumns.roles]: { type: [String] }
})

const User = model<UserModel>(TableNames.user, userSchema)

export default User
