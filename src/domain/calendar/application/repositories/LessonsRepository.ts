import { Lesson } from '../../enterprise/entities/lesson'

export abstract class LessonsRepository {
  abstract create(lesson: Lesson): Promise<void>
}
