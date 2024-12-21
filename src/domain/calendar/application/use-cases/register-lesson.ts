import { Lesson } from '../../enterprise/entities/lesson'
import { LessonsRepository } from '../repositories/LessonsRepository'

interface RegisterLessonUseCaseRequest {
  subject: string
  theme: string
  tags?: string[]
  date?: string
  course?: string
  references?: string[]
}

export class RegisterLessonUseCase {
  constructor(private lessonsRepository: LessonsRepository) {}

  async execute({
    subject,
    theme,
    tags,
    date,
    course,
    references,
  }: RegisterLessonUseCaseRequest): Promise<Lesson> {
    const lesson = new Lesson({
      subject,
      theme,
      tags,
      course,
      date,
      references,
    })

    await this.lessonsRepository.create(lesson)

    return lesson
  }
}
