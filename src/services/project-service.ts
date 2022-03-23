import { Repository } from '../data/repositories'
import { ProjectModel } from '../models/project-model'
import { Project } from '../data/models'
import { TaskResult } from '../common/taskResult'
import { ProjectColumns } from '../data/models/project-columns'
import { UserColumns } from '../data/models/user-columns'
import { QueryArgsHelper } from '../utils/query-args-helper'

class ProjectService {

    private projectsData: Repository<ProjectModel>

    public constructor (projectsData: Repository<ProjectModel>) {
        this.projectsData = projectsData
    }

    public all = async (): Promise<ProjectModel[]> => {
        const complexPopulate = [
            {
                path: ProjectColumns.owner,
                select: QueryArgsHelper.build(
                    UserColumns.firstName,
                    UserColumns.lastName
                )
            }
        ]

        const projection = QueryArgsHelper.build(
            ProjectColumns.endDate,
            ProjectColumns.raisedSum,
            ProjectColumns.createdOn,
            ProjectColumns.targetSum,
            ProjectColumns.description,
            ProjectColumns.imageUrl,
            ProjectColumns.name
        )

        return this.projectsData.filter({}, projection, {
            sort: ProjectColumns.endDate,
            complexPopulate
        })
    }

    public getAllForUser (userId: string) {
        const filter = { [ProjectColumns.owner]: userId }

        const complexPopulate = [
            {
                path: ProjectColumns.owner,
                select: QueryArgsHelper.build(
                    UserColumns.firstName,
                    UserColumns.lastName
                )
            }
        ]

        return this.projectsData.filter(filter, '', {
            sort: QueryArgsHelper.descending(ProjectColumns.createdOn),
            complexPopulate
        })
    }

    public details (id: string) {
        const complexPopulate = [
            {
                path: ProjectColumns.owner,
                select: QueryArgsHelper.build(
                    UserColumns.username,
                    UserColumns.email,
                    UserColumns.firstName,
                    UserColumns.lastName,
                    UserColumns.coverPhoto,
                    UserColumns.avatar,
                    UserColumns.youTubeUrl,
                    UserColumns.instagramUrl,
                    UserColumns.twitterUrl,
                    UserColumns.facebookUrl,
                    UserColumns.address
                )
            }
        ]

        return this.projectsData.getById(id, '', {
            complexPopulate
        })
    }

    public async create (project: ProjectModel): Promise<TaskResult> {
        return this.projectsData.create(project)
            .then((createdProject) => TaskResult.success('Project created successfully.', createdProject))
            .catch((err) => TaskResult.failure('Error while saving the project.', err))
    }

    public async delete (id: string): Promise<TaskResult> {
        return this.projectsData.delete(id)
            .then(() => TaskResult.success('The project was deleted'))
            .catch((err: any) => TaskResult.failure('Error while deleting the project.', err))
    }

    public update (id: string, newData: any): Promise<TaskResult> {
        return this.projectsData.update(id, newData)
            .then(() => TaskResult.success('The project were updated successfully.'))
            .catch((err: any) => TaskResult.failure('Error while updating the project', err))
    }

    public async invest (id: string, amount: number): Promise<TaskResult> {
        const project = await this.projectsData.firstOrDefault({ _id: id })

        if (!project) {
            return TaskResult.failure('The project does not exist!')
        }

        const body = {
            [ProjectColumns.raisedSum]: project.raisedSum + amount
        }

        return this.projectsData.update(id, body)
            .then(() => TaskResult.success('The project were invested successfully.'))
            .catch((err: any) => TaskResult.failure('Error while investing in the project', err))
    }

}

export default new ProjectService(new Repository<ProjectModel>(Project))
