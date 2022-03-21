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
    [UserColumns.username]: {
        type: String
    },
    [UserColumns.email]: {
        type: String
    },
    [UserColumns.avatar]: {
        type: String
    },
    [UserColumns.coverPhoto]: {
        type: String
    },
    [UserColumns.youTubeUrl]: {
        type: String
    },
    [UserColumns.facebookUrl]: {
        type: String
    },
    [UserColumns.instagramUrl]: {
        type: String
    },
    [UserColumns.twitterUrl]: {
        type: String
    },
    [UserColumns.approvedOn]: {
        type: Date,
        default: undefined
    }
})

const User = model<UserModel>(TableNames.user, userSchema)

export default User
