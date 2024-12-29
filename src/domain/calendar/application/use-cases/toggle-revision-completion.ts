import { UUID } from "node:crypto";
import { RevisionsRepository } from "../repositories/RevisionsRepository";
import ResourceNotFoundError from "@/core/errors/resource-not-found";

interface ToggleRevisionCompletionUseCaseRequest {
  revisionId: UUID
}

export class ToggleRevisionCompletionUseCase {
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