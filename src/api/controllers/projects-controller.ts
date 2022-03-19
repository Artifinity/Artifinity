import { AuthenticatedRequest } from '../common/authenticated-request'
import { Request, Response } from 'express'
import { ProjectService } from '../../services'
import { ProjectModel } from '../../models/project-model'
import { responseUtils } from '../../utils/response-utils.js'

class ProjectsController {

    public all = async (req: Request, res: Response): Promise<void> => {
        res.json(await ProjectService.all())
    }

    public allForUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        res.json(await ProjectService.getAllForUser(req.user?.id))
    }

    public create = (req: AuthenticatedRequest, res: Response): void => {
        const project: ProjectModel = {
            name: req.body.name,
            owner: req.user.id,
            description: req.body.description,
            url: req.body.url,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            endDate: req.body.endDate
        }

        ProjectService.create(project)
            .then(result => responseUtils.processTaskResult(res, result))
            .catch(() => responseUtils.sendErrorMessage(res, 'Problem occur while creating the project.'))
    }

    public update = (req: AuthenticatedRequest, res: Response): void => {
        const id = req.params.id
        const newBody = {
            name: req.body.name,
            description: req.body.description,
            url: req.body.url,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            endDate: req.body.endDate
        }

        ProjectService.update(id, newBody)
            .then(result => responseUtils.processTaskResult(res, result))
            .catch(() => responseUtils.sendErrorMessage(res, 'Problem occur while updating the project.'))
    }

    public delete = (req: AuthenticatedRequest, res: Response): void => {
        const id = req.params.id
        ProjectService.delete(id)
            .then((result) => responseUtils.processTaskResult(res, result))
            .catch(() => responseUtils.sendErrorMessage(res, 'Problem occur while deleting the project.'))
    }

}

export default new ProjectsController()
