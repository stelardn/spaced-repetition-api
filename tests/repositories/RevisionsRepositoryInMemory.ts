import { Revision } from '../../src/domain/calendar/enterprise/entities/revision'
import { RevisionsRepository } from '../../src/domain/calendar/application/repositories/RevisionsRepository'

export class RevisionsRepositoryInMemory extends RevisionsRepository {
  public items: Revision[] = []

  async bulkCreate(revisions: Revision[]): Promise<void> {
    this.items.push(...revisions)
  }

  async getByDate(date: Date): Promise<Revision[]> {
    return this.items.filter(item => item.dueDate === date);
  }
}
