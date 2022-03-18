import { UserModel } from '../models/user-model'
import { User } from '../data/models'
import { UserRegisterInputModel } from '../models/user-input-models'
import { Repository } from '../data/repositories'
import { TaskResult } from '../common/taskResult'
import { QueryArgsHelper } from '../utils/query-args-helper'
import { UserColumns } from '../data/models/user-columns'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class UserService {

    private usersData: Repository<UserModel>

    public constructor (usersData: Repository<UserModel>) {
        this.usersData = usersData
    }

    public async register (user: UserRegisterInputModel): Promise<UserModel | null> {
        if (await User.findOne({ email: user.email })) {
            return null
        }

        const salt = await bcrypt.genSalt(10)
        const userToCreate = { ...user }
        userToCreate.password = await bcrypt.hash(user.password, salt)
        const createdUser: UserModel = await User.create(userToCreate)
        return createdUser
    }

    public async login (email: string, password: string) {
        const user = await this.usersData.firstOrDefault({ email })

        if (user && await bcrypt.compare(password, user.password)) {
            const userData = {
                id: user.id,
                email: user.email,
                roles: user.roles
            }

            const accessToken: string = jwt.sign(userData, process.env.TOKEN_SECRET, { expiresIn: '1h' })

            return {
                userData: {
                    ...userData,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phone: user.phone
                },
                accessToken
            }
        }

        return null
    }

    public async getProfileData (userId: string): Promise<any> {
        const projection = QueryArgsHelper.build(
            QueryArgsHelper.disable(UserColumns.password)
        )
        return this.usersData.getById(userId, projection)
    }

    public updatePersonalData (userId: string, personalData: { firstName: string; lastName: string; phone: string }): Promise<TaskResult> {
        return this.usersData.update(userId, personalData)
            .then(() => TaskResult.success('The user personal data is updated.'))
            .catch(() => TaskResult.failure('Error while updating the user personal data.'))
    }

}

export default new UserService(new Repository<UserModel>(User))
