import BusinessTypesController from '../controllers/business-types-controller'

export const artTypesRoutes = (expressApp: any) => {
    const router = expressApp.Router()

    router.get('/', BusinessTypesController.all)

    return router
}
