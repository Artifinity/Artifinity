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

    public all () {
        const filter = {
            [ProjectColumns.endDate]: {
                $gte: Date.now()
            }
        }

        return this.projectsData.filter(filter, '', {
            sort: ProjectColumns.endDate
        })
    }

    public getAllForUser (userId: string) {
        const filter = { [ProjectColumns.owner]: userId }
        return this.projectsData.filter(filter, '', {
            sort: QueryArgsHelper.descending(ProjectColumns.createdOn)
        })
    }

    public details (id: string) {
        const complexPopulate = [
            {
                path: ProjectColumns.owner,
                select: QueryArgsHelper.build(
                    UserColumns.firstName,
                    UserColumns.lastName,
                    UserColumns.bio,
                    UserColumns.portfolioUrl
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

}

export default new ProjectService(new Repository<ProjectModel>(Project))
