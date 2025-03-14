import { RevisionsRepository } from "../repositories/RevisionsRepository"
import { ResourceNotFoundError } from "@errors/resource-not-found"
import { IToggleRevisionCompletionUseCase, ToggleRevisionCompletionUseCaseRequest } from "../interfaces/toggle-revision-completion.use-case.interface"
export class ToggleRevisionCompletionUseCase implements IToggleRevisionCompletionUseCase {
  constructor(private revisionsRepository: RevisionsRepository) {}

  async execute({ revisionId }: ToggleRevisionCompletionUseCaseRequest) {
    const revision = await this.revisionsRepository.getById(revisionId)

    if (!revision) {
      throw new ResourceNotFoundError('Revision', { id: revisionId })
    }

    revision.toggleCompletion()
    const updatedRevision = await this.revisionsRepository.save(revision)
    
    return updatedRevision
  }
}