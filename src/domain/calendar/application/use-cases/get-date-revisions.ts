import { InvalidDateError } from '@/domain/entities/errors/invalid-date-error'
import { Lesson } from '../../enterprise/entities/lesson'
import { LessonsRepository } from '../repositories/LessonsRepository'
import { RevisionsRepository } from '../repositories/RevisionsRepository'

/** @description Date in YYYY-MM-DD format. */
type ISODateString = string

interface GetDateRevisionsUseCaseRequest {
  date: ISODateString
}


export class GetDateRevisionsUseCase {
  constructor(
    private lessonsRepository: LessonsRepository,
    private revisionsRepository: RevisionsRepository,
  ) {}

  async execute({
    date,
  }: GetDateRevisionsUseCaseRequest): Promise<Lesson[]> {
    const [year, month, day] = date?.split('-').map(Number)
    let revisionDate
  
    try {
      const monthIndex = month - 1
      revisionDate = new Date(year, monthIndex, day)
    } catch (error) {
      throw new InvalidDateError(date)
    }

    const dateRevisions = await this.revisionsRepository.getByDate(revisionDate)
    const dateRevisionsIds = dateRevisions.map(revision => revision.parentLessonId)
    const dateLessons = await this.lessonsRepository.getManyByIds(dateRevisionsIds)

    return dateLessons
  }
}
