import { UserModel } from '../models/user-model'
import { User } from '../data/models'
import { UserRegisterInputModel } from '../models/user-input-models'
import { Repository } from '../data/repositories'
import { TaskResult } from '../common/taskResult'
import { QueryArgsHelper } from '../utils/query-args-helper'
import { UserColumns } from '../data/models/user-columns'
import { utils } from '../utils'
import { blockchainUtils } from '../utils/blockchain-utils'
const jwt = require('jsonwebtoken')

class UserService {

    private usersData: Repository<UserModel>

    public constructor (usersData: Repository<UserModel>) {
        this.usersData = usersData
    }

    public async register (user: UserRegisterInputModel): Promise<UserModel | null> {
        const existingUser = await this.usersData.firstOrDefault({ [UserColumns.address]: user.address })
        if (existingUser) {
            return existingUser
        }

        const nonce = utils.generateRandomString()
        const userToCreate: UserModel = { ...user, nonce }
        const createdUser: UserModel = await this.usersData.create(userToCreate)
        return createdUser
    }

    public async login (address: string, signature: string) {
        const user = await this.usersData.firstOrDefault({ address })
        if (!user || !blockchainUtils.isUserSignature(user.nonce, signature, user.address)) {
            return null
        }

        const userData = {
            id: user.id
        }

        const newNonce = utils.generateRandomString()
        await this.usersData.update(user.id, { [UserColumns.nonce]: newNonce })

        const accessToken: string = jwt.sign(userData, process.env.TOKEN_SECRET, { expiresIn: '1h' })

        return {
            userData: {
                ...userData,
                firstName: user.firstName,
                lastName: user.lastName
            },
            accessToken
        }
    }

    public async getProfileData (userId: string): Promise<any> {
        const projection = QueryArgsHelper.build(
            QueryArgsHelper.disable(UserColumns.nonce)
        )
        return this.usersData.getById(userId, projection)
    }

    public updatePersonalData (userId: string, personalData: any): Promise<TaskResult> {
        return this.usersData.update(userId, personalData)
            .then(() => TaskResult.success('The user personal data is updated.'))
            .catch(() => TaskResult.failure('Error while updating the user personal data.'))
    }

    public getUserInfo (address: string): any {
        const projection = QueryArgsHelper.build(
            UserColumns.nonce,
            UserColumns.id
        )

        return this.usersData.firstOrDefault({ address }, projection)
    }

}

export default new UserService(new Repository<UserModel>(User))
