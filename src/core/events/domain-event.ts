import { UUID } from 'crypto'

export interface DomainEvent {
  ocurredAt: Date
  getAggregateId(): UUID
}
