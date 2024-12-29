import { UUID } from 'node:crypto';
import { Lesson } from '../../enterprise/entities/lesson'

export abstract class LessonsRepository {
  abstract create(lesson: Lesson): Promise<void>
  abstract getManyByIds(ids: UUID[]): Promise<Lesson[]>
}
