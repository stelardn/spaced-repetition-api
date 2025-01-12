import { UUID } from 'node:crypto'
import { Lesson } from '../../src/domain/calendar/enterprise/entities/lesson'
import { LessonsRepository } from '../../src/domain/calendar/application/repositories/LessonsRepository'

export class LessonsRepositoryInMemory extends LessonsRepository {
  public items: Lesson[] = []

  async create(lesson: Lesson): Promise<void> {
    this.items.push(lesson)
  }

  async getManyByIds(ids: UUID[]): Promise<Lesson[]> {
    return this.items.filter(item => ids.find(id => item.id === id))
  }

  async getById(id: UUID): Promise<Lesson | null> {
    return this.items.find(item => item.id === id) || null
  }

  async save(lesson: Lesson): Promise<Lesson | null> {
    const itemIndex = this.items.findIndex(item => item.id === lesson.id)

    if (itemIndex === -1) return null

    this.items[itemIndex] = lesson

    return this.items[itemIndex]
  }
}
