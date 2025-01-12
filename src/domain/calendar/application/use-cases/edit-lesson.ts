import { UUID } from 'crypto'
import { Lesson } from '../../enterprise/entities/lesson'
import { LessonsRepository } from '../repositories/LessonsRepository'
import { RevisionsRepository } from '../repositories/RevisionsRepository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { EditLessonUseCaseRequest, IEditLessonUseCase } from '../interfaces/edit-lesson.use-case.interface'

export class EditLessonUseCase implements IEditLessonUseCase {
  constructor(
    private lessonsRepository: LessonsRepository,
    private revisionsRepository: RevisionsRepository
  ) {}

  async execute({
    lessonId,
    subject,
    theme,
    tags,
    date,
    course,
    references,
  }: EditLessonUseCaseRequest): Promise<Lesson | null> {
    const lesson = await this.lessonsRepository.getById(lessonId)

    if (!lesson) {
      throw new ResourceNotFoundError('lesson', { id: lessonId })
    }

    const promises = []

    lesson.subject = subject ?? lesson.subject
    lesson.theme = theme ?? lesson.theme
    lesson.course = course ?? lesson.course

    if (tags) {
      lesson.tags = tags
    }

    if (references) {
      lesson.references = references
    }

    if (date) {
      lesson.date = date
      const newRevisions = lesson.revisions
      promises.push(
        this.revisionsRepository.deleteManyByLessonId(lessonId)
          .then(() => this.revisionsRepository.bulkCreate(newRevisions))
      )
    }

    promises.unshift(this.lessonsRepository.save(lesson))

    await Promise.all(promises)
    
    return lesson
  }
}
