import { Request, Response } from 'express'
import { UserService } from '../../services'
import { UserRegisterInputModel } from '../../models/user-input-models'
import { AuthenticatedRequest } from '../common/authenticated-request'
import { responseUtils } from '../../utils/response-utils.js'
import { UserColumns } from '../../data/models/user-columns'

class UsersController {

    public getUserInfo = async (req: Request, res: Response): Promise<void> => {
        res.json(await UserService.getUserInfo(req.query.address as string))
    }

    public register = async (req: Request, res: Response): Promise<void> => {
        const user: UserRegisterInputModel = {
            address: req.body[UserColumns.address]
        }

        const createdUser = await UserService.register(user)
        if (!createdUser) {
            responseUtils.sendErrorMessage(res, 'User with the same wallet address already exists.')
            return
        }

        res.json({
            address: createdUser.address,
            nonce: createdUser.nonce,
            id: createdUser.id
        })
    }

    public login = async (req: Request, res: Response): Promise<void> => {
        const {
            address,
            signature
        } = req.body
        const loginData = await UserService.login(address, signature)

        if (!loginData) {
            responseUtils.sendErrorMessage(res, 'Invalid credentials.')
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
            [UserColumns.firstName]: req.body[UserColumns.firstName],
            [UserColumns.lastName]: req.body[UserColumns.lastName],
            [UserColumns.bio]: req.body[UserColumns.bio],
            [UserColumns.portfolioUrl]: req.body[UserColumns.portfolioUrl]
        }

        UserService.updatePersonalData(req.user.id, body)
            .then((result) => responseUtils.processTaskResult(res, result))
            .catch(() => responseUtils.sendErrorMessage(res, 'Error while updating the user personal data.'))
    }

}

export default new UsersController()
