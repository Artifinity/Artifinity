import { Request, Response } from 'express'
import { UserService } from '../../services'
import { UserRegisterInputModel } from '../../models/user-input-models'
import { AuthenticatedRequest } from '../common/authenticated-request'
import { responseUtils } from '../../utils/response-utils.js'

class UsersController {

    public register = async (req: Request, res: Response): Promise<void> => {
        const user: UserRegisterInputModel = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone
        }

        const createdUser = await UserService.register(user)
        if (!createdUser) {
            responseUtils.sendErrorMessage(res, 'User with the same email already exists.')
            return
        }

        const {
            accessToken,
            userData
        } = await UserService.login(user.email, user.password)

        res.json({
            token: accessToken,
            email: user.email,
            roles: user.roles,
            id: userData.id
        })
    }

    public login = async (req: Request, res: Response): Promise<void> => {
        const {
            email,
            password
        } = req.body
        const loginData = await UserService.login(email, password)

        if (!loginData) {
            responseUtils.sendErrorMessage(res, 'Invalid username or password.')
            return
        }

        res.json({
            token: loginData.accessToken,
            ...loginData.userData
        })
    }

    public profile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        res.json(await UserService.getProfileData(req.user?.id))
    }

    public updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const body = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone
        }

        UserService.updatePersonalData(req.user?.id, body)
            .then((result) => responseUtils.processTaskResult(res, result))
            .catch(() => responseUtils.sendErrorMessage(res, 'Error while updating the user personal data.'))
    }

}

export default new UsersController()
