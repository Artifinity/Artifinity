import * as express from 'express'
import { usersRoutes } from './users-routes'
import { artTypesRoutes } from './art-types-routes'
import { projectsRoutes } from './projects-routes';

export const registerApiRoutes = (app: any) => {
    const basePrefix = process.env.API_BASE_PREFIX || ''

    app.use(`${basePrefix}/api/users`, usersRoutes(express))
    app.use(`${basePrefix}/api/artTypes`, artTypesRoutes(express))
    app.use(`${basePrefix}/api/projects`, projectsRoutes(express))
}
