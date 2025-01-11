import { UUID } from "node:crypto";
import { Revision } from "../../enterprise/entities/revision";

export interface ToggleRevisionCompletionUseCaseRequest {
  revisionId: UUID
}

export abstract class IToggleRevisionCompletionUseCase {
  abstract execute({ 
    revisionId
  }: ToggleRevisionCompletionUseCaseRequest): Promise<Revision | null>
}