import { Request, Response } from 'express'
import { ArtTypesService } from '../../services'

class ArtTypesController {

    public all = async (req: Request, res: Response): Promise<any> => {
        return res.json(await ArtTypesService.all())
    }

}

export default new ArtTypesController()
