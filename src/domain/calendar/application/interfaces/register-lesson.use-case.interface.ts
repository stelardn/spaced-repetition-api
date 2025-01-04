import { Lesson } from '../../enterprise/entities/lesson'

export interface RegisterLessonUseCaseRequest {
  subject: string
  theme: string
  tags?: string[]
  date?: Date
  course?: string
  references?: string[]
}

export abstract class IRegisterLessonUseCase {
  abstract execute({
    subject,
    theme,
    tags,
    date,
    course,
    references,
  }: RegisterLessonUseCaseRequest): Promise<Lesson>
}
