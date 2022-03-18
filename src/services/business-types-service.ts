import { Repository } from '../data/repositories'
import { ArtTypeModel } from '../models/art-type-model'
import { ArtType } from '../data/models'

class ArtTypesService {

    private artTypesData: Repository<ArtTypeModel>

    public constructor (artTypesData: Repository<ArtTypeModel>) {
        this.artTypesData = artTypesData
    }

    public async all (): Promise<any[]> {
        return this.artTypesData.getAll()
    }

}

export default new ArtTypesService(new Repository<ArtTypeModel>(ArtType))
