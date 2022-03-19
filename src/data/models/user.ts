import { Schema, model } from 'mongoose'
import { UserModel } from '../../models/user-model'
import { UserColumns } from './user-columns'
import { TableNames } from './table-names'

const userSchema = new Schema<UserModel>({
    [UserColumns.address]: {
        type: String
    },
    [UserColumns.nonce]: {
        type: String
    },
    [UserColumns.firstName]: {
        type: String
    },
    [UserColumns.lastName]: {
        type: String
    },
    [UserColumns.bio]: {
        type: String
    },
    [UserColumns.portfolioUrl]: {
        type: String
    }
})

const User = model<UserModel>(TableNames.user, userSchema)

export default User
