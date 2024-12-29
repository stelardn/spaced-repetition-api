import { Revision } from '../../src/domain/calendar/enterprise/entities/revision'
import { RevisionsRepository } from '../../src/domain/calendar/application/repositories/RevisionsRepository'

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
}
