import { UUID } from 'crypto'
import { Lesson } from '../../enterprise/entities/lesson'

export interface EditLessonUseCaseRequest {
  lessonId: UUID,
  subject?: string
  theme?: string
  tags?: string[]
  date?: Date
  course?: string
  references?: string[]
}

export abstract class IEditLessonUseCase {
  abstract execute({
    lessonId,
    subject,
    theme,
    tags,
    date,
    course,
    references,
  }: EditLessonUseCaseRequest): Promise<Lesson | null>
}
