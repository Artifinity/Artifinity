import { ArtTypeModel } from '../../models/art-type-model'
import { ArtType } from '../models'
import { Seeder } from './common/seeder'

export class ArtTypeSeeder implements Seeder {

    public seed = async (): Promise<any> => {
        const existResults = await Promise.all(this.getData()
            .map(artType => ArtType.exists({ name: artType.name })))
        const businessTypesToAdd = this.getData()
            .filter((_, index) => !existResults[index])

        return ArtType.insertMany(businessTypesToAdd)
    }

    public getErrorMessage = (err: any): string => {
        return 'Error while seeding the art types\n' + err
    }

    public getSuccessMessage = (): string => {
        return 'The art types were seeded successfully'
    }

    private getData = (): ArtTypeModel[] => {
        return [
            {
                name: 'Literature'
            },
            {
                name: 'Music'
            },
            {
                name: 'Films'
            },
            {
                name: 'Theatre'
            },
            {
                name: 'Photography'
            },
            {
                name: 'Drawing'
            },
            {
                name: 'Painting'
            }
        ]
    }

}
