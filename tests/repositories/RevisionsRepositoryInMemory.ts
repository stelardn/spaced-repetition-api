import { Revision } from '../../src/domain/calendar/enterprise/entities/revision'
import { RevisionsRepository } from '../../src/domain/calendar/application/repositories/RevisionsRepository'
import { UUID } from 'crypto'

export class RevisionsRepositoryInMemory extends RevisionsRepository {
  public items: Revision[] = []

  async bulkCreate(revisions: Revision[]): Promise<void> {
    this.items.push(...revisions)
  }

  async getByDate(date: Date): Promise<Revision[]> {
    const items = this.items.filter(item => {
      const dueDate = item.dueDate.toDateString()
      const isEqual = dueDate === date.toDateString()
      return isEqual
    })

    return items
  }

  async getById(id: UUID): Promise<Revision | null> {
    return this.items.find(item => item.id === id) || null
  }

  async save(revision: Revision): Promise<Revision | null> {
    const revisionIndex = this.items.findIndex(item => item.id === revision.id)

    if (revisionIndex === -1) return null

    this.items[revisionIndex] = revision

    return this.items[revisionIndex]
  }
}
