import { UUID } from 'node:crypto'
import { Lesson } from '../../src/domain/calendar/enterprise/entities/lesson'
import { LessonsRepository } from '../../src/domain/calendar/application/repositories/LessonsRepository'

export class LessonsRepositoryInMemory extends LessonsRepository {
  public items: Lesson[] = []

  async create(lesson: Lesson): Promise<void> {
    this.items.push(lesson)
  }

  async getManyById(ids: UUID[]): Promise<Lesson[]> {
    return this.items.filter(item => ids.find(id => item.id === id))
  }
}
