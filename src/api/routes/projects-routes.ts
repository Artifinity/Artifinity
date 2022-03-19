import ProjectsController from '../controllers/projects-controller'
import { addAuth } from '../middleware/add-authorization'
import { addValidation } from '../middleware/add-validate-middleware'
import { ProjectValidators } from '../validators/project-validators'

export const projectsRoutes = (app: any) => {
    const router = app.Router()

    router.get('/mine', addAuth, ProjectsController.allForUser)
    router.get('/', ProjectsController.all)
    router.post('/', addAuth, addValidation(ProjectValidators), ProjectsController.create)
    router.put('/:id', addAuth, addValidation(ProjectValidators), ProjectsController.update)
    router.delete('/:id', addAuth, ProjectsController.delete)

    return router
}
