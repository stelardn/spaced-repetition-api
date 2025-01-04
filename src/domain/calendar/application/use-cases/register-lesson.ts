import { Lesson } from '../../enterprise/entities/lesson'
import { IRegisterLessonUseCase, RegisterLessonUseCaseRequest } from '../interfaces/register-lesson.use-case.interface'
import { LessonsRepository } from '../repositories/LessonsRepository'
import { RevisionsRepository } from '../repositories/RevisionsRepository'

export class RegisterLessonUseCase implements IRegisterLessonUseCase {
  constructor(
    private lessonsRepository: LessonsRepository,
    private revisionsRepository: RevisionsRepository,
  ) {}

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
    await this.revisionsRepository.bulkCreate(lesson.revisions)

    return lesson
  }
}
