import { UUID } from 'node:crypto';
import { Revision } from '../../enterprise/entities/revision'

export abstract class RevisionsRepository {
  abstract bulkCreate(revisions: Revision[]): Promise<void>
  abstract getByDate(date: Date): Promise<Revision[]>
  abstract getById(id: UUID): Promise<Revision>
  abstract save(revision: Revision): Promise<Revision>
}
